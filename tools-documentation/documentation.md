
# Swagger Editor Documentation

## Downloade

### Using the Editor on the Web
The Editor works in any web browser, and can be hosted locally or accessed from the web.

<a href = "http://editor.swagger.io/#/ "><button class="button-save large">Take me to the web version </button> </a>



### Using the Editor on a local machine
You can run and use the Swagger Editor on your machine as well.


#### Prerequisites
The following dependencies would need to be installed on your machine before downloading and running the Swagger Editor.

* [NodeJS](https://nodejs.org/en/)

Once NodeJS is installed successfully,  please install all the npm dependencies using

`npm install;`


#### Setup with http-server module from GitHub
The Swagger Editor can be found in this [public repository on GitHub](https://github.com/swagger-api/swagger-editor).


Please run the following to run the Editor using the http-server module from GitHub. After downloading the latest version from Github, you will need to run these scripts on your terminal.

```
npm install -g http-server
wget https://github.com/swagger-api/swagger-editor/releases/download/v2.10.4/swagger-editor.zip
unzip swagger-editor.zip
http-server swagger-editor
```


#### Setup from Docker


The Swagger Editor can be found in [this public repository on Docker](https://hub.docker.com/r/swaggerapi/swagger-editor/).  


Please run the following to run the Editor in your local machine from Docker.

```
docker pull swaggerapi/swagger-editor
docker run -p 80:8080 swaggerapi/swagger-editor
```

## Contributing
The Swagger Editor is an open source project under the Apache license. You can contribute to the project with suggestions, ideas, bug reports and pull requests in the [Swagger Editor GitHub repository](https://github.com/swagger-api/swagger-editor).


Please run the following to to see the Editor’s source code and work on the project from your local machine.

```
git clone https://github.com/swagger-api/swagger-editor.git
cd swagger-editor
npm install
npm run build
npm start
```


### Common issues:
* If `npm start` does not work, delete the **node-module** folder, then run `npm install` and `npm start`
* If there is a problem with **dist** folder after cloning, go to the root and run `npm run build`

# Swagger Codegen Documentation

## Compatibility
| Swagger Codegen Version        | Release Date | Swagger Spec Compatibility | Notes                                    |
|--------------------------------|--------------|----------------------------|------------------------------------------|
| 2.3.0 (upcoming minor release) | TBD          | 1.0, 1.1, 1.2, 2.0         | Minor releases with breaking changes     |
| 2.2.2 (upcoming patch release) | TBD          | 1.0, 1.1, 1.2, 2.0         | Patch release (without breaking changes) |
| 2.2.1 (current stable)         | 2016-08-07   | 1.0, 1.1, 1.2, 2.0         | tag v2.2.1                               |
| 2.1.6                          | 2016-04-06   | 1.0, 1.1, 1.2, 2.0         | tag v2.1.6                               |
| 2.0.17                         | 2014-08-22   | 1.1, 1.2                   | tag v2.0.17                              |
| 1.0.4                          | 2012-04-12   | 1.0, 1.1                   | tag v1.0.4                               |


## Installation

### Prerequisites
The following dependencies would need to be installed on your machine before downloading and running the Swagger Codegen.

* Java, version 7 or higher

### Installation with Homebrew

If you have a Mac or a Linux environment, then you could use Homebrew to install the Swagger Codegen.


`brew install swagger-codegen`


### Installation from Maven Central


All versions of the Swagger Codegen project can be found on [Maven Central](https://oss.sonatype.org/content/repositories/releases/io/swagger/). [Visit this folder on Maven](https://oss.sonatype.org/content/repositories/releases/io/swagger/swagger-codegen-cli/), and choose the appropriate version (we recommend the latest version).


You could download and run the executable .jar file (for example, [swagger-codegen-cli-2.2.1.jar](https://oss.sonatype.org/content/repositories/releases/io/swagger/swagger-codegen-cli/2.2.1/swagger-codegen-cli-2.2.1.jar))


Alternatively, you could use the wget command as well.


`wget {link address of the executable .jar file}`

Example:

```
wget https://oss.sonatype.org/content/repositories/releases/io/swagger/swagger-codegen-cli/2.2.1/swagger-codegen-cli-2.2.1.jar
```

### Usage
For the sake of simplicity, we will assume you have the  [swagger-codegen-cli-2.2.1](https://oss.sonatype.org/content/repositories/releases/io/swagger/swagger-codegen-cli/2.2.1/swagger-codegen-cli-2.2.1.jar) installed. Please visit the installation section of the Swagger Codegen to learn about how to get the Codegen on your machine.


#### List of supported languages
To get a list of languages supported by the Swagger Codegen -


If you have Homebrew installed:


`swagger-codegen`


Else, you could use:


`java -jar swagger-codegen-cli-2.2.1.jar`



#### Help options in terminal
To see the various help section options of the Swagger Codegen -  


If you have Homebrew installed:


`swagger-codegen help`


Else, you could use:


`java -jar swagger-codegen-cli-2.2.1.jar help`


Once you have the various help section options, you can learn about a specific topic.


If you have Homebrew installed:


`swagger-codegen help <command>`

Example:

`swagger-codegen help generate`


Else, you could use:


`java -jar swagger-codegen-cli-2.2.1.jar help`

Example:

`java -jar swagger-codegen-cli-2.2.1.jar help generate`


To see the various config help section options for specific languages supported by the Swagger Codegen -  


If you have Homebrew installed:


`swagger-codegen config-help -l <language name>`

Example:

`swagger-codegen config-help -l php`

Else, you could use:

`java -jar swagger-codegen-cli-2.2.1.jar config-help -l <language name>`

Example:

`java -jar swagger-codegen-cli-2.2.1.jar config-help -l php`


Once you have the various help section options, you can learn about a specific topic.


If you have Homebrew installed:


`swagger-codegen help <command>`

Example:

`swagger-codegen help generate`


Else, you could use:


`java -jar swagger-codegen-cli-2.2.1.jar help`   

Example:

`java -jar swagger-codegen-cli-2.2.1.jar help generate`


#### Generating Code
To generate code from an existing swagger specification -


If you have Homebrew installed:


`swagger-codegen generate -i <path of your Swagger specification> -l <language>`

Example:

`swagger-codegen generate -i http://petstore.swagger.io/v2/swagger.json -l chsarp`


Else, you could use:

`java -jar swagger-codegen-cli-2.2.1.jar -i <path of your Swagger specification> -l <language>`
`
Example:

`swagger-codegen generate -i http://petstore.swagger.io/v2/swagger.json -l chsarp`


In the above code, we pass two arguments : `- i` and `-l`.
`-i` is used to specify the path of your API’s specification. `-l` is used to specify the language you want to generate the code for your specified API’s specification


The Codegen creates a **README** file with all the information for running and building the API. Each language creates a different README, so please go through it to learn about how to build your Swagger defined API.
