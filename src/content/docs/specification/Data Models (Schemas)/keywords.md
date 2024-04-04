---
title: Supported JSON Schema Keywords
sidebar:
  order: 8
---

OAS **3** This guide is for OpenAPI 3.0.

## Supported JSON Schema Keywords

OpenAPI 3.0 uses an extended subset of [JSON Schema Specification](http://json-schema.org) Wright Draft 00 (aka Draft 5) to describe the data formats. “Extended subset” means that some keywords are supported and some are not, some keywords have slightly different usage than in JSON Schema, and additional keywords are introduced.

### Supported Keywords

These keywords have the **same meaning** as in JSON Schema:

- `title`
- [`pattern`](/specification/data-models/data-types/#pattern)
- [`required`](/specification/data-models/data-types/#required)
- [`enum`](/specification/data-models/enums/)
- [`minimum`](/specification/data-models/data-types/#range)
- [`maximum`](/specification/data-models/data-types/#range)
- [`exclusiveMinimum`](/specification/data-models/data-types/#range)
- [`exclusiveMaximum`](/specification/data-models/data-types/#range)
- [`multipleOf`](/specification/data-models/data-types/#multipleOf)
- [`minLength`](/specification/data-models/data-types/#string)
- [`maxLength`](/specification/data-models/data-types/#string)
- [`minItems`](/specification/data-models/data-types/#array-length)
- [`maxItems`](/specification/data-models/data-types/#array-length)
- [`uniqueItems`](/specification/data-models/data-types/#uniqueItems)
- [`minProperties`](/specification/data-models/data-types/#property-count)
- [`maxProperties`](/specification/data-models/data-types/#property-count)

These keywords are **supported with minor differences**:

- [`type`](/specification/data-models/data-types/#type) – the value must be a single type and not an array of types. `null` is not supported as a type, use the [`nullable: true`](/specification/data-models/data-types/#null) keyword instead.
- `format` – OpenAPI has its own predefined formats and also allows custom formats.
- `description` – supports [CommonMark](http://commonmark.org/help/) syntax for rich text representation.
- [`items`](/specification/data-models/data-types/#array) – must be present if `type` is `array`. The item schema must be an OpenAPI schema and not a standard JSON Schema.
- [`properties`](/specification/data-models/data-types/#object) – individual property definitions must follow OpenAPI schema rules and not standard JSON Schema.
- [`additionalProperties`](/specification/data-models/data-types/#additionalProperties) – the value can be a boolean (`true` or `false`) or an OpenAPI schema.
- [`default`](/specification/data-models/data-types/#default) – the default value must conform to the specified schema.
- [`allOf`](/specification/data-models/oneof-anyof-allof-not/) – the subschemas must be OpenAPI schemas and not standard JSON Schemas.
- [`oneOf`](/specification/data-models/oneof-anyof-allof-not/) – the subschemas must be OpenAPI schemas and not standard JSON Schemas.
- [`anyOf`](/specification/data-models/oneof-anyof-allof-not/) – the subschemas must be OpenAPI schemas and not standard JSON Schemas.
- [`not`](/specification/data-models/oneof-anyof-allof-not/) – the subschema must be an OpenAPI schema and not a standard JSON Schema.

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
- [`discriminator`](/specification/data-models/inheritance-and-polymorphism/)
- [`example`](/specification/adding-examples/)
- `externalDocs`
- [`nullable`](/specification/data-models/data-types/#null)
- [`readOnly`](/specification/data-models/data-types/#readonly-writeonly)
- [`writeOnly`](/specification/data-models/data-types/#readonly-writeonly)
- [`xml`](/specification/data-models/representing-xml/)

### References

[OpenAPI 3.0 – Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#schema-object)

[JSON Schema Validation](https://tools.ietf.org/html/draft-wright-json-schema-validation-00) – JSON Schema keyword reference

[JSON Schema Draft Wright 00](https://tools.ietf.org/html/draft-wright-json-schema-00) – Core JSON Schema Specification

_Did not find what you were looking for? [Ask the community](https://community.smartbear.com/t5/Swagger-Open-Source-Tools/bd-p/SwaggerOSTools)  
Found a mistake? [Let us know](https://github.com/swagger-api/swagger.io/issues)_
