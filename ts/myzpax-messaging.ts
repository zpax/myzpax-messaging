/**
 * myzPAX Messaging Utility
 * ========================
 *
 * This utility facilitates structured communication between an embedded application
 * and the myzPAX container using the postMessage API. It allows embedded apps to:
 *
 * - Send messages to myzPAX (e.g., interaction events, lock requests, open full view).
 * - Receive messages from myzPAX (e.g., lock commands, re-authentication, last interaction time).
 * - Maintain secure communication using allowed origin filtering.
 *
 * Typical use cases include user idle detection, lockout triggers, opening contact forms, and re-authentication flows.
 */

// ----------------------------
// Message Data Definitions
// ----------------------------

/**
 * Data for lock_app message.
 * Sent from embedded app to myzPAX to lock the application.
 */
export type LockAppMessageData = {
  /** What should happen after re-authentication. */
  afterReAuthAction?: 'reload' | 'none';

  /** Whether to remove the iframe after locking. */
  removeIframe?: boolean;

  /** Type of lock: 'timeout' or 'manual'. */
  lockType: 'timeout' | 'manual';
};

/**
 * Data for open_contact_form message.
 * Sent from embedded app to myzPAX to open a contact form.
 */
export type OpenContactFormMessageData = {
  /** Name of the app requesting contact form. */
  appName: string;

  /** Email address where the form should be sent. */
  toEmail: string;
};

// ----------------------------
// Message Type Definitions
// ----------------------------

/**
 * Messages sent by myzPAX to the embedded app.
 */
export type ResponseMessage = {
  /**
   * myzPAX wants to lock the embedded application.
   * Embedded app should listen to this and respond with `sendZpaxMessage('lock_app', ...)`
   * after performing any required clean-up (e.g., saving state).
   */
  lock_app: undefined;

  /**
   * myzPAX notifies that the user has re-authenticated.
   * Embedded app can resume any paused operations or reinitialize.
   */
  re_authenticated: undefined;

  /**
   * Sent by myzPAX in response to a `sendZpaxMessage('last_interaction')` call or when the window comes back into focus.
   * Contains the last timestamp (in ms) when embedded app sent an `interaction` message.
   */
  last_interaction: number;
};

/**
 * Messages sent from embedded app to myzPAX.
 */
export type RequestMessage = {
  /**
   * Lock the embedded application with given config.
   */
  lock_app: LockAppMessageData;

  /**
   * Notify myzPAX of any user interaction in the embedded app.
   */
  interaction: void;

  /**
   * Request myzPAX for the timestamp of the last interaction.
   * The embedded app must listen for the 'last_interaction' message beforehand.
   */
  last_interaction: void;

  /**
   * Ask myzPAX to open the embedded app in full view.
   */
  open_full_view: void;

  /**
   * Ask myzPAX to show a contact form configured with provided app name and email.
   */
  open_contact_form: OpenContactFormMessageData;
};

// --------------------------------
// Internal Utility Type Helpers
// --------------------------------

export type ZpaxMessage<T, D> = {
  type: T;
  data: D;
};

export type ResponseMessageHandler<T extends keyof ResponseMessage> = (
  data: ZpaxMessage<T, ResponseMessage[T]>
) => void;

// ----------------------------
// Messaging Implementation
// ----------------------------

let targets: string[] = [];

/**
 * Sets the allowed myzPAX origins that messages can be sent to and received from.
 *
 * @example
 * When in production, setTargets(['https://myzpax.com']);
 * When in sandbox, setTargets(['https://sandbox.myzpax.com']);
 *
 * @param t - An array of target origins.
 */
export const setTargets = (t: string[]) => {
  targets = [...t];
};

/**
 * Sends a message to myzPAX.
 *
 * @template T - Message type (key of RequestMessage).
 * @param messageType - The message type.
 * @param data - Optional data (based on the messageType).
 *
 * @example
 * sendZpaxMessage('interaction');
 *
 * @example
 * sendZpaxMessage('lock_app', {
 *   lockType: 'manual',
 *   afterReAuthAction: 'reload',
 *   removeIframe: true
 * });
 */
export const sendZpaxMessage = <T extends keyof RequestMessage>(
  messageType: T,
  ...[data]: RequestMessage[T] extends void ? [] : [RequestMessage[T]]
) => {
  if (!targets.length) {
    console.error('No targets set. Use setTargets() to set them.');
    return;
  }

  targets.forEach((target) =>
    window.parent.postMessage({ type: messageType, data }, target)
  );
};

/**
 * Adds a listener for a message from myzPAX.
 *
 * @template T - Message type (key of ResponseMessage).
 * @param messageType - Type of message to listen for.
 * @param handler - Handler to run when message is received.
 *
 * @returns A function to remove the listener.
 *
 * @example
 * const unsubscribe = addZpaxMessageListener('re_authenticated', () => {
 *   console.log('User re-authenticated');
 * });
 */
export const addZpaxMessageListener = <T extends keyof ResponseMessage>(
  messageType: T,
  handler: ResponseMessageHandler<T>
) => {
  if (!targets.length) {
    console.error('No targets set. Use setTargets() to set them.');
    return () => {};
  }

  const handlerWrapper = (
    event: MessageEvent<ZpaxMessage<T, ResponseMessage[T]>>
  ) => {
    if (!targets.includes(event.origin) || event.data.type !== messageType)
      return;
    handler(event.data);
  };

  window.addEventListener('message', handlerWrapper);
  return () => window.removeEventListener('message', handlerWrapper);
};

// ----------------------------
// Usage Examples
// ----------------------------

/**
 * Example: Listen for myzPAX request to lock the app, then respond.
 */
addZpaxMessageListener('lock_app', () => {
  console.log('myzPAX requested lock. Preparing to lock...');
  sendZpaxMessage('lock_app', {
    lockType: 'manual',
    afterReAuthAction: 'reload',
  });
});

/**
 * Example: Handle user re-authentication from myzPAX.
 */
addZpaxMessageListener('re_authenticated', () => {
  console.log('User re-authenticated via myzPAX.');
});

/**
 * Example: Request last interaction timestamp and lock if idle too long.
 */
const checkIdleAndLock = () => {
  const IDLE_TIMEOUT = 5 * 60 * 1000; // 5 minutes

  const unsubscribe = addZpaxMessageListener('last_interaction', (msg) => {
    const lastInteraction = new Date(msg.data);
    const idleDuration = Date.now() - lastInteraction.getTime();

    if (idleDuration > IDLE_TIMEOUT) {
      sendZpaxMessage('lock_app', {
        lockType: 'timeout',
        removeIframe: true,
      });
    }

    unsubscribe(); // Clean up listener
  });

  sendZpaxMessage('last_interaction');
};

/**
 * Example: Notify myzPAX about user interaction.
 */
const trackUserInteraction = () => {
  document.body.addEventListener('click', () => {
    sendZpaxMessage('interaction');
  });
};

/**
 * Example: Open contact form in myzPAX.
 */
const openContactForm = () => {
  sendZpaxMessage('open_contact_form', {
    appName: 'MyApp',
    toEmail: 'support@company.com',
  });
};

/**
 * Example: Request to open full-view mode.
 */
const openFullView = () => {
  sendZpaxMessage('open_full_view');
};
