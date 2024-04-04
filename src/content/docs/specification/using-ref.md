---
title: Using $ref
sidebar:
  order: 16
---

:::note
OAS **3** This guide is for OpenAPI 3.0.
:::

## Using $ref

When you document an API, it is common to have some features which you use across several of API resources. In that case, you can create a snippet for such elements in order to use them multiple times when you need it. With OpenAPI 3.0, you can reference a definition hosted on any location. It can be the same server, or another one – for example, GitHub, SwaggerHub, and so on. To reference a definition, use the `$ref` keyword:

```yaml
$ref: "reference to definition"
```

For example, suppose you have the following schema object, which you want to use inside your response:

JSON Example

YAML Example

```yaml
"components":
  {
    "schemas":
      {
        "user":
          {
            "properties":
              { "id": { "type": "integer" }, "name": { "type": "string" } },
          },
      },
  }
```

```yaml
components:
  schemas:
    User:
      properties:
        id:
          type: integer
        name:
          type: string
```

To refer that object, you need to add `$ref` with the corresponding path to your response:

JSON Example

YAML Example

```yaml
"responses":
  {
    "200":
      {
        "description": "The response",
        "schema": { "$ref": "#/components/schemas/user" },
      },
  }
```

```yaml
responses:
  "200":
    description: The response
    schema:
      $ref: "#/components/schemas/User"
```

The value of `$ref` uses the [JSON Reference](https://tools.ietf.org/html/draft-pbryan-zyp-json-ref-03) notation, and the portion starting with `#` uses the [JSON Pointer](https://tools.ietf.org/html/rfc6901) notation. This notation lets you specify the target file or a specific part of a file you want to reference. In the previous example, `#/components/schemas/User` means the resolving starts from the root of the current document, and then finds the values of `components`, `schemas`, and `User` one after another.

### $ref Syntax

According to [RFC3986](https://tools.ietf.org/html/rfc3986), the `$ref` string value (**JSON Reference**) should contain a URI, which identifies the location of the JSON value you are referencing to. If the string value does not conform URI syntax rules, it causes an error during the resolving. Any members other than `$ref` in a JSON Reference object are ignored. Check this list for example values of a JSON reference in specific cases:

- **Local Reference** – `$ref: '#/definitions/myElement'` `#` means go to the root of the current document and then find elements `definitions` and `myElement` one after one.
- **Remote Reference** – `$ref: 'document.json'` Uses the whole document located on the same server and in the same location.
  - **The element of the document located in the same folder** – `$ref: 'document.json#/myElement'`
  - **The element of the document located in the parent folder** – `$ref: '../document.json#/myElement'`
  - **The element of the document located in another folder** – `$ref: '../another-folder/document.json#/myElement'`
- **URL Reference** – `$ref: 'http://path/to/your/resource'` Uses the whole document located on the different server.
  - **The specific element of the document stored on the different server** – `$ref: 'http://path/to/your/resource.json#/myElement'`
  - **The document on the different server, which uses the same protocol** (for example, HTTP or HTTPS) – `$ref: '//anotherserver.com/files/example.json'`

**Note**: When using local references such as `#/components/schemas/User` in YAML, enclose the value in quotes: `'#/components/schemas/User'`. Otherwise it will be treated as a comment.

### Escape Characters

`/` and `~` are special characters in JSON Pointers, and need to be escaped when used literally (for example, in path names).

| Character | Escape With |
| --------- | ----------- |
| `~`       | `~0`        |
| `/`       | `~1`        |

For example, to refer to the path `/blogs/{blog_id}/new~posts`, you would use:

```yaml
$ref: "#/paths/~1blogs~1{blog_id}~1new~0posts"
```

### Considerations

#### Places Where $ref Can Be Used

A common misconception is that `$ref` is allowed anywhere in an OpenAPI specification file. Actually `$ref` is only allowed in places where the [OpenAPI 3.0 Specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md) explicitly states that the value may be a _reference_. For example, `$ref` cannot be used in the `info` section and directly under `paths`:

```yaml
openapi: 3.0.0

# Incorrect!
info:
  $ref: info.yaml
paths:
  $ref: paths.yaml
```

However, you can `$ref` individual paths, like so:

```yaml
paths:
  /users:
    $ref: "../resources/users.yaml"
  /users/{userId}:
    $ref: "../resources/users-by-id.yaml"
```

#### $ref and Sibling Elements

Any sibling elements of a `$ref` are ignored. This is because `$ref` works by replacing itself and everything on its level with the definition it is pointing at. Consider this example:

```yaml
components:
  schemas:
    Date:
      type: string
      format: date

    DateWithExample:
      $ref: "#/components/schemas/Date"
      description: Date schema extended with a `default` value... Or not?
      default: 2000-01-01
```

In the second schema, the `description` and `default` properties are ignored, so this schema ends up exactly the same as the referenced `Date` schema.

_Did not find what you were looking for? [Ask the community](https://community.smartbear.com/t5/Swagger-Open-Source-Tools/bd-p/SwaggerOSTools)  
Found a mistake? [Let us know](https://github.com/swagger-api/swagger.io/issues)_
