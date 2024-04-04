---
title: Adding Examples
sidebar:
  order: 11
---

:::note
OAS **3** This guide is for OpenAPI 3.0. If you use OpenAPI 2.0, see our [OpenAPI 2.0 guide](/specification/20/adding-examples/).
:::

## Adding Examples

You can add examples to parameters, properties and objects to make OpenAPI specification of your web service clearer. Examples can be read by tools and libraries that process your API in some way. For example, an API mocking tool can use sample values to generate mock requests. You can specify examples for objects, individual properties and operation parameters. To specify an example, you use the **`example`** or **`examples`** keys. See below for details.

**Note for Swagger UI users:** Support for multiple `examples` is available since Swagger UI 3.23.0 and Swagger Editor 3.6.31.

**Note:** Do not confuse example values with default values. An example illustrates what the value is supposed to be. A default value is what the server uses if the client does not provide the value.

### Parameter Examples

Here is an example of a parameter value:

```yaml
parameters:
  - in: query
    name: status
    schema:
      type: string
      enum: [approved, pending, closed, new]
      example: approved # Example of a parameter value
```

Multiple examples for a parameter:

```yaml
parameters:
  - in: query
    name: limit
    schema:
      type: integer
      maximum: 50
    examples: # Multiple examples
      zero: # Distinct name
        value: 0 # Example value
        summary: A sample limit value # Optional description
      max: # Distinct name
        value: 50 # Example value
        summary: A sample limit value # Optional description
```

As you can see, each example has a distinct key name. Also, in the code above, we used an optional `summary` keys with description. **Note:** the sample values you specify should match the parameter data type.

### Request and Response Body Examples

Here is an example of the `example` keyword in a request body:

```yaml
paths:
  /users:
    post:
      summary: Adds a new user
      requestBody:
        content:
          application/json:
            schema: # Request body contents
              type: object
              properties:
                id:
                  type: integer
                name:
                  type: string
              example: # Sample object
                id: 10
                name: Jessica Smith
      responses:
        "200":
          description: OK
```

Note that in the code above, `example` is a child of `schema`. If `schema` refers to some object defined in the `components` section, then you should make `example` a child of the media type keyword:

```yaml
paths:
  /users:
    post:
      summary: Adds a new user
      requestBody:
        content:
          application/json: # Media type
            schema: # Request body contents
              $ref: "#/components/schemas/User" # Reference to an object
            example: # Child of media type because we use $ref above
              # Properties of a referenced object
              id: 10
              name: Jessica Smith
      responses:
        "200":
          description: OK
```

This is needed because `$ref` overwrites all the siblings alongside it. If needed, you can use multiple examples:

```yaml
paths:
  /users:
    post:
      summary: Adds a new user
      requestBody:
        content:
          application/json: # Media type
            schema: # Request body contents
              $ref: "#/components/schemas/User" # Reference to an object
            examples: # Child of media type
              Jessica: # Example 1
                value:
                  id: 10
                  name: Jessica Smith
              Ron: # Example 2
                value:
                  id: 11
                  name: Ron Stewart
      responses:
        "200":
          description: OK
```

Here is an example of the `example` in response bodies:

```yaml
responses:
  "200":
    description: A user object.
    content:
      application/json:
        schema:
          $ref: "#/components/schemas/User" # Reference to an object
        example:
          # Properties of the referenced object
          id: 10
          name: Jessica Smith
```

Multiple examples in response bodies:

```yaml
responses:
  "200":
    description: A user object.
    content:
      application/json:
        schema:
          $ref: "#/components/schemas/User" # Reference to an object
        examples:
          Jessica:
            value:
              id: 10
              name: Jessica Smith
          Ron:
            value:
              id: 20
              name: Ron Stewart
```

**Note:** The examples in response and request bodies are free-form, but are expected to be compatible with the body schema.

### Object and Property Examples

You can also specify examples for objects and individual properties in the `components` section.

- Property-level example:

```yaml
components:
  schemas:
    User: # Schema name
      type: object
      properties:
        id:
          type: integer
          format: int64
          example: 1 # Property example
        name:
          type: string
          example: New order # Property example
```

- Object-level example:

```yaml
components:
  schemas:
    User: # Schema name
      type: object
      properties:
        id:
          type: integer
        name:
          type: string
      example: # Object-level example
        id: 1
        name: Jessica Smith
```

Note that schemas and properties support single `example` but not multiple `examples`.

### Array Example

You can add an example of an individual array item:

```yaml
components:
  schemas:
    ArrayOfInt:
      type: array
      items:
        type: integer
        format: int64
        example: 1
```

or an array-level example containing multiple items:

```yaml
components:
  schemas:
    ArrayOfInt:
      type: array
      items:
        type: integer
        format: int64
      example: [1, 2, 3]
```

If the array contains objects, you can specify a multi-item example as follows:

```yaml
components:
  schemas:
    ArrayOfUsers:
      type: array
      items:
        type: object
        properties:
          id:
            type: integer
          name:
            type: string
      example:
        - id: 10
          name: Jessica Smith
        - id: 20
          name: Ron Stewart
```

Note that arrays and array items support single `example` but not multiple `examples`.

### Examples for XML and HTML Data

To describe an example value that cannot be presented in JSON or YAML format, specify it as a string:

```yaml
content:
  application/xml:
    schema:
      $ref: "#/components/schemas/xml"
    examples:
      xml:
        summary: A sample XML response
        value: "<objects><object><id>1</id><name>new</name></object><object><id>2</id></object></objects>"
  text/html:
    schema:
      type: string
    examples:
      html:
        summary: A list containing two items
        value: "<html><body><ul><li>item 1</li><li>item 2</li></ul></body></html>"
```

You can find information on writing multiline string in YAML in this Stack Overflow post: [https://stackoverflow.com/questions/3790454/in-yaml-how-do-i-break-a-string-over-multiple-lines](https://stackoverflow.com/questions/3790454/in-yaml-how-do-i-break-a-string-over-multiple-lines).

### External Examples

If a sample value cannot be inserted into your specification for some reason, for instance, it is neither YAML-, nor JSON-conformant, you can use the `externalValue` keyword to specify the URL of the example value. The URL should point to the resource that contains the literal example contents (an object, file or image, for example):

```yaml
content:
  application/json:
    schema:
      $ref: "#/components/schemas/MyObject"
    examples:
      jsonObject:
        summary: A sample object
        externalValue: "http://example.com/examples/object-example.json"
  application/pdf:
    schema:
      type: string
      format: binary
    examples:
      sampleFile:
        summary: A sample file
        externalValue: "http://example.com/examples/example.pdf"
```

### Reusing Examples

You can define common examples in the `components/examples` section of your specification and then re-use them in various parameter descriptions, request and response body descriptions, objects and properties:

```yaml
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/MyObject'
        examples:
          objectExample:
            $ref: '#/components/examples/objectExample'
    ...
    components:
      examples:
        objectExample:
          value:
            id: 1
            name: new object
          summary: A sample object
```

_Did not find what you were looking for? [Ask the community](https://community.smartbear.com/t5/Swagger-Open-Source-Tools/bd-p/SwaggerOSTools)  
Found a mistake? [Let us know](https://github.com/swagger-api/swagger.io/issues)_
