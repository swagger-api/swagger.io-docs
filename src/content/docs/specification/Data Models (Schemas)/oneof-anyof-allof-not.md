---
title: oneOf, anyOf, allOf, not
sidebar:
  order: 5
---

OAS **3** This guide is for OpenAPI 3.0.

## oneOf, anyOf, allOf, not

OpenAPI 3.0 provides several keywords which you can use to combine schemas. You can use these keywords to create a complex schema, or validate a value against multiple criteria.

- [`oneOf`](#oneof) – validates the value against _exactly one_ of the subschemas
- [`allOf`](#allof) – validates the value against _all_ the subschemas
- [`anyOf`](#anyof) – validates the value against _any_ (one or more) of the subschemas

Besides these, there is a [`not`](#not) keyword which you can use to make sure the value is _not_ valid against the specified schema.

### oneOf

Use the `oneOf` keyword to ensure the given data is valid against one of the specified schemas.

```yaml
paths:
  /pets:
    patch:
      requestBody:
        content:
          application/json:
            schema:
              oneOf:
                - $ref: "#/components/schemas/Cat"
                - $ref: "#/components/schemas/Dog"
      responses:
        "200":
          description: Updated

components:
  schemas:
    Dog:
      type: object
      properties:
        bark:
          type: boolean
        breed:
          type: string
          enum: [Dingo, Husky, Retriever, Shepherd]
    Cat:
      type: object
      properties:
        hunts:
          type: boolean
        age:
          type: integer
```

The example above shows how to validate the request body in the “update” operation (PATCH). You can use it to validate the request body contains all the necessary information about the object to be updated, depending on the object type. Note the inline or referenced schema must be a _schema object_, not a standard JSON Schema. Now, to validation. The following JSON object is **valid** against one of the schemas, so the request body is _correct_:

```yaml
{ "bark": true, "breed": "Dingo" }
```

The following JSON object is **not valid** against both schemas, so the request body is _incorrect_:

```yaml
{ "bark": true, "hunts": true }
```

The following JSON object is **valid** against **both** schemas, so the request body is _incorrect_ – it should be valid against only one of the schemas, since we are using the `oneOf` keyword.

```yaml
{ "bark": true, "hunts": true, "breed": "Husky", "age": 3 }
```

### allOf

OpenAPI lets you combine and extend model definitions using the `allOf` keyword. `allOf` takes an array of object definitions that are used for independent validation but together compose a single object. Still, it does not imply a hierarchy between the models. For that purpose, you should include the [`discriminator`](https://swagger.io/specification/v3/#discriminator-object). To be valid against `allOf`, the data provided by the client must be valid against all of the given subschemas. In the following example, `allOf` acts as a tool for combining schemas used in specific cases with the general one. For more clearness, `oneOf` is also used with a `discriminator`.

```yaml
paths:
  /pets:
    patch:
      requestBody:
        content:
          application/json:
            schema:
              oneOf:
                - $ref: "#/components/schemas/Cat"
                - $ref: "#/components/schemas/Dog"
              discriminator:
                propertyName: pet_type
      responses:
        "200":
          description: Updated

components:
  schemas:
    Pet:
      type: object
      required:
        - pet_type
      properties:
        pet_type:
          type: string
      discriminator:
        propertyName: pet_type

    Dog: # "Dog" is a value for the pet_type property (the discriminator value)
      allOf: # Combines the main `Pet` schema with `Dog`-specific properties
        - $ref: "#/components/schemas/Pet"
        - type: object
          # all other properties specific to a `Dog`
          properties:
            bark:
              type: boolean
            breed:
              type: string
              enum: [Dingo, Husky, Retriever, Shepherd]

    Cat: # "Cat" is a value for the pet_type property (the discriminator value)
      allOf: # Combines the main `Pet` schema with `Cat`-specific properties
        - $ref: "#/components/schemas/Pet"
        - type: object
          # all other properties specific to a `Cat`
          properties:
            hunts:
              type: boolean
            age:
              type: integer
```

As you can see, this example validates the request body content to make sure it includes all the information needed to update a pet item with the PUT operation. It requires user to specify which type of the item should be updated, and validates against the specified schema according to their choice. Note the inline or referenced schema must be a _schema object_, not a standard JSON schema. For that example, all of the following request bodies are **valid**:

```yaml
    {
      "pet_type": "Cat",
      "age": 3
    }

    {
      "pet_type": "Dog",
      "bark": true
    }

    {
      "pet_type": "Dog",
      "bark": false,
      "breed": "Dingo"
    }
```

The following request bodies are **not valid**:

```yaml
    {
      "age": 3        # Does not include the pet_type property
    }



    {
      "pet_type": "Cat",
      "bark": true    # The `Cat` schema does not have the `bark` property
    }
```

### anyOf

Use the `anyOf` keyword to validate the data against any amount of the given subschemas. That is, the data may be valid against one or more subschemas at the same time.

```yaml
paths:
  /pets:
    patch:
      requestBody:
        content:
          application/json:
            schema:
              anyOf:
                - $ref: "#/components/schemas/PetByAge"
                - $ref: "#/components/schemas/PetByType"
      responses:
        "200":
          description: Updated

components:
  schemas:
    PetByAge:
      type: object
      properties:
        age:
          type: integer
        nickname:
          type: string
      required:
        - age

    PetByType:
      type: object
      properties:
        pet_type:
          type: string
          enum: [Cat, Dog]
        hunts:
          type: boolean
      required:
        - pet_type
```

Note the inline or referenced schema must be a _schema object_, not a standard JSON schema. With this example, the following JSON request bodies are **valid**:

```yaml
    {
      "age": 1
    }

    {
      "pet_type": "Cat",
      "hunts": true
    }

    {
      "nickname": "Fido",
      "pet_type": "Dog",
      "age": 4
    }
```

The following example is **not valid**, because it does not contain any of the required properties for both of the schemas:

```yaml
{ "nickname": "Mr. Paws", "hunts": false }
```

### Difference Between anyOf and oneOf

`oneOf` matches exactly one subschema, and `anyOf` can match one or more subschemas. To better understand the difference, use the example [above](#difference) but replace `anyOf` with `oneOf`. When using `oneOf`, the following request body is **not valid** because it matches both schemas and not just one:

```yaml
{ "nickname": "Fido", "pet_type": "Dog", "age": 4 }
```

### not

The `not` keyword does not exactly combine schemas, but as all of the keywords mentioned above it helps you to modify your schemas and make them more specific.

```yaml
paths:
  /pets:
    patch:
      requestBody:
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/PetByType"
      responses:
        "200":
          description: Updated

components:
  schemas:
    PetByType:
      type: object
      properties:
        pet_type:
          not:
            type: integer
      required:
        - pet_type
```

In this example, user should specify the `pet_type` value of any type except integer (that is, it should be an array, boolean, number, object, or string). The following request body is **valid**:

```yaml
{ "pet_type": "Cat" }
```

And the following is **not valid**:

```yaml
{ "pet_type": 11 }
```

_Did not find what you were looking for? [Ask the community](https://community.smartbear.com/t5/Swagger-Open-Source-Tools/bd-p/SwaggerOSTools)
Found a mistake? [Let us know](https://github.com/swagger-api/swagger.io/issues)_
