# `notification_navigate` Response Message

Sent by myzPAX when the user clicks a notification whose target app is **already open in full view**. The embedded app is responsible for parsing/routing to the correct in-app location based on the deepLink.

> **Note**: If the target app is **not** currently open, myzPAX does **not** send this message — it hard-navigates the browser (`window.location.href = deepLink`) to the notification's deepLink instead, leaving the myzPAX shell entirely.

## Message Type

```ts
type messageType = 'notification_navigate';
```

## Payload

```ts
type Payload = string; // the notification's deepLink URL
```

The payload is the full deepLink URL as provided in the notification. myzPAX does not decode or transform it beyond resolving which app it belongs to — the embedded app owns interpreting the URL (e.g., decrypting/parsing any subpath it has encoded into the URL) and routing internally.

## When It Is Sent

- When the user clicks a notification, and the app it belongs to is currently the active app open in full view.

## Example

```ts
addZpaxMessageListener('notification_navigate', (message) => {
  const deepLink = message.data;
  routeToDeepLink(deepLink);
});
```

## Use Cases

- Routing an already-open embedded app to the specific content referenced by a notification, without a full page reload.

## Related

- [`addZpaxMessageListener`](../functions/addZpaxMessageListener.md) — Function used to subscribe to incoming messages.
