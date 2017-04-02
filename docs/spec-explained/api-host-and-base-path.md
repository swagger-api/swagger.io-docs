## API Host and Base URL

REST APIs have a base URL to which the endpoint paths are appended. The base URL is defined by `schemes`, `host` and `basePath` on the root level of the API specification.

```
host: petstore.swagger.io
basePath: /v2
schemes:
  - https
```

All API paths are relative to this base URL, for example, `/users` actually means `<scheme>://<host>/<basePath>/users`.

![URL structure](../../images/docs/url-structure.png)

### schemes

`schemes` are the transfer protocols used by the API. Swagger supports the `http`, `https`, and [WebSocket](https://en.wikipedia.org/wiki/WebSocket) schemes -- `ws` and `wss`. As with any lists in YAML, schemes can be specified using the list syntax:

```
schemes:
  - http
  - https
```

or the array literal syntax:

```
schemes: [http, https]
```

If `schemes` are not specified, the scheme used to serve the API specification will be used for API calls.

### host

`host` is the domain name or IP address (IPv4) of the host that serves the API. It may include the port number if different from the scheme’s default port (80 for HTTP and 443 for HTTPS). Note that this must be the host only, without *http(s)://* or sub-paths.

Valid hosts:

```
api.example.com
example.com:8089
93.184.216.34
93.184.216.34:8089
```

Incorrect:

```
http://api.example.com
example.com/api/v1
```

If `host` is not specified, it is assumed to be the same host where the API documentation is being served.

### basePath

`basePath` is the URL prefix for all API paths, relative to the host root. It must start with a leading slash `/`. If `basePath` is not specified, it defaults to `/`, that is, all paths start at the host root.

Valid base paths:

```
/v2
/api/v2
/
```

Incorrect:

```
v2
```

### Omitting host and scheme

`host` and `scheme` can be omitted for a more dynamic association. In this case, the host and scheme used to serve the API documentation will be used for API calls. For example, if Swagger UI-based documentation is hosted at *https://api.example.com/apidocs/index.html*, "try it out" API calls will be directed to *https://api.example.com*.

### FAQ

##### **Can I specify multiple hosts, e.g. development, test and production?**

Swagger 2.0 supports only one `host` per API specification (or two if you count HTTP and HTTPS as different hosts).

A possible way to target multiple hosts is to omit the `host` and `schema` from your specification and serve it from each host. In this case, each copy of the specification will target the corresponding host.

Multiple hosts will be supported in version 3.0 of the specification.

##### **Do host and basePath support templating? Such as:**

```
https://{customer_id}.saas-app.com/api/v1
https://api.saas-app.com/v1/{customer_id}/apis
```

In Swagger 2.0, they don't, but this will be possible in 3.0.

For a workaround for host templating, see the previous question.

##### **Can I specify different ports for HTTP and HTTPS? Such as:**

```
http://example.com:8080
https://example.com:8443
```

Swagger 2.0 does not support this, but this will be possible in the next version - 3.0.

For now, you can omit the `host` and `scheme` and serve the specification from both hosts. This way, each copy of the specification will target the host and port used to access that specification.

### Reference

[https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#swagger-object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#swagger-object)