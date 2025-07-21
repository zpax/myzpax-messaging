# `lock_app` Request Message

The `lock_app` message is sent from the embedded application (iframe) to the parent container **myzPAX** to request that the app be locked. This can be used in scenarios such as user inactivity (timeout) or a manual trigger from the app.

## Message Type

```ts
type messageType = 'lock_app';
```

## Payload

The message payload must conform to the `LockAppMessageData` type:

```ts
type LockAppMessageData = {
  /**
   * What should happen after the user re-authenticates.
   * - 'reload': Reload the iframe after successful re-authentication.
   * - 'none': Do nothing after re-authentication.
   */
  afterReAuthAction?: 'reload' | 'none';

  /**
   * Whether the parent (myzPAX) should remove the iframe after locking.
   */
  removeIframe?: boolean;

  /**
   * The type of lock being requested.
   * - 'timeout': Lock due to user inactivity.
   * - 'manual': Lock triggered explicitly by the app.
   */
  lockType: 'timeout' | 'manual';
};
```

## Example

```ts
sendZpaxMessage('lock_app', {
  lockType: 'timeout',
  removeIframe: true,
});
```

## When to Use

Use this message to request that **myzPAX** locks the embedded app in scenarios like:

- Auto-locking due to user inactivity.
- Manual user action requiring authentication again.
- When user want to lock the app.

## Related

- [`sendZpaxMessage`](../sendZpaxMessage.md) — Function to send messages to myzPAX.
- [`addZpaxMessageListener`](../addZpaxMessageListener.md) — Function to listen messages from myzPAX.
