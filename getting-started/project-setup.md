##Swagger-Core JAX-RS Project Setup

In order to integrate the Swagger documentation in your application, you'd need to follow these three set up steps:

1. [Adding Swagger's dependencies to your project.](#adding-swaggers-dependencies-to-your-project)
2. [Hook Swagger into your JAX-RS application configuration.](#hooking-up-swagger-core-in-your-application)
3. [Configure and Initialize Swagger.](#configure-and-initialize-swagger)

Each implementation has its own wiki page summarizing the steps:

1. [[Jersey 1.X|Swagger-Core-Jersey-1.X-Project-Setup]]
1. [[Jersey 2.X|Swagger-Core-Jersey-2.X-Project-Setup]]
1. [[RESTEasy 2.X|Swagger-Core-RestEasy-2.X-Project-Setup]]
1. [[Mule|Swagger-Core-Mule-Project-Setup]]


Once you finish the set up process, you can continue on to adding the [[annotations|Annotations]] to your code.

## Adding Swagger's Dependencies to your Project
Swagger uses maven for build and deployment and its artifacts are available at Maven Central. You can use the maven dependencies with any dependency management system that supports maven dependencies such as Maven, Ivy and Gradle.

### Understanding Swagger-Core's Naming Convention

Swagger-Core uses the `groupId` name of `com.wordnik`. This is true to all dependencies.

There are three artifacts that can be applied to JAX-RS:

\# | Artifact Basic Name | JAX-RS Version | Additional Properties
---|---|---|---
1 | `swagger-jaxrs` | 1.0 |
2 | `swagger-jersey-jaxrs` | 1.0 | Supports documentation of Jersey-based file uploads.
3 | `swagger-jersey2-jaxrs` | 2.0 | Supports documentation of Jersey2-based file uploads.

From the table above, you can see that `swagger-jersey2-jaxrs` supports JAX-RS 2.0. This is basically by adding support to the `@BeanParam` annotation, which was introduced in JAX-RS 2.0. This dependency can be used by *any* JAX-RS 2.0 implementation including RestEasy. The only limitation is the support for file upload documentation, which can be done otherwise.

Swagger-Core's 1.3.X versions and prior version use scala, and as such depend on the scala version. All 1.3.X are available with scala 2.10, and starting from 1.3.10, the dependencies are available with scala 2.11 as well.

To get the complete name of the artifact, the scala version is attached to the artifact name. So for scala 2.10, the artifact names would be `swagger-jaxrs_2.10`, `swagger-jersey-jaxrs_2.10` and `swagger-jersey-jaxrs_2.10`.

Scala developers who use version 2.11, can replace `_2.10` with `_2.11`. For Java developers, you can use either, it has no effect on functionality.

### Adding the dependencies to your application

At the time of writing this document, Swagger 1.3.12 is the latest release, which will be used in the examples in this document. It can be assumed that future versions will be attached in a similar manner. Should the behavior change, the document will be updated accordingly. The latest Swagger-Core version can be found here - https://github.com/swagger-api/swagger-core#compatability.

Projects that cannot utilize maven's dependencies would need to add the dependencies manually. Since those may change from version to version, the list of dependencies will not be documented here. Instead, it is advised that you clone the swagger-core repository, go to the directory of the relevant module (artifact) and run `mvn dependency:list`. That would give you a list of dependencies required by swagger-core which you would have to include manually in your application. Keep in mind this requires you to have maven installed but it does not require you to use maven for your project.

### Implementation-Specific Instructions

1. [[Jersey 1.X|Swagger-Core-Jersey-1.X-Project-Setup#adding-the-dependencies-to-your-application]]
1. [[Jersey 2.X|Swagger-Core-Jersey-2.X-Project-Setup#adding-the-dependencies-to-your-application]]
1. [[RESTEasy 2.x|Swagger-Core-RestEasy-2.X-Project-Setup#adding-the-dependencies-to-your-application]]
1. [[Mule|Swagger-Core-Mule-Project-Setup#adding-the-dependencies-to-your-application]]

## Hooking up Swagger-Core in your Application

Swagger-core exposes JAX-RS providers and one JAX-RS resource to generate and serve the Swagger API documentation. In this section we'll explore the various methods of hooking these components with your application to start serving your documentation.

A successful hook-up will give you access to Swagger's `/api-docs`. It does not mean the `/api-docs` will be populated, and you may need to follow the Swagger Configuration step as well.

### Implementation-Specific Instructions

1. [[Jersey 1.X|Swagger-Core-Jersey-1.X-Project-Setup#hooking-up-swagger-core-in-your-application]]
1. [[Jersey 2.X|Swagger-Core-Jersey-2.X-Project-Setup#hooking-up-swagger-core-in-your-application]]
1. [[RESTEasy 2.X|Swagger-Core-RestEasy-2.X-Project-Setup#hooking-up-swagger-core-in-your-application]]
1. [[Mule|Swagger-Core-Mule-Project-Setup#hooking-up-swagger-core-in-your-application]]

## Configure and Initialize Swagger
The final step is to configure Swagger and initialize it. This is required for Swagger to scan the resources and expose them.

### Implementation-Specific Instructions

1. [[Jersey 1.X|Swagger-Core-Jersey-1.X-Project-Setup#configure-and-initialize-swagger]]
1. [[Jersey 2.X|Swagger-Core-Jersey-2.X-Project-Setup#configure-and-initialize-swagger]]
1. [[RESTEasy 2.X|Swagger-Core-RestEasy-2.X-Project-Setup#configure-and-initialize-swagger]]
1. [[Mule|Swagger-Core-Mule-Project-Setup#configure-and-initialize-swagger]]
