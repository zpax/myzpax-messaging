# `set_state` Request Message

This message sends a stringified state to myzPAX. It only works when the app is in full view.

## Message Type

```ts
type messageType = 'set_state';
```

## Payload

```ts
type Payload = string; // Arbitrary state identifier
```

## Example

```ts
sendZpaxMessage('set_state', '/profile/settings');
```

## Use Cases

- Sync app scroll or UI state.
- Persist app state on parent.

## Related

- [`state_change`](../response-message/state_change.md) — Listen to state changes.
- [`sendZpaxMessage`](../sendZpaxMessage.md) — Function to send messages to myzPAX.
