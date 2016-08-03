##Swagger-Core

swagger-core is a set of java libraries for generating and consuming Swagger definitions built around JAX-RS - head over to [GitHub](https://github.com/swagger-api/swagger-core) for the source-code and examples on how to start using it.

### Prerequisites
You need the following installed and available in your $PATH:

* Java 7 (http://java.oracle.com)
* Apache maven 3.0.4 or greater (http://maven.apache.org/)
* Jackson 2.4.5 or greater


### To build from source (currently 1.5.9-SNAPSHOT)
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
The OpenAPI Specification has undergone 3 revisions since initial creation in 2010.  The swagger-core project has the following compatibilities with the OpenAPI Specification:

Swagger core Version      | Release Date | OpenAPI Spec compatibility | Notes | Status
------------------------- | ------------ | -------------------------- | ----- | ----
1.5.9-SNAPSHOT            |              | 2.0           | [master](https://github.com/swagger-api/swagger-core) | Under Development
1.5.8 (**current stable**)| 2016-03-11   | 2.0           | [tag v1.5.8](https://github.com/swagger-api/swagger-core/tree/v1.5.8) | Supported
1.3.12                    | 2014-12-23   | 1.2           | [tag v1.3.12](https://github.com/swagger-api/swagger-core/tree/v1.3.12) | Supported
1.2.4                     | 2013-06-19   | 1.1           | [tag swagger-project_2.10.0-1.2.4](https://github.com/swagger-api/swagger-core/tree/swagger-project_2.10.0-1.2.4) | Deprecated
1.0.0                     | 2011-10-16   | 1.0           | [tag v1.0](https://github.com/swagger-api/swagger-core/tree/v1.0) | Deprecated
