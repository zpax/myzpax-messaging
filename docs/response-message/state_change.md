# `state_change` Response Message

The `state_change` message is sent by myzPAX when the browser back/forward navigation is detected.

## Message Type

```ts
type messageType = 'state_change';
```

## Payload

```ts
type Payload = {
  state: string | null;
  action: 'back' | 'forward';
};
```

## When It Is Sent

- On browser navigation events (popstate).

## Example

```ts
addZpaxMessageListener('state_change', (message) => {
  const { action, state } = message.data;
  console.log(`User navigated ${action}. State:`, state);
  syncWithHistoryState(state);
});
```

## Use Cases

- Manage SPA state across navigation.
- Detect if user left a flow.

## Related

- [`sendZpaxMessage('set_state', ...)`](../request-message/set_state.md) — To set state.
- [`addZpaxMessageListener`](../addZpaxMessageListener.md) — Function used to subscribe to incoming messages.
