## Started changelog after version 3.2.9

### 3.4.0

- Added eager loading for list and view queries.
- Improved lazy loading behavior in GraphQL to avoid unnecessary queries.
- Added support for loading only requested fields in Sequelize.
- Added recursion support for both list and view queries.
- Added support for filtering associated data in recursive queries.
- Removed moment.js and replaced with dayjs.
- Scanned  and verified fixes with SonarQube.
- Removed lodash, installed its child packages to reduce app size.
- Added `startServer()`, `restartServer()`, `stopServer()` methods
- Added tests to ensure graphql operations work perfectly.

### 3.3.0

- When sending emails fails, also throws errors in console
- When taking backup and provides invalid table/module name, the backup process failed with an error.
- Added `extendFields` to `useModule` to extend `sequelize.model` table fields.

### 3.3.1 

- Removed old legacy wertik framework.
- Now wertik can be import from `wertik-js/lib` instead of `wertik-js/lib/ndex`
- Added more types support.
- Change the way mysql is initialized so that it can open doors for postgres and mongoose in future.