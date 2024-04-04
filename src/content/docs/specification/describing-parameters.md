---
title: Describing Parameters
sidebar:
  order: 6
---

:::note
OAS **3** This page is about OpenAPI 3.0. If you use OpenAPI 2.0, see our [OpenAPI 2.0 guide](/specification/20/describing-parameters/).
:::

## Describing Parameters

In OpenAPI 3.0, parameters are defined in the `parameters` section of an operation or path. To describe a parameter, you specify its `name`, location (`in`), data type (defined by either `schema` or `content`) and other attributes, such as `description` or `required`. Here is an example:

```yaml
paths:
  /users/{userId}:
    get:
      summary: Get a user by ID
      parameters:
        - in: path
          name: userId
          schema:
            type: integer
          required: true
          description: Numeric ID of the user to get
```

Note that `parameters` is an array, so, in YAML, each parameter definition must be listed with a dash (`-`) in front of it.

### Parameter Types

OpenAPI 3.0 distinguishes between the following parameter types based on the parameter location. The location is determined by the parameter’s `in` key, for example, `in: query` or `in: path`.

- [path parameters](#path-parameters), such as `/users/{id}`
- [query parameters](#query-parameters), such as `/users?role=admin`
- [header parameters](#header-parameters), such as `X-MyHeader: Value`
- [cookie parameters](#cookie-parameters), which are passed in the `Cookie` header, such as `Cookie: debug=0; csrftoken=BUSe35dohU3O1MZvDCU`

### Path Parameters

Path parameters are variable parts of a URL path. They are typically used to point to a specific resource within a collection, such as a user identified by ID. A URL can have several path parameters, each denoted with curly braces `{ }`.

```yaml
GET /users/{id}
GET /cars/{carId}/drivers/{driverId}
GET /report.{format}
```

Each path parameter must be substituted with an actual value when the client makes an API call. In OpenAPI, a path parameter is defined using `in: path`. The parameter name must be the same as specified in the path. Also remember to add `required: true`, because path parameters are always required. For example, the `/users/{id}` endpoint would be described as:

```yaml
paths:
  /users/{id}:
    get:
      parameters:
        - in: path
          name: id # Note the name is the same as in the path
          required: true
          schema:
            type: integer
            minimum: 1
          description: The user ID
```

Path parameters containing arrays and objects can be serialized in different ways:

- path-style expansion (matrix) – semicolon-prefixed, such as `/map/point;x=50;y=20`
- label expansion – dot-prefixed, such as `/color.R=100.G=200.B=150`
- simple-style – comma-delimited, such as `/users/12,34,56`

The serialization method is specified by the `style` and `explode` keywords. To learn more, see [Parameter Serialization](/specification/serialization/).

### Query Parameters

Query parameters are the most common type of parameters. They appear at the end of the request URL after a question mark (`?`), with different `name=value` pairs separated by ampersands (`&`). Query parameters can be required and optional.

```yaml
GET /pets/findByStatus?status=available
GET /notes?offset=100&limit=50
```

Use `in: query` to denote query parameters:

```yaml
         parameters:
            - in: query
              name: offset
              schema:
                type: integer
              description: The number of items to skip before starting to collect the result set
            - in: query
              name: limit
              schema:
                type: integer
              description: The numbers of items to return
```

**Note:** To describe API keys passed as query parameters, use `securitySchemes` and `security` instead. See [API Keys](/specification/authentication/api-keys/).

Query parameters can be primitive values, arrays and objects. OpenAPI 3.0 provides several ways to serialize objects and arrays in the query string.

Arrays can be serialized as:

- `form` – `/products?color=blue,green,red` or `/products?color=blue&color=green`, depending on the `explode` keyword
- `spaceDelimited` (same as `collectionFormat: ssv` in OpenAPI 2.0) – `/products?color=blue%20green%20red`
- `pipeDelimited` (same as `collectionFormat: pipes` in OpenAPI 2.0) – `/products?color=blue|green|red`

Objects can be serialized as:

- `form` – `/points?color=R,100,G,200,B,150` or `/points?R=100&G=200&B=150`, depending on the `explode` keyword
- `deepObject` – `/points?color[R]=100&color[G]=200&color[B]=150`

The serialization method is specified by the `style` and `explode` keywords. To learn more, see [Parameter Serialization](/specification/serialization/).

#### Reserved Characters in Query Parameters

[RFC 3986](https://tools.ietf.org/html/rfc3986#section-2.2) defines a set of reserved characters `:/?#[]@!$&'()*+,;=` that are used as URI component delimiters. When these characters need to be used literally in a query parameter value, they are usually percent-encoded. For example, `/` is encoded as `%2F` (or `%2f`), so that the parameter value `quotes/h2g2.txt` would be sent as

```yaml
GET /file?path=quotes%2Fh2g2.txt
```

If you want a query parameter that is not percent-encoded, add `allowReserved: true` to the parameter definition:

```yaml
      parameters:
        - in: query
          name: path
          required: true
          schema:
            type: string
          allowReserved: true # <-----
```

In this case, the parameter value would be sent like so:

```yaml
GET /file?path=quotes/h2g2.txt
```

### Header Parameters

An API call may require that custom headers be sent with an HTTP request. OpenAPI lets you define custom request headers as `in: header` parameters. For example, suppose, a call to `GET /ping` requires the `X-Request-ID` header:

```yaml
    GET /ping HTTP/1.1
    Host: example.com
    X-Request-ID: 77e1c83b-7bb0-437b-bc50-a7a58e5660ac
```

Using OpenAPI 3.0, you would define this operation as follows:

```yaml
paths:
  /ping:
    get:
      summary: Checks if the server is alive
      parameters:
        - in: header
          name: X-Request-ID
          schema:
            type: string
            format: uuid
          required: true
```

In a similar way, you can define [custom response headers](/specification/describing-responses/#response-headers). Header parameter can be primitives, arrays and objects. Arrays and objects are serialized using the `simple` style. For more information, see [Parameter Serialization](/specification/serialization/).

**Note:** Header parameters named `Accept`, `Content-Type` and `Authorization` are not allowed. To describe these headers, use the corresponding OpenAPI keywords:

Header

OpenAPI keywords

For more information, see...

`Content-Type`

Request content type: `requestBody.content.<media-type>`

Response content type: `responses.<code>.content.<media-type>`

[Describing Request Body](/specification/describing-request-body/),  
[Describing Responses](/specification/describing-responses/),  
[Media Types](/specification/mime-types)

`Accept`

`responses.<code>.content.<media-type>`

[Describing Responses](/specification/describing-responses/),  
[Media Types](/specification/mime-types)

`Authorization`

`securitySchemes`, `security`

[Authentication](/specification/authentication/)

### Cookie Parameters

Operations can also pass parameters in the `Cookie` header, as `Cookie: name=value`. Multiple cookie parameters are sent in the same header, separated by a semicolon and space.

```yaml
    GET /api/users
    Host: example.com
    Cookie: debug=0; csrftoken=BUSe35dohU3O1MZvDCUOJ
```

Use `in: cookie` to define cookie parameters:

```yaml
          parameters:
            - in: cookie
              name: debug
              schema:
                type: integer
                enum: [0, 1]
                default: 0
            - in: cookie
              name: csrftoken
              schema:
                type: string
```

Cookie parameters can be primitive values, arrays and objects. Arrays and objects are serialized using the `form` style. For more information, see [Parameter Serialization](/specification/serialization/).

**Note:** To define cookie authentication, use [API keys](/specification/authentication/api-keys/) instead.

### Required and Optional Parameters

By default, OpenAPI treats all request parameters as optional. You can add `required: true` to mark a parameter as required. Note that path parameters must have `required: true`, because they are always required.

```yaml
parameters:
  - in: path
    name: userId
    schema:
      type: integer
    required: true # <----------
    description: Numeric ID of the user to get.
```

### schema vs content

To describe the parameter contents, you can use either the `schema` or `content` keyword. They are mutually exclusive and used in different scenarios. In most cases, you would use **`schema`**. It lets you describe primitive values, as well as simple arrays and objects serialized into a string. The serialization method for array and object parameters is defined by the `style` and `explode` keywords used in that parameter.

```yaml
parameters:
  - in: query
    name: color
    schema:
      type: array
      items:
        type: string

    # Serialize as color=blue,black,brown (default)
    style: form
    explode: false
```

**`content`** is used in complex serialization scenarios that are not covered by `style` and `explode`. For example, if you need to send a JSON string in the query string like so:

```yaml
filter={"type":"t-shirt","color":"blue"}
```

In this case, you need to wrap the parameter `schema` into `content/<media-type>` as shown below. The `schema` defines the parameter data structure, and the media type (in this example – `application/json`) serves as a reference to an external specification that describes the serialization format.

```yaml
parameters:
  - in: query
    name: filter

    # Wrap 'schema' into 'content.<media-type>'
    content:
      application/json: # <---- media type indicates how to serialize / deserialize the parameter content
        schema:
          type: object
          properties:
            type:
              type: string
            color:
              type: string
```

**Note for Swagger UI and Swagger Editor users:** Parameters with `content` are supported in Swagger UI 3.23.7+ and Swagger Editor 3.6.34+.

### Default Parameter Values

Use the `default` keyword in the parameter schema to specify the default value for an optional parameter. The default value is the one that the server uses if the client does not supply the parameter value in the request. The value type must be the same as the parameter’s data type. A typical example is paging parameters such as `offset` and `limit`:

```yaml
GET /users
GET /users?offset=30&limit=10
```

Assuming `offset` defaults to 0 and `limit` defaults to 20 and ranges from 0 to 100, you would define these parameters as:

```yaml
parameters:
  - in: query
    name: offset
    schema:
      type: integer
      minimum: 0
      default: 0
    required: false
    description: The number of items to skip before starting to collect the result set.
  - in: query
    name: limit
    schema:
      type: integer
      minimum: 1
      maximum: 100
      default: 20
    required: false
    description: The number of items to return.
```

#### Common Mistakes

There are two common mistakes when using the `default` keyword:

- Using `default` with `required` parameters or properties, for example, with path parameters. This does not make sense – if a value is required, the client must always send it, and the default value is never used.
- Using `default` to specify a sample value. This is not intended use of `default` and can lead to unexpected behavior in some Swagger tools. Use the `example` or `examples` keyword for this purpose instead. See [Adding Examples](/specification/adding-examples/).

### Enum Parameters

You can restrict a parameter to a fixed set of values by adding the `enum` to the parameter’s `schema`. The enum values must be of the same type as the parameter data type.

```yaml
parameters:
  - in: query
    name: status
    schema:
      type: string
      enum:
        - available
        - pending
        - sold
```

More info: [Defining an Enum](/specification/enums).

### Constant Parameters

You can define a constant parameter as a required parameter with only one possible value:

```yaml
parameters:
  - in: query
    name: rel_date
    required: true
    schema:
      type: string
      enum:
        - now
```

The `enum` property specifies possible values. In this example, only one value can be used, and this will be the only value available in the Swagger UI for the user to choose from.

**Note:** A constant parameter is not the same as the [default parameter value](#default). A constant parameter is always sent by the client, whereas the default value is something that the server uses if the parameter is not sent by the client.

### Empty-Valued and Nullable Parameters

Query string parameters may only have a name and no value, like so:

```yaml
GET /foo?metadata
```

Use `allowEmptyValue` to describe such parameters:

```yaml
parameters:
  - in: query
    name: metadata
    schema:
      type: boolean
    allowEmptyValue: true # <-----
```

OpenAPI 3.0 also supports `nullable` in schemas, allowing operation parameters to have the `null` value. For example, the following schema corresponds to `int?` in C# and `java.lang.Integer` in Java:

```yaml
schema:
  type: integer
  format: int32
  nullable: true
```

**Note:** `nullable` is not the same as an optional parameter or an empty-valued parameter. `nullable` means the parameter value can be `null`. Specific implementations may choose to map an absent or empty-valued parameter to `null`, but strictly speaking these are not the same thing.

### Parameter Examples

You can specify an `example` or multiple `examples` for a parameter. The example value should match the parameter schema. Single example:

```yaml
parameters:
  - in: query
    name: limit
    schema:
      type: integer
      minimum: 1
    example: 20
```

Multiple named examples:

```yaml
parameters:
  - in: query
    name: ids
    description: One or more IDs
    required: true
    schema:
      type: array
      items:
        type: integer
    style: form
    explode: false
    examples:
      oneId:
        summary: Example of a single ID
        value: [5] # ?ids=5
      multipleIds:
        summary: Example of multiple IDs
        value: [1, 5, 7] # ?ids=1,5,7
```

For details, see [Adding Examples](/specification/adding-examples/).

### Deprecated Parameters

Use `deprecated: true` to mark a parameter as deprecated.

```yaml
- in: query
  name: format
  required: true
  schema:
    type: string
    enum: [json, xml, yaml]
  deprecated: true
  description: Deprecated, use the appropriate `Accept` header instead.
```

### Common Parameters

#### Common Parameters for All Methods of a Path

Parameters shared by all operations of a path can be defined on the path level instead of the operation level. Path-level parameters are inherited by all operations of that path. A typical use case are the GET/PUT/PATCH/DELETE operations that manipulate a resource accessed via a path parameter.

```yaml
    paths:
      /user/{id}:
        parameters:
          - in: path
            name: id
            schema:
              type: integer
            required: true
            description: The user ID
        get:
          summary: Gets a user by ID
          ...
        patch:
          summary: Updates an existing user with the specified ID
          ...
        delete:
          summary: Deletes the user with the specified ID
          ...
```

Any extra parameters defined at the operation level are used together with path-level parameters:

```yaml
paths:
  /users/{id}:
    parameters:
      - in: path
        name: id
        schema:
          type: integer
        required: true
        description: The user ID.

    # GET/users/{id}?metadata=true
    get:
      summary: Gets a user by ID
      # Note we only define the query parameter, because the {id} is defined at the path level.
      parameters:
        - in: query
          name: metadata
          schema:
            type: boolean
          required: false
          description: If true, the endpoint returns only the user metadata.
      responses:
        "200":
          description: OK
```

Specific path-level parameters can be overridden on the operation level, but cannot be removed.

```yaml
paths:
  /users/{id}:
    parameters:
      - in: path
        name: id
        schema:
          type: integer
        required: true
        description: The user ID.

    # DELETE /users/{id} - uses a single ID.
    # Reuses the {id} parameter definition from the path level.
    delete:
      summary: Deletes the user with the specified ID.
      responses:
        "204":
          description: User was deleted.

    # GET /users/id1,id2,id3 - uses one or more user IDs.
    # Overrides the path-level {id} parameter.
    get:
      summary: Gets one or more users by ID.
      parameters:
        - in: path
          name: id
          required: true
          description: A comma-separated list of user IDs.
          schema:
            type: array
            items:
              type: integer
            minItems: 1
          explode: false
          style: simple
      responses:
        "200":
          description: OK
```

#### Common Parameters for Various Paths

Different API paths may have common parameters, such as pagination parameters. You can define common parameters under parameters in the global `components` section and reference them elsewhere via `$ref`.

```yaml
components:
  parameters:
    offsetParam: # <-- Arbitrary name for the definition that will be used to refer to it.
      # Not necessarily the same as the parameter name.
      in: query
      name: offset
      required: false
      schema:
        type: integer
        minimum: 0
      description: The number of items to skip before starting to collect the result set.
    limitParam:
      in: query
      name: limit
      required: false
      schema:
        type: integer
        minimum: 1
        maximum: 50
        default: 20
      description: The numbers of items to return.

paths:
  /users:
    get:
      summary: Gets a list of users.
      parameters:
        - $ref: "#/components/parameters/offsetParam"
        - $ref: "#/components/parameters/limitParam"
      responses:
        "200":
          description: OK
  /teams:
    get:
      summary: Gets a list of teams.
      parameters:
        - $ref: "#/components/parameters/offsetParam"
        - $ref: "#/components/parameters/limitParam"
      responses:
        "200":
          description: OK
```

Note that the parameters defined in `components` are not parameters applied to all operations — they are simply global definitions that can be easily re-used.

### Parameter Dependencies

OpenAPI 3.0 does not support parameter dependencies and mutually exclusive parameters. There is an open feature request at [https://github.com/OAI/OpenAPI-Specification/issues/256](https://github.com/OAI/OpenAPI-Specification/issues/256). What you can do is document the restrictions in the parameter description and define the logic in the 400 Bad Request response. For example, consider the `/report` endpoint that accepts either a relative date range (`rdate`) or an exact range (`start_date`+`end_date`):

```yaml
GET /report?rdate=Today
GET /report?start_date=2016-11-15&end_date=2016-11-20
```

You can describe this endpoint as follows:

```yaml
paths:
  /report:
    get:
      parameters:
        - name: rdate
          in: query
          schema:
            type: string
          description: >
            A relative date range for the report, such as `Today` or `LastWeek`.
            For an exact range, use `start_date` and `end_date` instead.
        - name: start_date
          in: query
          schema:
            type: string
            format: date
          description: >
            The start date for the report. Must be used together with `end_date`.
            This parameter is incompatible with `rdate`.
        - name: end_date
          in: query
          schema:
            type: string
            format: date
          description: >
            The end date for the report. Must be used together with `start_date`.
            This parameter is incompatible with `rdate`.
      responses:
        "400":
          description: Either `rdate` or `start_date`+`end_date` are required.
```

### References

[Parameter Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#parameterObject)

_Did not find what you were looking for? [Ask the community](https://community.smartbear.com/t5/Swagger-Open-Source-Tools/bd-p/SwaggerOSTools)  
Found a mistake? [Let us know](https://github.com/swagger-api/swagger.io/issues)_
