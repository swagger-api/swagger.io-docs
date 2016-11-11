
# Swagger Editor Documentation

## Downloading

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
The Swagger Editor can be found in this public repository on GitHub.


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
* If there is a problem with **dist** folder after cloning, go to the root and run `npm run build’
