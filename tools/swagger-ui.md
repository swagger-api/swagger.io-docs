##Swagger UI

Swagger UI is a dependency-free collection of HTML, Javascript, and CSS assets that dynamically
generate beautiful documentation and sandbox from a Swagger-compliant API. Because Swagger UI has no dependencies, you can host it in any server environment, or on your local machine. Head over to the [online demo](http://petstore.swagger.io) to see what it looks like for any publically accessible Swagger definition.


## How to Use It

### Download
You can use the swagger-ui code AS-IS!  No need to build or recompile--just download from the [GitHub release page](https://github.com/swagger-api/swagger-ui/releases), unzip the archive and serve the `dist` folder from either your filesystem or a web server.  You're done!

##### Browser support
Swagger UI works in all evergreen desktop browsers (Chrome, Safari, Firefox). Internet Explorer support is version 8 (IE8) and above.

### Build
You can rebuild swagger-ui on your own to tweak it or just so you can say you did.  To do so, follow these steps:

1. `npm install`
2. `gulp`
3. You should see the distribution under the dist folder. Open [`./dist/index.html`](https://github.com/swagger-api/swagger-ui/blob/master/dist/index.html) to launch Swagger UI in a browser

### Development
Use `gulp watch` to make a new build and watch for changes in files.

### Build using Docker

To build swagger-ui using a docker container:

```
docker build -t swagger-ui-builder .
docker run -p 127.0.0.1:8080:8080 swagger-ui-builder
```

This will start Swagger UI at `http://localhost:8080`.

### Usage, Customization and Configuration 

Head over to the [GitHub Page](https://github.com/swagger-api/swagger-ui/blob/master/README.md) for more documentation for now!

## Compatibility
The Swagger Specification has undergone 4 revisions since initial creation in 2010.  Compatibility between swagger-ui and the Swagger specification is as follows:

Swagger UI Version | Release Date | Swagger Spec compatibility | Notes 
------------------ | ------------ | -------------------------- | ----- 
2.1.4              | 2016-01-06   | 1.1, 1.2, 2.0              | [master](https://github.com/swagger-api/swagger-ui) 
2.0.24             | 2014-09-12   | 1.1, 1.2 | [tag v2.0.24](https://github.com/swagger-api/swagger-ui/tree/v2.0.24) 
1.0.13             | 2013-03-08   | 1.1, 1.2 | [tag v1.0.13](https://github.com/swagger-api/swagger-ui/tree/v1.0.13) 
1.0.1              | 2011-10-11   | 1.0, 1.1 | [tag v1.0.1](https://github.com/swagger-api/swagger-ui/tree/v1.0.1)   

## How to Improve It

Create your own fork of [swagger-api/swagger-ui](https://github.com/swagger-api/swagger-ui)

To share your changes, [submit a pull request](https://github.com/swagger-api/swagger-ui/pull/new/master).

## Change Log

Please see [releases](https://github.com/swagger-api/swagger-ui/releases) for change log.

