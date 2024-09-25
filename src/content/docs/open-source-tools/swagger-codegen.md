---
title: Swagger Codegen Documentation
sidebar:
  label: Swagger Codegen
  order: 3
---

The Swagger Codegen is an open source code-generator to build server stubs and client SDKs directly from a Swagger defined RESTful API. The source code for the Swagger Codegen can be found in GitHub.

GitHub: [https://github.com/swagger-api/swagger-codegen](https://github.com/swagger-api/swagger-codegen)

### Compatibility

| Swagger Codegen Version        | Release Date | Swagger Spec Compatibility | Notes                                    |
| ------------------------------ | ------------ | -------------------------- | ---------------------------------------- |
| 2.3.0 (upcoming minor release) | TBD          | 1.0, 1.1, 1.2, 2.0         | Minor releases with breaking changes     |
| 2.2.2 (upcoming patch release) | TBD          | 1.0, 1.1, 1.2, 2.0         | Patch release (without breaking changes) |
| 2.2.1 (current stable)         | 2016-08-07   | 1.0, 1.1, 1.2, 2.0         | tag v2.2.1                               |
| 2.1.6                          | 2016-04-06   | 1.0, 1.1, 1.2, 2.0         | tag v2.1.6                               |
| 2.0.17                         | 2014-08-22   | 1.1, 1.2                   | tag v2.0.17                              |
| 1.0.4                          | 2012-04-12   | 1.0, 1.1                   | tag v1.0.4                               |

### Installation

#### Prerequisites

The following dependencies would need to be installed on your machine before downloading and running the Swagger Codegen.

- Java, version 7 or higher

#### Installation with Homebrew

If you have a Mac or a Linux environment, then you could use Homebrew to install the Swagger Codegen.

`brew install swagger-codegen`

#### Installation from Maven Central

All versions of the Swagger Codegen project can be found on [Maven Central](https://oss.sonatype.org/content/repositories/releases/io/swagger/). [Visit this folder on Maven](https://oss.sonatype.org/content/repositories/releases/io/swagger/swagger-codegen-cli/), and choose the appropriate version (we recommend the latest version).

You could download and run the executable .jar file (for example, [swagger-codegen-cli-2.2.1.jar](https://oss.sonatype.org/content/repositories/releases/io/swagger/swagger-codegen-cli/2.2.1/swagger-codegen-cli-2.2.1.jar))

Alternatively, you could use the wget command as well.

`wget {link address of the executable .jar file}`

Example:

`wget https://oss.sonatype.org/content/repositories/releases/io/swagger/swagger-codegen-cli/2.2.1/swagger-codegen-cli-2.2.1.jar`

#### Usage

For the sake of simplicity, we will assume you have the [swagger-codegen-cli-2.2.1](https://oss.sonatype.org/content/repositories/releases/io/swagger/swagger-codegen-cli/2.2.1/swagger-codegen-cli-2.2.1.jar) installed. Please visit the installation section of the Swagger Codegen to learn about how to get the Codegen on your machine.

##### List of supported languages

To get a list of languages supported by the Swagger Codegen -

If you have Homebrew installed:

`swagger-codegen`

Else, you could use:

`java -jar swagger-codegen-cli-2.2.1.jar`

##### Help options in terminal

To see the various help section options of the Swagger Codegen -

If you have Homebrew installed:

`swagger-codegen help`

Else, you could use:

`java -jar swagger-codegen-cli-2.2.1.jar help`

Once you have the various help section options, you can learn about a specific topic.

If you have Homebrew installed:

`swagger-codegen help <command>`

Example:

`swagger-codegen config-help -l php`

Else, you could use:

`java -jar swagger-codegen-cli-2.2.1.jar config-help -l <language name>`

Example:

`java -jar swagger-codegen-cli-2.2.1.jar config-help -l php`

##### Generating Code

To generate code from an existing swagger specification -

If you have Homebrew installed:

`swagger-codegen generate -i <path of your Swagger specification> -l <language>`

Example:

`swagger-codegen generate -i http://petstore.swagger.io/v2/swagger.json -l csharp`

Else, you could use:

`java -jar swagger-codegen-cli-2.2.1.jar generate -i <path of your Swagger specification> -l <language>`

Example:

`java -jar swagger-codegen-cli-2.2.1.jar generate -i http://petstore.swagger.io/v2/swagger.json -l csharp`

In the above code, we pass two arguments: `-i` and `-l`. `-i` is used to specify the path of your API’s specification. `-l` is used to specify the language you want to generate the code for your specified API’s specification.

The Codegen creates a **README** file with all the information for running and building the API. Each language creates a different README, so please go through it to learn about how to build your Swagger defined API.

#### Contribute

The Swagger Codegen is an open source project under the Apache license. You can contribute to the project with suggestions, ideas, bug reports and pull requests in the GitHub repository, found here - [https://github.com/swagger-api/swagger-codegen](https://github.com/swagger-api/swagger-codegen).

##### Guidelines

###### Before submitting an issue

- If you're not using the latest master to generate API clients or server stubs, please give it another try by pulling the latest master as the issue may have already been addressed. Ref: [Getting Started](https://github.com/swagger-api/swagger-codegen#getting-started)
- Search the [open issue](https://github.com/swagger-api/swagger-codegen/issues) and [closed issue](https://github.com/swagger-api/swagger-codegen/issues?q=is%3Aissue+is%3Aclosed) to ensure no one else has reported something similar before.
- File an [issue ticket](https://github.com/swagger-api/swagger-codegen/issues/new) by providing all the required information.
- Test with the latest master by building the JAR locally to see if the issue has already been addressed.
- You can also make a suggestion or ask a question by opening an "issue".

###### Before submitting a PR

- Search the [open issue](https://github.com/swagger-api/swagger-codegen/issues) to ensure no one else has reported something similar and no one is actively working on similar proposed change.
- If no one has suggested something similar, open an [issue](https://github.com/swagger-api/swagger-codegen/issues) with your suggestion to gather feedback from the community.
- It's recommended to **create a new git branch** for the change so that the merge commit message looks nicer in the commit history.

##### How to contribute

###### Code generators

All the code generators can be found in [modules/swagger-codegen/src/main/java/io/swagger/codegen/languages](https://github.com/swagger-api/swagger-codegen/tree/master/modules/swagger-codegen/src/main/java/io/swagger/codegen/languages)

###### Templates

All the templates ([mustache](https://mustache.github.io/)) can be found in [modules/swagger-codegen/src/main/resources](https://github.com/swagger-api/swagger-codegen/tree/master/modules/swagger-codegen/src/main/resources).

For a list of variables available in the template, please refer to this [page](https://github.com/swagger-api/swagger-codegen/wiki/Mustache-Template-Variables)

###### Style guide

Code change should conform to the programming style guide of the respective languages:

- [Android](https://source.android.com/source/code-style.html)
- [C#](https://msdn.microsoft.com/en-us/library/vstudio/ff926074.aspx)
- [C++](https://google.github.io/styleguide/cppguide.html)
-  [Haskell](https://github.com/tibbe/haskell-style-guide/blob/master/haskell-style.md)
-  [Java](https://google.github.io/styleguide/javaguide.html)
-  [JavaScript](https://github.com/airbnb/javascript)
-  [Groovy](http://groovy-lang.org/style-guide.html)
-  [Go](https://github.com/golang/go/wiki/CodeReviewComments)
-  [ObjC](https://github.com/NYTimes/objective-c-style-guide)
-  [Perl](http://perldoc.perl.org/perlstyle.html)
-  [PHP](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-2-coding-style-guide.md)
-  [Python](https://www.python.org/dev/peps/pep-0008/)
-  [Ruby](https://github.com/bbatsov/ruby-style-guide)
-  [Scala](http://docs.scala-lang.org/style/)
-  [Swift](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/TheBasics.html)
-  [TypeScript](https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines)

For other languages, feel free to suggest.

You may find the current code base not 100% conform to the coding style and we welcome contributions to fix those.

For [Vendor Extensions](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#vendorExtensions), please follow the naming convention below:

- For general vendor extension, use lower case and hyphen. e.g. `x-is-unique`, `x-content-type`
- For language-specified vendor extension, put it in the form of `x-{lang}-{extension-name}`. e.g. `x-objc-operation-id`, `x-java-feign-retry-limit`
- For a list of existing vendor extensions in use, please refer to [https://github.com/swagger-api/swagger-codegen/wiki/Vendor-Extensions](https://github.com/swagger-api/swagger-codegen/wiki/Vendor-Extensions). If you've added new vendor extensions as part of your PR, please update the wiki page.

### Testing

To add test cases (optional) covering the change in the code generator, please refer to [modules/swagger-codegen/src/test/java/io/swagger/codegen](https://github.com/swagger-api/swagger-codegen/tree/master/modules/swagger-codegen/src/test/java/io/swagger/codegen).

To test the templates, please perform the following:

- Update the [Petstore](http://petstore.swagger.io/) sample by running the shell script under `bin` folder. For example, run `./bin/ruby-petstore.sh` to update the Ruby PetStore API client under [samples/client/petstore/ruby](https://github.com/swagger-api/swagger-codegen/tree/master/samples/client/petstore/ruby). For Windows, the batch files can be found under `bin\windows` folder. (If you find that there are new files generated or unexpected changes as a result of the update, that's not unusual as the test cases are added to the OpenAPI/Swagger spec from time to time. If you've questions or concerns, please open a ticket to start a discussion)
- Run the tests in the sample folder, e.g. in `samples/client/petstore/ruby`, run `mvn integration-test -rf :RubyPetstoreClientTests`. (some languages may not contain unit testing for Petstore and we're looking for contribution from the community to implement those tests)
- Finally, git commit the updated samples files: `git commit -a` (`git add -A` if added files with new test cases)

To start the CI tests, you can run `mvn verify -Psamples` (assuming you've all the required tools installed to run tests for different languages) or you can leverage [http://travis-ci.org/](http://travis-ci.org/) to run the CI tests by adding your own Swagger-Codegen repository.

### Tips

- Smaller changes are easier to review
- [Optional] For bug fixes, provide a OpenAPI Spec to repeat the issue so that the reviewer can use it to confirm the fix
- Add test case(s) to cover the change
- Document the fix in the code to make the code more readable
- Make sure test cases passed after the change (one way is to leverage [https://travis-ci.org/](https://travis-ci.org/) to run the CI tests)
- File a PR with meaningful title, description and commit messages. A good example is [PR-3306](https://github.com/swagger-api/swagger-codegen/pull/3306)
