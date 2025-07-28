# `close_mini_player` Request Message

`close_mini_player` is sent from embedded app to close the mini player.

## Message Type

```ts
type messageType = 'close_mini_player';
```

## Payload

```ts
type Payload = 'close' | 'fullscreen';
```

## Example

```ts
sendZpaxMessage('close_mini_player', 'close');
```

## Use Cases

- When you want to close the playing mini player for some user action in your app which requires the mini player to be closed or switch to video page.

## Related

- [`mini_player_closed'](../response-message/mini_player_closed.md) — Listen to message that is sent after mini player is closed.
- [`sendZpaxMessage`](../sendZpaxMessage.md) — Function to send messages to myzPAX.
