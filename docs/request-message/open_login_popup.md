# `open_login_popup` Request Message

This message is sent from the embedded app to request myzPAX to open login popup.

## Message Type

```ts
type messageType = 'open_login_popup';
```

## Payload

None

## Example

```ts
sendZpaxMessage('open_login_popup');
```

## Use Cases

- When there is need for a sign-in prompt or an action that requires the user to be logged in.

## Related

- [`sendZpaxMessage`](../sendZpaxMessage.md) — Function to send messages to myzPAX.
