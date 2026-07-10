# `location` Response Message

The `location` message is sent by **myzPAX** in response to a `sendZpaxMessage('location')` request. It provides the approximate latitude and longitude of the user's location. Note: These values are approximate and should not be used for precise geolocation.

## Message Type

```ts
type messageType = "location";
```

## Payload

```ts
type Payload = {
  latitude: number; // Approximate latitude of the user
  longitude: number; // Approximate longitude of the user
};
```

## When It Is Sent

- In response to `sendZpaxMessage('location')` from the embedded app.

## Example

```ts
sendZpaxMessage("location");

addZpaxMessageListener("location", (message) => {
  const latitude = message.latitude;
  const longitude = message.longitude;
  console.log("User location:", latitude, longitude);
  // Use the location for analytics, personalization, etc.
});
```

## Use Cases

- Personalizing content based on user location
- Analytics and reporting
- Displaying approximate user location on a map
