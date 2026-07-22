# `hide_manual_lock` Request Message

The `hide_manual_lock` message is sent from the embedded application (iframe) to the parent container **myzPAX** to show or hide the manual lock button present on the tile header.

It acts as a toggle:

- Send `true` to **hide** the manual lock button.
- Send `false` to **show** the manual lock button again.

## Message Type

```ts
type messageType = 'hide_manual_lock';
```

## Payload

```ts
type Payload = boolean; // true = hide the manual lock button, false = show it
```

## Example

```ts
// Hide the manual lock button (e.g. while showing the marketing page)
sendZpaxMessage('hide_manual_lock', true);

// Show the manual lock button again (e.g. after leaving the marketing page)
sendZpaxMessage('hide_manual_lock', false);
```

## Use Cases

- Hiding the manual lock button when it is not relevant to the current view, such as when the embedded app is displaying its marketing/landing page.
- Restoring the manual lock button once the app navigates to a view where locking is applicable.

## Related

- [`sendZpaxMessage`](../functions/sendZpaxMessage.md) — Function to send messages to myzPAX.
- [`lock_app`](./lock_app.md) — Request message to lock the embedded app.
