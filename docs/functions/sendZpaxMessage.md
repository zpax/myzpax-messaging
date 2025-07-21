# `sendZpaxMessage` Function

Sends a structured message from the embedded (child) application to the parent container (`myzPAX`).

This utility wraps the `window.postMessage` API to enable safe, typed communication from an iframe to its parent. It ensures the message type and payload match the structure defined in the `RequestMessage` type.

> **Note:** You must call `setTargets()` before using this function to configure the allowed parent origins.

### Type Parameters

- `T extends keyof RequestMessage`  
  A key from the `RequestMessage` type representing the type of message being sent.

### Parameters

| Name          | Type                             | Description                                                                |
| ------------- | -------------------------------- | -------------------------------------------------------------------------- |
| `messageType` | `T`                              | The message type to send (must be a key from `RequestMessage`).            |
| `data`        | `RequestMessage[T]` _(optional)_ | Payload corresponding to the message type. Optional if the type is `void`. |

### Behavior

- Sends a message of shape `{ type: messageType, data }` to all configured parent origins.
- If no targets have been set using `setTargets()`, an error is logged and no message is sent.

### Example Usage

```ts
// Notify the parent container (myzPAX) that the user has interacted with the app.
// This can help myzPAX track the user's last active timestamp.
sendZpaxMessage('interaction');
```

```ts
// Request myzPAX to lock the app due to a timeout.
// Optionally instruct it to remove the iframe after locking.
sendZpaxMessage('lock_app', {
  lockType: 'timeout',
  removeIframe: true,
});
```

### Related

- [`setTargets()`](./setTargets.md) – Call this to define the list of parent origins to which messages should be sent.
- [`RequestMessage`](../request-message/) – Defines the available message types and their expected payloads.
