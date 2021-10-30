## Storage - Beta 

Wertik-js allows storing files on your server by using Multer package, Currently storage is only available on Rest Api side. You can find initialization of multer on main.ts file, Please see https://github.com/Uconnect-Technologies/wertik-js/blob/master/src/main.ts#L41. For implementation of storage, You can find storage module here: https://github.com/Uconnect-Technologies/wertik-js/blob/master/src/framework/builtinModules/storage/index.ts.

After running server you send files to upload on this address: http://localhost:7000/api/v1/storage/upload,

Method Type: Post


Paramter: file

Depending on status the API will send a response. The Storage feature is in beta, If you can any idea to implement you can write it in a feature request [here][1].


[1]: https://github.com/Uconnect-Technologies/wertik-js/issues/new?assignees=&labels=&template=feature_request.md&title=Storage%20feature
