# `re_authenticated` Response Message

The `re_authenticated` message is sent by **myzPAX** to inform the iframe that the user has successfully re-authenticated (e.g., after a lock or timeout).

## Message Type

```ts
type messageType = 're_authenticated';
```

## Payload

None

## When It Is Sent

- After the user completes a re-authentication flow triggered by the iframe or session manager.

## Example

```ts
addZpaxMessageListener('re_authenticated', () => {
  // Resume application activity
  resumeUserSession();
});
```

## Use Cases

- Resume paused workflows after a lock.
- Re-fetch secured data.
- Inform user that session has resumed.

## Related

- [`sendZpaxMessage('lock_app')`](./lock_app.md)
- [`addZpaxMessageListener`](../addZpaxMessageListener.md) — Function used to subscribe to incoming messages.
