##What is Swagger?

The goal of Swagger™ is to define a standard, language-agnostic interface to REST APIs which allows both humans and computers to discover and understand the capabilities of the service without access to source code, documentation, or through network traffic inspection. When properly defined via Swagger, a consumer can understand and interact with the remote service with a minimal amount of implementation logic. Similar to what interfaces have done for lower-level programming, Swagger removes the guesswork in calling the service.

Technically speaking - Swagger is a [formal specification](specification) surrounded by a large ecosystem of [tools](/tools), which includes everything from front-end user interfaces, low-level code libraries and commercial API management solutions.

## How do I get started?

If you're an API provider and want to use Swagger to describe your APIs - there are several approaches available:
- A top-down approach where you would use the [Swagger Editor](http://editor.swagger.io) to create your Swagger definition and then use the integrated [Swagger Codegen](swagger-codegen) tools to generate server implementation.
- A bottom-up approach where you have an existing REST API for which you want to create a Swagger definition. Either you create the definition manually (using the same Swagger Editor mentioned above), or if you are using one of the supported frameworks (JAX-RS, node.js, etc), you can get the Swagger definition generated automatically for you. If you're doing JAX-RS have a look at the example at https://github.com/swagger-api/swagger-core/wiki/Swagger-Core-JAX-RS-Project-Setup-1.5.X.

If on the other hand you're an API Consumer who wants to integrate with an API that has a Swagger definition you can use the online version of the [Swagger UI](http://petstore.swagger.io/) to explore the API (given that you have a URL to the APIs Swagger definition) - and then use [Swagger Codegen](swagger-codegen) to generate the client library of your choice.

In either case - be sure to check out the long list of both [open source projects](open-source-integrations) and [commercial vendors](commercial-tools) that are available for Swagger - perhaps there is something there targeting your specific needs.

## Other Resources

["What is Swagger?"](http://swagger.io/getting-started-with-swagger-i-what-is-swagger/)


## Support
The following methods are available to obtain support for Swagger:

- [The Swagger Google Group](https://groups.google.com/forum/#!forum/swagger-swaggersocket) - This would normally be your first stop to get support for Swagger. Here you can find previously asked question, and ask new ones. When asking a question, please provide as much information as you can regarding the environment you use (development language, library, versions).
- IRC! you can find us on [freenode](http://webchat.freenode.net/?channels=swagger) in the channel #Swagger. You can talk with us directly there.
