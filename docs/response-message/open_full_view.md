# `open_full_view` Response Message

Sent by myzPAX when it wants to open the app in the **full view** mode.
The embedded app must listen for this and respond with `sendZpaxMessage('open_full_view', ...)` after performing necessary initialization actions if any confirming navigation to **full view**.

> **Note**: The embedded app must respond with `sendZpaxMessage('open_full_view')` within 1 second. If unable to do so, myzPAX will automatically navigate to the full view with the default configurations as a fallback. To deny the open_full_view request from myzPAX and cancel the fallback navigation, embedded app should respond with `cancel: true;` in the [`open_full_view request message`](../request-message/open_full_view.md).

## Message Type

```ts
type messageType = 'open_full_view';
```

## Payload

```ts
type Payload = {
  /**
   * This will be the identifier which will help the embedded app determine where the request is coming from
   * It will be a string consisting the name of view in which spaces are replaced with '-'
   * and to this '-' separated name string, '^<type_of_the_view>' is added as suffix
   *
   * Example: If the title of view is 'PDPM Rate Simulator' and the type of the view is tile
   * then the resulting viewId will be 'PDPM-Rate-Simulator^tile_view'
   */
  viewId: string;
};
```

## Example

```ts
addZpaxMessageListener('open_full_view', (message) => {
  if (message.data.viewId === 'PDPM-Rate-Simulator^tile_view') {
    /**
     * Perform any necessary actions needed before navigating to full view.
     * Like saving the state of the tile content in localStorage
     * so that it can be restored after moving to the full view
     * or determining the state param value that needs to be passed
     * to the open_full_view message.
     * Can also choose to cancel the navigation.
     */

    let conditionsMetForFullViewNavigation: boolean; // cancellation logic

    // Must respond within 1 second of receiving the message
    // or else fallback will be triggered
    if (conditionsMetForFullViewNavigation) {
      sendZpaxMessage('open_full_view', {
        state: `/home?navigatedFrom=${message.data.viewId}`,
      });
    } else {
      sendZpaxMessage('open_full_view', { cancel: true });
    }
  }
});
```

## Use Cases

- When embedded app want to control the navigation to **full view**

## Related

- [`open_full_view`](../request-message/open_full_view.md) - message that need to be sent in response to this request message.
- [`addZpaxMessageListener`](../functions/addZpaxMessageListener.md)
- [`sendZpaxMessage`](../functions/sendZpaxMessage.md)
