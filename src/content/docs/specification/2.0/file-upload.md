---
title: File Upload
sidebar:
  order: 8
---

OAS **2** This page applies to OpenAPI Specification ver. 2 (fka Swagger). To learn about the latest version, visit [OpenAPI 3 pages](/docs/specification/describing-request-body/file-upload/).

## File Upload

Swagger 2.0 supports file uploads sent with `Content-Type: multipart/form-data`. That is, your API server must consume `multipart/form-data` for this operation:

```yaml
consumes:
  - multipart/form-data
```

The operation payload is defined using `formData` parameters (not body parameters). The file parameter must have `type: file`:

```yaml
paths:
  /upload:
    post:
      summary: Uploads a file.
      consumes:
        - multipart/form-data
      parameters:
        - in: formData
          name: upfile
          type: file
          description: The file to upload.
```

This definition corresponds to the following HTTP request:

```yaml
    POST /upload
    Host: example.com
    Content-Type: multipart/form-data; boundary=abcde12345
    Content-Length: 204

    --abcde12345
    Content-Disposition: form-data; name="upfile"; filename="example.txt"
    Content-Type: text/plain

    File contents go here.
    --abcde12345--
```

Swagger UI displays file parameters using a file input control, allowing the users to browse for a local file to upload. ![](/swagger/media/Images/swagger-ui-file-upload.png)

### Upload a File + Other Data

File parameters can be sent along with other form data:

```yaml
parameters:
  - in: formData
    name: upfile
    type: file
    required: true
    description: The file to upload.
  - in: formData
    name: note
    type: string
    required: false
    description: Description of file contents.
```

The corresponding HTTP request payload will include multiple parts:

```yaml
    POST /upload
    Host: example.com
    Content-Type: multipart/form-data; boundary=abcde12345
    Content-Length: 332

    --abcde12345
    Content-Disposition: form-data; name="upfile"; filename="example.txt"
    Content-Type: text/plain

    File contents go here.
    --abcde12345
    Content-Disposition: form-data; name="note"

    Uploading a file named "example.txt"
    --abcde12345--
```

### Multiple Upload

You can have several named file parameters, each defined individually:

```yaml
parameters:
  - in: formData
    name: upfile1
    type: file
    required: true
  - in: formData
    name: upfile2
    type: file
    required: false
  - in: formData
    name: upfile3
    type: file
    required: false
```

However, uploading an arbitrary number of files (an array of files) is not supported. There is an open feature request at [https://github.com/OAI/OpenAPI-Specification/issues/254](https://github.com/OAI/OpenAPI-Specification/issues/254). For now, you can use a binary string array as a workaround for uploading an arbitrary number of files:

```yaml
type: array
items:
  type: string
  format: binary
```

Note that this will not produce the file upload interface in Swagger UI.

### FAQ

**Can I upload files via PUT?**

Swagger 2.0 supports file upload requests with `Content-Type: multipart/form-data`, but does not care about the HTTP method. You can use POST, PUT or any other method, provided that the operation consumes `multipart/form-data`. Uploads where the payload is just the raw file contents are not supported in Swagger 2.0, because they are not `multipart/form-data`. That is, Swagger 2.0 does NOT support something like:

    curl --upload-file archive.zip http://example.com/upload

Note also that file uploading in Swagger UI only works for POST requests, because HTML forms in browsers support GET and POST methods only.

**Can I define the Content-Type for uploaded files?**

This is supported in OpenAPI 3.0, but not in OpenAPI/Swagger 2.0. In 2.0, you can say that an operation accepts a file, but you cannot say that this file is of a specific type or structure.

As a workaround, [vendor extensions](/docs/specification/swagger-extensions/) may be used to extend this functionality, for example:

```yaml
- in: formData
  name: zipfile
  type: file
  description: Contents of the ZIP file.
  x-mimetype: application/zip
```

_Did not find what you were looking for? [Ask the community](https://community.smartbear.com/t5/Swagger-Open-Source-Tools/bd-p/SwaggerOSTools)  
Found a mistake? [Let us know](https://github.com/swagger-api/swagger.io/issues)_
