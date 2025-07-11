# myzPAX Messaging Utility

This repository provides a messaging utility that enables structured and secure communication between an embedded application and the **myzPAX** container using the `postMessage` API.

It includes both:

- **JavaScript version**: for plain JS projects.
- **TypeScript version**: with strong types and IDE support.

Also included are usage examples for **Vue.js**, **React**

---

## 1. Project Structure

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
├── README.md                        # Main documentation and usage instructions
```

---

## 2. Use in Your App

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

## 3. Message Types

### Sent **to** myzPAX

| Message Type                   | Data Payload                                                                                                     |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| `interaction`                  | none                                                                                                             |
| `lock_app`                     | `{ lockType: 'manual' \| 'timeout', afterReAuthAction?: 'reload' \| 'none', removeIframe?: boolean }`            |
| `last_interaction`             | none                                                                                                             |
| `open_full_view`               | `{ state?: string}`                                                                                              |
| `open_contact_form`            | `{ appName: string, toEmail: string }`                                                                           |
| `open_mini_player`             | `{ src: string, videoPagePath: string, currentTime: number, title?: string, subtitle?: string, volume: number }` |
| `login_status`                 | none                                                                                                             |
| `open_signin_signup_popup`     | `{ title: string, message: string}`                                                                              |
| `set_state`                    | string                                                                                                           |
| `unsaved_changes_confirmation` | boolean                                                                                                          |

---

### Received **from** myzPAX

| Message Type             | Data Payload                                            |
| ------------------------ | ------------------------------------------------------- |
| `lock_app`               | none                                                    |
| `re_authenticated`       | none                                                    |
| `last_interaction`       | timestamp (number, in ms)                               |
| `login_status`           | boolean                                                 |
| `mini_player_closed`     | `{ src: string, currentTime: number, volume: number }`  |
| `state_change`           | `{state: string \| null, action: 'back' \| 'forward' }` |
| `mini_player_fullscreen` | `{ src: string, currentTime: number, volume: number }`  |

---

## 4. Examples

See [Vue.js example](./examples/vue/example.vue)

See [React with ts example](./examples/react-ts/App.tsx)

## 📚 More Detailed Documentation

Each utility file (`ts/myzpax-messaging.ts` and `js/myzpax-messaging.js`) contains extensive inline documentation covering:

- All available message types and their purposes
- Data structures and expected fields
- Examples of how to use each function (`setTargets`, `sendZpaxMessage`, `addZpaxMessageListener`)
- Common use cases like lockouts, re-auth flows, and full-view toggles

We recommend reviewing these files directly for a deeper understanding.
