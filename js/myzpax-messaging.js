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

/**
 * Supported Message Types
 * =======================
 *
 * ----------------------------------------
 * Messages sent FROM myzPAX TO embedded app
 * ----------------------------------------
 *
 * - lock_app
 *     Description:
 *       myzPAX instructs the embedded app to lock itself.
 *       This might be triggered by manual lock.
 *     Expected Action:
 *       The embedded app should perform any cleanup (e.g., saving state) and
 *       then send a lock confirmation using:
 *       sendZpaxMessage('lock_app', { lockType: 'manual' | 'timeout' });
 *     Payload:
 *       undefined
 *
 * - re_authenticated
 *     Description:
 *       Notifies the embedded app that the user has successfully re-authenticated.
 *     Expected Action:
 *       Resume any paused operations, reinitialize the app, or restore session state as needed.
 *     Payload:
 *       undefined
 *
 * - last_interaction
 *     Description:
 *       Provides the timestamp (in milliseconds) of the last 'interaction' message sent by the app.
 *       This is sent either in response to the app’s `last_interaction` request,
 *       or automatically when the app window regains focus.
 *     Expected Action:
 *       The app can use this to determine how long the user has been idle.
 *     Payload:
 *       number (timestamp, e.g., 1718531200113)
 *
 * ----------------------------------------
 * Messages sent FROM embedded app TO myzPAX
 * ----------------------------------------
 *
 * - interaction
 *     Description:
 *       Notify myzPAX that the user interacted with the embedded app (e.g., click, scroll).
 *       Helps reset idle timers in the container.
 *     Payload:
 *       none
 *
 * - lock_app
 *     Description:
 *       Request myzPAX to lock the app, typically due to timeout or manual lock action.
 *     Payload:
 *       {
 *         lockType: 'timeout' | 'manual',         // required
 *         afterReAuthAction?: 'reload' | 'none',  // optional (default: reload)
 *         removeIframe?: boolean                  // optional; whether to remove the iframe after lock
 *       }
 *
 * - last_interaction
 *     Description:
 *       Request myzPAX to provide the timestamp of the last user interaction.
 *     Note:
 *       App must set up a listener for the 'last_interaction' response before sending this.
 *     Payload:
 *       none
 *
 * - open_full_view
 *     Description:
 *       Request myzPAX to open the embedded app in full-view mode.
 *     Payload:
 *       none
 *
 * - open_contact_form
 *     Description:
 *       Request myzPAX to open a contact form with predefined recipient and app context.
 *     Payload:
 *       {
 *         appName: string, // required - name of the app making the request
 *         toEmail: string  // required - email address to send the form to
 *       }
 */

// ----------------------------
// Messaging Implementation
// ----------------------------

let targets = [];

/**
 * Sets the allowed myzPAX origins that messages can be sent to and received from.
 *
 * @example
 * setTargets(['https://myzpax.com']);
 * setTargets(['https://sandbox.myzpax.com']);
 *
 * @param {string[]} t - An array of target origins.
 */
export const setTargets = (t) => {
  targets = [...t];
};

/**
 * Sends a message to myzPAX.
 *
 * @param {string} messageType - The message type (e.g., 'interaction', 'lock_app').
 * @param {any} [data] - Optional data to send depending on messageType.
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
export const sendZpaxMessage = (messageType, data) => {
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
 * @param {string} messageType - Type of message to listen for.
 * @param {(msg: { type: string, data: any }) => void} handler - Handler to run when message is received.
 * @returns {() => void} A function to remove the listener.
 *
 * @example
 * const unsubscribe = addZpaxMessageListener('re_authenticated', () => {
 *   console.log('User re-authenticated');
 * });
 */
export const addZpaxMessageListener = (messageType, handler) => {
  if (!targets.length) {
    console.error('No targets set. Use setTargets() to set them.');
    return () => {};
  }

  const handlerWrapper = (event) => {
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
 * Example: Send 'lock_app' message to request myzPAX to lock the app due to timeout.
 */
sendZpaxMessage('lock_app', { lockType: 'timeout' });

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
