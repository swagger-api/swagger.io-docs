## Enums

You can use the `enum` keyword to specify possible values of a request parameter or a model property.

For example, the sort parameter in:

```
GET /items?sort=[asc|desc]
```

can be described as:

```
paths:
  /items:
    get:
      parameters:
        - in: query
          name: sort
          description: Sort order
          type: string
          enum: [asc, desc]
```

In YAML, you can also specify one enum value per line:

```
          enum:
            - asc
            - desc
```

All values in an enum must adhere to the specified type.

If you need to specify descriptions for enum items, you can do this in the `description` of the parameter or property:

```
          type: string
          enum:
            - asc
            - desc
          description: >
            Sort order:
             * asc - Ascending, from A to Z.
             * desc - Descending, from Z to A.
```

### Reusable Enums

While Swagger 2.0 does not have built-in support for reusable enums, it is possible to define them in YAML using YAML anchors -- provided that your tool supports them.

Anchors are a handy feature of YAML where you can mark a key with `&anchor-name` and then further down use `*anchor-name` to reference that key's value. This lets you easily duplicate the content across a YAML file.

**Note:** An anchor (`&`) must be defined before it is used.

```
definitions:
  Colors:
    type: string
    enum: &COLORS
      - black
      - white
      - red
      - green
      - blue
    # OR:
    # enum: &COLORS [black, white, red, green, blue]

paths:
  /products:
    get:
      parameters:
        - in: query
          name: color
          required: true
          type: string
          enum: *COLORS
      responses:
        200:
          description: OK
```

If your tool’s YAML parser supports YAML merge keys (`<<`), you can use this trick to reference both the type and the enum values.

```
definitions:
  Colors: &COLORS
    type: string
    enum: [black, white, red, green, blue]
paths:
  /products:
    get:
      parameters:
        - in: query
          name: color
          required: true
          <<: *COLORS
      responses:
        200:
          description: OK
```
