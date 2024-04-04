---
title: Media Types
sidebar:
  order: 4
---

:::note
OAS **3** This page is about OpenAPI 3.0. If you use OpenAPI 2.0, see the [OpenAPI 2.0 guide](/specification/20/mime-types/).
:::

## Media Types

**Media type** is a format of a request or response body data. Web service operations can accept and return data in different formats, the most common being JSON, XML and images. You specify the media type in request and response definitions. Here is an example of a response definition:

```yaml
paths:
  /employees:
    get:
      summary: Returns a list of employees.
      responses:
        "200": # Response
          description: OK
          content: # Response body
            application/json: # Media type
              schema: # Must-have
                type: object # Data type
                properties:
                  id:
                    type: integer
                  name:
                    type: string
                  fullTime:
                    type: boolean
                example: # Sample data
                  id: 1
                  name: Jessica Right
                  fullTime: true
```

Under `responses` we have definitions of individual responses. As you can see, each response is defined by its code (`'200'` in our example.). The keyword `content` below the code corresponds to the response body. One or multiple media types go as child keywords of this `content` keyword. Each media type includes a `schema`, defining the data type of the message body, and, optionally, one or several examples. For more information on defining body data, see [Defining Request Body](/specification/describing-request-body/) and [Defining Responses](/specification/describing-responses/).

### Media Type Names

