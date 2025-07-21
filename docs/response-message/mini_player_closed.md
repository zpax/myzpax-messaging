# `mini_player_closed` Response Message

The `mini_player_closed` message is sent when the mini player window is closed. It provides the final playback state.

## Message Type

```ts
type messageType = 'mini_player_closed';
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

- When the mini player is closed by the user.

## Example

```ts
addZpaxMessageListener('mini_player_closed', (message) => {
  const video = message.data;
  restoreVideoSession(video.src, video.currentTime, video.volume);
});
```

## Use Cases

- Restore video player state in main view.

## Related

- [`open_mini_player`](../request-message/open_mini_player.md)
- [`mini_player_full_screen`](#mini_player_full_screen-message)
- [`addZpaxMessageListener`](../addZpaxMessageListener.md) — Function used to subscribe to incoming messages.
