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

export type OpenFullViewMessageData = {
  /**
   * Included as the 'state' query param in your app's URL when redirected back from SSO.
   * Used to restore app state or navigate to a specific page after receiving the auth code.
   */
  state?: string;
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

/**
 * Data for open_mini_player message.
 * Sent from embedded app to myzPAX to open a mini player.
 */
export type OpenMiniPlayerMessageData = {
  /** Video URL for the mini player. */
  src: string;

  /** Path of the video page. Used for redirecting the user to video page when clicked on full screen button of mini player. */
  videoPagePath: string;

  /** Volume of the mini player (range: 0-1). */
  volume: number;

  /** Start time in seconds for the mini player. */
  currentTime: number;

  /** Title of the mini player. */
  title?: string;

  /** Subtitle of the mini player. */
  subtitle?: string;
};

/**
 * Data for open_signin_signup_popup message.
 * Sent from embedded app to myzPAX to open a sign-in/sign-up popup.
 */
export type OpenSigninSignupPopupMessageData = {
  title: string;
  message: string;
};

/**
 * Data for state_change message.
 * Sent from myzPAX to the embedded app when the 'state' query parameter in the URL of myzPAX changes
 * when user clicks on the back or forward button of the browser.
 */
export type StateChangeMessageData = {
  /** Current value of the 'state' query parameter of the URL. */
  state: string | null;

  /** Direction of the navigation. */
  action: 'back' | 'forward';
};

/**
 * Data for mini_player_closed message.
 * Sent from myzPAX to the embedded app when the mini player is closed.
 */
export type MiniPlayerClosedMessageData = {
  /** src property of the video element during mini player close. */
  src: string;

  /** currentTime property of the video element during mini player close. */
  currentTime: number;

  /** volume property of the video element during mini player close. */
  volume: number;
};

/**
 * Data for mini_player_fullscreen message.
 * Sent from myzPAX to the embedded app when the mini player's full-screen button is clicked.
 */
export type MiniPlayerFullscreenMessageData = {
  /** src property of the video element during mini player close. */
  src: string;

  /** currentTime property of the video element during mini player close. */
  currentTime: number;

  /** volume property of the video element during mini player close. */
  volume: number;
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

  /**
   * Sent by myzPAX in response to a `sendZpaxMessage('login_status')` call.
   */
  login_status: boolean;

  /**
   * Sent by myzPAX when the mini player is closed.
   */
  mini_player_closed: MiniPlayerClosedMessageData;

  /**
   * Sent by myzPAX when the state of the embedded app changes when user clicks on the back or forward button.
   */
  state_change: StateChangeMessageData;

  /**
   * Sent by myzPAX when mini player's full screen button is clicked.
   */
  mini_player_fullscreen: MiniPlayerFullscreenMessageData;
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
  open_full_view: OpenFullViewMessageData;

  /**
   * Ask myzPAX to show a contact form configured with provided app name and email.
   */
  open_contact_form: OpenContactFormMessageData;

  /**
   * Ask myzPAX to show a mini player configured with provided source URL.
   */
  open_mini_player: OpenMiniPlayerMessageData;

  /**
   * Request myzPAX to send user login status to the embedded app.
   */
  login_status: void;

  /**
   * Ask myzPAX to show a sign-in/sign-up popup configured with provided title and message.
   */
  open_signin_signup_popup: OpenSigninSignupPopupMessageData;

  /**
   * Send state to myzPAX. This will only work in full view mode.
   */
  set_state: string;

  /**
   * Enables or disables a confirmation dialog before unloading the page. This will only work in full view mode.
   */
  unsaved_changes_confirmation: boolean;

  /**
   * Ask myzPAX to close the mini player
   */
  close_mini_player: 'close' | 'fullscreen';
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
