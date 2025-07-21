# `ResponseMessageHandler` Type

The ResponseMessageHandler is a TypeScript utility type that describes the shape of a handler function used with addZpaxMessageListener. It ensures that the handler receives the correct message type and corresponding data.

## Definition

```ts
export type ZpaxMessage<T, D> = {
  type: T;
  data: D;
};

export type ResponseMessageHandler<T extends keyof ResponseMessage> = (
  data: ZpaxMessage<T, ResponseMessage[T]>
) => void;
```

## Explanation

- `ZpaxMessage<T, D>` Represents a message object with a `type` and `data` field.

- `ResponseMessageHandler<T>` A function that takes a `ZpaxMessage` where:

  - `T` is a key of the `ResponseMessage` interface, representing a specific message type.

  - `data` is typed to match the corresponding value in `ResponseMessage[T]`.

## Example Usage

```ts
addZpaxMessageListener('last_interaction', (message) => {
  const timestamp = message.data;
  console.log('Last interaction time:', timestamp);
});
```

### Here:

`'last_interaction'` is a key of [`ResponseMessage`](../response-message/last_interaction.md).

message.data will be typed as [`ResponseMessage['last_interaction']`](../response-message/last_interaction.md#payload).
