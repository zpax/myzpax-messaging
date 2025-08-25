# `open_signin_popup` Request Message

This message is sent from the embedded app to request myzPAX to open sign up popup.

## Message Type

```ts
type messageType = 'open_signup_popup';
```

## Payload

None

## Example

```ts
sendZpaxMessage('open_signup_popup');
```

## Use Cases

- When there is need for a sign-up prompt or an action that requires user registration.

## Related

- [`sendZpaxMessage`](../sendZpaxMessage.md) — Function to send messages to myzPAX.
