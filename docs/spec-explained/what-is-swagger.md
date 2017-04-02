## What Is Swagger?

Swagger allows you to describe the structure of your APIs so that machines can read them.

The ability of APIs to describe their own structure is the root of all awesomeness in Swagger. Why is it so great? Well, by reading your API’s structure, we can automatically build beautiful and interactive API documentation. We can also automatically generate client libraries for your API in many languages and explore other possibilities like automated testing.

Swagger does this by asking your API to return a YAML or JSON that contains a detailed description of your entire API. This file is essentially a resource listing of your API which adheres to [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md). The specification asks you to include information like:

* What are all the operations that your API supports?

* What are your API’s parameters and what does it return?

* Does your API need some authorization?

* And even fun things like terms, contact information and license to use the API.

You can write a Swagger spec for your API manually, or have it generated automatically from annotations in your source code. Check [swagger.io/open-source-integrations](https://swagger.io/open-source-integrations/) for a list of tools that let you generate Swagger from code.

### So, I’ve got a Swagger spec for my API. Now what?

There are a few ways in which Swagger can help drive your API development further:

* Design-first users: use [Swagger Codegen](https://swagger.io/swagger-codegen/) to **generate a server stub** for your API. The only thing left is to implement the server logic – and your API is ready to go live!

* Use [Swagger Codegen](https://swagger.io/swagger-codegen/) to **generate client libraries** for your API in over 40 languages.

* Use [Swagger UI](https://swagger.io/swagger-ui/) to generate **interactive API documentation** that lets your users try out the API calls directly in the browser.

* Use the spec to connect API-related tools to your API. For example, import the spec to [SoapUI](https://soapui.org/) or [Postman](https://www.getpostman.com/) to create automated tests for your API.

* And more! Check out the [open-source](https://swagger.io/open-source-integrations/) and [commercial tools](https://swagger.io/commercial-tools/) that integrate with Swagger.