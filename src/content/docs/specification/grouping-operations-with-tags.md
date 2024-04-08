---
title: Grouping Operations With Tags
sidebar:
  order: 18
---

:::note
OAS **3** This guide is for OpenAPI 3.0. If you use OpenAPI 2.0, see our [OpenAPI 2.0 guide](/specification/20/grouping-operations-with-tags/).
:::

You can assign a list of `tags` to each API operation. Tagged operations may be handled differently by tools and libraries. For example, Swagger UI uses `tags` to group the displayed operations.

```yaml
    paths:
      /pet/findByStatus:
        get:
          summary: Finds pets by Status
          tags:
            - pets
          ...
      /pet:
        post:
          summary: Adds a new pet to the store
          tags:
            - pets
          ...
      /store/inventory:
        get:
          summary: Returns pet inventories
          tags:
            - store
          ...
```

![OpenAPI tags in Swagger UI](</swagger/media/Images/swagger-ui-tags-(1).png> "OpenAPI tags in Swagger UI")

Optionally, you can specify `description` and `externalDocs` for each tag by using the global `tags` section on the root level. The tag names here should match those used in operations.

```yaml
tags:
  - name: pets
    description: Everything about your Pets
    externalDocs:
      url: http://docs.my-api.com/pet-operations.htm
  - name: store
    description: Access to Petstore orders
    externalDocs:
      url: http://docs.my-api.com/store-orders.htm
```

The tag order in the global tags section also controls the default sorting in Swagger UI. Note that it is possible to use a tag in an operation even if it is not defined on the root level.

_Did not find what you were looking for? [Ask the community](https://community.smartbear.com/t5/Swagger-Open-Source-Tools/bd-p/SwaggerOSTools)  
Found a mistake? [Let us know](https://github.com/swagger-api/swagger.io/issues)_
