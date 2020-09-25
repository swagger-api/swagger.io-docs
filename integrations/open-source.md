# Tools and Integrations

Here you can find a list of libraries and frameworks serving the Swagger ecosystem.

The main list consists of tools that provide support for the latest **Swagger 2.0**. Below, you can find a list of tools that have not yet been updated.

## Swagger-Group Projects

These are the projects that were created by the same people who authored the Swagger Specification:

Name | Main Purpose | Description
---|---|---
[swagger-js](https://github.com/swagger-api/swagger-js) | Javascript integration |A Swagger implementation for JavaScript.
[swagger-ui](https://github.com/swagger-api/swagger-ui) | Swagger description rendering | A dependency-free collection of HTML, Javascript, and CSS assets that dynamically generate beautiful documentation from a Swagger-compliant API.
[swagger-tools](https://github.com/apigee-127/swagger-tools) | Node.js middleware | A Node.js and browser module that provides tooling for validation and more around Swagger
[swagger-editor](https://github.com/swagger-api/swagger-editor) | Swagger description editing | Swagger Editor lets you edit API specifications in YAML inside your browser and to preview documentations in real time. Valid Swagger JSON descriptions can then be generated and used with the full Swagger tooling (code generation, documentation, etc).
[swagger-core](https://github.com/swagger-api/swagger-core) | Java integration | A Swagger implementation for Java/Scala. Has integration with JAX-RS (Jersey, Resteasy, CXF...), Servlets and Play Framework.
[swagger-parser](https://github.com/swagger-api/swagger-parser) | Java integration | A reader of Swagger definitions in Java.
[swagger-codegen](https://github.com/swagger-api/swagger-codegen) | Client/Server code generation | A template-driven engine to generate client code in different languages by parsing your Swagger documentation.
[swagger-node](https://github.com/swagger-api/swagger-node) | Node.js integration | Tool for building APIs in Node.js with integration for Express, hapi, restify, and Sails.
[validator-badge](https://github.com/swagger-api/validator-badge) | Validation service | Validate your Swagger definitions as a service.


## Community-Driven Language Integrations

All the tools under this section support Swagger 2.0.

#### Clojure

Name | Description
---|---
[ring-swagger](https://github.com/metosin/ring-swagger) | Swagger implementation for Clojure/Ring using Prismatic Schema for data models
[compojure-api](https://github.com/metosin/compojure-api) | Swagger for Compojure
[fnhouse-swagger](https://github.com/metosin/fnhouse-swagger) | Swagger for fnhouse
[pedestal-swagger](https://github.com/frankiesardo/pedestal-swagger) | Swagger for pedestal
[swagger1st](https://github.com/sarnowski/swagger1st) | A Clojure/Ring handler that does parsing, validation and routing based on swagger definitions.
[Friboo](https://github.com/zalando/friboo) | Utility library for writing microservices in Clojure, with support for Swagger and OAuth.

#### ColdFusion

Name | Description
---|---
[swagger-sdk](https://www.forgebox.io/view/swagger-sdk) | This module allows for software development using the Swagger/OpenAPI specification and utilizes the v3.0 OpenAPI Specification
[cbSwagger](https://www.forgebox.io/view/cbswagger) | This module automatically generates OpenAPI ( fka Swagger ) documentation from your configured ColdBox MVC application and module routes.

#### C++

Name | Description
---|---
[oatpp-swagger](https://github.com/oatpp/oatpp-swagger) | Swagger-UI integration for [oat++](https://oatpp.io/) applications. Utilizes OpenAPI 3.0.0 Specification.

#### D

Name | Description
---|---
[swaggerize](https://github.com/gedaiu/swaggarize) | Specification parsing and structures, request validation and handler bindings.

#### Delphi

Name | Description
---|---
[SwagDoc](https://github.com/marcelojaloto/SwagDoc) | SwagDoc is a Delphi library to generate swagger.json file for Swagger Spec version 2.0. Create a public documentation REST API using Swagger 2.0 for Delphi Language.


#### Erlang

Name | Description
---|---
[cowboy-swagger](https://github.com/inaka/cowboy-swagger) | Add swagger compliant specifications to your [cowboy](https://github.com/ninenines/cowboy) web server. Available on [hex.pm](https://hex.pm/packages/cowboy_swagger).

#### Elixir

Name | Description
---|---
[PhoenixSwagger](https://github.com/xerions/phoenix_swagger) | `PhoenixSwagger` is the library that provides Swagger integration to the [Phoenix](http://www.phoenixframework.org/) web framework. It generates Swagger specification for Phoenix controllers and validates the requests.

#### Elm
Name | Description
---|---
[swagger-to](https://github.com/Parquery/swagger-to) | `swagger-to` generates Elm client code from a Swagger spec.

#### Gitlab

Name | Description
---|---
[swagger-template](https://gitlab.com/tijsg/swagger-template) | A template project to automatically turn your YAML files into Swagger UI documentation.

#### Go

Name | Description
---|---
[go-swagger](https://github.com/casualjim/go-swagger) | A toolkit to support your API development with Swagger.
[goa](https://github.com/raphael/goa) | goa is a framework for building RESTful microservices in Go with first class Swagger support.
[grpc-gateway](https://github.com/gengo/grpc-gateway) | generate a REST gateway and swagger definition from a [gRPC](http://grpc.io) protobuf definition
[swagger-to](https://github.com/Parquery/swagger-to) | `swagger-to` generates Go server code from a Swagger spec.

#### Haskell

Name | Description
---|---
[swagger2](http://hackage.haskell.org/package/swagger2) |  Express swagger 2.0 schemas in Haskell
[servant-swagger](http://hackage.haskell.org/package/servant-swagger) |  Servant is a framework for building RESTful microservices in Haskell with first class Swagger support via servant-swagger.

#### Java

Name | Description
---|---
[assertj-swagger](https://github.com/RobWin/assertj-swagger) | assertj-swagger is a library which compares a design-first Swagger YAML with an implementation-first Swagger JSON output (e.g. from springfox). assertj-swagger allows to validate that the implementation in compliance with the design specification.
[binder-swagger-java](https://github.com/tminglei/binder-swagger-java) | binder-swagger-java was designed to help construct the swagger object, corresponding to swagger.json, and let it accessible from swagger ui or other http visitors.
[dropwizard-swagger](https://github.com/smoketurner/dropwizard-swagger) | A dropwizard bundle that wraps Swagger-Core.
[elide](http://elide.io/) | A framework for building [JSON-API](http://jsonapi.org/) web services with generated Swagger documentation.
[jooby-swagger](http://jooby.org/doc/swagger) | Export [jooby apps](http://jooby.org) to Swagger Spec 2.0.
[restlet-framework](http://restlet.com/technical-resources/restlet-framework/guide/2.3/extensions/swagger) | Restlet Framework extension that supports auto-generation of Swagger 2.0 from Restlet API and JAX-API applications
[springfox](https://springfox.github.io/springfox) | Integrates with Spring MVC with support for Swagger 1.2 and Swagger 2.0 spec.
[swagger-codegen-maven-plugin](https://github.com/garethjevans/swagger-codegen-maven-plugin) | A maven build plugin which allows the codegen project to be triggered for generating clients, etc. during the build process.
[swagger2markup](https://github.com/RobWin/swagger2markup) | Swagger2Markup converts a Swagger JSON or YAML file into AsciiDoc or Markdown documents which can be combined with hand-written documentation. The AsciiDoc documents can be converted into HTML5, PDF and EPUB. The Swagger2MarkupConverter supports the Swagger 1.2 and 2.0 specification.
[swagger2markup-gradle-plugin](https://github.com/RobWin/swagger2markup-gradle-plugin) | A Swagger2Markup Gradle Plugin which converts a Swagger JSON or YAML file into AsciiDoc or Markdown documents which can be combined with hand-written documentation. The AsciiDoc documents can be converted into HTML5, PDF and EPUB.
[swagger-maven-plugin](http://kongchen.github.io/swagger-maven-plugin/) | Support Swagger Spec 2.0, integrate with JAX-RS & Spring MVC project, and easily generate `swagger.json` & a static document during build phase.
[swagger-codegen-gradle-plugin](https://github.com/thebignet/swagger-codegen-gradle-plugin) | A Gradle Plugin which wraps swagger-codegen.
[swagger-request-validator](https://bitbucket.org/atlassian/swagger-request-validator) | A standalone library for validating request/response interactions against a Swagger / OpenAPI spec. Framework agnostic, with adapters for WireMock, Rest Assured and Pact.
[Swagger Brake CLI](https://github.com/redskap/swagger-brake) | A library with a CLI interface that checks 2 API specifications for breaking changes.
[Swagger Brake Maven Plugin](https://github.com/redskap/swagger-brake-maven-plugin) | A Maven plugin for Swagger Brake.
[Swagger Brake Gradle Plugin](https://github.com/redskap/swagger-brake-gradle) | A Gradle plugin for Swagger Brake.

#### JavaScript

Name | Description
---|---
[Swagger Parser](https://github.com/BigstickCarpet/swagger-parser#swagger-parser) | Parses, validates, and dereferences JSON/YAML Swagger specs in Node and browsers

#### Jolie

Name | Description
---|---
[Jester - Jolie rEST routER ](https://github.com/jolie/jester) | The toolset allows for the deployment of existing Jolie services as REST microservices. It generates Swagger descriptors to be used in a SwaggerUI. Starting from an existing Swagger descriptor it generates the Jolie client stubs for performing all the available APIs.

#### Lua

Name | Description
---|---
[lua-Spore](https://fperrad.github.io/lua-Spore/swagger/) | A generic ReST client using Swagger 2.0 descriptions.

#### TypeScript

Name | Description
---|---
[NSwag](http://nswag.org) | The toolset generates TypeScript client classes and DTO interfaces to call web service operations (supports JQuery, AngularJS, Angular 2 and more).
[swagger-to](https://github.com/Parquery/swagger-to) | `swagger-to` generates Angular 2+ client code from a Swagger spec.

#### .NET

Name | Description
---|---
[Swashbuckle](https://github.com/domaindrivendev/Swashbuckle) |  Adds some Swagger to your WebApi.
[Swashbuckle.AspNetCore](https://github.com/domaindrivendev/Swashbuckle.AspNetCore) |  Swagger tools for documenting API's built on ASP.NET Core.
[AutoRest](https://github.com/Azure/AutoRest) | The AutoRest tool generates client libraries for accessing RESTful web services from a Swagger specification.
[SwaggerProvider](http://fsprojects.github.io/SwaggerProvider/) | F# Type Provider for Swagger
[NSwag](http://nswag.org) | The toolchain generates Swagger specifications from Web API controllers and client code to access them via C#.
[QSwag](https://github.com/swimlane/qswag) | Fast & Light Swagger generator for .NET Core
[SwaggerWcf](https://github.com/abelsilva/swaggerwcf) | Generates Swagger (2.0) for WCF services and also provides swagger-ui
[Nancy.Swagger](https://github.com/yahehe/Nancy.Swagger) | Generates Swagger for Nancy services on .Net Framework/Core/Standard
[Unchase OpenAPI (Swagger) Connected Service](https://github.com/unchase/Unchase.OpenAPI.Connectedservice) | Visual Studio 2017/2019 extension to generate C# (TypeScript) HttpClient (or C# Controllers) code for OpenAPI (formerly Swagger API) web service with [NSwag](http://nswag.org)

#### Node.js

Name | Description
---|---
[a127](http://a127.io) | a127 is toolkit for modeling & building rich, enterprise-class APIs in Node.js on your laptop. The focal point of a127 is the Swagger 2.0 specification for defining and describing an API model. From the Swagger model you can generate clients, servers and interactive documentation for your API. From [@apigee](https://github.com/apigee)
[api-spec-converter](https://github.com/lucybot/api-spec-converter) | A tool for converting from other API specification formats (e.g. I/O Docs and API Blueprint) to Swagger
[blueoak-server](https://github.com/BlueOakJS/blueoak-server) | BlueOak Server maximizes the value of your Swagger API by using it to drive runtime behavior.
[express-openapi](https://github.com/kogosoftwarellc/express-openapi) | An unopinionated openapi framework for express.
[fleek-parser](https://github.com/fleekjs/fleek-parser) | A simple parser integrated with swagger on top of Koa.js
[fleek-response](https://github.com/fleekjs/fleek-response) | A simple response library integrated with swagger on top of Koa.js
[fleek-router](https://github.com/fleekjs/fleek-router) | A simple router integrated of swagger with Koa.js
[fleek-validator](https://github.com/fleekjs/fleek-validator) | A simple validator integrated with swagger on top of Koa.js
[fury-adapter-swagger](https://github.com/apiaryio/fury-adapter-swagger/) | Fury.js provides uniform interface to API description formats such as API Blueprint and Swagger. `fury-adapter-swagger` is an adapter for Swagger.
[generator-swaggerize](https://github.com/krakenjs/generator-swaggerize) | Yeoman generator for krakenjs/swaggerize tools from [@PayPalDev](https://twitter.com/PayPalDev).
[got-swag](https://github.com/mobilcom-debitel/got-swag) | A CLI and lib to run automated tests on Swagger-powered APIs. Supports monkey testing and customized test suites.
[hapi-swaggered](https://github.com/z0mt3c/hapi-swaggered) | A hapi.js plugin to generate swagger v2.0 compliant specifications based on hapi routes and joi schemas.
[hippie-swagger](https://github.com/cachecontrol/hippie-swagger) | API testing tool with automatic swagger assertions
[oas-nodegen](https://github.com/capitalone/oas-nodegen) | A library for generating completely customizable code from the Open API Specification (FKA Swagger) RESTful API documentation using the scripting power of Node.js
[openapi-mock](https://github.com/penx/openapi-mock) | A CLI to start a mock server based upon a Swagger/OpenAPI JSON or YAML spec file
[pokemock](https://github.com/mobilcom-debitel/pokemock) | A mock server generated from an arbitrary Swagger file. Exports a set of customizable Express middlewares.
[sails-swagger](https://github.com/tjwebb/sails-swagger) | A [Sails.js](http://sailsjs.org) plugin that generates a Swagger (v2.0) document from your application Models, Controllers, and Routes. Also see [swagger.balderdash.io](http://swagger.balderdash.io) for a Sails-themed Swagger UI.
[serverless_swagger](https://github.com/Reckon-Limited/serverless_swagger) | A [Serverless](http://serverless.com) plugin that generates serverless configuration, api gateway events, and basic handler stub functions from a Swagger specification.
[swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) | Takes JSDoc comments from any set of JavaScript files and generates a swagger specification file, that could be consumed by Swagger UI. Works also with CLI.
[swagger-mongodb](https://github.com/kaizhu256/node-swagger-mongodb) | lightweight swagger-ui crud-api backed by mongodb
[swagger-tools](https://github.com/apigee-127/swagger-tools) | Various Swagger tools for JavaScript including an API/CLI (conversion, validation, ...) and [Connect](https://github.com/senchalabs/connect) middleware for routing, validation, security and swagger-ui.
[swaggerize-express](https://github.com/krakenjs/swaggerize-express) | Design-driven RESTful apis with swagger and express from [@PayPalDev](https://twitter.com/PayPalDev).
[swaggerize-hapi](https://github.com/krakenjs/swaggerize-hapi) | Design-driven RESTful apis with swagger and hapi from [@PayPalDev](https://twitter.com/PayPalDev).
[swagmock](https://github.com/subeeshcbabu/swagmock) | Mock data generator for swagger api. Generates mock request and response according to swagger api specification of your application. [Examples](https://github.com/subeeshcbabu/swagmock/blob/master/docs/EXAMPLES.md)
[Swagger Express Middleware](https://github.com/BigstickCarpet/swagger-express-middleware/#swagger-express-middleware) | Swagger middleware and mocks for Express.js
[Swagger Parser](https://github.com/BigstickCarpet/swagger-parser#swagger-parser) | Parses, validates, and dereferences JSON/YAML Swagger specs in Node and browsers
[test2doc.js](https://github.com/stackia/test2doc.js) | Autogenerate Swagger specification from your tests/specs.
[koa-joi-swagger](https://github.com/zaaack/koa-joi-swagger) | Using joi schema to validate and generate Swagger UI, for koa.
[swagger-stats](https://github.com/slanatech/swagger-stats)|API Telemetry based on Swagger(OpenAPI) specification. Trace API calls and Monitor API performance, health and usage statistics in Node.js Microservices

#### Perl

Name | Description
---|---
[Raisin](https://github.com/khrt/Raisin) | A framework with a built-in Swagger support.
[Mojolicious::Plugin::OpenAPI](https://metacpan.org/pod/Mojolicious::Plugin::OpenAPI) | Generates [Mojolicious](http://mojolicio.us/) routes and input/output validation rules.
[OpenAPI::Client](https://metacpan.org/pod/OpenAPI::Client) | Perl generator for user agent code

#### PHP

Name | Description
---|---
[cakephp-swagger](https://packagist.org/packages/alt3/cakephp-swagger) | CakePHP 3.x plugin that adds auto-generated Swagger 2.0 documentation to your projects using swagger-php and swagger-ui.
[Swagger-PHP](https://packagist.org/packages/zircote/swagger-php) | a library implementing the swagger.io specification to describe web services, operations/actions and models enabling a uniform means of producing, consuming, and visualizing RESTful web services.
[SwaggerAssertions](https://github.com/Maks3w/SwaggerAssertions) | Swagger 2 test assertions for validate your API requests and responses
[php-swaggerize-fastroute-library](https://packagist.org/packages/iadvize/php-swaggerize-fastroute-library#0.2.0) | a package to automatically generate FastRoute from swagger json definition. It's compatible with Lumen as long as you use controller class
[SwaggerGen](https://github.com/vanderlee/PHPSwaggerGen) | a Swagger 2.0 documentation generator for existing PHP source code, using human-writeable PHP-Documentor style comments like `@rest\form int[0,123> age Age of the person`. With builtin preprocessor.
[Jane OpenAPI](https://github.com/janephp/open-api) | Generate a PHP Client API (PSR7 compatible) given a OpenAPI (Swagger) specification.
[gossi/swagger](https://github.com/gossi/swagger) | A php library to manipulate swagger specifications
[calcinai/strut](https://github.com/calcinai/strut) | A complete OpenAPI manipulation library. Allows full creation/loading, modification and serialization of specifications.
[byjg/swagger-test](https://github.com/byjg/php-swagger-test) | A set of tools for test your REST calls based on the swagger documentation using PHPUnit.

#### Python

Name | Description
---|---
[falsy](https://github.com/pingf/falsy) | with FAL.S.Y, you can use falcon, swagger-ui, yml together, which makes writing api easy!
[pyramid-swagger](https://github.com/striglia/pyramid_swagger) | Convenient tools for using Swagger to define and validate your interfaces in a Pyramid webapp.
[pyramid-openapi3](https://github.com/pylons/pyramid_openapi3) | Validate Pyramid views and responses against an OpenAPI 3.0 document.
[flask-restplus](https://github.com/noirbizarre/flask-restplus) | Helpers, syntaxic sugar and Swagger documentation for Flask-Restful
[pyswagger](https://github.com/AntXlab/pyswagger) | A type-safe, dynamic, spec-compliant Swagger client.
[flex](https://github.com/pipermerriam/flex) | Swagger 2.0 schema validation, and tooling for validating arbitrary request/response objects.
[Flasgger](https://github.com/rochacbruno/flasgger) | Flask Extension to provide Swagger 2.0 to any view  using docstrings (embeds swagger UI)
[flask-swagger](https://github.com/gangverk/flask-swagger) | A Swagger 2.0 extractor for Flask via YAML in docstrings
[bravado](https://github.com/Yelp/bravado) | Swagger 2.0 client with support for both synchronous and asynchronous http.
[bravado-core](https://github.com/Yelp/bravado-core) | Library for Swagger 2.0 schema ingestion, validation, request/response validation, etc.
[swagger-spec-validator](https://github.com/Yelp/swagger_spec_validator) | Library for validating Swagger 1.2 and 2.0 schemas.
[swagger-py-codegen](https://github.com/guokr/swagger-py-codegen) | Generate Flask-RESTful application code from a Swagger Specification doc.
[Connexion](https://github.com/zalando/connexion) | Swagger-first REST framework on top of Flask with validation and OAuth 2 support.
[pecan-swagger](https://github.com/elmiko/pecan-swagger) | Partial swagger extractor for pecan.
[swagger-parser](https://github.com/Trax-air/swagger-parser) | Give useful informations about your swagger files.
[swagger-tester](https://github.com/Trax-air/swagger-tester) | Automatic swagger API tester.
[swagger-aggregator](https://github.com/Trax-air/swagger-aggregator) | Aggregate several swagger APIs in one.
[swagger-stub](https://github.com/Trax-air/swagger-stub) | Generate a stub from a swagger file.
[bottle-swagger](https://github.com/ampedandwired/bottle-swagger) | Swagger integration for the Bottle web framework
[prance](https://github.com/jfinkhaeuser/prance) | Swagger parser that resolves JSON references.
[spec-synthase](https://github.com/MicroarrayTecnologia/spec-synthase) | Spec-Synthase is a tool to help deal with big swagger 2.0 files, by building the swagger specification file from small yaml files.
[FastAPI](https://github.com/tiangolo/fastapi) | High performance, easy to learn, fast to code, ready for production. Powered by Starlette and Pydantic. Based on OpenAPI 3. Includes Swagger UI as a frontend. All using Python 3.6+ types to declare request parameters, bodies, etc. With automatic data serialization, conversion, validation and documentation.
[swagger-to](https://github.com/Parquery/swagger-to) | `swagger-to` generates Python client code with type annotations (based on `requests`) from a Swagger spec.


#### R

Name | Description
---|---
[plumber](https://github.com/rstudio/plumber) | Create an API powered by the R language whose default OpenAPI documentation is served by `swagger`.
[swagger](https://github.com/rstudio/swagger) | Dynamically Generate Documentation from a 'Swagger' Compliant R API.

#### Ruby

Name | Description
---|---
[Apivore](https://github.com/westfieldlabs/apivore) | RSpec based tool to test your API against its Swagger 2.0 specification.
[grape-swagger](https://github.com/ruby-grape/grape-swagger) | Add Swagger compliant documentation to your grape API.
[MiniApivore](https://github.com/alekseyl/mini-apivore) | MiniTest based revision of Apivore gem, a tool to test your API against its Swagger 2.0 specification.
[oas_parser](https://github.com/Nexmo/oas_parser) | A Ruby Open API Spec 3 Definition Parser.
[swagger-blocks](https://github.com/fotinakis/swagger-blocks) | Define and serve live-updating Swagger JSON for Ruby apps.
[swagger_engine](https://github.com/batdevis/swagger_engine) | include [Swagger-ui](https://github.com/swagger-api/swagger-ui) as mountable rails engine.
[svelte](https://github.com/notonthehighstreet/svelte) | Dynamic Ruby client generator for Swagger 2.0 compliant APIs.
[rspec-rails-swagger](https://github.com/drewish/rspec-rails-swagger) | Generate Swagger 2.0 docs for Rails apps using RSpec request specs. Test results can be captured as response examples.
[rswag](https://github.com/domaindrivendev/rswag) | Swagger tooling for Rails API's. Generate beautiful API documentation, including a UI to explore and test operations, directly from your rspec integration tests.

#### Scala

Name | Description
---|---
[sbt-swagger-codegen](https://github.com/unicredit/sbt-swagger-codegen) | Models, Client and Server code generation integrated as an SBT plugin. Generate code from your Swagger files | Client and Server depends on [playframework](http://www.playframework.com).
[play-swagger](https://github.com/zalando/play-swagger) | Plugin that with Play Framework makes it easy to build RESTful web services from a Swagger API specification as the single source of truth.
[Fintrospect](http://www.fintrospect.io/) | Finagle-based web framework which generates typesafe endpoint Swagger documentation out of the box, including generation of JSON-schema for models descriptions.
[swagger-akka-http](https://github.com/swagger-akka-http/swagger-akka-http) | Support for generating OpenAPI documentation for akka-http based applications.

#### Swift

Name | Description
---|---
[SwagGen](https://github.com/yonaskolb/SwagGen) | Swift command line tool for generating client side code from a Swagger spec. Built in support for Swift target.

### Community-Driven Tools
These are third party tools generated by the Swagger community:

Name | Description
---|---
[APIs.guru](https://github.com/APIs-guru/api-models) | Wikipedia for Web APIs. Directory of REST API specs in OpenAPI(fka Swagger) 2.0 format. https://APIs.guru
[API Spots](https://apispots.github.io) | The API Spots project is a collection of 'human-friendly' tools for anyone interested in discovering, exploring and interacting with APIs without the need for a technology background.  
[bootprint-swagger](https://github.com/nknapp/bootprint-swagger) | A tool for creating static documentation from Swagger definitions, with customizable styles and templates using [Handlebars](http://handlebarsjs.com), [LessCss](http://lesscss.org) and [Bootstrap](http://getbootstrap.com).
[Dredd](https://github.com/apiaryio/dredd) | Language-agnostic command-line tool for validating Swagger document against backend implementation of the API.
[ember-swagger-ui](https://github.com/rynam0/ember-swagger-ui) | An [ember-cli](http://www.ember-cli.com) addon for quickly and easily adding [swagger-ui](https://github.com/swagger-api/swagger-ui) to your [EmberJS](http://emberjs.com/) application.
[generator-openapi-repo](https://github.com/Rebilly/generator-openapi-repo) | [Yeoman](http://yeoman.io/) generator to setup GitHub repo with spec, documentation ([ReDoc](https://github.com/Rebilly/ReDoc) + [swagger-ui](https://github.com/swagger-api/swagger-ui)) and live-editing with [swagger-editor](https://github.com/swagger-api/swagger-editor).
[intellij-swagger](https://github.com/zalando/intellij-swagger) | [Swagger Plugin](https://plugins.jetbrains.com/plugin/8347) helps you to easily edit OpenAPI/Swagger specification files inside [IntelliJ IDEA](https://www.jetbrains.com/idea)
[linter-swagger](https://atom.io/packages/linter-swagger) | [Atom](https://atom.io) Package for linting Swagger spec
[ReDoc](https://github.com/Rebilly/ReDoc) | OpenAPI/Swagger-generated API Reference Documentation. [Demo](https://rebilly.github.io/ReDoc/)
[swagger-commander](https://github.com/khangiskhan/swagger-commander) | Plug & play command line interface to Swagger APIs.
[swagger-confluence](https://cloud.slkdev.net/swagger-confluence) | A tool for parsing a Swagger Schema and publishing API documentation to an Atlassian Confluence wiki. Includes a Java library, a command line executor, and a Gradle plugin.
[swagger-diff](https://github.com/civisanalytics/swagger-diff) | A command-line utility, RSpec matcher, and Ruby library for comparing two Swagger specifications.
[swagger-style-validator](https://github.com/JaffSoft/swagger-style-validator) | A customizable style validator to make sure your Swagger/OpenApi spec follows your organization's standards.
[SwagDefGen](https://github.com/Roger13/SwagDefGen) | JSON request/response mocks to Swagger definitions converter.
[vscode-apielements](https://marketplace.visualstudio.com/items?itemName=vncz.vscode-apielements) | A Visual Studio Code extension which will bring interactivity into your swagger documents!
[ember-swagger-ui](https://github.com/rynam0/ember-swagger-ui) | An [ember-cli](http://www.ember-cli.com) addon for quickly and easily adding [swagger-ui](https://github.com/swagger-api/swagger-ui) to your [EmberJS](http://emberjs.com/) application.
[commandcar](https://github.com/tikalk/commandcar) | cURL on steroids. Invoke any API from the commandline.
[SwagGen](https://github.com/yonaskolb/SwagGen) | Swift command line tool for generating client side code from a Swagger spec.
[swagger-mock-validator](https://bitbucket.org/atlassian/swagger-mock-validator) | Language-agnostic command-line tool for validating a Swagger document against a mock file, such as a Pact file.
[Spectacle](https://sourcey.com/spectacle) | A beautiful static HTML5 documentation generator for OpenAPI/Swagger 2.0. [Demo](https://cheesestore.github.io/)
[Swagger-ui-themes](https://github.com/ostranme/swagger-ui-themes) | A collection of css themes to spice up your Swagger docs.
[APIFuzzer](https://github.com/KissPeter/APIFuzzer) | Fuzz test your application using your Swagger definition without coding
[swagger-to-flowtype](https://github.com/yayoc/swagger-to-flowtype) | A CLI tool for generating type definitions of [Flow](https://flow.org/) from a given Swagger file.
[swagger_style](https://github.com/Parquery/swagger-to#style-check) | `swagger_style`, a part of `swagger-to` set of tools, checks the style (naming conventions, descriptions _etc._) of a Swagger spec.

### Tools for previous Swagger versions

The tools below do not produce Swagger 2.0 yet. They are listed here as they may still have value for users. Feel free to contribute these projects and help them move to Swagger 2.0!

#### Clojure

Name | Description
---|---
[octohipster](https://github.com/myfreeweb/octohipster) | A hypermedia REST HTTP API library for Clojure.

#### ColdFusion / CFML

Name | Description
---|---
[swagger-docs-cfml](https://github.com/webonix/swagger-docs-cfml) | create swagger docs from CFML (Railo) ReST components.

#### Eiffel

Name | Description
---|---
[swagger](https://github.com/EiffelWebFramework/swagger) | Swagger protocol implementation in Eiffel.

#### Go

Name | Description
---|---
[go-restful](https://github.com/emicklei/go-restful) | library to build REST based Web Services using Google Go.
[Sashay](https://bitbucket.org/seanerussell/sashay) | a Go code generator for REST services that expose a Swagger specification.
[beego](https://github.com/astaxie/beego) | A framework support support auto generate swagger spec from comments
[Swagger spec generator](https://github.com/yvasiyarov/swagger) | A swagger spec auto generator. Doesn't depends on any framework

#### Groovy

Name | Description
---|---
[springfox](https://github.com/springfox/springfox-grails-integration) | SpringFox Grails integration library that produces swagger specification documentation for Grails 3.x. [Here is a demo application](https://github.com/springfox/springfox-grails-demo) showcasing the library integration.
[restapidoc](https://github.com/siemens/restapidoc) | A simple RESTful API documentation plugin for the Grails web application framework.
[swaggydoc](http://grails.org/plugin/swaggydoc) | Swagger Documentation for Grails Controllers. [[Source]](https://github.com/rahulsom/swaggydoc)

#### Java

Name | Description
---|---
[swagger4spring-web](https://github.com/wkennedy/swagger4spring-web) | Integration with Spring MVC.
[swagger-jaxrs-doclet](https://github.com/ryankennedy/swagger-jaxrs-doclet) | A JavaDoc Doclet that can be used to generate a Swagger resource listing suitable for feeding to swagger-ui.
[swaggerj4](https://github.com/SmartBear/swagger4j) | A parsing library to turn swagger specifications into POJOs.
[swaggerapi](https://github.com/ROAMSYS/swaggerapi) | Creates a Swagger resource listing suitable for feeding to swagger-ui by annotating your classes and methods and handles API calls to those methods
[swagger-validator](https://github.com/kenshoo/swagger-validator) | Validates that definitions in a swagger.yaml match the actual Java code.

#### JavaScript

Name | Description
---|---
[swagger-ajax-client](https://github.com/signalfx/swagger-ajax-client) | Swagger client to communicate with a Swagger server using XHR requests from browsers. Includes client-side validation of requests against the given Swagger spec.
[swagger-angular-client](https://github.com/signalfx/swagger-angular-client) | Angular service Swagger client to communicate with a Swagger server using the Angular-specific services (such as $http). Includes client-side validation of requests against the given Swagger spec.
[swagger-client-generator](https://github.com/signalfx/swagger-client-generator) | Client library generator which can be used to create framework or platform-specific Swagger clients given a transport method (e.g. [swagger-angular-client](https://github.com/signalfx/swagger-angular-client) or [swagger-node-client](https://github.com/signalfx/swagger-node-client)).
[swagger-validate](https://github.com/signalfx/swagger-validate) | Validation utility to validate Swagger models or requests against a given spec, useful for writing Swagger client libraries.

#### .Net

Name | Description
---|---
[ServiceStack](https://github.com/ServiceStack/ServiceStack) | a high-performance .NET web services platform that simplifies the development of high-performance REST (JSON, XML, JSV, HTML, MsgPack, ProtoBuf, CSV) and WCF SOAP Web Services. Has support for [Swagger integration](https://github.com/ServiceStack/ServiceStack/wiki/Swagger-API).
[fubumvc-swagger](https://github.com/KevM/fubumvc-swagger) | This project helps your [FubuMVC](https://github.com/DarthFubuMVC/fubumvc) web application generate API documentation via Swagger.
[dotswaggen](https://github.com/skrusty/dotswaggen) | .Net application that generates code (or anything else, e.g. markdown) from a swagger specification file.

#### Node.js

Name | Description
---|---
[Swagger Framework](https://github.com/silas/swagger-framework) | a module for creating Swagger-based apis using the standard HTTP request listener interface (including Express). It supports request normalization/validation, pluggable consumes/produces, spec validation, and more.
[swagger-jack](https://github.com/worldline/swagger-jack) | Express middleware to automatically create route and validate inputs from a swagger descriptor (for NodeJS).
[hapi-swagger](https://github.com/glennjones/hapi-swagger) | A Swagger interface for HAPI.
[Swagger Validation](https://github.com/wonderlic/swagger-validation) | A library to validate a request that integrates with swagger-node-express.
[swagger-node-client](https://github.com/signalfx/swagger-node-client) | Node client to communicate with Swagger servers. Includes detailed client-side validation against the API spec.
[ratify](https://github.com/mac-/ratify) | A [Hapi](http://hapijs.com/) plugin that automatically creates Swagger documentation AND validates request/response parameters using the [JSON Schema](http://json-schema.org/) spec.
[swagger-express](https://github.com/fliptoo/swagger-express) | A simple and clean solution to integrate swagger with express straight away from jsdoc or a yaml file.

#### PHP

Name | Description
---|---
[NelmioApiDocBundle](https://github.com/nelmio/NelmioApiDocBundle) | A Symfony Bundle.
[Restler](https://github.com/Luracast/Restler) | PHP framework, swagger support in 3.0.
[swagger-assert](https://github.com/gong023/swagger-assert) | enable to assert keys in swagger document and API response
[Swaggervel](https://packagist.org/packages/jlapp/swaggervel) | a package for Laravel that uses Swagger-PHP and swagger-ui to auto-generate docs for your project.

#### Python

Name | Description
---|---
[django-rest-swagger](https://github.com/marcgibbons/django-rest-swagger) | Swagger Documentation Generator for Django REST Framework
[django-tastypie-swagger](https://github.com/concentricsky/django-tastypie-swagger) | An adapter to use Swagger with django-tastypie.
[flask-restful-swagger](https://github.com/rantav/flask-restful-swagger) | A Swagger spec extractor for flask-restful.
[tornado-swagger](https://github.com/SerenaFeng/tornado-swagger) | A Swagger-v1.2 specification extractor for Tornado Restful Framework.

#### Ruby

Name | Description
---|---
[swagger-docs](https://github.com/richhollis/swagger-docs) | Generates Swagger files for Rails APIs with a simple DSL.
[source2swagger](https://github.com/solso/source2swagger) | Builds a swagger compliant JSON specification from annotations on the comments of your source code.
[swagger_engine](https://github.com/batdevis/swagger_engine) | include [Swagger-ui](https://github.com/swagger-api/swagger-ui) as mountable rails engine.

#### Scala

Name | Description
---|---
[Scalatra](http://www.scalatra.org/) | see the [Swagger Guide](http://www.scalatra.org/2.2/guides/swagger.html)
[spray-swagger](https://github.com/gettyimages/spray-swagger) | Spray-Swagger brings Swagger support for Spray Apis.
[Api-doc](https://github.com/sun-opsys/api-doc) | Creates swagger docs from easily readable ascii text placed in the code. Depends on [playframework](http://www.playframework.com), but may also be used in other frameworks.

#### Community-Driven Tools
These are third party tools generated by the Swagger community:

Name | Description
---|---
[gform-admin](https://github.com/stemey/gform-admin) | An alternative UI client for Swagger.
[swagger-cli-client](https://github.com/signalfx/swagger-cli-client) | Command-line interface generator to communicate with Swagger servers.
[Swagger2Postman](https://github.com/josephpconley/swagger2postman) | Creates a [Postman](http://www.getpostman.com) collection from live Swagger documentation
