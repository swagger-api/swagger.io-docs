---
title: Dictionaries, HashMaps and Associative Arrays
sidebar:
  order: 4
---

OAS **3** This guide is for OpenAPI 3.0.

### Dictionaries, HashMaps and Associative Arrays

A dictionary (also known as a map, hashmap or associative array) is a set of key/value pairs. OpenAPI lets you define dictionaries where the **keys are strings**. To define a dictionary, use `type: object` and use the `additionalProperties` keyword to specify the type of values in key/value pairs. For example, a string-to-string dictionary like this:

```yaml
{ "en": "English", "fr": "French" }
```

is defined using the following schema:

```yaml
type: object
additionalProperties:
  type: string
```

### Value Type

The `additionalProperties` keyword specifies the type of values in the dictionary. Values can be primitives (strings, numbers or boolean values), arrays or objects. For example, a string-to-object dictionary can be defined as follows:

```yaml
type: object
additionalProperties:
  type: object
  properties:
    code:
      type: integer
    text:
      type: string
```

Instead of using an inline schema, `additionalProperties` can `$ref` another schema:

```yaml
components:
  schemas:
    Messages: # <---- dictionary
      type: object
      additionalProperties:
        $ref: "#/components/schemas/Message"

    Message:
      type: object
      properties:
        code:
          type: integer
        text:
          type: string
```

### Free-Form Objects

If the dictionary values can be of any type (aka free-form object), use `additionalProperties: true`:

```yaml
type: object
additionalProperties: true
```

This is equivalent to:

```yaml
type: object
additionalProperties: {}
```

### Fixed Keys

If a dictionary has some fixed keys, you can define them explicitly as object properties and mark them as required:

```yaml
type: object
properties:
  default:
    type: string
required:
  - default
additionalProperties:
  type: string
```

### Examples of Dictionary Contents

You can use the `example` keyword to specify sample dictionary contents:

```yaml
type: object
additionalProperties:
  type: string
example:
  en: Hello!
  fr: Bonjour!
```

_Did not find what you were looking for? [Ask the community](https://community.smartbear.com/t5/Swagger-Open-Source-Tools/bd-p/SwaggerOSTools)  
Found a mistake? [Let us know](https://github.com/swagger-api/swagger.io/issues)_
