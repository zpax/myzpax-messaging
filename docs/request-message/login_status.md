# `login_status` Request Message

This message is used to check whether the user is currently authenticated.

## Message Type

```ts
type messageType = 'login_status';
```

## Payload

None

## Example

```ts
sendZpaxMessage('login_status');

addZpaxMessageListener('login_status', (message) => {
  if (!message.data) {
    redirectToLogin();
  }
});
```

## Use Cases

- Guard protected views with authentication checks.
- Trigger auth flow dynamically.

## Related

- [`login_status`](../response-message/login_status.md) — The corresponding response from myzPAX.
- [`sendZpaxMessage`](../sendZpaxMessage.md) — Function to send messages to myzPAX.
- [`addZpaxMessageListener`](../addZpaxMessageListener.md) — Function to listen messages from myzPAX.
