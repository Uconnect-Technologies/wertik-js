import axios from "axios";
export default {
  Auth: {
    Login: (url, data) => {
      return axios.post()
    },
    Signup: (url, data) => {
      return axios.post(url, data);
    },
  },
  Role: {
    RoleIndex: (url, data) => {
      return axios.post(url, data);
    },
    RoleCreate: (url, data) => {
      return axios.post(url, data);
    },
    RoleUpdate: (url, data) => {
      return axios.post(url, data);
    },
    RoleDelete: (url, data) => {
      return axios.post(url, data);;
    },
  },
  User: {
    UserIndex: (url, data) => {
      return axios.post(url, data);
    },
    UserCreate: (url, data) => {
      return axios.post(url, data);
    },
    UserUpdate: (url, data) => {
      return axios.post(url, data);
    },
    UserDelete: (url, data) => {
      return axios.post(url, data);
    },
  },
  UserRole: {
    UserRoleIndex: (url, data) => {
      return axios.post(url, data);
    },
    UserRoleCreate: (url, data) => {
      return axios.post(url, data);
    },
    UserRoleUpdate: (url, data) => {
      return axios.post(url, data);
    },
    UserRoleDelete: (url, data) => {
      return axios.post(url, data);
    },
  },
  Permission: {
    PermissionIndex: (url, data) => {
      return axios.post(url, data);
    },
    PermissionCreate: (url, data) => {
      return axios.post(url, data);
    },
    PermissionUpdate: (url, data) => {
      return axios.post(url, data);
    },
    PermissionDelete: (url, data) => {
      return axios.post(url, data);
    },
  },
  RolePermission: {
    RolePermissionIndex: (url, data) => {
      return axios.post(url, data);
    },
    RolePermissionCreate: (url, data) => {
      return axios.post(url, data);
    },
    RolePermissionUpdate: (url, data) => {
      return axios.post(url, data);
    },
    RolePermissionDelete: (url, data) => {
      return axios.post(url, data);
    },
  },
}