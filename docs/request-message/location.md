# `location` Request Message

The `location` request message is sent by the embedded app to **myzPAX** to request the user's approximate location. myzPAX responds with a `location` response message containing latitude and longitude.

## Message Type

```ts
type messageType = "location";
```

## Payload

```ts
type Payload = void;
```

## Example

```ts
addZpaxMessageListener("location", (message) => {
  const latitude = message.latitude;
  const longitude = message.longitude;
});

sendZpaxMessage("location");
```

## Use Cases

- Requesting the user's approximate location for analytics or personalization
- Displaying the user's location on a map

## Related

- [`location`](../response-message/location.md) — Response message with location data.
