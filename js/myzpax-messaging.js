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
 * - mini_player_closed
 *     Description:
 *       Notifies the embedded app that the mini player has been closed.
 *     Payload:
 *       {
 *         src: string // the source URL of the mini player
 *         currentTime: number // the time in seconds at which the mini player was closed
 *         volume: number // the volume at which the mini player was closed (0-1)
 *       }
 *
 * - state_change
 *     Description:
 *       Notifies the embedded app that the 'state' query parameter in the URL of myzPAX has changed.
 *     Payload:
 *       {
 *         state: string | null, // the new value of the 'state' query parameter
 *         action: 'back' | 'forward' // the action that triggered the state change
 *       }
 *
 * - mini_player_fullscreen
 *     Description:
 *       Notifies the embedded app that the mini player's full-screen button has been clicked.
 *     Payload:
 *       {
 *         src: string // the source URL of the mini player
 *         currentTime: number // the time in seconds at which the mini player was closed
 *         volume: number // the volume at which the mini player was closed (0-1)
 *       }
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
 *       {
 *         state?: string // optional -  Included as the 'state' query param in your app's URL when redirected back from SSO.
 *                                       Used to restore app state or navigate to a specific page after receiving the auth code.
 *       }
 *
 * - open_contact_form
 *     Description:
 *       Request myzPAX to open a contact form with predefined recipient and app context.
 *     Payload:
 *       {
 *         appName: string, // required - name of the app making the request
 *         toEmail: string  // required - email address to send the form to
 *       }
 *
 * - open_mini_player
 *     Description:
 *       Request myzPAX to open a mini player with a video source.
 *     Payload:
 *       {
 *         src: string // required - URL of the video source
 *         videoPagePath: string // required - path of the video page
 *         currentTime: number   // required - start time in seconds
 *         volume: number // required - volume of the mini player (range: 0-1)
 *         title?: string  // optional - title of the mini player
 *         subtitle?: string // optional - subtitle of the mini player
 *       }
 *
 * - open_signin_signup_popup
 *     Description:
 *       Request myzPAX to open a sign-in/sign-up popup.
 *     Payload:
 *       {
 *         title: string // required - title of the popup
 *         message: string // required - message to display in the popup
 *       }
 *
 * - set_state
 *     Description:
 *       Request myzPAX to set the state of the embedded app. This will only work in full view mode.
 *     Payload:
 *       string // required - state to set
 *
 * - unsaved_changes_confirmation
 *     Description:
 *       Request myzPAX to enable or disable an unsaved changes confirmation dialog.
 *     Payload:
 *       boolean // required - true to enable, false to disable
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
