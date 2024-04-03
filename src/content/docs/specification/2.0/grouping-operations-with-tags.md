---
title: Grouping Operations With Tags
sidebar:
  order: 12
---

OAS **2** This page applies to OpenAPI Specification ver. 2 (fka Swagger). To learn about the latest version, visit [OpenAPI 3 pages](/docs/specification/grouping-operations-with-tags).

## Grouping Operations With Tags

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

![Tags in Swagger UI](https://swagger.io/wp-content/uploads/2017/02/swagger-ui-tags.png) Optionally, you can specify `description` and `externalDocs` for each tag by using the global `tags` section on the root level. The tag names here should match those used in operations.

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

![OpenAPI tags in Swagger UI](</swagger/media/Images/swagger-ui-tags-(1).png>)

_Did not find what you were looking for? [Ask the community](https://community.smartbear.com/t5/Swagger-Open-Source-Tools/bd-p/SwaggerOSTools)  
Found a mistake? [Let us know](https://github.com/swagger-api/swagger.io/issues)_
