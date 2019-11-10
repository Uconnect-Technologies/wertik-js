import { gql } from "graphql";
export default {
  Auth: {
    Login: gql``,
    Signup: gql``
  },
  Role: {
    RoleIndex: gql``,
    RoleCreate: gql``,
    RoleUpdate: gql``,
    RoleDelete: gql``,
  },
  User: {
    UserIndex: gql``,
    UserCreate: gql``,
    UserUpdate: gql``,
    UserDelete: gql``,
  },
  UserRole: {
    UserRoleIndex: gql``,
    UserRoleCreate: gql``,
    UserRoleUpdate: gql``,
    UserRoleDelete: gql``,
  },
  Permission: {
    PermissionIndex: gql``,
    PermissionCreate: gql``,
    PermissionUpdate: gql``,
    PermissionDelete: gql``,
  },
  RolePermission: {
    RolePermissionIndex: gql``,
    RolePermissionCreate: gql``,
    RolePermissionUpdate: gql``,
    RolePermissionDelete: gql``,
  },
}