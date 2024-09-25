---
title: API General Info
sidebar:
  order: 17
---

:::note
OAS **3** This guide is OpenAPI 3.0.
:::

It is considered to be a good practice to include general information about your API into the specification: version number, license notes, contact data, links to documentation, and more. We particularly recommend doing this for publicly available APIs; as this will can increase user confidence in the services, your company provides. To specify the API metadata, you use properties of the top-level `info` object:

```yaml
openapi: 3.0.0
info:
  # You application title. Required.
  title: Sample Pet Store App

  # API version. You can use semantic versioning like 1.0.0,
  # or an arbitrary string like 0.99-beta. Required.
  version: 1.0.0

  # API description. Arbitrary text in CommonMark or HTML.
  description: This is a sample server for a pet store.

  # Link to the page that describes the terms of service.
  # Must be in the URL format.
  termsOfService: http://example.com/terms/

  # Contact information: name, email, URL.
  contact:
    name: API Support
    email: support@example.com
    url: http://example.com/support

  # Name of the license and a URL to the license description.
  license:
    name: Apache 2.0
    url: http://www.apache.org/licenses/LICENSE-2.0.html

  # Link to the external documentation (if any).
  # Code or documentation generation tools can use description as the text of the link.
  externalDocs:
    description: Find out more
    url: http://example.com
```

The `title` and `version` properties are required, others are optional.

### Reference

[Info Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#infoObject)

_Did not find what you were looking for? [Ask the community](https://community.smartbear.com/t5/Swagger-Open-Source-Tools/bd-p/SwaggerOSTools)  
Found a mistake? [Let us know](https://github.com/swagger-api/swagger.io/issues)_
