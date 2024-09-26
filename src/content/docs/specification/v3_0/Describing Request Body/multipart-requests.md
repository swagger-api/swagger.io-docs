---
title: Multipart Requests
sidebar:
  order: 3
---

:::note
OAS **3** This guide is for OpenAPI 3.0.
:::

Multipart requests combine one or more sets of data into a single body, separated by boundaries. You typically use these requests for file uploads and for transferring data of several types in a single request (for example, a file along with a JSON object). In OpenAPI 3, you describe a multipart request in the following way:

```yaml
requestBody:
  content:
    multipart/form-data: # Media type
      schema: # Request payload
        type: object
        properties: # Request parts
          id: # Part 1 (string value)
            type: string
            format: uuid
          address: # Part2 (object)
            type: object
            properties:
              street:
                type: string
              city:
                type: string
          profileImage: # Part 3 (an image)
            type: string
            format: binary
```

You start with the `requestBody/content` keyword. Then, you specify the media type of request data. File uploads typically use the `_multipart/form-data_` media type, and mixed-data requests usually use `_multipart/mixed_`. Below the media type, put the `schema` keyword to indicate that you start describing the request payload. You describe individual parts of the request as properties of the `schema` object. As you can see, a multipart request can include various data: strings, objects in JSON format, and binary data. You can also specify one or several files for uploading. (To learn more, see [File Upload](/docs/specification/describing-request-body/file-upload/).) The example above corresponds to the following request:

```yaml
POST /upload HTTP/1.1
Content-Length: 428
Content-Type: multipart/form-data; boundary=abcde12345

--abcde12345
Content-Disposition: form-data; name="id"
Content-Type: text/plain

123e4567-e89b-12d3-a456-426655440000
--abcde12345
Content-Disposition: form-data; name="address"
Content-Type: application/json

{
  "street": "3, Garden St",
  "city": "Hillsbery, UT"
}
--abcde12345
Content-Disposition: form-data; name="profileImage "; filename="image1.png"
Content-Type: application/octet-stream

{…file content…}
--abcde12345--
```

### Specifying Content-Type

By default, the `Content-Type` of individual request parts is set automatically according to the type of the `schema` properties that describe the request parts:

Schema Property Type

Content-Type

Primitive or array of primitives

`text/plain`

Complex value or array of complex values

`application/json`

String in the `binary` or `base64` format

`application/octet-stream`

To set a specific `Content-Type` for a request part, use the `encoding/_{property-name}_/contentType` field. You add `encoding` as a child of the media type property, one the same level where `schema` is located. In the example below, we set the `contentType` for the `profileImage` part of a multipart request to `image/png, image/jpg`:

```yml
requestBody:
  content:
    multipart/form-data:
      schema:
        type: object
        properties: # Request parts
          id:
            type: string
            format: uuid
          address:
            type: object
            properties:
              street:
                type: string
              city:
                type: string
          profileImage:
            type: string
            format: base64
      encoding: # The same level as schema
        profileImage: # Property name (see above)
          contentType: image/png, image/jpeg
```

### Specifying Custom Headers

Parts of multipart requests usually do not use any headers, except for `Content`. In case you need to include custom headers, use the `encoding/_{property-name}_/headers` field to describe these headers (see below). For complete information on describing headers, see [Describing Parameters](/docs/specification/describing-parameters/). Below is an example of a custom header defined for a part of a multipart request:

```yaml
requestBody:
  content:
    multipart/form-data:
      schema:
        type: object
        properties:
          id:
            type: string
            format: uuid
          profileImage:
            type: string
            format: binary
      encoding:
        profileImage: # Property name
          contentType: image/png, image/jpeg
          headers: # Custom headers
            X-Custom-Header:
              description: This is a custom header
              schema:
                type: string
```

This declaration matches the following request:

```yaml
POST /upload HTTP/1.1
Content-Length: 428
Content-Type: multipart/form-data; boundary=abcde12345

--abcde12345
Content-Disposition: form-data; name="id"
Content-Type: text/plain

123e4567-e89b-12d3-a456-426655440000
--abcde12345
Content-Disposition: form-data; name="profileImage"; filename="image1.png"
Content-Type: image/png
X-Custom-Header: x-header

{…file content…}
--abcde12345--
```

_Did not find what you were looking for? [Ask the community](https://community.smartbear.com/t5/Swagger-Open-Source-Tools/bd-p/SwaggerOSTools)  
Found a mistake? [Let us know](https://github.com/swagger-api/swagger.io/issues)_
