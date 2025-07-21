# `last_interaction` Request Message

This message is sent from the embedded app to request the **timestamp of last recorded interaction**.

## Message Type

```ts
type messageType = 'last_interaction';
```

## Payload

None

## Example

```ts
addZpaxMessageListener('last_interaction', (message) => {
  const lastInteraction = new Date(message.data);
  console.log('Last interaction was at:', lastInteraction.toLocaleTimeString());
});

sendZpaxMessage('last_interaction');
```

## Use Cases

- Determine session validity.
- Resume timers or UI state on focus.

## Related

- [`last_interaction`](../response-message/last_interaction.md) — The actual response from myzPAX.
- [`sendZpaxMessage`](../sendZpaxMessage.md) — Function to send messages to myzPAX.
- [`addZpaxMessageListener`](../addZpaxMessageListener.md) — Function to listen messages from myzPAX.
