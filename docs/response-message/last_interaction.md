# `last_interaction` Response Message

The `last_interaction` message is sent **from the parent container (myzPAX)** to the **embedded app (iframe)**. It provides the timestamp of the last user interaction that was reported by the iframe using the `interaction` message.

## Message Type

```ts
type messageType = 'last_interaction';
```

## Payload

```ts
type Payload = number; // Timestamp in milliseconds
```

The payload is a single number representing the time (in milliseconds since epoch) when the embedded app last sent an `interaction` message to myzPAX.

## When It Is Sent

myzPAX sends this message:

- In response to `sendZpaxMessage('last_interaction')` from the embedded app.
- Automatically when the iframe regains focus (e.g., user switches tabs or windows).

## Example

```ts
const unsubscribe = addZpaxMessageListener('last_interaction', (message) => {
  const lastInteractionTime = new Date(message.data);
  console.log('User last interacted at:', lastInteractionTime.toLocaleString());
});
```

## Use Cases

- To display or log the user's last interaction time.
- To decide whether to lock the app or re-authenticate based on inactivity duration.
- To resync timers after the tab becomes active again.

## Related

- [`sendZpaxMessage('interaction')`](./interaction.md) — Used by the iframe to inform myzPAX of user activity.
- [`sendZpaxMessage('last_interaction')`](./last_interaction.md) — Request myzPAX to respond with this message.
- [`addZpaxMessageListener`](../addZpaxMessageListener.md) — Function used to subscribe to incoming messages.
