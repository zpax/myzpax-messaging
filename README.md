# myzPAX Messaging Utility

This repository provides a messaging utility that enables structured and secure communication between an embedded application and the **myzPAX** container using the `postMessage` API.

It includes both:

- **JavaScript version**: for plain JS projects.
- **TypeScript version**: with strong types and IDE support.

Also included are usage examples for **Vue.js**, **React**

---

## Project Structure

```
myzpax-messaging/
├── js/
│   └── myzpax-messaging.js          # JavaScript version of the utility
├── ts/
│   └── myzpax-messaging.ts          # TypeScript version with full typings and message type docs
├── examples/
│   ├── vue/
│   │   └── example.vue              # Sample usage in a Vue.js component
│   └── react-ts/
│       └── App.tsx                  # Sample usage in a React (TypeScript) component
├── docs/
│   ├── functions                    # Folder containing docs for all the utility functions
│   ├── request-message              # Folder containing docs for all the messages that embedded app can send to myzPAX
│   ├── response-message             # Folder containing docs for all the messages that myzPAX will send to the embedded app
│   └── type-definitions             # Folder containing docs for utility types
├── README.md                        # Main documentation and usage instructions
```

---

## Use in Your App

Copy the `js/` or `ts/` implementation into your project.

### ✅ Example (JavaScript)

<pre lang="js"><code>
import { setTargets, sendZpaxMessage, addZpaxMessageListener } from './js/myzpax-messaging.js';

setTargets(['https://myzpax.com']);

sendZpaxMessage('interaction');

addZpaxMessageListener('re_authenticated', () => {
  console.log('User re-authenticated');
});
</code></pre>

---

### ✅ Example (TypeScript)

<pre lang="ts"><code>
import { setTargets, sendZpaxMessage, addZpaxMessageListener } from './ts/myzpax-messaging';

setTargets(['https://myzpax.com']);

sendZpaxMessage('interaction');

addZpaxMessageListener('re_authenticated', () => {
  console.log('User re-authenticated');
});
</code></pre>

---

## Documentation

### Utility Functions

[`sendZpaxMessage`](./docs/functions/sendZpaxMessage.md)

[`addZpaxMessageListener`](./docs/functions/addZpaxMessageListener.md)

[`setTargets`](./docs/functions/setTargets.md)

### Request Messages (Sent by Embedded App To myzPAX)

[`interaction`](./docs/request-message/interaction.md)

[`last_interaction`](./docs/request-message/last_interaction.md)

[`lock_app`](./docs/request-message/lock_app.md)

[`login_status`](./docs/request-message/login_status.md)

[`open_contact_form`](./docs/request-message/open_contact_form.md)

[`open_full_view`](./docs/request-message/open_full_view.md)

[`open_mini_player`](./docs/request-message/open_mini_player.md)

[`set_state`](./docs/request-message/set_state.md)

[`unsaved_changes_confirmation`](./docs/request-message/unsaved_changes_confirmation.md)

### Response Messages (Sent by myzPAX to Embedded App)

[`last_interaction`](./docs/response-message/last_interaction.md)

[`lock_app`](./docs/response-message/lock_app.md)

[`login_status`](./docs/response-message/login_status.md)

[`mini_player_closed`](./docs/response-message/mini_player_closed.md)

[`mini_player_fullscreen`](./docs/response-message/mini_player_fullscreen.md)

[`re_authenticated`](./docs/response-message/re_authenticated.md)

[`state_change`](./docs/response-message/state_change.md)

## Examples

See [Vue.js example](./examples/vue/example.vue)

See [React with ts example](./examples/react-ts/App.tsx)
