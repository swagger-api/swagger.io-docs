---
title: What Is OpenAPI?
sidebar:
  order: 1
---

### What Is OpenAPI?

**OpenAPI Specification** (formerly Swagger Specification) is an API description format for REST APIs. An OpenAPI file allows you to describe your entire API, including:

- Available endpoints (`/users`) and operations on each endpoint (`GET /users`, `POST /users`)
- Operation parameters Input and output for each operation
- Authentication methods
- Contact information, license, terms of use, and other information.

API specifications can be written in YAML or JSON. The format is easy to learn and readable to both humans and machines. The complete OpenAPI Specification can be found on GitHub: [OpenAPI 3.0 Specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md)

### What Is Swagger?

**Swagger** is a set of open-source tools built around the OpenAPI Specification that can help you design, build, document, and consume REST APIs. The major Swagger tools include:

- [Swagger Editor](https://editor.swagger.io) – browser-based editor where you can write OpenAPI definitions.
- [Swagger UI](https://github.com/swagger-api/swagger-ui) – renders OpenAPI definitions as interactive documentation.
- [Swagger Codegen](https://github.com/swagger-api/swagger-codegen) – generates server stubs and client libraries from an OpenAPI definition.
- [Swagger Editor Next (beta)](https://editor-next.swagger.io/) – browser-based editor where you can write and review OpenAPI and AsyncAPI definitions.
- [Swagger Core](https://github.com/swagger-api/swagger-core) – Java-related libraries for creating, consuming, and working with OpenAPI definitions.
- [Swagger Parser](https://github.com/swagger-api/swagger-parser) – standalone library for parsing OpenAPI definitions.
- [Swagger APIDom](https://github.com/swagger-api/apidom) – provides a single, unifying structure for describing APIs across various description languages and serialization formats.

### Why Use OpenAPI?

The ability of APIs to describe their own structure is the root of all awesomeness in OpenAPI. Once written, an OpenAPI specification and Swagger tools can drive your API development further in various ways:

- Design-first users: use [Swagger Codegen](https://github.com/swagger-api/swagger-codegen) to **generate a server stub** for your API. The only thing left is to implement the server logic – and your API is ready to go live!
- Use [Swagger Codegen](https://github.com/swagger-api/swagger-codegen) to **generate client libraries** for your API in over 40 languages.
- Use [Swagger UI](https://github.com/swagger-api/swagger-ui) to generate **interactive API documentation** that lets your users try out the API calls directly in the browser.
- Use the spec to connect API-related tools to your API. For example, import the spec to [SoapUI](https://soapui.org/) to create automated tests for your API.
- And more! Check out the [open-source](https://swagger.io/tools/open-source/open-source-integrations/) and [commercial tools](https://swagger.io/commercial-tools/) that integrate with Swagger.
