
# Wertick JS

**💪 GraphQL + Rest API** framework to kick start your project.

<div>
	<img style="float: left;" src="https://img.shields.io/github/downloads/ilyaskarim/wertik-js/total?style=flat-square">
	<img style="float: left;" src="https://img.shields.io/npm/dw/wertik-js?style=flat-square">
	<img style="float: left;" src="https://img.shields.io/github/issues-raw/ilyaskarim/wertik-js?style=flat-square">
</div>

<br />
<br />

### Table of contents

1.  [Install](#install)
2.  [Introduction](#introduction)
3.  [Folder Structure](#concepts)
4.  [Database](#database)
5.  [GraphQL](#graphql)
6.  [Rest API](#rest-api)
7.  [Contributing](#contributing)
7.  [License](#license)

### Install

Install with npm

    npm install --save wertik-js  

Install with yarn

    yarn add wertik-js --dev

### Introduction  

Wertik-js is a node js library to kick start your project using GraphQL and Rest API. You can use Weritk-js with running project, Wertik-js relies on [Express](https://expressjs.com/) and [Apollo GraphQL](https://www.apollographql.com/). Wertik-js also comes with socket, logger, seeds and events feature.

### Folder Structure

It is good to know how Wertik-js works, [Here](http://www.wapgee.com/wertik-js/how-wertik-works/folder-structure) is a guide to know how wertik works. 

### Database

Currrently Wertik-js only supports Mysql at the moment, We will be supporting MongoDB very soon.

### GraphQL

Wertik-js GraphQL relies on [Apollo GraphQL](https://www.apollographql.com/), [Here](https://github.com/Uconnect-Technologies/wertik-js/blob/master/src/framework/graphql/loadAllModules.ts) GraphQL is loaded. Wertik-js allows you to write custom GraphQL modules(Queries and Mutations), [Read More](http://www.wapgee.com/wertik-js/getting-started/custom-modules) about custom modules in our documentation.

### Rest API

Wertik-js RestAPI relies on only one which is [Express](https://expressjs.com/). [Here](https://github.com/Uconnect-Technologies/wertik-js/blob/master/src/framework/restApi/loadAllModules.ts) Rest API is initialized.[Read More](http://www.wapgee.com/wertik-js/getting-started/custom-modules) about custom modules to create custom API's for your modules.

### Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)