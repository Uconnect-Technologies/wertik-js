### Rest API

For Rest API wertik-js uses Express-js for rest api feature. Due to its popularity and key features. The rest api is registered in this file: [https://github.com/Uconnect-Technologies/wertik-js/blob/master/src/framework/restApi/index.ts](https://github.com/Uconnect-Technologies/wertik-js/blob/master/src/framework/restApi/index.ts)

#### Configuration

```javascript
let configuration = {
  /// Rest of the configuration
  restApi: {
    showWertik404Page: true, // Show wertik 404 page. If set to false wertik js will not show 404 message.
    restApi404Handler: function (req, res) {
      res.status(404).json({
        message: "Not found",
        data: {
          message: "Request page didn't found",
        },
      });
    }, // Showing 404 page.
    onCustomApiFailure: function ({ path, res, err }) {
      res.send("failed at " + path);
    }, // On api request fail.
  },
};
```

For using rest api in modules. Please see [custom modules](http://wapgee.com/wertik-js/custom-modules/introduction) section.