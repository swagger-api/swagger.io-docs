---
title: Data Types
sidebar:
  order: 2
---

OAS **3** This guide is for OpenAPI 3.0.

## Data Types

The data type of a schema is defined by the `type` keyword, for example, `type: string`. OpenAPI defines the following basic types:

- [`string`](#string) (this includes dates and [files](#file))
- [`number`](#numbers)
- [`integer`](#numbers)
- [`boolean`](#boolean)
- [`array`](#array)
- [`object`](#object)

These types exist in most programming languages, though they may go by different names. Using these types, you can describe any data structures.

Note that there is no `null` type; instead, the [`nullable`](#null) attribute is used as a modifier of the base type.

Additional `type`\-specific keywords can be used to refine the data type, for example, limit the string length or specify an [`enum`](/docs/specification/data-models/enums/) of possible values.

### Mixed Types

`type` takes a single value. `type` as a list is not valid in OpenAPI (even though it is valid in JSON Schema):

```yaml
# Incorrect
type:
  - string
  - integer
```

Mixed types can be described using [`oneOf`](/docs/specification/data-models/oneof-anyof-allof-not/) and [`anyOf`](/docs/specification/data-models/oneof-anyof-allof-not/), which specify a list of alternate types:

```yaml
# Correct
oneOf:
  - type: string
  - type: integer
```

See also [Any Type](#any).

### Numbers

OpenAPI has two numeric types, `number` and `integer`, where `number` includes both integer and floating-point numbers. An optional `format` keyword serves as a hint for the tools to use a specific numeric type:

`type`

`format`

Description

number

–

Any numbers.

number

float

Floating-point numbers.

number

double

Floating-point numbers with double precision.

integer

–

Integer numbers.

integer

int32

Signed 32-bit integers (commonly used integer type).

integer

int64

Signed 64-bit integers (`long` type).

Note that strings containing numbers, such as "17", are considered strings and not numbers.

#### Minimum and Maximum

Use the `minimum` and `maximum` keywords to specify the range of possible values:

```yaml
type: integer
minimum: 1
maximum: 20
```

By default, the `minimum` and `maximum` values are included in the range, that is:

```yaml
minimum ≤ value ≤ maximum
```

To exclude the boundary values, specify `exclusiveMinimum: true` and `exclusiveMaximum: true`. For example, you can define a floating-point number range as 0–50 and exclude the 0 value:

```yaml
type: number
minimum: 0
exclusiveMinimum: true
maximum: 50
```

The word “exclusive” in `exclusiveMinimum` and `exclusiveMaximum` means the corresponding boundary is _excluded_:

Keyword

Description

`exclusiveMinimum: false` or not included

value ≥ `minimum`

`exclusiveMinimum: true`

value > `minimum`

`exclusiveMaximum: false` or not included

value ≤ `maximum`

`exclusiveMaximum: true`

value < `maximum`

#### Multiples

Use the `multipleOf` keyword to specify that a number must be the multiple of another number:

```yaml
type: integer
multipleOf: 10
```

The example above matches 10, 20, 30, 0, -10, -20, and so on. `multipleOf` may be used with floating-point numbers, but in practice this can be unreliable due to the limited precision or floating point math.

    type: number
    multipleOf: 2.5

The value of `multipleOf` must be a positive number, that is, you cannot use `multipleOf: -5`.

### Strings

A string of text is defined as:

```yaml
type: string
```

String length can be restricted using `minLength` and `maxLength`:

```yaml
type: string
minLength: 3
maxLength: 20
```

Note that an empty string "" is a valid string unless `minLength` or [`pattern`](#pattern) is specified.

#### String Formats

An optional `format` modifier serves as a hint at the contents and format of the string. OpenAPI defines the following built-in string formats:

- `date` – full-date notation as defined by [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339#section-5.6), for example, _2017-07-21_
- `date-time` – the date-time notation as defined by [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339#section-5.6), for example, _2017-07-21T17:32:28Z_
- `password` – a hint to UIs to mask the input
- `byte` – base64-encoded characters, for example, _U3dhZ2dlciByb2Nrcw==_
- `binary` – binary data, used to describe files (see [Files](#file) below)

However, `format` is an open value, so you can use any formats, even not those defined by the OpenAPI Specification, such as:

- `email`
- `uuid`
- `uri`
- `hostname`
- `ipv4`
- `ipv6`
- and others

Tools can use the `format` to validate the input or to map the value to a specific type in the chosen programming language. Tools that do not support a specific format may default back to the `type` alone, as if the `format` is not specified.

#### pattern

The `pattern` keyword lets you define a regular expression template for the string value. Only the values that match this template will be accepted. The regular expression syntax used is from JavaScript (more specifically, [ECMA 262](https://www.ecma-international.org/ecma-262/5.1/#sec-15.10.1)). Regular expressions are case-sensitive, that is, \[a-z\] and \[A-Z\] are different expressions. For example, the following pattern matches a Social Security Number (SSN) in the 123-45-6789 format:

```yaml
ssn:
  type: string
  pattern: '^\d{3}-\d{2}-\d{4}$'
```

Note that the regular expression is enclosed in the `^…$` tokens, where `^` means the beginning of the string, and `$` means the end of the string. Without `^…$`, `pattern` works as a partial match, that is, matches any string that _contains_ the specified regular expression. For example, `pattern: pet` matches _pet_, _petstore_ and _carpet_. The `^…$` token forces an exact match.

### Boolean

`type: boolean` represents two values: `true` and `false`. Note that truthy and falsy values such as "true", "", 0 or `null` are not considered boolean values.

### Null

OpenAPI 3.0 does not have an explicit `null` type as in JSON Schema, but you can use `nullable: true` to specify that the value may be `null`. Note that `null` is different from an empty string "".

```yaml
    # Correct
    type: integer
    nullable: true

    # Incorrect
    type: null

    # Incorrect as well
    type:
      - integer
      - null
```

The example above may be mapped to the nullable types `int?` in C# and `java.lang.Integer` in Java. In objects, a nullable property is not the same as an optional property, but some tools may choose to map an optional property to the `null` value.

### Arrays

Arrays are defined as:

```yaml
type: array
items:
  type: string
```

Unlike JSON Schema, the `items` keyword is required in arrays. The value of `items` is a schema that describes the type and format of array items. Arrays can be nested:

```yaml
# [ [1, 2], [3, 4] ]
type: array
items:
  type: array
  items:
    type: integer
```

and contain objects:

```yaml
# [ {"id": 5}, {"id": 8} ]
type: array
items:
  type: object
  properties:
    id:
      type: integer
```

Item schema can be specified inline (as in the previous examples), or referenced via `$ref`:

```yaml
# Array of Pets
type: array
items:
  $ref: "#/components/schemas/Pet"
```

#### Mixed-Type Arrays

Mixed-type arrays can be defined using `oneOf`:

```yaml
# ["foo", 5, -2, "bar"]
type: array
items:
  oneOf:
    - type: string
    - type: integer
```

`oneOf` allows both inline subschemas (as in the example above) and references:

```yaml
# Array of Cats and Dogs
type: array
items:
  oneOf:
    - $ref: "#/components/schemas/Cat"
    - $ref: "#/components/schemas/Dog"
```

An array of arbitrary types can be defined as:

```yaml
type: array
items: {}
```

    # [ "hello", -2, true, [5.7], {"id": 5} ]

Here, `{}` is the “any-type” schema (see [below](#any)). Note that the following syntax for `items` is not valid:

```yaml
    # Incorrect
    items:
      - type: string
      - type: integer

    # Incorrect as well
    items:
      type:
        - string
        - integer
```

#### Array Length

You can define the minimum and maximum length of an array like so:

```yaml
type: array
items:
  type: integer
minItems: 1
maxItems: 10
```

Without `minItems`, an empty array is considered valid.

#### uniqueItems

You can use `uniqueItems: true` to specify that all items in the array must be unique:

```yaml
type: array
items:
  type: integer
uniqueItems: true
# [1, 2, 3] – valid
# [1, 1, 3] – not valid
# [ ] – valid
```

### Objects

An object is a collection of property/value pairs. The `properties` keyword is used to define the object properties – you need to list the property names and specify a schema for each property.

```yaml
type: object
properties:
  id:
    type: integer
  name:
    type: string
```

**Tip:** In OpenAPI, objects are usually defined in the global `components/schemas` section rather than inline in the request and response definitions.

#### Required Properties

By default, all object properties are optional. You can specify the required properties in the `required` list:

```yaml
type: object
properties:
  id:
    type: integer
  username:
    type: string
  name:
    type: string
required:
  - id
  - username
```

Note that `required` is an object-level attribute, not a property attribute:

```yaml
type: object
properties:
  id:
    type: integer
    required: true # Wrong!

required: # Correct
  - id
```

An empty list `required: []` is not valid. If all properties are optional, do not specify the `required` keyword.

#### Read-Only and Write-Only Properties

You can use the `readOnly` and `writeOnly` keywords to mark specific properties as read-only or write-only. This is useful, for example, when GET returns more properties than used in POST – you can use the same schema in both GET and POST and mark the extra properties as `readOnly`. `readOnly` properties are included in responses but not in requests, and `writeOnly` properties may be sent in requests but not in responses.

```yaml
type: object
properties:
  id:
    # Returned by GET, not used in POST/PUT/PATCH
    type: integer
    readOnly: true
  username:
    type: string
  password:
    # Used in POST/PUT/PATCH, not returned by GET
    type: string
    writeOnly: true
```

If a `readOnly` or `writeOnly` property is included in the `required` list, `required` affects just the relevant scope – responses only or requests only. That is, read-only required properties apply to responses only, and write-only required properties – to requests only.

#### Nested Objects

An object can include nested objects:

```yaml
components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: integer
        name:
          type: string
        contact_info:
          # The value of this property is an object
          type: object
          properties:
            email:
              type: string
              format: email
            phone:
              type: string
```

You may want to split nested objects into multiple schemas and use [`$ref`](/docs/specification/using-ref/) to reference the nested schemas:

```yaml
components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: integer
        name:
          type: string
        contact_info:
          $ref: "#/components/schemas/ContactInfo"

    ContactInfo:
      type: object
      properties:
        email:
          type: string
          format: email
        phone:
          type: string
```

#### Free-Form Object

A free-form object (arbitrary property/value pairs) is defined as:

```yaml
type: object
```

This is equivalent to

```yaml
type: object
additionalProperties: true
```

and

```yaml
type: object
additionalProperties: {}
```

#### Number of Properties

The `minProperties` and `maxProperties` keywords let you restrict the number of properties allowed in an object. This can be useful when using `additionalProperties` or free-form objects.

```yaml
type: object
minProperties: 2
maxProperties: 10
```

In this example, `{"id": 5, "username": "trillian"}` matches the schema, but `{"id": 5}` does not.

### Files

Unlike OpenAPI 2.0, Open API 3.0 does not have the `file` type. Files are defined as strings:

```yaml
type: string
format: binary # binary file contents
```

or

```yaml
type: string
format: byte # base64-encoded file contents
```

depending on the desired file transfer method. For more information, see [File Upload](/docs/specification/describing-request-body/file-upload/), [Multipart Requests](/docs/specification/describing-request-body/multipart-requests/) and [Response That Returns a File](/docs/specification/describing-responses/#response-that-returns-a-file).

### Any Type

A schema without a type matches any data type – numbers, strings, objects, and so on. `{}` is shorthand syntax for an arbitrary-type schema:

```yaml
components:
  schemas:
    AnyValue: {}
```

If you want to provide a description:

```yaml
components:
  schemas:
    AnyValue:
      description: Can be any value - string, number, boolean, array or object.
```

The above is equivalent to:

```yaml
components:
  schemas:
    AnyValue:
      anyOf:
        - type: string
        - type: number
        - type: integer
        - type: boolean
        - type: array
          items: {}
        - type: object
```

If the `null` value needs to be allowed, add `nullable: true`:

```yaml
components:
  schemas:
    AnyValue:
      nullable: true
      description: Can be any value, including `null`.
```

_Did not find what you were looking for? [Ask the community](https://community.smartbear.com/t5/Swagger-Open-Source-Tools/bd-p/SwaggerOSTools)  
Found a mistake? [Let us know](https://github.com/swagger-api/swagger.io/issues)_
