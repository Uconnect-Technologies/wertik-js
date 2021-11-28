# Storage

Wertik JS allows adding support for third party Storage services to your app. As of today 28 November 2021, Wertik JS supports `digitalocean` and `dropbox`. To use storage services you need to use `useStorage` function from wertik-js.

```js
import wertik, { useStorage } from "wertik-js/lib/next";

wertik({
  port: 1200,
  storage: {
    digitalocean: useStorage({
      for: "digitalocean",
      digitalOceanOptions: {
        accessKeyId: "",
        secretAccessKey: "",
        spacesEndpoint: "",
      },
    }),
    dropbox: useStorage({
      for: "dropbox",
      dropboxOptions: {
        accessToken: "",
      },
    }),
  },
});
```

- For digitalocean wertik-js uses `aws-sdk` package for uploading files.
- For dropbox wertik-js uses `dropbox` package for uploading files.
