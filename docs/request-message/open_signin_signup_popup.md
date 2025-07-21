# `open_signin_signup_popup` Request Message

This message asks myzPAX to open a **sign-in or sign-up popup** with a custom title and message.

## Message Type

```ts
type messageType = 'open_signin_signup_popup';
```

## Payload

```ts
type OpenSigninSignupPopupMessageData = {
  /* Popup title */
  title: string;
  /* Popup Message */
  message: string;
};
```

## Example

```ts
sendZpaxMessage('open_signin_signup_popup', {
  title: 'Please Sign In',
  message: 'To continue watching, please sign in.',
});
```

## Use Cases

- Prompt guest users to authenticate or sign-up.
- Handle gated feature flows.

## Related

- [`sendZpaxMessage`](../sendZpaxMessage.md) — Function to send messages to myzPAX.
