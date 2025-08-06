# `redirect_to_login` Request Message

This message is sent from the embedded app to request myzPAX to redirect to the login page.

## Message Type

```ts
type messageType = 'redirect_to_login';
```

## Payload

None

## Example

```ts
sendZpaxMessage('redirect_to_login');
```

## Use Cases

- When there is a sign-in prompt or an action that requires the user to be logged in.

## Related

- [`sendZpaxMessage`](../sendZpaxMessage.md) — Function to send messages to myzPAX.
