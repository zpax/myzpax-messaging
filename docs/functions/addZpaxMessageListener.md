# `addZpaxMessageListener` Function

Adds a listener for a specific message type coming from the `myzPAX` parent container.

This function allows the embedded (iframe) application to respond to messages sent from `myzPAX` using `postMessage`. It verifies the message type and origin before invoking the provided handler.

> **Note:** Ensure `setTargets()` is called before using this to define which origins are trusted.

### Type Parameters

- `T extends keyof ResponseMessage`  
  The type of message to listen for. Must be a key in the [`ResponseMessage`](../response-message/) type.

### Parameters

| Name          | Type                        | Description                                                   |
| ------------- | --------------------------- | ------------------------------------------------------------- |
| `messageType` | `T`                         | The name/type of the message to listen for.                   |
| `handler`     | `ResponseMessageHandler<T>` | The callback function to invoke when the message is received. |

### Returns

- `() => void`  
  A cleanup function that removes the event listener when called.

### Type Definition Reference

[`ResponseMessageHandler`](../type-definitions/responseMessageHandler.md)

### Example Usage

```ts
// Listen for a 're_authenticated' message from myzPAX
const unsubscribe = addZpaxMessageListener('re_authenticated', () => {
  console.log('User re-authenticated');
});

// Later, remove the listener
unsubscribe();
```

### Related

- [`setTargets()`](./setTargets.md) – Must be called first to configure valid message origins.
- [`sendZpaxMessage()`](./sendZpaxMessage.md) – Used to send messages to the parent container.
- [`ResponseMessage`](../response-message) – Defines the available incoming message types and their expected payloads.
