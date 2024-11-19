---
title: Inheritance and Polymorphism
sidebar:
  order: 6
---

:::note
OAS **3** This guide is for OpenAPI 3.0.
:::

### Model Composition

In your API, you may have model schemas that share common properties. Instead of describing these properties for each schema repeatedly, you can describe the schemas as a composition of the common property set and schema-specific properties. In OpenAPI version 3, you do this with the `allOf` keyword:

```yaml
components:
  schemas:
    BasicErrorModel:
      type: object
      required:
        - message
        - code
      properties:
        message:
          type: string
        code:
          type: integer
          minimum: 100
          maximum: 600
    ExtendedErrorModel:
      allOf: # Combines the BasicErrorModel and the inline model
        - $ref: "#/components/schemas/BasicErrorModel"
        - type: object
          required:
            - rootCause
          properties:
            rootCause:
              type: string
```

In the example above, the `ExtendedErrorModel` schema includes its own properties and properties inherited from `BasicErrorModel`. **Note:** When validating the data, servers and clients will validate the combined model against each model it consists of. It is recommended to avoid using conflicting properties (like properties that have the same names, but different data types).

### Polymorphism

In your API, you can have request and responses that can be described by several alternative schemas. In OpenAPI 3.0, to describe such a model, you can use the `oneOf` or `anyOf` keywords:

```yaml
components:
  responses:
    sampleObjectResponse:
      content:
        application/json:
          schema:
            oneOf:
              - $ref: '#/components/schemas/simpleObject'
              - $ref: '#/components/schemas/complexObject'
  …
components:
  schemas:
    simpleObject:
      …
    complexObject:
      …
```

In this example, the response payload can contain either `simpleObject`, or `complexObject`.

### Discriminator

To help API consumers detect the object type, you can add the `discriminator/propertyName` keyword to model definitions. This keyword points to the property that specifies the data type name:

```yaml
components:
  responses:
    sampleObjectResponse:
      content:
        application/json:
          schema:
            oneOf:
              - $ref: '#/components/schemas/simpleObject'
              - $ref: '#/components/schemas/complexObject'
            discriminator:
              propertyName: objectType
  …
  schemas:
    simpleObject:
      type: object
      required:
        - objectType
      properties:
        objectType:
          type: string
      …
    complexObject:
      type: object
      required:
        - objectType
      properties:
        objectType:
          type: string
      …
```

In our example, the discriminator points to the `objectType` property that contains the data type name. The discriminator is used with `anyOf` or `oneOf` keywords only. It is important that all the models mentioned below `anyOf` or `oneOf` contain the property that the discriminator specifies. This means, for example, that in our code above, both `simpleObject` and `complexObject` must have the `objectType` property. This property is required in these schemas:

```yaml
schemas:
    simpleObject:
      type: object
      required:
        - objectType
      properties:
        objectType:
          type: string
      …
    complexObject:
      type: object
      required:
        - objectType
      properties:
        objectType:
          type: string
      …
```

The `discriminator` keyword can be used by various API consumers. One possible example are code generation tools: they can use discriminator to generate program statements that typecast request data to appropriate object type based on the discriminator property value.

### Mapping Type Names

It is implied, that the property to which discriminator refers, contains the name of the target schema. In the example above, the `objectType` property should contain either _`simpleObject`_, or _`complexObject`_ string. If the property values do not match the schema names, you can map the values to the names. To do this, use the `discriminator/mapping` keyword:

```yaml
components:
  responses:
    sampleObjectResponse:
      content:
        application/json:
          schema:
            oneOf:
              - $ref: '#/components/schemas/Object1'
              - $ref: '#/components/schemas/Object2'
              - $ref: 'sysObject.json#/sysObject'
            discriminator:
              propertyName: objectType
              mapping:
                obj1: '#/components/schemas/Object1'
                obj2: '#/components/schemas/Object2'
                system: 'sysObject.json#/sysObject'
  …
  schemas:
    Object1:
      type: object
      required:
        - objectType
      properties:
        objectType:
          type: string
      …
    Object2:
      type: object
      required:
        - objectType
      properties:
        objectType:
          type: string
      …
    sysObject:
      type: object
      required:
        - objectType
      properties:
        objectType:
          type: string
      …
```

In this example, the _`obj1`_ value is mapped to the `Object1` model that is defined in the same spec, _`obj2`_ – to `Object2`, and the value _`system`_ matches the `sysObject` model that is located in an external file. All these objects must have the `objectType` property with the value _`"obj1"`_, _`"obj2"`_ or _`"system"`_, respectively.

_Did not find what you were looking for? [Ask the community](https://community.smartbear.com/t5/Swagger-Open-Source-Tools/bd-p/SwaggerOSTools)  
Found a mistake? [Let us know](https://github.com/swagger-api/swagger.io/issues)_
