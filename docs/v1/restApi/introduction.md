
### Rest API

For Rest API wertik-js uses Express-js for rest api feature. Due to its popularity and key features. The rest api is registered in this file:  [https://github.com/Uconnect-Technologies/wertik-js/blob/master/src/framework/restApi/index.ts](https://github.com/Uconnect-Technologies/wertik-js/blob/master/src/framework/restApi/index.ts)

#### Changing Port

You can change the port by

```javascript
let configuration = {
  /// Rest of the configuration
  restApi: {
    port: 7070 // Define your port her
  }
}
```

#### Disable Rest API


You can disable Rest API by:

```javascript
let configuration = {
  /// Rest of the configuration
  restApi: {
    disable: true // passing true will disable the Rest API
  }
}
```


For adding Rest Api endpoints, Please see custom modules section.