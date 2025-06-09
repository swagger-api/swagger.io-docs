---
title: Swagger Codegen
sidebar:
  label: Swagger Codegen v3
  order: 1
---

This is the Swagger Codegen project, which allows generation of API client libraries (SDK generation), server stubs and documentation automatically given an [OpenAPI Description](https://github.com/OAI/OpenAPI-Specification).

💚 If you would like to contribute, please refer to [guidelines](https://github.com/swagger-api/swagger-codegen/blob/master/CONTRIBUTING.md) and a list of [open tasks](https://github.com/swagger-api/swagger-codegen/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22).💚

📔 For more information, please refer to the [Wiki page](https://github.com/swagger-api/swagger-codegen/wiki) and [FAQ](https://github.com/swagger-api/swagger-codegen/wiki/FAQ) 📔

⚠️ If the OpenAPI Description or Swagger file is obtained from an untrusted source, please make sure you've reviewed the artefact before using Swagger Codegen to generate the API client, server stub or documentation as [code injection](https://en.wikipedia.org/wiki/Code_injection) may occur. ⚠️

## Versioning

> ⚠️ this document refers to version 3.X, check [here](./../codegen-v2/about) for 2.X.

Both 2.X and 3.X version lines of Swagger Codegen are available and are independently maintained.

**NOTES:**

- Versions 2.X (`io.swagger`) and 3.X (`io.swagger.codegen.v3`) have **different** group ids.
- OpenAPI 3.0.X is supported from the 3.X version only

For full versioning info, please refer to the [versioning documentation](../versioning).

## Supported Languages and Frameworks

Here's a summary of the supported languages/frameworks.

- **API clients**: "csharp", "csharp-dotnet2", "dart", "go", "java", "javascript", "jaxrs-cxf-client", "kotlin-client", "php", "python", "r", "ruby" "scala", "swift3", "swift4", "swift5", "typescript-angular", "typescript-axios", "typescript-fetch"
- **Server stubs**: "aspnetcore",
  "go-server",
  "inflector",
  "java-vertx",
  "jaxrs-cxf",
  "jaxrs-cxf-cdi",
  "jaxrs-di",
  "jaxrs-jersey",
  "jaxrs-resteasy",
  "jaxrs-resteasy-eap",
  "jaxrs-spec",
  "kotlin-server",
  "micronaut",
  "nodejs-server",
  "python-flask",
  "scala-akka-http-server",
  "spring"

- **API documentation generators**: "dynamic-html",
  "html",
  "html2",
  "openapi",
  "openapi-yaml"

To get a complete and/or realtime listing of supported languages/frameworks, you can directly query the [online generator API](https://generator3.swagger.io/index.html#/clients/languages) or via a `cURL` command.

```curl
curl -X 'GET' \
  'https://generator3.swagger.io/api/client/V3' \
  -H 'accept: application/json'
```

Check out the [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification) for additional information about the OpenAPI project.

## Compatibility

The OpenAPI Specification has undergone 3 revisions since initial creation in 2010.  The **current stable** versions of Swagger Codegen project have the following compatibilities with the OpenAPI Specification:

Swagger Codegen Version    | Release Date | Swagger / OpenAPI Spec compatibility | Notes
-------------------------- |--------------| -------------------------- | -----
[3.0.68](https://github.com/swagger-api/swagger-codegen/releases/tag/v3.0.68) (**current stable**) | 2025-03-05   | 1.0, 1.1, 1.2, 2.0, 3.0   | [tag v3.0.68](https://github.com/swagger-api/swagger-codegen/tree/v3.0.68)
[2.4.45](https://github.com/swagger-api/swagger-codegen/releases/tag/v2.4.45) (**current stable**) | 2025-06-08   | 1.0, 1.1, 1.2, 2.0   | [tag v2.4.45](https://github.com/swagger-api/swagger-codegen/tree/v2.4.45)

💁 Here's also an overview of what's coming around the corner:

Swagger Codegen Version    | Release Date | Swagger / OpenAPI Spec compatibility | Notes
-------------------------- |--------------| -------------------------- | -----
3.0.69-SNAPSHOT (current 3.0.0, upcoming minor release) [SNAPSHOT](https://central.sonatype.com/service/rest/repository/browse/maven-snapshots/io/swagger/codegen/v3/swagger-codegen-cli/3.0.69-SNAPSHOT/)| TBD          | 1.0, 1.1, 1.2, 2.0, 3.0 | Minor release
2.4.46-SNAPSHOT (current master, upcoming minor release) [SNAPSHOT](https://central.sonatype.com/service/rest/repository/browse/maven-snapshots/io/swagger/swagger-codegen-cli/2.4.46-SNAPSHOT/)| TBD          | 1.0, 1.1, 1.2, 2.0   | Minor release

For detailed breakdown of all versions, please see the [full compatibility listing](../compatibility).


## Getting Started

To get up and running with Swagger Codegen, check out the following guides and instructions:

- [Prerequisites](../prerequisites)
- [Building](../building)
- [Using Docker](../docker)

Once you've your environment setup, you're ready to start generating clients and/or servers.

As a quick example, to generate a PHP client for [Swagger Petstore](http://petstore.swagger.io/v2/swagger.json), please run the following:

```sh
git clone https://github.com/swagger-api/swagger-codegen
cd swagger-codegen
git checkout 3.0.0
mvn clean package
java -jar modules/swagger-codegen-cli/target/swagger-codegen-cli.jar generate \
   -i http://petstore.swagger.io/v2/swagger.json \
   -l php \
   -o /var/tmp/php_api_client
```

**Note:** if you're on Windows, replace the last command with:

```sh
java -jar modules\swagger-codegen-cli\target\swagger-codegen-cli.jar generate -i http://petstore.swagger.io/v2/swagger.json -l php -o c:\temp\php_api_client
```

You can also download the JAR (latest release) directly from [maven.org](https://repo1.maven.org/maven2/io/swagger/codegen/v3/swagger-codegen-cli/3.0.68/swagger-codegen-cli-3.0.68.jar).

To get a list of **general** options available, please run:

```sh
java -jar modules/swagger-codegen-cli/target/swagger-codegen-cli.jar generate --help
```

To get a list of PHP specified options (which can be passed to the generator with a config file via the `-c` option), please run:

```sh
java -jar modules/swagger-codegen-cli/target/swagger-codegen-cli.jar config-help -l php
```

## Generators

### To generate a sample client library

You can build a client against the swagger sample [petstore](http://petstore.swagger.io) API as follows:

```sh
./bin/java-petstore.sh
```

On Windows, run `.\bin\windows\java-petstore.bat` instead.

This will run the generator with this command:

```sh
java -jar modules/swagger-codegen-cli/target/swagger-codegen-cli.jar generate \
  -i http://petstore.swagger.io/v2/swagger.json \                               # The location of the Swagger specifcation file (JSON/YAML).
  -l java \                                                                     # The desired language for the library.
  -o samples/client/petstore/java                                               # The output destination.
```

You can get the options with the `generate --help` command (below only shows partial results):

```text
NAME
        swagger-codegen-cli generate - Generate code with chosen lang

SYNOPSIS
        swagger-codegen-cli generate
                [(-a <authorization> | --auth <authorization>)]
                [--additional-properties <additional properties>...]
                [--api-package <api package>] [--artifact-id <artifact id>]
                [--artifact-version <artifact version>]
                [(-c <configuration file> | --config <configuration file>)]
                [-D <system properties>...] [--git-repo-id <git repo id>]
                [--git-user-id <git user id>] [--group-id <group id>]
                [--http-user-agent <http user agent>]
                (-i <spec file> | --input-spec <spec file>)
                [--ignore-file-override <ignore file override location>]
                [--import-mappings <import mappings>...]
                [--instantiation-types <instantiation types>...]
                [--invoker-package <invoker package>]
                (-l <language> | --lang <language>)
                [--language-specific-primitives <language specific primitives>...]
                [--library <library>] [--model-name-prefix <model name prefix>]
                [--model-name-suffix <model name suffix>]
                [--model-package <model package>]
                [(-o <output directory> | --output <output directory>)]
                [--release-note <release note>] [--remove-operation-id-prefix]
                [--reserved-words-mappings <reserved word mappings>...]
                [(-s | --skip-overwrite)]
                [(-t <template directory> | --template-dir <template directory>)]
                [--type-mappings <type mappings>...] [(-v | --verbose)]

OPTIONS
        -a <authorization>, --auth <authorization>
            adds authorization headers when fetching the swagger definitions
            remotely. Pass in a URL-encoded string of name:header with a comma
            separating multiple values

...... (results omitted)

        -v, --verbose
            verbose mode

```

You can then compile and run the client, as well as unit tests against it:

```sh
cd samples/client/petstore/java
mvn package
```

Other languages have petstore samples, too:

```sh
./bin/android-petstore.sh
./bin/java-petstore.sh
./bin/objc-petstore.sh
```

### Generating libraries from your server

It's just as easy! Use the `-i` flag to point to either a server or file.

🔧 Swagger Codegen comes with a tonne of flexibility to support your code generation preferences. Checkout the [generators documentation](../generators) which takes you through some of the possibilities as well as showcasing how to generate from local files.

### Selective generation

You may not want to generate *all* models in your project. Likewise you may want just one or two apis to be written, or even ignore certain file formats. If that's the case check the [selective generation](../generation-selective) instructions.


### Advanced Generator Customization

There are different aspects of customizing the code generator beyond just creating or modifying templates.  Each language has a supporting configuration file to handle different type mappings, or bring your own models. For more information check out the [advanced configuration docs](../generators-configuration).

### Validating your OpenAPI Description

You have options. The easiest is to use our [online validator](https://github.com/swagger-api/validator-badge) which not only will let you validate your OpenAPI file, but with the debug flag, you can see what's wrong with your file. Check out [Swagger Validator](http://online.swagger.io/validator/debug?url=http://petstore.swagger.io/v2/swagger.json) to validate a petstore example.

If you want to have validation directly on your own machine, then [Spectral](https://stoplight.io/open-source/spectral) is an excellent option.

### Generating dynamic html api documentation

To do so, just use the `-l dynamic-html` flag when reading a spec file.  This creates HTML documentation that is available as a single-page application with AJAX.  To view the documentation:

```sh
cd samples/dynamic-html/
npm install
node .
```

Which launches a node.js server so the AJAX calls have a place to go.

## Workflow Integration

It's possible to leverage Swagger Codegen directly within your preferred CI/CD workflows to streamline your auto-generation requirements. Check out the [workflows integration](../workflow-integration) guide to see information on our Maven, Gradle, and GitHub integration options. 🚀

## Online generators

If you don't want to run and host your own code generation instance, check our our [online generators](../online-generators) information.

## Contributing

Please refer to this [page](https://github.com/swagger-api/swagger-codegen/blob/master/CONTRIBUTING.md).

> 🚧 For `swagger-codegen version 3` templates and classes for code generation are being migrated to [swagger-codegen-generators](https://github.com/swagger-api/swagger-codegen-generators) repo. In order to know this migration process you can refer this [page](https://github.com/swagger-api/swagger-codegen/wiki/Swagger-Codegen-migration-(swagger-codegen-generators-repository)).

## Security contact

Please disclose any security-related issues or vulnerabilities by emailing [security@swagger.io](mailto:security@swagger.io), instead of using the public issue tracker.

## Thank You

💚💚💚 We'd like to give a big shout out to all those who've contributed to Swagger Codegen, be that in raising issues, fixing bugs, authoring templates, or crafting useful content for others to benefit from. 💚💚💚