The media types listed below the `content` field should be compliant with [RFC 6838](https://datatracker.ietf.org/doc/html/rfc6838). For example, you can use standard types or vendor-specific types (indicated by `.vnd`) –

```yaml
application/json
application/xml
application/x-www-form-urlencoded
multipart/form-data
text/plain; charset=utf-8
text/html
application/pdf
image/png
```

```yaml
application/vnd.mycompany.myapp.v2+json
application/vnd.ms-excel
application/vnd.openstreetmap.data+xml
application/vnd.github-issue.text+json
application/vnd.github.v3.diff
image/vnd.djvu
```

### Multiple Media Types

You may want to specify multiple media types:

```yaml
paths:
  /employees:
    get:
      summary: Returns a list of employees.
      responses:
        "200": # Response
          description: OK
          content: # Response body
            application/json: # One of media types
              schema:
                type: object
                properties:
                  id:
                    type: integer
                  name:
                    type: string
                  fullTime:
                    type: boolean
            application/xml: # Another media types
              schema:
                type: object
                properties:
                  id:
                    type: integer
                  name:
                    type: string
                  fullTime:
                    type: boolean
```

To use the same data format for several media types, define a custom object in the `components` section of your spec and then refer to this object in each media type:

```yaml
paths:
  /employees:
    get:
      responses:
        "200": # Response
          description: OK
          content: # Response body
            application/json: # Media type
              schema:
                $ref: "#/components/schemas/Employee" # Reference to object definition
            application/xml: # Media type
              schema:
                $ref: "#/components/schemas/Employee" # Reference to object definition
components:
  schemas:
    Employee: # Object definition
      type: object
      properties:
        id:
          type: integer
        name:
          type: string
        fullTime:
          type: boolean
```

To define the same format for multiple media types, you can also use placeholders like `*/*`, `application/*`, `image/*` or others:

```yaml
paths:
  /info/logo:
    get:
      responses:
        "200": # Response
          description: OK
          content: # Response body
            image/*: # Media type
              schema:
                type: string
                format: binary
```

The value you use as media type – `image/*` in our example – is very similar to what you can see in the `Accept` or `Content-Type` headers of HTTP requests and responses. Do not confuse the placeholder and the actual value of the `Accept` or `Content-Type` headers. For example, the `image/*` placeholder for a response body means that the server will use the same data structure for all the responses that match the placeholder. It does not mean that the string _image/\*_ will be specified in the `Content-Type` header. The `Content-Type` header most likely will have _image/png_, _image/jpeg_, or some other similar value.

\_Did not find what you were looking for? [Ask the community](https://community.smartbear.com/t5/Swagger-Open-Source-Tools/bd-p/SwaggerOSTools)
Found a mistake? [Let us know](https://github.com/swagger-api/swagger.io/issues)\_OAS **3** This page is about OpenAPI 3.0. If you use OpenAPI 2.0, see the [OpenAPI 2.0 guide](/specification/20/mime-types/).

## Media Types

**Media type** is a format of a request or response body data. Web service operations can accept and return data in different formats, the most common being JSON, XML and images. You specify the media type in request and response definitions. Here is an example of a response definition:

```yaml
paths:
  /employees:
    get:
      summary: Returns a list of employees.
      responses:
        "200": # Response
          description: OK
          content: # Response body
            application/json: # Media type
              schema: # Must-have
                type: object # Data type
                properties:
                  id:
                    type: integer
                  name:
                    type: string
                  fullTime:
                    type: boolean
                example: # Sample data
                  id: 1
                  name: Jessica Right
                  fullTime: true
```

Under `responses` we have definitions of individual responses. As you can see, each response is defined by its code (`'200'` in our example.). The keyword `content` below the code corresponds to the response body. One or multiple media types go as child keywords of this `content` keyword. Each media type includes a `schema`, defining the data type of the message body, and, optionally, one or several examples. For more information on defining body data, see [Defining Request Body](/specification/describing-request-body/) and [Defining Responses](/specification/describing-responses/).

### Media Type Names

The media types listed below the `content` field should be compliant with [RFC 6838](https://datatracker.ietf.org/doc/html/rfc6838). For example, you can use standard types or vendor-specific types (indicated by `.vnd`) –

```yaml
application/json
application/xml
application/x-www-form-urlencoded
multipart/form-data
text/plain; charset=utf-8
text/html
application/pdf
image/png
```

```yaml
application/vnd.mycompany.myapp.v2+json
application/vnd.ms-excel
application/vnd.openstreetmap.data+xml
application/vnd.github-issue.text+json
application/vnd.github.v3.diff
image/vnd.djvu
```

### Multiple Media Types

You may want to specify multiple media types:

```yaml
paths:
  /employees:
    get:
      summary: Returns a list of employees.
      responses:
        "200": # Response
          description: OK
          content: # Response body
            application/json: # One of media types
              schema:
                type: object
                properties:
                  id:
                    type: integer
                  name:
                    type: string
                  fullTime:
                    type: boolean
            application/xml: # Another media types
              schema:
                type: object
                properties:
                  id:
                    type: integer
                  name:
                    type: string
                  fullTime:
                    type: boolean
```

To use the same data format for several media types, define a custom object in the `components` section of your spec and then refer to this object in each media type:

```yaml
paths:
  /employees:
    get:
      responses:
        "200": # Response
          description: OK
          content: # Response body
            application/json: # Media type
              schema:
                $ref: "#/components/schemas/Employee" # Reference to object definition
            application/xml: # Media type
              schema:
                $ref: "#/components/schemas/Employee" # Reference to object definition
components:
  schemas:
    Employee: # Object definition
      type: object
      properties:
        id:
          type: integer
        name:
          type: string
        fullTime:
          type: boolean
```

To define the same format for multiple media types, you can also use placeholders like `*/*`, `application/*`, `image/*` or others:

```yaml
paths:
  /info/logo:
    get:
      responses:
        "200": # Response
          description: OK
          content: # Response body
            image/*: # Media type
              schema:
                type: string
                format: binary
```

The value you use as media type – `image/*` in our example – is very similar to what you can see in the `Accept` or `Content-Type` headers of HTTP requests and responses. Do not confuse the placeholder and the actual value of the `Accept` or `Content-Type` headers. For example, the `image/*` placeholder for a response body means that the server will use the same data structure for all the responses that match the placeholder. It does not mean that the string _image/\*_ will be specified in the `Content-Type` header. The `Content-Type` header most likely will have _image/png_, _image/jpeg_, or some other similar value.

_Did not find what you were looking for? [Ask the community](https://community.smartbear.com/t5/Swagger-Open-Source-Tools/bd-p/SwaggerOSTools)
Found a mistake? [Let us know](https://github.com/swagger-api/swagger.io/issues)_
