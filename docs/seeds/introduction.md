### Seeds

Seeds allow you to insert some random data to your app, So lets say you want to insert some default Roles into your app, so you can pass seeds by

```javascript
let configuration = {
  // rest of the configuration
  seeds: {
    Role: [{ name: "My Role" }, { name: "My Role #2" }],
  },
};
```

So, you have added, After initializetion of wertik-js you can run seeds by:

```javascript
import wertik from "./main";
wertik({ expressApp: app }, defaultConfiguration).then((wertikApp: any) => {
  wertikApp.seeds(["Role"]); // Same name goes for module.name
});
```

This will insert module seeds.
