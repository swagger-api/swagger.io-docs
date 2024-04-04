---
title: Parameter Serialization
sidebar:
  order: 7
---

:::note
OAS **3** This guide is for OpenAPI 3.0.
:::

## Parameter Serialization

Serialization means translating data structures or object state into a format that can be transmitted and reconstructed later. OpenAPI 3.0 supports arrays and objects in [operation parameters](/specification/describing-parameters/) (path, query, header, and cookie) and lets you specify how these parameters should be serialized. The serialization method is defined by the `style` and `explode` keywords:

- `style` defines how multiple values are delimited. Possible styles depend on the parameter location – [path](#path), [query](#query), [header](#header) or [cookie](#cookie).
- `explode` (true/false) specifies whether arrays and objects should generate separate parameters for each array item or object property.

OpenAPI serialization rules are based on a subset of URI template patterns defined by [RFC 6570](https://tools.ietf.org/html/rfc6570). Tool implementers can use existing URI template libraries to handle the serialization, as explained [below](#uri-templates).

### Path Parameters

Path parameters support the following `style` values:

- **simple** – (default) comma-separated values. Corresponds to the `{param_name}` URI template.
- **label** – dot-prefixed values, also known as label expansion. Corresponds to the `{.param_name}` URI template.
- **matrix** – semicolon-prefixed values, also known as path-style expansion. Corresponds to the `{;param_name}` URI template.

The default serialization method is `style: simple` and `explode: false`. Given the path `/users/{id}`, the path parameter `id` is serialized as follows:

| style     | explode  | URI template   | Primitive value id = 5 | Array id = [3, 4, 5]   | Object id = {"role": "admin", "firstName": "Alex"} |
| --------- | -------- | -------------- | ---------------------- | ---------------------- | -------------------------------------------------- |
| simple \* | false \* | /users/{id}    | /users/5               | /users/3,4,5           | /users/role,admin,firstName,Alex                   |
| simple    | true     | /users/{id\*}  | /users/5               | /users/3,4,5           | /users/role=admin,firstName=Alex                   |
| label     | false    | /users/{.id}   | /users/.5              | /users/.3,4,5          | /users/.role,admin,firstName,Alex                  |
| label     | true     | /users/{.id\*} | /users/.5              | /users/.3.4.5          | /users/.role=admin.firstName=Alex                  |
| matrix    | false    | /users/{;id}   | /users/;id=5           | /users/;id=3,4,5       | /users/;id=role,admin,firstName,Alex               |
| matrix    | true     | /users/{;id\*} | /users/;id=5           | /users/;id=3;id=4;id=5 | /users/;role=admin;firstName=Alex                  |

- Default serialization method

The `label` and `matrix` styles are sometimes used with partial path parameters, such as `/users{id}`, because the parameter values get prefixed.

### Query Parameters

Query parameters support the following `style` values:

- **form** – (default) ampersand-separated values, also known as form-style query expansion. Corresponds to the `{?param_name}` URI template.
- **spaceDelimited** – space-separated array values. Same as `collectionFormat: ssv` in OpenAPI 2.0. Has effect only for non-exploded arrays (`explode: false`), that is, the space separates the array values if the array is a _single parameter_, as in `arr=a b c`.
- **pipeDelimited** – pipeline-separated array values. Same as `collectionFormat: pipes` in OpenAPI 2.0. Has effect only for non-exploded arrays (`explode: false`), that is, the pipe separates the array values if the array is a _single parameter_, as in `arr=a|b|c`.
- **deepObject** – simple non-nested objects are serialized as `paramName[prop1]=value1&paramName[prop2]=value2&...`. The behavior for nested objects and arrays is undefined.

The default serialization method is `style: form` and `explode: true`. This corresponds to `collectionFormat: multi` from OpenAPI 2.0. Given the path `/users` with a query parameter `id`, the query string is serialized as follows:

| style          | explode | URI template  | Primitive value id = 5 | Array id = [3, 4, 5]  | Object id = {"role": "admin", "firstName": "Alex"} |
| -------------- | ------- | ------------- | ---------------------- | --------------------- | -------------------------------------------------- |
| form \*        | true \* | /users{?id\*} | /users?id=5            | /users?id=3&id=4&id=5 | /users?role=admin&firstName=Alex                   |
| form           | false   | /users{?id}   | /users?id=5            | /users?id=3,4,5       | /users?id=role,admin,firstName,Alex                |
| spaceDelimited | true    | /users{?id\*} | n/a                    | /users?id=3&id=4&id=5 | n/a                                                |
| spaceDelimited | false   | n/a           | n/a                    | /users?id=3%204%205   | n/a                                                |
| pipeDelimited  | true    | /users{?id\*} | n/a                    | /users?id=3&id=4&id=5 | n/a                                                |
| pipeDelimited  | false   | n/a           | n/a                    | /users?id=3\|4\|5     | n/a                                                |
| deepObject     | true    | n/a           | n/a                    | n/a                   | /users?id[role]=admin&id[firstName]=Alex           |

\* Default serialization method

Additionally, the `allowReserved` keyword specifies whether the reserved characters `:/?#[]@!$&'()*+,;=` in parameter values are allowed to be sent as they are, or should be percent-encoded. By default, `allowReserved` is `false`, and reserved characters are percent-encoded. For example, `/` is encoded as `%2F` (or `%2f`), so that the parameter value `quotes/h2g2.txt` will be sent as `quotes%2Fh2g2.txt`.

### Header Parameters

Header parameters always use the `simple` style, that is, comma-separated values. This corresponds to the `{param_name}` URI template. An optional `explode` keyword controls the object serialization. Given the request header named `X-MyHeader`, the header value is serialized as follows:

| style     | explode  | URI template | Primitive value X-MyHeader = 5 | Array X-MyHeader = [3, 4, 5] | Object X-MyHeader = {"role": "admin", "firstName": "Alex"} |
| --------- | -------- | ------------ | ------------------------------ | ---------------------------- | ---------------------------------------------------------- |
| simple \* | false \* | {id}         | X-MyHeader: 5                  | X-MyHeader: 3,4,5            | X-MyHeader: role,admin,firstName,Alex                      |
| simple    | true     | {id\*}       | X-MyHeader: 5                  | X-MyHeader: 3,4,5            | X-MyHeader: role=admin,firstName=Alex                      |

- Default serialization method

### Cookie Parameters

Cookie parameters always use the `form` style. An optional `explode` keyword controls the array and object serialization. Given the cookie named `id`, the cookie value is serialized as follows:

| style   | explode | URI template | Primitive value id = 5 | Array id = [3, 4, 5] | Object id = {"role": "admin", "firstName": "Alex"} |
| ------- | ------- | ------------ | ---------------------- | -------------------- | -------------------------------------------------- |
| form \* | true \* |              | Cookie: id=5           |                      |                                                    |
| form    | false   | id={id}      | Cookie: id=5           | Cookie: id=3,4,5     | Cookie: id=role,admin,firstName,Alex               |

- Default serialization method

### Serialization and RFC 6570

OpenAPI serialization rules are based on a subset of URI templates defined by [RFC 6570](https://tools.ietf.org/html/rfc6570). Tool implementers can use existing URI template libraries to handle the serialization. You will need to construct the URI template based on the path and parameter definitions. The following table shows how OpenAPI keywords are mapped to the URI Template modifiers.

| Keyword                 | URI Template Modifier                                                                                                                                                                         |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `style: simple`         | none                                                                                                                                                                                          |
| `style: label`          | `.` prefix                                                                                                                                                                                    |
| `style: matrix`         | `;` prefix                                                                                                                                                                                    |
| `style: form`           | `?` or `&` prefix (depending on the parameter position in the query string)                                                                                                                   |
| `style: pipeDelimited`  | `?` or `&` prefix (depending on the parameter position in the query string) – but using pipes `                                              \|`instead of commas`,` to join the array values |
| `style: spaceDelimited` | `?` or `&` prefix (depending on the parameter position in the query string) – but using spaces instead of commas `,` to join the array values                                                 |
| `explode: false`        | none                                                                                                                                                                                          |
| `explode: true`         | `*` suffix                                                                                                                                                                                    |
| `allowReserved: false`  | none                                                                                                                                                                                          |
| `allowReserved: true`   | `+` prefix                                                                                                                                                                                    |

For example, consider the path `/users{id}` with a query parameter `metadata`, defined like so:

    paths:
      # /users;id=3;id=4?metadata=true
      /users{id}:
        get:
          parameters:
            - in: path
              name: id
              required: true
              schema:
                type: array
                items:
                  type: integer
                minItems: 1
              style: matrix
              explode: true
            - in: query
              name: metadata
              schema:
                type: boolean
              # Using the default serialization for query parameters:
              # style=form, explode=false, allowReserved=false
          responses:
            '200':
              description: A list of users

The path parameter `id` uses the `matrix` style with the `explode` modifier, which corresponds to the `{;id*}` template. The query parameter `metadata` uses the default `form` style, which corresponds to the `{?metadata}` template. The complete URI template would look like:

    /users{;id*}{?metadata}

A client application can then use an URI template library to generate the request URL based on this template and specific parameter values.

### Other Serialization Methods

`style` and `explode` cover the most common serialization methods, but not all. For more complex scenarios (for example, a JSON-formatted object in the query string), you can use the `content` keyword and specify the media type that defines the serialization format. For more information, see [schema vs content](/specification/describing-parameters/#schema-vs-content).

_Did not find what you were looking for? [Ask the community](https://community.smartbear.com/t5/Swagger-Open-Source-Tools/bd-p/SwaggerOSTools)  
Found a mistake? [Let us know](https://github.com/swagger-api/swagger.io/issues)_
