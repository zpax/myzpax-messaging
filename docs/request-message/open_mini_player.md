# `open_mini_player` Request Message

The `open_mini_player` message is sent to **show a mini video player** within myzPAX.

## Message Type

```ts
type messageType = 'open_mini_player';
```

## Payload

```ts
type OpenMiniPlayerMessageData = {
  /** Video URL for the mini player. */
  src: string;
  /** Path of the video page for full-screen navigation. */
  videoPagePath: string;
  /** Volume of the mini player (0.0–1.0). */
  volume: number;
  /** Start time in seconds. */
  currentTime: number;
  /** Optional title of the mini player. */
  title?: string;
  /** Optional subtitle of the mini player. */
  subtitle?: string;
  /** Playback rate of video. */
  playbackRate: number;
  /** Playback rate options for the mini player. */
  playbackRateOptions: number[];
};
```

## Example

```ts
sendZpaxMessage('open_mini_player', {
  src: 'https://cdn.com/video.mp4',
  videoPagePath: '/videos/123',
  volume: 0.7,
  currentTime: 5,
  title: 'Episode 1',
  subtitle: 'Pilot',
  playbackRate: 1,
  playbackRateOption: [0.25, 0.5, 1, 1.5, 2],
});
```

## Use Cases

- Show compact playback while user browses.
- Resume video across app views.

## Related

- [`sendZpaxMessage`](../sendZpaxMessage.md) — Function to send messages to myzPAX.
