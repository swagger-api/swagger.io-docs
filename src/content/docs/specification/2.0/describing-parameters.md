---
title: Describing Parameters
sidebar:
  order: 6
---

OAS **2** This page applies to OpenAPI Specification ver. 2 (fka Swagger). To learn about the latest version, visit [OpenAPI 3 pages](/specification/describing-parameters).

## Describing Parameters

In Swagger, API operation parameters are defined under the `parameters` section in the operation definition. Each parameter has `name`, value `type` (for primitive value parameters) or `schema` (for request body), and optional `description`. Here is an example:

    paths:
      /users/{userId}:
        get:
          summary: Gets a user by ID.
          parameters:
            - in: path
              name: userId
              type: integer
              required: true
              description: Numeric ID of the user to get.

Note that `parameters` is an array, so, in YAML, each parameter definition must be listed with a dash (`-`) in front of it.

### Parameter Types

Swagger distinguishes between the following parameter types based on the parameter location. The location is determined by the parameter’s `in` key, for example, `in: query` or `in: path`.

- [query parameters](#query-parameters), such as `/users?role=admin`
- [path parameters](#path-parameters), such as `/users/{id}`
- [header parameters](#header-parameters), such as `X-MyHeader: Value`
- body parameters that describe the body of POST, PUT and PATCH requests (see [Describing Request Body](/specification/20/describing-request-body/))
- [form parameters](#form-parameters) – a variety of body parameters used to describe the payload of requests with `Content-Type` of `application/x-www-form-urlencoded` and `multipart/form-data` (the latter is typically used for [file uploads](/specification/20/file-upload/))

### Query Parameters

Query parameters are the most common type of parameters. They appear at the end of the request URL after a question mark (`?`), with different `name=value` pairs separated by ampersands (`&`). Query parameters can be required and optional.

    GET /pets/findByStatus?status=available
    GET /notes?offset=100&limit=50

Use `in: query` to denote query parameters:

         parameters:
            - in: query
              name: offset
              type: integer
              description: The number of items to skip before starting to collect the result set.
            - in: query
              name: limit
              type: integer
              description: The numbers of items to return.

Query parameters only support primitive types. You can have an `array`, but the `items` must be a primitive value type. Objects are not supported.

**Note:** To describe API keys passed as query parameters, use a security definition instead. See [API Keys](/specification/20/authentication/api-keys/).

### Path Parameters

Path parameters are components of a URL path that can vary. They are typically used to point to a specific resource within a collection, such as a user identified by ID. A URL can have several path parameters, each denoted with curly braces `{ }`.

    GET /users/{id}
    GET /cars/{carId}/drivers/{driverId}

Each path parameter must be substituted with an actual value when the client makes an API call. In Swagger, a path parameter is defined using `in: path` and other attributes as necessary. The parameter name must be the same as specified in the path. Also, remember to add `required: true`, because path parameters are always required. Here is an example for `GET /users/{id}`:

    paths:
      /users/{id}:
        get:
          parameters:
            - in: path
              name: id   # Note the name is the same as in the path
              required: true
              type: integer
              minimum: 1
              description: The user ID.
           responses:
             200:
               description: OK

Path parameters can be multi-valued, such as `GET /users/12,34,56`. This is achieved by specifying the parameter type as `array`. See [Array and Multi-Value Parameters](#array-and-multi-value-parameters) below.

### Header Parameters

An API call may require that custom headers be sent with an HTTP request. Swagger lets you define custom request headers as `in: header` parameters. For example, suppose, a call to `GET /ping` requires the `X-Request-ID` header:

    GET /ping HTTP/1.1
    Host: example.com
    X-Request-ID: 77e1c83b-7bb0-437b-bc50-a7a58e5660ac

In Swagger, you would define this operation as follows:

    paths:
      /ping:
        get:
          summary: Checks if the server is alive.
          parameters:
            - in: header
              name: X-Request-ID
              type: string
              required: true

In a similar way, you can define [custom response headers](/specification/20/describing-responses/#headers).

**Note:** Swagger specification has special keywords for some headers:

Header

Swagger Keywords

For more information, see...

`Content-Type`

`consumes` (request content type)  
`produces` (response content type)

[MIME Types](/specification/20/mime-types/)

`Accept`

`produces`

[MIME Types](/specification/20/mime-types/)

`Authorization`

`securityDefinitions`, `security`

[Authentication](/specification/20/authentication/)

### Form Parameters

Form parameters are used to describe the payload of requests with `Content-Type` of:

- `application/x-www-form-urlencoded` (used to POST primitive values and arrays of primitive values).
- `multipart/form-data` (used to upload files or a combination of files and primitive data).

That is, the operation’s `consumes` property must specify one of these content types. Form parameters are defined as `in: formData`. They can only be primitives (strings, numbers, booleans) or arrays of primitives (meaning you cannot use a `$ref` as the `items` value). Also, form parameters cannot coexist with the `in: body`parameter, because `formData` is a specific way of describing the body. To illustrate form parameters, consider an HTML POST form:

    <form action="http://example.com/survey" method="post">
      <input type="text"   name="name" />
      <input type="number" name="fav_number" />
      <input type="submit"/>
     </form>

This form POSTs data to the form’s endpoint:

    POST /survey HTTP/1.1
    Host: example.com
    Content-Type: application/x-www-form-urlencoded
    Content-Length: 29

    name=Amy+Smith&fav_number=321

In Swagger, you can describe the endpoint as follows:

    paths:
      /survey:
        post:
          summary: A sample survey.
          consumes:
            - application/x-www-form-urlencoded
          parameters:
            - in: formData
              name: name
              type: string
              description: A person's name.
            - in: formData
              name: fav_number
              type: number
              description: A person's favorite number.
          responses:
            200:
              description: OK

To learn how to define form parameters for file uploads, see [File Upload](/specification/20/file-upload/).

### Required and Optional Parameters

By default, Swagger treats all request parameters as optional. You can add `required: true` to mark a parameter as required. Note that path parameters must have `required: true`, because they are always required.

          parameters:
            - in: path
              name: userId
              type: integer
              required: true    # <----------
              description: Numeric ID of the user to get.

### Default Parameter Values

You can use the `default` key to specify the default value for an optional parameter. The default value is the one that the server uses if the client does not supply the parameter value in the request. The value type must be the same as the parameter’s data type. A typical example is paging parameters such as offset and limit:

    GET /users
    GET /users?offset=30&limit=10

Assuming offset defaults to 0 and limit defaults to 20 and ranges from 0 to 100, you would define these parameters as:

          parameters:
            - in: query
              name: offset
              type: integer
              required: false
              default: 0
              minimum: 0
              description: The number of items to skip before starting to collect the result set.
            - in: query
              name: limit
              type: integer
              required: false
              default: 20
              minimum: 1
              maximum: 100
              description: The numbers of items to return.

#### Common Mistakes

There are two common mistakes when using the `default` keyword:

- Using `default` with `required` parameters or properties, for example, with path parameters. This does not make sense – if a value is required, the client must always send it, and the default value is never used.
- Using `default` to specify a sample value. This is not intended use of default and can lead to unexpected behavior in some Swagger tools. Some elements of the specification support the `example` or `examples` keyword for this purpose.

### Enum Parameters

The `enum` keyword allows you to restrict a parameter value to a fixed set of values. The enum values must be of the same type as the parameter `type`.

            - in: query
              name: status
              type: string
              enum: [available, pending, sold]

More info: [Defining an Enum](/specification/20/enums/).

### Array and Multi-Value Parameters

Path, query, header and form parameters can accept a list of values, for example:

    GET /users/12,34,56,78
    GET /resource?param=value1,value2,value3
    GET /resource?param=value1&param=value2&param=value3

    POST /resource
    param=value1&param=value2

A multi-value parameter must be defined with `type: array` and the appropriate `collectionFormat`.

          # color=red,black,white
          parameters:
            - in: query
              name: color
              type: array
              collectionFormat: csv
              items:
                type: string

`collectionFormat` specifies the array format (a single parameter with multiple parameter or multiple parameters with the same name) and the separator for array items.

collectionFormat

Description

Example

`csv` (default)

Comma-separated values.

`foo,bar,baz`

`ssv`

Space-separated values.

`foo bar baz`

`tsv`

Tab-separated values.

`"foo\tbar\tbaz"`

`pipes`

Pipe-separated values.

`foo|bar|baz`

`multi`

Multiple parameter instances rather than multiple values. This is only supported for the `in: query` and `in: formData` parameters.

`foo=value&foo=another_value`

Additionally, you can:

- use `minItems` and `maxItems` to control the size of the array,
- enforce `uniqueItems`,
- restrict the array items to a fixed set of `enum` values.

For example:

            - in: query
              name: color
              required: false
              type: array
              minItems: 1
              maxItems: 5
              uniqueItems: true
              items:
                type: string
                enum: [black, white, gray, red, pink, orange, yellow, green, blue, purple, brown]

You can also specify the default array that the server will use if this parameter is omitted:

            - in: query
              name: sort
              required: false
              type: array
              items:
                type: string
              default: ["-modified", "+id"]

### Constant Parameters

You can define a constant parameter as a required parameter with only one possible value:

    - required: true
      enum: [value]

The `enum` property specifies possible values. In this example, only one value can be used, and this will be the only value available in the Swagger UI for the user to choose from.

**Note:** A constant parameter is not the same as the [default parameter value](#default-parameter-values). A constant parameter is always sent by the client, whereas the default value is something that the server uses if the parameter is not sent by the client.

### Parameters Without a Value

Query string and form data parameters may only have a name and no value:

    GET /foo?metadata

    POST /something
    foo&bar&baz

Use `allowEmptyValue` to describe such parameters:

            - in: query
              name: metadata
              required: true
              type: boolean
              allowEmptyValue: true  # <-----

### Common Parameters

#### Common Parameters for All Methods of a Path

Parameters can be defined under a path itself, in this case, the parameters exist in all operations described under this path. A typical example is the GET/PUT/PATCH/DELETE operations that manipulate the same resource accessed via a path parameter.

    paths:
      /user/{id}:
        parameters:
          - in: path
            name: id
            type: integer
            required: true
            description: The user ID.

        get:
          summary: Gets a user by ID.
          ...
        patch:
          summary: Updates an existing user with the specified ID.
          ...
        delete:
          summary: Deletes the user with the specified ID.
          ...

Any extra parameters defined at the operation level are used together with path-level parameters:

    paths:
      /users/{id}:
        parameters:
          - in: path
            name: id
            type: integer
            required: true
            description: The user ID.

        # GET/users/{id}?metadata=true
        get:
          summary: Gets a user by ID.
          # Note we only define the query parameter, because the {id} is defined at the path level.
          parameters:
            - in: query
              name: metadata
              type: boolean
              required: false
              description: If true, the endpoint returns only the user metadata.
          responses:
            200:
              description: OK

Specific path-level parameters can be overridden on the operation level, but cannot be removed.

    paths:
      /users/{id}:
        parameters:
          - in: path
            name: id
            type: integer
            required: true
            description: The user ID.

        # DELETE /users/{id} - uses a single ID.
        # Reuses the {id} parameter definition from the path level.
        delete:
          summary: Deletes the user with the specified ID.
          responses:
            204:
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
              type: array
              items:
                type: integer
              collectionFormat: csv
              minItems: 1
          responses:
            200:
              description: OK

#### Common Parameters in Different Paths

Different API paths may have some common parameters, such as pagination parameters. You can define common parameters in the global `parameters` section and reference them in individual operations via `$ref`.

    parameters:
      offsetParam:  # <-- Arbitrary name for the definition that will be used to refer to it.
                    # Not necessarily the same as the parameter name.
        in: query
        name: offset
        required: false
        type: integer
        minimum: 0
        description: The number of items to skip before starting to collect the result set.
      limitParam:
        in: query
        name: limit
        required: false
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
            - $ref: '#/parameters/offsetParam'
            - $ref: '#/parameters/limitParam'
          responses:
            200:
              description: OK
      /teams:
        get:
          summary: Gets a list of teams.
          parameters:
            - $ref: '#/parameters/offsetParam'
            - $ref: '#/parameters/limitParam'
          responses:
            200:
              description: OK

Note that the global `parameters` are not parameters applied to all operations -- they are simply global definitions that can be easily re-used.

### Parameter Dependencies

Swagger does not support parameter dependencies and mutually exclusive parameters. There is an open feature request at [https://github.com/OAI/OpenAPI-Specification/issues/256](https://github.com/OAI/OpenAPI-Specification/issues/256). What you can do is document the restrictions in the parameter description and define the logic in the 400 Bad Request response. For example, consider the `/report` endpoint that accepts either a relative date range (`rdate`) or an exact range (`start_date`\+ `end_date`):

    GET /report?rdate=Today
    GET /report?start_date=2016-11-15&end_date=2016-11-20

You can describe this endpoint as follows:

    paths:
      /report:
        get:
          parameters:
            - name: rdate
              in: query
              type: string
              description: >
                 A relative date range for the report, such as `Today` or `LastWeek`.
                 For an exact range, use `start_date` and `end_date` instead.
            - name: start_date
              in: query
              type: string
              format: date
              description: >
                The start date for the report. Must be used together with `end_date`.
                This parameter is incompatible with `rdate`.
            - name: end_date
              in: query
              type: string
              format: date
              description: >
                The end date for the report. Must be used together with `start_date`.
                This parameter is incompatible with `rdate`.
          responses:
            400:
              description: Either `rdate` or `start_date`+`end_date` are required.

### FAQ

**When should I use "type" vs "schema"?**

schema is only used with `in: body` parameters. Any other parameters expect a primitive type, such as `type: string`, or an `array` of primitives.

**Can I have an object as a query parameter?**

This is possible in [OpenAPI 3.0](/specification/describing-parameters/#query-parameters), but not in 2.0.

_Did not find what you were looking for? [Ask the community](https://community.smartbear.com/t5/Swagger-Open-Source-Tools/bd-p/SwaggerOSTools)  
Found a mistake? [Let us know](https://github.com/swagger-api/swagger.io/issues)_
