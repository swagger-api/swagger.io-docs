---
title: MIME Types
sidebar:
  order: 4
---

OAS **2** This page applies to OpenAPI Specification ver. 2 (fka Swagger). To learn about the latest version, visit [OpenAPI 3 pages](/specification/media-types).

## MIME Types

An API can accept and return data in different formats, the most common being JSON and XML. You can use the `consumes` and `produces` keywords to specify the MIME types understood by your API. The value of `consumes` and `produces` is an array of MIME types. Global MIME types can be defined on the root level of an API specification and are inherited by all API operations. Here the API uses JSON and XML:

```yaml
consumes:
  - application/json
  - application/xml
produces:
  - application/json
  - application/xml
```

Note that `consumes` only affects operations with a request body, such as POST, PUT and PATCH. It is ignored for bodiless operations like GET. When used on the operation level, `consumes` and `produces` override (not extend) the global definitions. In the following example, the `GET /logo` operation redefines the `produces` array to return an image:

```yaml
paths:
  /logo:
    get:
      summary: Returns the logo image
      produces:
        - image/png
        - image/gif
        - image/jpeg
      responses:
        200:
          description: OK
          schema:
            type: file
```

MIME types listed in `consumes` and `produces` should be compliant with [RFC 6838](https://datatracker.ietf.org/doc/html/rfc6838). For example, you can use standard MIME types such as:

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

as well as vendor-specific MIME types (indicated by `vnd.`):

```yaml
application/vnd.mycompany.myapp.v2+json
application/vnd.ms-excel
application/vnd.openstreetmap.data+xml
application/vnd.github-issue.text+json
application/vnd.github.v3.diff
image/vnd.djvu
```

_Did not find what you were looking for? [Ask the community](https://community.smartbear.com/t5/Swagger-Open-Source-Tools/bd-p/SwaggerOSTools)  
Found a mistake? [Let us know](https://github.com/swagger-api/swagger.io/issues)_
