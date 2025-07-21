# `setTargets` Function

Sets the allowed `myzPAX` origin(s) that messages can be sent to and received from.

This function should be called once during initialization to configure the parent origins that the child iframe is allowed to communicate with using `postMessage`.

> **Note:** All messages sent via `sendZpaxMessage` will be dispatched only to the origins configured using this function.

### Parameters

| Name | Type       | Description                                                  |
| ---- | ---------- | ------------------------------------------------------------ |
| `t`  | `string[]` | An array of target origin URLs (e.g., `https://myzpax.com`). |

### Example Usage

```ts
// In production environment
setTargets(['https://myzpax.com']);
```

```ts
// In sandbox environment
setTargets(['https://sandbox.myzpax.com']);
```

### Related

- [`sendZpaxMessage()`](./sendZpaxMessage.md) – Sends typed messages to the configured parent targets.
