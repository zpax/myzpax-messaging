# `open_contact_form` Request Message

The `open_contact_form` message is sent from the embedded app to open a **contact form** configured with an app name and email.

## Message Type

```ts
type messageType = 'open_contact_form';
```

## Payload

```ts
type OpenContactFormMessageData = {
  /** Name of the app requesting contact form. */
  appName: string;
  /** Email address where the form should be sent. */
  toEmail: string;
};
```

## Example

```ts
sendZpaxMessage('open_contact_form', {
  appName: 'Example App',
  toEmail: 'support@example.com',
});
```

## Use Cases

- Customer support access.
- Bug report or help request UI.

## Related

- [`sendZpaxMessage`](../sendZpaxMessage.md) — Function to send messages to myzPAX.
