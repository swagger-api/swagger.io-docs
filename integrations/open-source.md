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

#### D

Name | Description
---|---
[swaggerize](https://github.com/gedaiu/swaggarize) | Specification parsing and structures, request validation and handler bindings.

#### Go

Name | Description
---|---
[go-swagger](https://github.com/casualjim/go-swagger) | A toolkit to support your API development with Swagger.

#### Java

Name | Description
---|---
[assertj-swagger](https://github.com/RobWin/assertj-swagger) | assertj-swagger is a library which compares a design-first Swagger YAML with an implementation-first Swagger JSON output (e.g. from springfox). assertj-swagger allows to validate that the implementation in compliance with the design specification.
[binder-swagger-java](https://github.com/tminglei/binder-swagger-java) | binder-swagger-java was designed to help construct the swagger object, corresponding to swagger.json, and let it accessible from swagger ui or other http visitors.
[dropwizard-swagger](https://github.com/federecio/dropwizard-swagger) | A dropwizard bundle that wraps Swagger-Core.
[restlet-framework](http://restlet.com/technical-resources/restlet-framework/guide/2.3/extensions/swagger) | Restlet Framework extension that supports auto-generation of Swagger 2.0 from Restlet API and JAX-API applications
[springfox](https://springfox.github.io/springfox) | Integrates with Spring MVC with support for Swagger 1.2 and Swagger 2.0 spec.
[swagger-codegen-maven-plugin](https://github.com/garethjevans/swagger-codegen-maven-plugin) | A maven build plugin which allows the codegen project to be triggered for generating clients, etc. during the build process.
[swagger2markup](https://github.com/RobWin/swagger2markup) | Swagger2Markup converts a Swagger JSON or YAML file into AsciiDoc or Markdown documents which can be combined with hand-written documentation. The AsciiDoc documents can be converted into HTML5, PDF and EPUB. The Swagger2MarkupConverter supports the Swagger 1.2 and 2.0 specification.
[swagger2markup-gradle-plugin](https://github.com/RobWin/swagger2markup-gradle-plugin) | A Swagger2Markup Gradle Plugin which converts a Swagger JSON or YAML file into AsciiDoc or Markdown documents which can be combined with hand-written documentation. The AsciiDoc documents can be converted into HTML5, PDF and EPUB.
[swagger-maven-plugin](http://kongchen.github.io/swagger-maven-plugin/) | Support Swagger Spec 2.0, integrate with JAX-RS & Spring MVC project, and easily generate `swagger.json` & a static document during build phase.

#### JavaScript

Name | Description
---|---
[Swagger Parser](https://github.com/BigstickCarpet/swagger-parser#swagger-parser) | Parses, validates, and dereferences JSON/YAML Swagger specs in Node and browsers

#### .Net

Name | Description
---|---
[Swashbuckle](https://github.com/domaindrivendev/Swashbuckle) |  Adds some Swagger to your WebApi.
[AutoRest](https://github.com/Azure/AutoRest) | The AutoRest tool generates client libraries for accessing RESTful web services from a Swagger specification.
[SwaggerProvider](http://sergey-tihon.github.io/SwaggerProvider/) | F# Type Provider for Swagger
[NSwag](http://nswag.org) | Toolchain to generate Swagger specifications from Web API controllers and client code to access them via C# and TypeScript.

#### Node.js

Name | Description
---|---
[hapi-swaggered](https://github.com/z0mt3c/hapi-swaggered) | A hapi.js plugin to generate swagger v2.0 compliant specifications based on hapi routes and joi schemas.
[hippie-swagger](https://github.com/cachecontrol/hippie-swagger) | API testing tool with automatic swagger assertions
[swaggerize-express](https://github.com/krakenjs/swaggerize-express) | Design-driven RESTful apis with swagger and express from [@PayPalDev](https://twitter.com/PayPalDev).
[swaggerize-hapi](https://github.com/krakenjs/swaggerize-hapi) | Design-driven RESTful apis with swagger and hapi from [@PayPalDev](https://twitter.com/PayPalDev).
[generator-swaggerize](https://github.com/krakenjs/generator-swaggerize) | Yeoman generator for krakenjs/swaggerize tools from [@PayPalDev](https://twitter.com/PayPalDev).
[a127](http://a127.io) | a127 is toolkit for modeling & building rich, enterprise-class APIs in Node.js on your laptop. The focal point of a127 is the Swagger 2.0 specification for defining and describing an API model. From the Swagger model you can generate clients, servers and interactive documentation for your API. From [@apigee](https://github.com/apigee)
[swagger-tools](https://github.com/apigee-127/swagger-tools) | Various Swagger tools for JavaScript including an API/CLI (conversion, validation, ...) and [Connect](https://github.com/senchalabs/connect) middleware for routing, validation, security and swagger-ui.
[Swagger Parser](https://github.com/BigstickCarpet/swagger-parser#swagger-parser) | Parses, validates, and dereferences JSON/YAML Swagger specs in Node and browsers
[Swagger Express Middleware](https://github.com/BigstickCarpet/swagger-express-middleware/#swagger-express-middleware) | Swagger middleware and mocks for Express.js
[swagger-mongodb](https://github.com/kaizhu256/node-swagger-mongodb) | lightweight swagger-ui crud-api backed by mongodb
[api-spec-converter](https://github.com/lucybot/api-spec-converter) | A tool for converting from other API specification formats (e.g. I/O Docs and API Blueprint) to Swagger
[sails-swagger](https://github.com/tjwebb/sails-swagger) | A [Sails.js](http://sailsjs.org) plugin that generates a Swagger (v2.0) document from your application Models, Controllers, and Routes. Also see [swagger.balderdash.io](http://swagger.balderdash.io) for a Sails-themed Swagger UI.

#### Perl

Name | Description
---|---
[Raisin](https://github.com/khrt/Raisin) | A framework with a built-in Swagger support.
[Swagger2](https://metacpan.org/pod/Swagger2) | Perl Swagger validator and documentation generator
[Swagger2::Client](https://metacpan.org/pod/Swagger2::Client) | Perl generator for user agent code
[Mojolicious::Plugin::Swagger2](https://metacpan.org/pod/Mojolicious::Plugin::Swagger2) | Generates [Mojolicious](http://mojolicio.us/) routes and input/output validation rules.

#### PHP

Name | Description
---|---
[Swagger-PHP](https://packagist.org/packages/zircote/swagger-php) | a library implementing the swagger.io specification to describe web services, operations/actions and models enabling a uniform means of producing, consuming, and visualizing RESTful web services.
[SwaggerAssertions](https://github.com/Maks3w/SwaggerAssertions) | Swagger 2 test assertions for validate your API requests and responses
[php-swaggerize-fastroute-library](https://packagist.org/packages/iadvize/php-swaggerize-fastroute-library#0.2.0) | a package to automatically generate FastRoute from swagger json definition. It's compatible with Lumen as long as you use controller class

#### Python

Name | Description
---|---
[pyramid-swagger](https://github.com/striglia/pyramid_swagger) | Convenient tools for using Swagger to define and validate your interfaces in a Pyramid webapp.
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

#### Ruby

Name | Description
---|---
[Apivore](https://github.com/westfieldlabs/apivore) | RSpec based tool to test your API against its Swagger 2.0 specification.
[swagger-blocks](https://github.com/fotinakis/swagger-blocks) | Define and serve live-updating Swagger JSON for Ruby apps.
[swagger_engine](https://github.com/batdevis/swagger_engine) | include [Swagger-ui](https://github.com/swagger-api/swagger-ui) as mountable rails engine.

#### Scala

Name | Description
---|---
[sbt-swagger-codegen](https://github.com/unicredit/sbt-swagger-codegen) | Models, Client and Server code generation integrated as an SBT plugin. Generate code from your Swagger files | Client and Server depends on [playframework](http://www.playframework.com).


### Community-Driven Tools
These are third party tools generated by the Swagger community:

Name | Description
---|---
[bootprint-swagger](https://github.com/nknapp/bootprint-swagger) | A tool for creating static documentation from Swagger definitions, with customizable styles and templates using [Handlebars](http://handlebarsjs.com), [LessCss](http://lesscss.org) and [Bootstrap](http://getbootstrap.com).
[swagger-diff](https://github.com/civisanalytics/swagger-diff) | A command-line utility, RSpec matcher, and Ruby library for comparing two Swagger specifications.
[swagger.ed](https://github.com/chefArchitect/apispots-browser-swaggered) | A Chrome extenstion that will change the way you look at APIs.
[ember-swagger-ui](https://github.com/rynam0/ember-swagger-ui) | An [ember-cli](http://www.ember-cli.com) addon for quickly and easily adding [swagger-ui](https://github.com/swagger-api/swagger-ui) to your [EmberJS](http://emberjs.com/) application.

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

#### Ruby

Name | Description
---|---
[grape-swagger](https://github.com/tim-vandecasteele/grape-swagger) | Add Swagger compliant documentation to your grape API.
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
