---
title: Links
sidebar:
  order: 13
---

:::note
OAS **3** This guide is for OpenAPI 3.0.
:::

Links are one of the new features of OpenAPI 3.0. Using links, you can describe how various values returned by one operation can be used as input for other operations. This way, links provide a known relationship and traversal mechanism between the operations. The concept of links is somewhat similar to [hypermedia](https://smartbear.com/learn/api-design/what-is-hypermedia/), but OpenAPI links do not require the link information present in the actual responses.

### When to Use Links?

Consider the “create user” operation:

```yaml
POST /users HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "name": "Alex",
  "age": 27
}

which returns the ID of the created user:

HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": 305
}
```

This user ID can then be used to read, update or delete the user: `GET /users/305`, `PATCH /users/305` and `DELETE /users/305`. Using links, you can specify that the `id` value returned by “create user” can be used as a parameter to “get user”, “update user” and “delete user”. Another example is pagination via cursors, where the response includes a cursor to retrieve the next data set:

```yaml
GET /items?limit=100

  ⇩

{
  "metadata": {
    "previous": null,
    "next": "Q1MjAwNz",
    "count": 10
  },
  ...
}

  ⇩

GET /items?cursor=Q1MjAwNz&limit=100
```

However, linking relationships are not necessarily within the same resource, or even the same API specification.

### Defining Links

Links are defined in the `links` section of each response:

```yaml
responses:
  "200":
    description: Created
    content: ...
    links: # <----
      ...
  "400":
    description: Bad request
    content: ...
    links: # <----
      ...
```

To better understand this, let’s look at a complete example. This API defines the “create user” and “get user” operations, and the result of “create user” is used as an input to “get user”.

```yaml
openapi: 3.0.0
info:
  version: 0.0.0
  title: Links example

paths:
  /users:
    post:
      summary: Creates a user and returns the user ID
      operationId: createUser
      requestBody:
        required: true
        description: A JSON object that contains the user name and age.
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/User"
      responses:
        "201":
          description: Created
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: integer
                    format: int64
                    description: ID of the created user.
          # -----------------------------------------------------
          # Links
          # -----------------------------------------------------
          links:
            GetUserByUserId: # <---- arbitrary name for the link
              operationId: getUser
              # or
              # operationRef: '#/paths/~1users~1{userId}/get'
              parameters:
                userId: "$response.body#/id"

              description: >
                The `id` value returned in the response can be used as
                the `userId` parameter in `GET /users/{userId}`.
          # -----------------------------------------------------

  /users/{userId}:
    get:
      summary: Gets a user by ID
      operationId: getUser
      parameters:
        - in: path
          name: userId
          required: true
          schema:
            type: integer
            format: int64
      responses:
        "200":
          description: A User object
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/User"

components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: integer
          format: int64
          readOnly: true
        name:
          type: string
```

The `links` section contains named link definitions, in this example – just one link named _GetUserByUserId_. The link names can only contain the following characters:

```yaml
A..Z a..z 0..9 . _ -
```

Each link contains the following information:

- [`operationId`](#operationId) or [`operationRef`](#operationRef) that specifies the target operation. It can be the same operation or a different operation in the current or external API specification. `operationId` is used for local links only, and `operationRef` can link to both local and external operations.
- [`parameters`](#parameters) and/or [`requestBody`](#requestBody) sections that specify the values to pass to the target operation. [Runtime expression](#runtime-expressions) syntax is used to extract these values from the parent operation.
- (Optional) The [`server`](#server) that the target operation should use, if it is different from the default servers.
- (Optional) A `description` of this link. [CommonMark](http://commonmark.org/help/) syntax can be used for rich text representation.

The rest of this page goes into more detail about these keywords.

![OpenAPI 3.0 links](https://static1.smartbear.co/swagger/media/images/links.png "OpenAPI 3.0 links")

### operationId

If the target operation has [`operationId`](/specification/paths-and-operations/#operationid) specified, the link can point to this ID – as in the image above. This approach can be used for local links only, because the `operationId` values are resolved in the scope of the current API specification.

### operationRef

`operationRef` can be used when `operationId` is not available. `operationRef` is a reference to the target operation using the JSON Reference syntax – same as used by the [`$ref`](/specification/using-ref/) keyword. References can be local (within the current API specification):

```yaml
operationRef: "#/paths/~1users~1{userId}/get"
```

or external:

```yaml
operationRef: 'https://anotherapi.com/openapi.yaml#/paths/~1users~1{userId}/get'
operationRef: './operations/getUser.yaml'
```

Here, the string `#/paths/~1users~1{userId}/get` actually means `#/paths//users/{userId}/get`, but the inner slashes / in the path name need to be escaped as `~1` because they are special characters.

```yaml
#/paths/~1users~1{userId}/get
    │       │               │
    │       │               │
paths:     │               │
  /users/{userId}:         │
    get:  ─────────────────┘
      ...
```

This syntax can be difficult to read, so we recommend using it for external links only. In case of local links, it is easier to assign `operationId` to all operations and link to these IDs instead.

### parameters and requestBody

The most important part of a link is computing the input for the target operation based on the values from the original operation. This is what the `parameters` and `requestBody` keywords are for.

```yaml
links:
  # GET /users/{userId}
  GetUserByUserId:
    operationId: getUser
    parameters:
      userId: "$response.body#/id"

  # POST /users/{userId}/manager with the manager ID in the request body
  SetManagerId:
    operationId: setUserManager
    requestBody: "$response.body#/id"
```

The syntax is `_parameter_name: value_` or _`requestBody: value`_. The parameter names and request body are those of the target operation. There is no need to list all the parameters, just those required to follow the link. Similarly, `requestBody` is only used if the target operation has a [body](/specification/describing-request-body/describing-request-body/) and the link purpose is to define the body contents. If two or more parameters have the same name, prefix the names with the parameter location – _path_, _query_, *header* or _cookie_, like so:

```yaml
parameters:
  path.id: ...
  query.id: ...
```

The values for parameters and `requestBody` can be defined in the following ways:

- [runtime expressions](#runtime-expressions), such as `$response.body#/id`, that refer to the values in the request or response of the original operation,
- strings containing embedded runtime expressions, such as `ID_{$response.body#/id}`,
- hard-coded values – strings, numbers, arrays, and so on, such as `mystring` or `true`.

You would typically use constant values if you need to pass a specific combination of evaluated and hard-coded parameters for the target operation.

```yaml
paths:
  /date_ranges:
    get:
      summary: Get relative date ranges for the report.
      responses:
        '200':
          description: OK
          content:
            application/json:
              example: [Today, Yesterday, LastWeek, ThisMonth]
          links:
            ReportRelDate:
              operationId: getReport
              # Call "getReport" with the `rdate` parameter and with empty `start_date` and `end_date`
              parameters:
                rdate: '$response.body#/1'
                start_date: ''
                end_date: ''

  # GET /report?rdate=...
  # GET /report?start_date=...&end_date=...
  /report:
    get:
      operationId: getReport
      ...
```

### Runtime Expression Syntax

OpenAPI runtime expressions are syntax for extracting various values from an operation’s request and response. Links use runtime expressions to specify the parameter values to be passed to the linked operation. The expressions are called “runtime” because the values are extracted from the actual request and response of the API call and not, say, the [example values](/specification/adding-examples/) provided in the API specification. The following table describes the runtime expression syntax. All expressions refer to the _current operation_ where the `links` are defined.

Expression

Description

`$url`

The full request URL, including the query string.

`$method`

Request HTTP method, such as GET or POST.

`$request.query._param_name_`

The value of the specified query parameter. The parameter must be defined in the operation’s `parameters` section, otherwise, it cannot be evaluated. Parameter names are case-sensitive.

`$request.path._param_name_`

The value of the specified path parameter. The parameter must be defined in the operation’s `parameters` section, otherwise, it cannot be evaluated. Parameter names are case-sensitive.

`$request.header._header_name_`

The value of the specified request header. This header must be defined in the operation’s `parameters` section, otherwise, it cannot be evaluated. Header names are case-insensitive.

`$request.body`

The entire request body.

`$request.body_#/foo/bar_`

A portion of the request body specified by a JSON Pointer.

`$statusCode`

HTTP status code of the response. For example, 200 or 404.

`$response.header._header_name_`

The complete value of the specified response header, as a string. Header names are case-insensitive. The header does not need to be defined in the response’s `headers` section.

`$response.body`

The entire response body.

`$response.body_#/foo/bar_`

A portion of the request body specified by a JSON Pointer.

`foo{$request.path.id}bar`

Enclose an expression into `{}` curly braces to embed it into a string.

Notes:

- The evaluated expression has the same type as the referenced value, unless noted otherwise.
- If a runtime expression cannot be evaluated, no parameter value is passed to the target operation.

#### Examples

Consider the following request and response:

```yaml
GET /users?limit=2&total=true
Host: api.example.com
Accept: application/json
```

```yaml
HTTP/1.1 200 OK
Content-Type: application/json
X-Total-Count: 37

{
  "prev_offset": 0,
  "next_offset": 2,
  "users": [
    {"id": 1, "name": "Alice"},
    {"id": 2, "name": "Bob"}
  ]
}
```

Below are some examples of runtime expressions and the values they evaluate to:

| Expression                        | Result                                          | Comments                                                                                                                                                         |
| --------------------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `$url`                            | http://api.example.com/users?limit=2&total=true |                                                                                                                                                                  |
| `$method`                         | GET                                             |                                                                                                                                                                  |
| `$request.query.total`            | true                                            | `total` must be defined as a query parameter.                                                                                                                    |
| `$statusCode`                     | 200                                             |                                                                                                                                                                  |
| `$response.header.x-total-count`  | 37                                              | Assuming `X-Total-Count` is defined as a response header. Header names are case-insensitive.                                                                     |
| `$response.body#/next_offset`     | 2                                               |                                                                                                                                                                  |
| `$response.body#/users/0`         | `{"id": 1, "name": "Alice"}`                    | JSON Pointer (the `#/...` part) uses 0-based indexes to access array elements. There is no wildcard syntax though, so `$response.body#/users/*/id` is not valid. |
| `$response.body#/users/1`         | `{"id": 2, "name": "Bob"}`                      |                                                                                                                                                                  |
| `$response.body#/users/1/name`    | Bob                                             |                                                                                                                                                                  |
| `ID_{$response.body#/users/1/id}` | ID_2                                            |                                                                                                                                                                  |

### server

By default, the target operation is called against its default [servers](/specification/api-host-and-base-path/) – either global `servers`, or operation-specific `servers`. However, the server can be overridden by the link using the `server` keyword. `server` has the same fields as global servers, but it is a single server and not an array.

```yaml
servers:
  - url: https://api.example.com
---
links:
  GetUserByUserId:
    operationId: getUser
    parameters:
      userId: "$response.body#/id"
    server:
      url: https://new-api.example.com/v2
```

### Reusing Links

Links can be defined inline (as in the previous examples), or placed in the global `components/links` section and referenced from an operation’s `links` section via [`$ref`](/specification/using-ref/). This can be useful if multiple operations link to another operation in the same way – referencing helps reduce code duplication. In the following example, both the “create user” and “update user” operations return the user ID in the response body, and this ID is used in the “get user” operation. The source operations reuse the same link definition from `components/links`.

```yaml
paths:
  /users:
    post:
      summary: Create a user
      operationId: createUser
      ...
      responses:
        '201':
          description: Created
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: integer
                    format: int64
                    description: ID of the created user.
          links:
            GetUserByUserId:
              $ref: '#/components/links/GetUserByUserId'    # <-------

  /user/{userId}:
    patch:
      summary: Update user
      operationId: updateUser
      ...
      responses:
        '200':
          description: The updated user object
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
          links:
            GetUserByUserId:
              $ref: '#/components/links/GetUserByUserId'    # <-------

    get:
      summary: Get a user by ID
      operationId: getUser
      ...

components:
  links:
    GetUserByUserId:   # <----- The $ref's above point here
      description: >
        The `id` value returned in the response can be used as
        the `userId` parameter in `GET /users/{userId}`.
      operationId: getUser
      parameters:
        userId: '$response.body#/id'
```

### References

[Link Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#linkObject)

_Did not find what you were looking for? [Ask the community](https://community.smartbear.com/t5/Swagger-Open-Source-Tools/bd-p/SwaggerOSTools)  
Found a mistake? [Let us know](https://github.com/swagger-api/swagger.io/issues)_
