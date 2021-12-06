### Role Based Access Control

Wertik-js provides Role Based Access Control feature. While this can be done through context. Roles and Permissions for a user are passed to context, In GraphQL you can access Roles and Permissions by:

```javascript
function (_, args, context,info) {
  console.log(context.userRoles); // User Roles
  console.log(context.userPermissions) // User Permissions
}
```

In RestAPI you can access Roles and Permissions by:

```javascript
function (req,res) {
  console.log(req.userRoles) // User Roles
  console.log(req.userPermissions) // User Permissions
}
```

Based on Roles and Permisions, You can decide to continue request.