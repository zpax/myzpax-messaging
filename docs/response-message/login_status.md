# `login_status` Response Message

The `login_status` message is sent by **myzPAX** in response to a login status request. It indicates whether the user is currently authenticated.

## Message Type

```ts
type messageType = 'login_status';
```

## Payload

```ts
// Contains user ID if the user is logged in, else it will be null.
type Payload = number | null;
```

True if the user is authenticated; false otherwise.

## When It Is Sent

- In response to `sendZpaxMessage('login_status')` request.

## Example

```ts
sendZpaxMessage('login_status');

addZpaxMessageListener('login_status', (message) => {
  if (!message.data) {
    // Show marketing content.
  }
});
```

## Use Cases

- Pre-check before accessing protected content.
- Load content based on the login status like showing marketing content when not logged in.

## Related

- [`sendZpaxMessage('login_status')`](./login_status.md) — Message you need to send to get this response.
- [`addZpaxMessageListener`](../addZpaxMessageListener.md) — Function used to subscribe to incoming messages.
