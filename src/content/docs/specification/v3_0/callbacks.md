---
title: Callbacks
sidebar:
  order: 14
---

:::note
OAS **3** This guide is for OpenAPI 3.0.
:::

In OpenAPI 3 specs, you can define **callbacks** – asynchronous, out-of-band requests that your service will send to some other service in response to certain events. This helps you improve the workflow your API offers to clients. A typical example of a callback is subscription functionality – users subscribe to certain events of your service and receive a notification when this or that event occurs. For example, an e-shop can send a notification to the manager on each purchase. These notifications will be “out-of-band”, that is, they will go through a connection other than the connection through which a visitor works, and they will be asynchronous, as they will be out of the regular request-response flow. In OpenAPI 3, you can define the format of the “subscription” operation as well as the format of callback messages and expected responses to these messages. This description will simplify communication between different servers and will help you standardize the use of webhooks in your API.

### Callback Example

Let’s create a callback definition – a simple webhook notification. Suppose, your API provides a `POST /subscribe` operation that expects a callback URL in the request body:

```yaml
POST /subscribe
Host: my.example.com
Content-Type: application/json

{
  "callbackUrl": "https://myserver.com/send/callback/here"
}
```

The API acknowledges the subscription —

```yaml
HTTP/1.1 201 Created
```

— and later sends notifications on certain events:

```yaml
POST /send/callback/here
Host: myserver.com
Content-Type: application/json

{
  "message": "Something happened"
}
```

Let’s now define the `/subscribe` operation:

```yaml
openapi: 3.0.0
info:
  version: 0.0.0
  title: test

paths:
  /subscribe:
    post:
      summary: Subscribe to a webhook
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                callbackUrl: # Callback URL
                  type: string
                  format: uri
                  example: https://myserver.com/send/callback/here
              required:
                - callbackUrl
      responses:
        "201":
          description: Webhook created
```

Now let’s add the callbacks keyword to this operation to define a callback:

```yaml
paths:
  /subscribe:
    post:
      summary: Subscribe to a webhook
      requestBody: …
      callbacks: # Callback definition
        myEvent: # Event name
          "{$request.body#/callbackUrl}": # The callback URL,
            # Refers to the passed URL
            post:
              requestBody: # Contents of the callback message
                required: true
                content:
                  application/json:
                    schema:
                      type: object
                      properties:
                        message:
                          type: string
                          example: Some event happened
                      required:
                        - message
              responses: # Expected responses to the callback message
                "200":
                  description: Your server returns this code if it accepts the callback
```

Let’s walk through this definition line by line:

- `callbacks` are defined inside the related operation - `post`, `put`, and so on (not under the path itself). In this example, under the `post` method of the `/subscribe` path:

```yaml
paths:
  /subscribe:
    post:
      …
      callbacks:
        …
```

