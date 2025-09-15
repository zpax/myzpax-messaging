# `login_status` Request Message

This message is sent from the embedded app to request the user's authentication status.[`login_status`](../response-message/login_status.md) response message must be listened to before making the request. It will return the userId if the user is logged in; otherwise, it will return null.

## Message Type

```ts
type messageType = 'login_status';
```

## Payload

None

## Example

```ts
addZpaxMessageListener('login_status', (message) => {
  if (!message.data) {
    redirectToLogin();
  }
});

sendZpaxMessage('login_status');
```

## Use Cases

- Guard protected views with authentication checks.
- Trigger auth flow dynamically.

## Related

- [`login_status`](../response-message/login_status.md) — The corresponding response from myzPAX.
- [`sendZpaxMessage`](../sendZpaxMessage.md) — Function to send messages to myzPAX.
- [`addZpaxMessageListener`](../addZpaxMessageListener.md) — Function to listen messages from myzPAX.
