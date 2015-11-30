##Swagger-Core

swagger-core is a set of java libraries for generating and consuming Swagger defintions built around JAX-RS - head over to [GitHub](https://github.com/swagger-api/swagger-core) for the source-code and examples on how to start using it.

### Prerequisites
You need the following installed and available in your $PATH:

* Java 6 (http://java.oracle.com)
* Apache maven 3.0.4 or greater (http://maven.apache.org/)
* Jackson 2.4.6 or greater

### To build from source (currently 1.5.5-SNAPSHOT)
```
# first time building locally
mvn -N
```

Subsequent builds:
```
mvn install
```

This will build the modules.  To build sample apps, activate the `samples` profile:

```
mvn install -Psamples
```

Of course if you don't want to build locally you can grab artifacts from maven central:

`http://repo1.maven.org/maven2/io/swagger/`

## Sample Apps - *UPDATED*
The samples have moved to [a new repository](https://github.com/swagger-api/swagger-samples) and contain various integrations and configurations.

## Compatibility
The Swagger Specification has undergone 3 revisions since initial creation in 2010.  The swagger-core project has the following compatibilities with the swagger specification:

Swagger core Version      | Release Date | Swagger Spec compatibility | Notes | Status
------------------------- | ------------ | -------------------------- | ----- | ----
1.5.5-SNAPSHOT            |              | 2.0           | [master](https://github.com/swagger-api/swagger-core) | Under Development
1.5.4 (**current stable**)        | 2015-10-20   | 2.0           | [tag v1.5.4](https://github.com/swagger-api/swagger-core/tree/v1.5.4) | Supported
1.3.12                    | 2014-12-23   | 1.2           | [tag v1.3.12](https://github.com/swagger-api/swagger-core/tree/v1.3.12) | Supported
1.2.4                     | 2013-06-19   | 1.1           | [tag swagger-project_2.10.0-1.2.4](https://github.com/swagger-api/swagger-core/tree/swagger-project_2.10.0-1.2.4) | Deprecated
1.0.0                     | 2011-10-16   | 1.0           | [tag v1.0](https://github.com/swagger-api/swagger-core/tree/v1.0) | Deprecated

