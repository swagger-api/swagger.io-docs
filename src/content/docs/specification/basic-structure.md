---
title: Basic Structure
sidebar:
  order: 2
---

:::note
OAS **3** This page is about OpenAPI 3.0. If you use OpenAPI 2.0, visit [OpenAPI 2.0 pages](/specification/20/basic-structure/).
:::

## Basic Structure

You can write OpenAPI definitions in [YAML](https://en.wikipedia.org/wiki/YAML) or [JSON](https://en.wikipedia.org/wiki/JSON). In this guide, we use only YAML examples but JSON works equally well. A sample OpenAPI 3.0 definition written in YAML looks like:

```yaml
openapi: 3.0.0
info:
  title: Sample API
  description: Optional multiline or single-line description in [CommonMark](http://commonmark.org/help/) or HTML.
  version: 0.1.9

servers:
  - url: http://api.example.com/v1
    description: Optional server description, e.g. Main (production) server
  - url: http://staging-api.example.com
    description: Optional server description, e.g. Internal staging server for testing

paths:
  /users:
    get:
      summary: Returns a list of users.
      description: Optional extended description in CommonMark or HTML.
      responses:
        "200": # status code
          description: A JSON array of user names
          content:
            application/json:
              schema:
                type: array
                items:
                  type: string
```

All keyword names are **case-sensitive**.

### Metadata

Every API definition must include the version of the OpenAPI Specification that this definition is based on:

    openapi: 3.0.0

The OpenAPI version defines the overall structure of an API definition – what you can document and how you document it. OpenAPI 3.0 uses [semantic versioning](http://semver.org/) with a three-part version number. The [available versions](https://github.com/OAI/OpenAPI-Specification/releases) are `3.0.0`, `3.0.1`, `3.0.2`, and `3.0.3`; they are functionally the same.

The `info` section contains API information: `title`, `description` (optional), `version`:

    info:
      title: Sample API
      description: Optional multiline or single-line description in [CommonMark](http://commonmark.org/help/) or HTML.
      version: 0.1.9

`title` is your API name. `description` is extended information about your API. It can be [multiline](http://stackoverflow.com/a/21699210) and supports the [CommonMark](http://commonmark.org/help/) dialect of Markdown for rich text representation. HTML is supported to the extent provided by CommonMark (see [HTML Blocks](http://spec.commonmark.org/0.27/) in [CommonMark 0.27 Specification](http://spec.commonmark.org/0.27/)). `version` is an arbitrary string that specifies the version of your API (do not confuse it with file revision or the `openapi` version). You can use [semantic versioning](http://semver.org/) like _major.minor.patch_, or an arbitrary string like _1.0-beta_ or _2017-07-25_. `info` also supports other keywords for contact information, license, terms of service, and other details.

Reference: [Info Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#infoObject).

### Servers

The `servers` section specifies the API server and base URL. You can define one or several servers, such as production and sandbox.

    servers:
      - url: http://api.example.com/v1
        description: Optional server description, e.g. Main (production) server
      - url: http://staging-api.example.com
        description: Optional server description, e.g. Internal staging server for testing

All API paths are relative to the server URL. In the example above, `/users` means `http://api.example.com/v1/users` or `http://staging-api.example.com/users`, depending on the server used. For more information, see [API Server and Base Path](/specification/api-host-and-base-path/).

### Paths

The `paths` section defines individual endpoints (paths) in your API, and the HTTP methods (operations) supported by these endpoints. For example, `GET /users` can be described as:

```yaml
paths:
  /users:
    get:
      summary: Returns a list of users.
      description: Optional extended description in CommonMark or HTML
      responses:
        "200":
          description: A JSON array of user names
          content:
            application/json:
              schema:
                type: array
                items:
                  type: string
```
