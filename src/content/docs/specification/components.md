---
title: Components Section
sidebar:
  order: 15
---

OAS **3** This guide is for OpenAPI 3.0.

## Components Section

Often, multiple API operations have some common parameters or return the same response structure. To avoid code duplication, you can place the common definitions in the global `components` section and reference them using [`$ref`](/docs/specification/using-ref/). In the example below, duplicate definitions of a User object are replaced with a single component and references to that component. Before:

```yaml
paths:
  /users/{userId}:
    get:
      summary: Get a user by ID
      parameters: ...
      responses:
        "200":
          description: A single user.
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: integer
                  name:
                    type: string
  /users:
    get:
      summary: Get all users
      responses:
        "200":
          description: A list of users.
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object
                  properties:
                    id:
                      type: integer
                    name:
                      type: string
```

After:

```yaml
paths:
  /users/{userId}:
    get:
      summary: Get a user by ID
      parameters: ...
      responses:
        "200":
          description: A single user.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/User"
  /users:
    get:
      summary: Get all users
      responses:
        "200":
          description: A list of users.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/User"

components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: integer
        name:
          type: string
```

### Components Structure

`components` serve as a container for various reusable definitions – schemas (data models), parameters, responses, examples, and others. The definitions in `components` have no direct effect on the API unless you explicitly reference them from somewhere outside the `components`. That is, `components` are not parameters and responses that apply to all operations; they are just pieces of information to be referenced elsewhere. Under `components`, the definitions are grouped by type – `schemas`, `parameters` and so on. The following example lists the available subsections. All subsections are optional.

```yaml
components:
  # Reusable schemas (data models)
  schemas: ...

  # Reusable path, query, header and cookie parameters
  parameters: ...

  # Security scheme definitions (see Authentication)
  securitySchemes: ...

  # Reusable request bodies
  requestBodies: ...

  # Reusable responses, such as 401 Unauthorized or 400 Bad Request
  responses: ...

  # Reusable response headers
  headers: ...

  # Reusable examples
  examples: ...

  # Reusable links
  links: ...

  # Reusable callbacks
  callbacks: ...
```

Each subsection contains one or more named components (definitions):

```yaml
    components:
      schemas:
        User:
          type: object
          ...
        Pet:
          type: object
          ...
```

The component names can consist of the following characters only:

```yaml
A..Z a..z 0..9 . _ -
```

Examples of valid names:

```yaml
User
New_User
org.example.User
401-Unauthorized
```

The component names are used to reference the components via `$ref` from other parts of the API specification:

```yaml
$ref: "#/components/<type>/<name>"
```

For example:

```yaml
$ref: "#/components/schemas/User"
```

An exception are definitions in `securitySchemes` which are referenced directly by name (see [Authentication](/docs/specification/authentication/)).

### Components Example

Below is an example of `components` that contains reusable data schemas, parameters and responses. Other component types (links, examples, and others) are defined similarly.

```yaml
components:
  #-------------------------------
  # Reusable schemas (data models)
  #-------------------------------
  schemas:
    User: # Can be referenced as '#/components/schemas/User'
      type: object
      properties:
        id:
          type: integer
          format: int64
        name:
          type: string

    Error: # Can be referenced as '#/components/schemas/Error'
      type: object
      properties:
        code:
          type: integer
        message:
          type: string

  #-------------------------------
  # Reusable operation parameters
  #-------------------------------
  parameters:
    offsetParam: # Can be referenced via '#/components/parameters/offsetParam'
      name: offset
      in: query
      description: Number of items to skip before returning the results.
      required: false
      schema:
        type: integer
        format: int32
        minimum: 0
        default: 0

    limitParam: # Can be referenced as '#/components/parameters/limitParam'
      name: limit
      in: query
      description: Maximum number of items to return.
      required: false
      schema:
        type: integer
        format: int32
        minimum: 1
        maximum: 100
        default: 20

  #-------------------------------
  # Reusable responses
  #-------------------------------
  responses:
    404NotFound: # Can be referenced as '#/components/responses/404NotFound'
      description: The specified resource was not found.

    ImageResponse: # Can be referenced as '#/components/responses/ImageResponse'
      description: An image.
      content:
        image/*:
          schema:
            type: string
            format: binary

    GenericError: # Can be referenced as '#/components/responses/GenericError'
      description: An error occurred.
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/Error"
```

### Externally Defined Components

Individual definitions in `components` can be specified either inline (as in the previous example) or using a `$ref` reference to an external definition:

```yaml
components:
  schemas:
    Pet:
      $ref: "../models/pet.yaml"
      # Can now use use '#/components/schemas/Pet' instead
    User:
      $ref: "https://api.example.com/v2/openapi.yaml#/components/schemas/User"
      # Can now use '#/components/schemas/User' instead

  responses:
    GenericError:
      $ref: "../template-api.yaml#/components/responses/GenericError"
      # Can now use '#/components/responses/GenericError' instead
```

This way you can define local “aliases” for external definitions that you can use instead of repeating the external file paths in all references. If the location of the referenced file changes, you only need to change it in one place (in `components`) instead of in all references.

### Differences From OpenAPI 2.0

OpenAPI 2.0 had separate sections for reusable components – `definitions`, `parameters`, `responses` and `securityDefinitions`. In OpenAPI 3.0, they all were moved inside `components`. Also, `definitions` were renamed to `schemas` and `securityDefinitions` were renamed to `securitySchemes` (note the different spelling: `schem_A_s` vs `securitySchem_E_s`). The references are changed accordingly to reflect the new structure:

```yaml
OpenAPI 2.0                    OpenAPI 3.0
'#/definitions/User'         → '#/components/schemas/User'
'#/parameters/offsetParam'   → '#/components/parameters/offsetParam'
'#/responses/ErrorResponse'  → '#/components/responses/ErrorResponse'
```

### References

[Components Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#componentsObject)

_Did not find what you were looking for? [Ask the community](https://community.smartbear.com/t5/Swagger-Open-Source-Tools/bd-p/SwaggerOSTools)  
Found a mistake? [Let us know](https://github.com/swagger-api/swagger.io/issues)_
