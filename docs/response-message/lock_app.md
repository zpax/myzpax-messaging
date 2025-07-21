# `lock_app` Response Message

myzPAX wants to lock the embedded application.  
You must listen for this and respond with `sendZpaxMessage('lock_app', ...)` after cleanup (e.g., saving state).

## Message Type

```ts
type messageType = 'lock_app';
```

## Payload

None.

## Example

```ts
addZpaxMessageListener('lock_app', () => {
  // Perform necessary operation before locking
  sendZpaxMessage('lock_app', {
    lockType: 'manual',
    afterReAuthAction: 'reload',
  });
});
```

## Use Cases

- When there is a `lock_app` request from the user using myzPAX UI, you will receive this message where you can perform necessary operation like stopping timers, saving state and send the message `lock_app` with `lockType` as `manual` to confirm lock.

## Related

- [`sendZpaxMessage('lock_app', ...)`](../request-message/lock_app.md) — Message you send in response to this.
- [`addZpaxMessageListener`](../addZpaxMessageListener.md) — Function used to subscribe to incoming messages.
