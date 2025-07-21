# `unsaved_changes_confirmation` Request Message

This message enables or disables a browser confirmation dialog before unloading the app. It only works in full view mode.

## Message Type

```ts
type messageType = 'unsaved_changes_confirmation';
```

## Payload

```ts
type Payload = boolean; // true = show confirmation, false = disable
```

## Example

```ts
// Turn on confirmation when the user has unsaved changes
sendZpaxMessage('unsaved_changes_confirmation', true);

// Disable the confirmation dialog
sendZpaxMessage('unsaved_changes_confirmation', false);
```

## Related

- [`sendZpaxMessage`](../sendZpaxMessage.md) — Function to send messages to myzPAX.
