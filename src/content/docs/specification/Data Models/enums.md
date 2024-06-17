---
title: Enums
sidebar:
  order: 2
---

:::note
OAS **3** This guide is for OpenAPI 3.0. If you use OpenAPI 2.0, see our [OpenAPI 2.0 guide](/specification/20/enums/).
:::

You can use the `enum` keyword to specify possible values of a request parameter or a model property. For example, the sort parameter in `GET /items?sort=[asc|desc]` can be described as:

```yaml
paths:
  /items:
    get:
      parameters:
        - in: query
          name: sort
          description: Sort order
          schema:
            type: string
            enum: [asc, desc]
```

In YAML, you can also specify one enum value per line:

```yaml
enum:
  - asc
  - desc
```

All values in an enum must adhere to the specified `type`. If you need to specify descriptions for enum items, you can do this in the `description` of the parameter or property:

```yaml
parameters:
  - in: query
    name: sort
    schema:
      type: string
      enum: [asc, desc]
    description: >
      Sort order:
       * `asc` - Ascending, from A to Z
       * `desc` - Descending, from Z to A
```

### Nullable enums

A nullable enum can be defined as follows:

```yaml
type: string
nullable: true  # <---
enum:
  - asc
  - desc
  - null        # <--- without quotes, i.e. null not "null"
```

Note that `null` must be explicitly included in the list of `enum` values. Using `nullable: true` alone [is not enough](https://github.com/OAI/OpenAPI-Specification/blob/main/proposals/2019-10-31-Clarify-Nullable.md#if-a-schema-specifies-nullable-true-and-enum-1-2-3-does-that-schema-allow-null-values-see-1900) here.

### Reusable enums

In OpenAPI 3.0, both operation parameters and data models use a `schema`, making it easy to reuse the data types. You can define reusable enums in the global `components` section and reference them via `$ref` elsewhere.

```yaml
paths:
  /products:
    get:
      parameters:
        - in: query
          name: color
          required: true
          schema:
            $ref: "#/components/schemas/Color"
      responses:
        "200":
          description: OK
components:
  schemas:
    Color:
      type: string
      enum:
        - black
        - white
        - red
        - green
        - blue
```

_Did not find what you were looking for? [Ask the community](https://community.smartbear.com/t5/Swagger-Open-Source-Tools/bd-p/SwaggerOSTools)  
Found a mistake? [Let us know](https://github.com/swagger-api/swagger.io/issues)_
