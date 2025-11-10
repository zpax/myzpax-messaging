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
  /** Playback rate of video. */
  playbackRate: number;
  /** Playback rate options for the mini player. */
  playbackRateOptions: number[];
  /** Optional title of the video. */
  title?: string;
  /** Optional channel name. */
  channelName?: string;
  /** Optional thumbnail URL. */
  thumbnail?: string;
  /** Optional configuration for previous/next video navigation. */
  previousNextVideoSettings?: {
    /** URL of the API to fetch previous/next video data. */
    previousNextVideoApi: string;
    /** Current video ID. Used to fetch the next/previous video. */
    currentVideoId: string;
    /** Whether to automatically play the next video when the current video ends. */
    autoPlayNextVideo: boolean;
  };
};

/**
 * The previousNextVideoApi endpoint should satisfy these requirements:
 *
 * - Method: GET
 * - Query parameters: { videoId: string }
 * - Response (application/json 200):
 *   {
 *     "previousVideo"?: {
 *       "id": string;             // required
 *       "src": string;            // required
 *       "videoPagePath": string;  // required
 *       "title"?: string;
 *       "channelName"?: string;
 *       "thumbnail"?: string;
 *     },
 *     "nextVideo"?: {
 *       "id": string;             // required
 *       "src": string;            // required
 *       "videoPagePath": string;  // required
 *       "title"?: string;
 *       "channelName"?: string;
 *       "thumbnail"?: string;
 *     }
 *   }
 */
```

## Example

```ts
sendZpaxMessage('open_mini_player', {
  src: 'https://cdn.com/video.mp4',
  videoPagePath: '/videos/123',
  volume: 0.7,
  currentTime: 5,
  playbackRate: 1,
  playbackRateOptions: [0.25, 0.5, 1, 1.5, 2],
  title: 'Episode 1',
  channelName: 'My Channel',
  thumbnail: 'https://cdn.com/thumbnails/123.jpg',
  previousNextVideoSettings: {
    previousNextVideoApi: 'https://api.example.com/videos/navigation',
    currentVideoId: '123',
    autoPlayNextVideo: true,
  },
});
```

## Use Cases

- Show compact playback while user browses.
- Resume video across app views.

## Related

- [`sendZpaxMessage`](../sendZpaxMessage.md) — Function to send messages to myzPAX.
