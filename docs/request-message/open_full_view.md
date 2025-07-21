# `open_full_view` Request Message

The `open_full_view` message is sent by the embedded app to open itself in **full view** mode.

## Message Type

```ts
type messageType = 'open_full_view';
```

## Payload

```ts
type OpenFullViewMessageData = {
  /**
   * Included as the 'state' query param in your app's URL when redirected back from SSO.
   * Used to restore app state or navigate to a specific page after receiving the auth code.
   */
  state?: string;
};
```

## Example

```ts
sendZpaxMessage('open_full_view', {
  state: '/dashboard?id=21',
});
```

## Use Cases

- Opening full view from a user action in the tile view

## Related

- [`sendZpaxMessage`](../sendZpaxMessage.md) — Function to send messages to myzPAX.
