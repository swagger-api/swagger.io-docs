---
title: Describing Request Body
sidebar:
  order: 1
---

:::note
OAS **3** This guide is for OpenAPI 3.0. If you use OpenAPI 2.0, see our [OpenAPI 2.0 guide](/specification/20/describing-request-body/).
:::

## Describing Request Body

Request bodies are typically used with “create” and “update” operations (POST, PUT, PATCH). For example, when creating a resource using POST or PUT, the request body usually contains the representation of the resource to be created. OpenAPI 3.0 provides the `requestBody` keyword to describe request bodies.

### Differences From OpenAPI 2.0

If you used OpenAPI 2.0 before, here is a summary of changes to help you get started with OpenAPI 3.0:

- Body and form parameters are replaced with `requestBody`.
- Operations can now consume both form data and other media types such as JSON.
- The `consumes` array is replaced with the `requestBody.content` map which maps the media types to their schemas.
- Schemas can vary by media type.
- `anyOf` and `oneOf` can be used to specify alternate schemas.
- Form data can now contain objects, and you can specify the serialization strategy for objects and arrays.
- GET, DELETE and HEAD are no longer allowed to have request body because it does not have defined semantics as per [RFC 7231](https://tools.ietf.org/html/rfc7231#section-4.3).

### requestBody, content and Media Types

Unlike OpenAPI 2.0, where the request body was defined using `body` and `formData` parameters, OpenAPI 3.0 uses the `requestBody` keyword to distinguish the payload from [parameters](/specification/describing-parameters/) (such as query string). The `requestBody` is more flexible in that it lets you consume different media types, such as JSON, XML, form data, plain text, and others, and use different schemas for different media types. `requestBody` consists of the `content` object, an optional [Markdown](https://commonmark.org/help/)\-formatted `description`, and an optional `required` flag (`false` by default). `content` lists the media types consumed by the operation (such as `application/json`) and specifies the `schema` for each media type. **Request bodies are optional by default**. To mark the body as required, use `required: true`.

```yaml
paths:
  /pets:
    post:
      summary: Add a new pet

      requestBody:
        description: Optional description in *Markdown*
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/Pet"
          application/xml:
            schema:
              $ref: "#/components/schemas/Pet"
          application/x-www-form-urlencoded:
            schema:
              $ref: "#/components/schemas/PetForm"
          text/plain:
            schema:
              type: string

      responses:
        "201":
          description: Created
```

`content` allows wildcard media types. For example, `image/*` represents all image types; `*/*` represents all types and is functionally equivalent to `application/octet-stream`. Specific media types have preference over wildcard media types when interpreting the spec, for example, `image/png` > `image/*` > `*/*`.

```yaml
paths:
  /avatar:
    put:
      summary: Upload an avatar
      requestBody:
        content:
          image/*: # Can be image/png, image/svg, image/gif, etc.
            schema:
              type: string
              format: binary
```

### anyOf, oneOf

OpenAPI 3.0 supports `anyOf` and `oneOf`, so you can specify alternate schemas for the request body:

```yaml
requestBody:
  description: A JSON object containing pet information
  content:
    application/json:
      schema:
        oneOf:
          - $ref: "#/components/schemas/Cat"
          - $ref: "#/components/schemas/Dog"
          - $ref: "#/components/schemas/Hamster"
```

### File Upload

To learn how to describe file upload, see [File Upload](/specification/describing-request-body/file-upload/) and [Multipart Requests](/specification/describing-request-body/multipart-requests/).

### Request Body Examples

The request body can have an `example` or multiple `examples`. `example` and `examples` are properties of the `requestBody.content.<media-type>` object. If provided, these examples override the examples provided by the schema. This is handy, for example, if the request and response use the same schema but you want to have different examples. `example` allows a single inline example:

```yaml
requestBody:
  content:
    application/json:
      schema:
        $ref: "#/components/schemas/Pet"
      example:
        name: Fluffy
        petType: dog
```

The `examples` (plural) are more flexible – you can have an inline example, a `$ref` reference, or point to an external URL containing the payload example. Each example can also have optional `summary` and `description` for documentation purposes.

```yaml
          requestBody:
            content:
              application/json:
                schema:
                  $ref: '#/components/schemas/Pet'
                examples:

                  dog:  # <--- example name
                    summary: An example of a dog
                    value:
                      # vv Actual payload goes here vv
                      name: Fluffy
                      petType: dog

                  cat:  # <--- example name
                    summary: An example of a cat
                    externalValue: http://api.example.com/examples/cat.json   # cat.json contains {"name": "Tiger", "petType": "cat"}

                  hamster:  # <--- example name
                    $ref: '#/components/examples/hamster'

    components:
      examples:
        hamster:  # <--- example name
          summary: An example of a hamster
          value:
            # vv Actual payload goes here vv
            name: Ginger
            petType: hamster
```

See [Adding Examples](/specification/adding-examples/) for more information.

### Reusable Bodies

You can put the request body definitions in the global `components.requestBodies` section and `$ref` them elsewhere. This is handy if multiple operations have the same request body – this way you can reuse the same definition easily.

```yaml
    paths:
      /pets:
        post:
          summary: Add a new pet
          requestBody:
            $ref: '#/components/requestBodies/PetBody'

      /pets/{petId}
        put:
          summary: Update a pet
          parameters: [ ... ]
          requestBody:
            $ref: '#/components/requestBodies/PetBody'

    components:
      requestBodies:
        PetBody:
          description: A JSON object containing pet information
          required: true
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Pet'
```

### Form Data

The term “form data” is used for the media types `application/x-www-form-urlencoded` and `multipart/form-data`, which are commonly used to submit HTML forms.

- `application/x-www-form-urlencoded` is used to send simple ASCII text data as `key=value` pairs. The payload format is similar to [query parameters](/specification/describing-parameters/#query-parameters).
- `multipart/form-data` allows submitting binary data as well as multiple media types in a single message (for example, image and JSON). Each form field has its own section in the payload with internal HTTP headers. `multipart` requests are commonly used for [file uploads](/specification/file-upload/).

To illustrate form data, consider an HTML POST form:

```html
<form action="http://example.com/survey" method="post">
  <input type="text" name="name" />
  <input type="number" name="fav_number" />
  <input type="submit" />
</form>
```

This form POSTs data to the form’s endpoint:

```yaml
    POST /survey HTTP/1.1
    Host: example.com
    Content-Type: application/x-www-form-urlencoded
    Content-Length: 28

    name=Amy+Smith&fav_number=42
```

In OpenAPI 3.0, form data is modelled using a `type: object` schema where the object properties represent the form fields:

```yaml
paths:
  /survey:
    post:
      requestBody:
        required: true
        content:
          application/x-www-form-urlencoded:
            schema:
              type: object
              properties:
                name: # <!--- form field name
                  type: string
                fav_number: # <!--- form field name
                  type: integer
              required:
                - name
                - email
```

Form fields can contain primitives values, arrays and objects. By default, arrays are serialized as `array_name=value1&array_name=value2` and objects as `prop1=value1&prop=value2`, but you can use other serialization strategies as defined by the OpenAPI 3.0 Specification. The serialization strategy is specified in the `encoding` section like so:

```yaml
requestBody:
  content:
    application/x-www-form-urlencoded:
      schema:
        type: object
        properties:
          color:
            type: array
            items:
              type: string
      encoding:
        color: # color=red,green,blue
          style: form
          explode: false
```

By default, reserved characters `:/?#[]@!$&'()*+,;=` in form field values within `application/x-www-form-urlencoded` bodies are [percent-encoded](https://en.wikipedia.org/wiki/Percent-encoding) when sent. To allow these characters to be sent as is, use the `allowReserved` keyword like so:

```yaml
requestBody:
  content:
    application/x-www-form-urlencoded:
      schema:
        type: object
        properties:
          foo:
            type: string
          bar:
            type: string
          baz:
            type: string
      encoding:
        # Don't percent-encode reserved characters in the values of "bar" and "baz" fields
        bar:
          allowReserved: true
        baz:
          allowReserved: true
```

Arbitrary `key=value` pairs can be modelled using a free-form schema:

```yaml
requestBody:
  content:
    application/x-www-form-urlencoded:
      schema:
        type: object
        additionalProperties: true # this line is optional
```

#### Complex Serialization in Form Data

The serialization rules provided by the `style` and `explode` keywords only have defined behavior for arrays of primitives and objects with primitive properties. For more complex scenarios, such as nested arrays or JSON in form data, you need to use the `contentType` keyword to specify the media type for encoding the value of a complex field. Consider [Slack incoming webhooks](https://api.slack.com/incoming-webhooks) for an example. A message can be sent directly as JSON, or the JSON data can be sent inside a form field named `payload` like so (before URL-encoding is applied):

```yaml
payload={"text":"Swagger is awesome"}
```

This can be described as:

```yaml
openapi: 3.0.0
info:
  version: 1.0.0
  title: Slack Incoming Webhook
externalDocs:
  url: https://api.slack.com/incoming-webhooks

servers:
  - url: https://hooks.slack.com

paths:
  /services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX:
    post:
      summary: Post a message to Slack
      requestBody:
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/Message"

          application/x-www-form-urlencoded:
            schema:
              type: object
              properties:
                payload: # <--- form field that contains the JSON message
                  $ref: "#/components/schemas/Message"
            encoding:
              payload:
                contentType: application/json

      responses:
        "200":
          description: OK

components:
  schemas:
    Message:
      title: A Slack message
      type: object
      properties:
        text:
          type: string
          description: Message text
      required:
        - text
```

### References

[RequestBody Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#requestBodyObject)

[MediaType Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#mediaTypeObject)

_Did not find what you were looking for? [Ask the community](https://community.smartbear.com/t5/Swagger-Open-Source-Tools/bd-p/SwaggerOSTools)  
Found a mistake? [Let us know](https://github.com/swagger-api/swagger.io/issues)_
