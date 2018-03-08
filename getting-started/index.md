## What is Swagger?

If you've ever worked with APIs, chances are you've heard of Swagger. Swagger is the most widely used tooling ecosystem for developing APIs with the OpenAPI Specification (OAS). Swagger consists of both open source as well as professional tools, catering to almost every need and use case. 
Swagger is spearheaded by SmartBear Software.

### A Brief History Lesson
Swagger used to consist of the specification and a large ecosystem of [tools to implement](https://swagger.io/tools/) the specification. These tools include everything from front-end user interfaces, low-level code libraries and commercial API management solutions. In 2015, [SmartBear Software](www.smartbear.com) donated the Swagger specification to the Linux Foundation, and renamed the specification to the OpenAPI Specification. SmartBear also became the founding member of the OpenAPI Initiative (OAI), a body to govern the development of the OAS in an open and transparent manner. 


## How do I get started with Swagger and OAS?

If you're an API provider and want to use Swagger tools build your APIs and the OpenAPI specification to describe your APIs - there are several approaches available:

#### Starting from scratch?

* Use the [Swagger Editor](http://editor.swagger.io/) to create your OAS definition and then use [Swagger Codegen](https://swagger.io/swagger-codegen/) to generate server implementation.
* Use the [Swagger UI](https://swagger.io/swagger-ui/) to visualize and document your OAS definition
* Design, document and develop APIs as a team using [SwaggerHub](https://swaggerhub.com)

#### Creating the OAS file from an existing API?

Finding an easy way to generate the OpenAPI definition from an existing API can be challenging. You have to reverse engineer the API and get acquainted with the process of generating the OAS from existing APIs.

The good news is that Swagger tools can help you do this with ease. 

* Use [Swagger Core](https://github.com/swagger-api/swagger-core) open source project to create the OAS from your existing Java APIs. Swagger Core supports frameworks like JAX-RS or node.js. 

  * Have a look at [this example](https://github.com/swagger-api/swagger-core/wiki/Swagger-Core-JAX-RS-Project-Setup-1.5.X) to see how Swagger Core can help your JAX-RS implemented API   

* [Swagger Inspector](inspector.swagger.io) allows you to easily and quickly auto-generate an OAS definition from any API endpoint right from your browser

If on the other hand you're an API Consumer who wants to integrate with an API that has an OpenAPI definition you can use [Swagger Inspector](https://swagger.io/swagger-inspector/) or the online version of [Swagger UI](http://petstore.swagger.io/) to explore the API (given that you have a URL to the APIs Swagger definition) - and then use Swagger Codegen to generate the client library of your choice.

In either case - be sure to check out the long list of [open source projects](https://swagger.io/open-source-integrations/) and our commercial offering, SwaggerHub.

## Other Resources

[Difference Between OpenAPI and Swagger](https://swagger.io/blog/difference-between-swagger-and-openapi/) 

[How to design APIs using OpenAPI 3.0](https://www.youtube.com/watch?v=6kwmW_p_Tig&feature=youtu.be) 

[Documenting Your Existing APIs: API Documentation Made Easy with OpenAPI & Swagger](https://swagger.io/blog/how-to-generate-openapi-swagger/)

[Definition Driven API Development: How OAS & Swagger Help Teams Streamline Their API Development](https://swagger.io/blog/api-development-with-openapi-and-swagger/) 

[Swagger Inspector: A Developer Tool To Test APIs and Generate Your OpenAPI](https://swagger.io/blog/announcing-swagger-inspector/)

## Support

The following methods are available to obtain support for Swagger:

* [The Swagger Google Group](https://groups.google.com/forum/#!forum/swagger-swaggersocket) - This would normally be your first stop to get support for Swagger. Here you can find previously asked questions or ask new ones. When asking a question, please provide as much information as you can regarding the environment you use (development language, library, versions).
* IRC! you can find us on [freenode](http://webchat.freenode.net/?channels=swagger) in the channel #Swagger. You can talk with us directly there.
* You can also [tweet us](https://twitter.com/SwaggerApi) any questions you have @SwaggerAPI

[View Source on GitHub](https://github.com/swagger-api/swagger.io/blob/wordpress//getting-started/index.md)



