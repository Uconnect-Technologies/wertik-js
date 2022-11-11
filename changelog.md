## Started changelog after version 3.2.9

### 3.3.0

- When sending emails fails, also throws errors in console
- When taking backup and provides invalid table/module name, the backup process failes with an error.
- Added `extendFields` to `useModule` to extend `sequelize.model` table fields.

### 3.3.1 

- Removed support old legacy wertik framework.
- Now wertik can be import from `wertik-js/lib` instead of `wertik-js/lib/ndex`
- Added more types support.
- Change the way mysql is initalized so that it can open doors for postgres and mongoose in future.