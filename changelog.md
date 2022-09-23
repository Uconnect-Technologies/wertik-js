## Started changelog after version 3.2.9

### 3.3.1

- Worked on improving folder structure for adding more database features like postgres and mongodb.
- Removed support for v1.
- Removed code for v1.

### 3.3.0

- When sending emails fails, also throws errors in console
- When taking backup and provides invalid table/module name, the backup process failes with an error.
- Added `extendFields` to `useModule` to extend `sequelize.model` table fields.
