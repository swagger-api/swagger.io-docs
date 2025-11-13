---
title: File Upload
sidebar:
  order: 2
---

:::note
OAS **3** This guide is for OpenAPI 3.0. If you use OpenAPI 2.0, see our [OpenAPI 2.0 guide](/docs/specification/v2_0/file-upload/).
:::

In OpenAPI 3.0, you can describe files uploaded directly with the request content and files uploaded with `multipart` requests. Use the `requestBody` keyword to describe the request payload containing a file. Under `content`, specify the request media type (such as `image/png` or `application/octet-stream`). Files use a `type: string` schema with `format: binary` or `format: base64`, depending on how the file contents will be encoded. For example:

```yaml
requestBody:
  content:
    image/png:
      schema:
        type: string
        format: binary
```

This definition corresponds to an HTTP request that looks as follows:

```yaml
POST /upload
Host: example.com
Content-Length: 808
Content-Type: image/png

[file content goes there]
```

### Upload via Multipart Requests

To describe a file sent with other data, use the `multipart` media type. For example:

```yaml
requestBody:
  content:
    multipart/form-data:
      schema:
        type: object
        properties:
          orderId:
            type: integer
          userId:
            type: integer
          fileName:
            type: string
            format: binary
```

The corresponding HTTP request payload will include multiple parts:

```yaml
POST /upload
Host: example.com
Content-Length: 2740
Content-Type: multipart/form-data; boundary=abcde12345

--abcde12345
Content-Disposition: form-data; name="orderId"

1195
--abcde12345
Content-Disposition: form-data; name="userId"

545
--abcde12345
Content-Disposition: form-data; name="fileName"; filename="attachment.txt"
Content-Type: text/plain

[file content goes there]
--abcde12345--
```

### Multiple File Upload

Use the `multipart` media type to define uploading an arbitrary number of files (an array of files):

```yaml
requestBody:
  content:
    multipart/form-data:
      schema:
        type: object
        properties:
          filename:
            type: array
            items:
              type: string
              format: binary
```

The corresponding HTTP request will look as follows:

```yaml
POST /upload
Host: example.com
Content-Length: 2740
Content-Type: multipart/form-data; boundary=abcde12345

--abcde12345
Content-Disposition: form-data; name="fileName"; filename="file1.txt"
Content-Type: text/plain

[file content goes there]
--abcde12345
Content-Disposition: form-data; name="fileName"; filename="file2.png"
Content-Type: image/png

[file content goes there]
--abcde12345
Content-Disposition: form-data; name="fileName"; filename="file3.jpg"
Content-Type: image/jpeg

[file content goes there]
--abcde12345--
```

### References

For more information about file upload in OpenAPI, see the following sections of the OpenAPI 3.0 Specification:

[Considerations for File Uploads](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.4.md#considerations-for-file-uploads)

[Special Considerations for multipart Content](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.4.md#special-considerations-for-multipart-content)

_Did not find what you were looking for? [Ask the community](https://community.smartbear.com/t5/Swagger-Open-Source-Tools/bd-p/SwaggerOSTools)  
Found a mistake? [Let us know](https://github.com/swagger-api/swagger.io/issues)_