This does not mean that the API will send callbacks only when this operation is working. Your API will send callback requests when the business logic of your service requires. The hierarchy of keywords simply lets you use parameters of the `/subscribe` operation to configure the callback requests (see [below](#runtime-expressions)).

- Inside `callbacks`, we define one or more callback messages. In our example, we have one message only. You can find an example with multiple callbacks below. The definition of each callback starts with the event name (`_myEvent_` in our example):

```yaml
callbacks:
  myEvent: # Event name
```

- Under the event name, we define the URL your service will send callback messages to. In our example, the URL is specified by using the `{$request.body#/callbackUrl}` expression:

```yaml
callbacks:
  myEvent:
    "{$request.body#/callbackUrl}": # The callback URL, refers to the URL passed in the request body
```

This expression tells that the callback URL will be based on the parameters of the `/subscribe` operation. We will tell more about these expressions a bit later.

- Below the URL, we specify the method of the callback message, and define the message format and the expected responses. These definitions are similar to regular request and response definitions:

```yaml
callbacks:
  myEvent:
    "{$request.body#/callbackUrl}":
      post: # Method
        requestBody: # Contents of the callback message
          …
        responses: # Expected responses
          …
```

Please note that when you define a callback, you define a specification of your API. The actual implementation of the callback functionality is done in the server code.

### Use Runtime Expressions to Refer to Request Fields

As you can see, we use the `{$request.body#/callbackUrl}` expression in our example. It is a [runtime expression](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#runtimeExpression) that sets which data of the `POST /subscribe` request will be used in callbacks. _Runtime_ means that unlike API endpoints, this URL is not known beforehand and is evaluated at run time based on the data supplied by API clients. This value varies from one client to another. For example, the `POST /subscribe` request can look as follows:

```yaml
POST /subscribe?p1=query-param-value HTTP/1.1
Host: my.example.com
Content-Type: application/json
Content-Length: 187

{
  "callbackUrl" : "http://my.client.com/callback"
}

201 Created
Location: http://my.example.com?id=123
```

You can use the following expressions to refer to its data:

| Expression                       | Example                                              | Description                                                                                                 |
| -------------------------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `{$url}`                         | `/subscribe`                                         | The parent operation URL.                                                                                   |
| `{$method}`                      | `POST`                                               | The method of the callback request.                                                                         |
| `{$request.path.eventType}`      | `myEvent`                                            | The event name.                                                                                             |
| `{$request.query.param-name}`    | `query-param-value` (the `p1` query parameter)       | The value of the specified query parameter.                                                                 |
| `{$request.header.header-name}`  | `application/json` (the Content-Type header)         | The specified header of the “subscription” request.                                                         |
| `{$request.body#/field-name}`    | `callbackUrl`                                        | A field in the request body. If the field is an array, use the syntax like `{$request.body#/arrayField/2}`. |
| `{$response.header.header-name}` | `http://my.example.com?id=123` (the Location header) | The value of the specified response header (the response to the “subscription” request).                    |

You can combine a runtime expression with static data in callback definitions. For instance, you can define the callback URL in the following way:

```yaml
{$request.body#callbackUrl}/data:
– or –
{$request.body#/callbackUrl}/{$request.query.eventType}:
```

You can use expressions to specify query parameters:

```yaml
{$request.body#/callbackUrl}/data?p1={$request.query.eventType}
```

If the string includes both runtime expressions and static text, you should enclose the runtime expressions in curly braces. If the whole string is a runtime expression, you can skip the curly braces.

### Multiple Callbacks

As we have said above, you can use one “subscription” operation to define multiple callbacks:

```yaml
/subscribe:
  post:
    requestBody:
      content:
        application/json:
          schema:
            type: object
            properties:
              inProgressUrl:
                type: string
              failedUrl:
                type: string
              successUrl:
                type: string
    responses:
      "200":
        description: OK
    callbacks:
      inProgress:
        "{$request.body#/inProgressUrl}":
          post:
            requestBody:
              $ref: "#/components/requestBodies/callbackMessage1"
            responses:
              "200":
                description: OK
        "{$request.body#/failedUrl}":
          post:
            requestBody:
              $ref: "#/components/requestBodies/callbackMessage2"
            responses:
              "200":
                description: OK
        "{$request.body#/successUrl}":
          post:
            requestBody:
              $ref: "#/components/requestBodies/callbackMessage3"
            responses:
              "200":
                description: OK
```

### Unsubscribing From Callbacks

The way you implement the unsubscription mechanism is up to you. For example, the receiving server can return specific code in response to the callback message to indicate that it is no longer interested in callbacks. In this case, clients can unsubscribe only in response to a callback request. To allow clients to unsubscribe at any time, your API can provide a special “unsubscribe” operation. This is a rather common approach. In this case, your service can generate an ID or token for each subscriber and return this ID or token in a response to the “subscription” request. To unsubscribe, a client can pass this ID to the “unsubscribe” operation to specify the subscriber to be removed. The following example demonstrates how you can define this behavior in your spec:

```yaml
paths:
/subscribe:
  description: Add a subscriber
  post:
    parameters:
      - name: callbackUrl
        in: query
        required: true
        schema:
          type: string
          format: uri
      - name: event
        in: query
        required: true
        schema:
          type: string
    responses:
      '201':
        description: Added
        content:
          application/json:
            type: object
            properties:
              subscriberId:
                type: string
                example: AAA-123-BBB-456
    links:  # Link the returned id with the unsubscribe operation
      unsubscribeOp:
        operationId: unsubscribeOperation
            parameters:
              Id: $response.body#/subscriberId
    callbacks:
      myEvent:
        '{$request.query.callbackUrl}?event={$request.query.event}':
          post:
            requestBody:
              content:
                application/json:
                  example:
                    message: Some event
            responses:
              '200':
                description: OK

/unsubscribe:
  post:
    operationId: unsubscribeOperation
    parameters:
      - name: Id
        in: query
        required: true
        schema:
          type: string
```

_Did not find what you were looking for? [Ask the community](https://community.smartbear.com/t5/Swagger-Open-Source-Tools/bd-p/SwaggerOSTools)  
Found a mistake? [Let us know](https://github.com/swagger-api/swagger.io/issues)_
