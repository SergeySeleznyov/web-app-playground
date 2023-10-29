# Node-React-Mongo-ElasticSearch-RabbitMQ demo-app-playground

## Start

### Set up the settings

Find the settings in the file specified: 

```./webapp/.env```

Fill out the connection settings for the integration with:
* MongoDB
* ElasticSearch
* RabbitMQ

### Start docker containers

```sh
$ up.cmd
```

### Start WebApp

```sh
$ cd webapp
$ npm ci
$ npm run start:dev
```

#### (Optional) Separate run client and server

In 'JavaScript Debug Terminal':

```sh
$ cd webapp
$ npm ci
$ npm run server:dev
```

In standalone terminal:

```sh
$ cd webapp
$ npm ci
$ npm run client:dev
```
