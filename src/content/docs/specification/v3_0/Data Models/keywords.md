---
title: Supported JSON Schema Keywords
sidebar:
  order: 8
---

:::note
OAS **3** This guide is for OpenAPI 3.0.
:::

OpenAPI 3.0 uses an extended subset of [JSON Schema Specification](http://json-schema.org) Wright Draft 00 (aka Draft 5) to describe the data formats. “Extended subset” means that some keywords are supported and some are not, some keywords have slightly different usage than in JSON Schema, and additional keywords are introduced.

### Supported Keywords

These keywords have the **same meaning** as in JSON Schema:

- `title`
- [`pattern`](/docs/specification/data-models/data-types/#pattern)
- [`required`](/docs/specification/data-models/data-types/#required)
- [`enum`](/docs/specification/data-models/enums/)
- [`minimum`](/docs/specification/data-models/data-types/#range)
- [`maximum`](/docs/specification/data-models/data-types/#range)
- [`exclusiveMinimum`](/docs/specification/data-models/data-types/#range)
- [`exclusiveMaximum`](/docs/specification/data-models/data-types/#range)
- [`multipleOf`](/docs/specification/data-models/data-types/#multipleOf)
- [`minLength`](/docs/specification/data-models/data-types/#string)
- [`maxLength`](/docs/specification/data-models/data-types/#string)
- [`minItems`](/docs/specification/data-models/data-types/#array-length)
- [`maxItems`](/docs/specification/data-models/data-types/#array-length)
- [`uniqueItems`](/docs/specification/data-models/data-types/#uniqueItems)
- [`minProperties`](/docs/specification/data-models/data-types/#property-count)
- [`maxProperties`](/docs/specification/data-models/data-types/#property-count)

These keywords are **supported with minor differences**:

- [`type`](/docs/specification/data-models/data-types/#type) – the value must be a single type and not an array of types. `null` is not supported as a type, use the [`nullable: true`](/docs/specification/data-models/data-types/#null) keyword instead.
- `format` – OpenAPI has its own predefined formats and also allows custom formats.
- `description` – supports [CommonMark](http://commonmark.org/help/) syntax for rich text representation.
- [`items`](/docs/specification/data-models/data-types/#array) – must be present if `type` is `array`. The item schema must be an OpenAPI schema and not a standard JSON Schema.
- [`properties`](/docs/specification/data-models/data-types/#object) – individual property definitions must follow OpenAPI schema rules and not standard JSON Schema.
- [`additionalProperties`](/docs/specification/data-models/data-types/#additionalProperties) – the value can be a boolean (`true` or `false`) or an OpenAPI schema.
- [`default`](/docs/specification/data-models/data-types/#default) – the default value must conform to the specified schema.
- [`allOf`](/docs/specification/data-models/oneof-anyof-allof-not/) – the subschemas must be OpenAPI schemas and not standard JSON Schemas.
- [`oneOf`](/docs/specification/data-models/oneof-anyof-allof-not/) – the subschemas must be OpenAPI schemas and not standard JSON Schemas.
- [`anyOf`](/docs/specification/data-models/oneof-anyof-allof-not/) – the subschemas must be OpenAPI schemas and not standard JSON Schemas.
- [`not`](/docs/specification/data-models/oneof-anyof-allof-not/) – the subschema must be an OpenAPI schema and not a standard JSON Schema.

### Unsupported Keywords

- `$schema`
- `additionalItems`
- `const`
- `contains`
- `dependencies`
- `id`,
- `$id`
- `patternProperties`
- `propertyNames`

### Additional Keywords

OpenAPI schemas can also use the following keywords that are not part of JSON Schema:

- `deprecated`
- [`discriminator`](/docs/specification/data-models/inheritance-and-polymorphism/)
- [`example`](/docs/specification/adding-examples/)
- `externalDocs`
- [`nullable`](/docs/specification/data-models/data-types/#null)
- [`readOnly`](/docs/specification/data-models/data-types/#read-only-and-write-only-properties)
- [`writeOnly`](/docs/specification/data-models/data-types/#read-only-and-write-only-properties)
- [`xml`](/docs/specification/data-models/representing-xml/)

### References

[OpenAPI 3.0 – Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.4.md#schema-object)

[JSON Schema Validation](https://tools.ietf.org/html/draft-wright-json-schema-validation-00) – JSON Schema keyword reference

[JSON Schema Draft Wright 00](https://tools.ietf.org/html/draft-wright-json-schema-00) – Core JSON Schema Specification

_Did not find what you were looking for? [Ask the community](https://community.smartbear.com/t5/Swagger-Open-Source-Tools/bd-p/SwaggerOSTools)  
Found a mistake? [Let us know](https://github.com/swagger-api/swagger.io/issues)_
