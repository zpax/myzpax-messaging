# `redirect_to_signup` Request Message

This message is sent from the embedded app to request myzPAX to redirect to the sign up page.

## Message Type

```ts
type messageType = 'redirect_to_signup';
```

## Payload

None

## Example

```ts
sendZpaxMessage('redirect_to_signup');
```

## Use Cases

- When there is a sign-up prompt or an action that requires user registration.

## Related

- [`sendZpaxMessage`](../sendZpaxMessage.md) — Function to send messages to myzPAX.
