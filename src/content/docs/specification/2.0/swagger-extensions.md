---
title: Swagger Extensions
sidebar:
  order: 13
---

OAS **2** This page applies to OpenAPI Specification ver. 2 (fka Swagger).  
To learn about the latest version, visit [OpenAPI 3 pages](/docs/specification/swagger-extensions).

## Swagger Extensions

Extensions, or vendor extensions, are custom properties that start with `x-`, such as `x-logo`. They can be used to describe extra functionality that is not covered by the standard Swagger specification. Many API-related products that support Swagger make use of extensions to document their own attributes, such as Amazon API Gateway, ReDoc, APIMatic and others. Extensions are supported on the root level of the API spec and in the following places:

- `info` section
- `paths` section, individual paths and operations
- operation parameters
- `responses`
- `tags`
- security schemes

The extension value can be a primitive, an array, an object or `null`. If the value is an object or array of objects, the object’s property names do not need to start with `x-`.

### Example

An API that uses Amazon API Gateway custom authorizer would include extensions similar to this:

```yaml
securityDefinitions:
  APIGatewayAuthorizer:
    type: apiKey
    name: Authorization
    in: header
    x-amazon-apigateway-authtype: oauth2
    x-amazon-apigateway-authorizer:
      type: token
      authorizerUri: arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:account-id:function:function-name/invocations
      authorizerCredentials: arn:aws:iam::account-id:role
      identityValidationExpression: "^x-[a-z]+"
      authorizerResultTtlInSeconds: 60
```

_Did not find what you were looking for? [Ask the community](https://community.smartbear.com/t5/Swagger-Open-Source-Tools/bd-p/SwaggerOSTools)  
Found a mistake? [Let us know](https://github.com/swagger-api/swagger.io/issues)_
