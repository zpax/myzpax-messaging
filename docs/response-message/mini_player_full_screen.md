# `mini_player_full_screen` Response Message

The `mini_player_full_screen` message is sent when the full screen button on the mini player is clicked.

## Message Type

```ts
type messageType = 'mini_player_full_screen';
```

## Payload

```ts
type Payload = {
  src: string;
  currentTime: number;
  volume: number;
};
```

## When It Is Sent

- When the user clicks the full screen icon in the mini player.

## Example

```ts
addZpaxMessageListener('mini_player_full_screen', (message) => {
  const video = message.data;
  enterFullScreenPlayback(video.src, video.currentTime, video.volume);
});
```

## Use Cases

- Navigate to full video experience.

## Related

- [`mini_player_closed`](#mini_player_closed-message)
- [`addZpaxMessageListener`](../addZpaxMessageListener.md) — Function used to subscribe to incoming messages.
