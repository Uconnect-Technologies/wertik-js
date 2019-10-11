<template>
  <div class="sidebar">
    <div class="image">
      <img :src="require('~/assets/logo/nodejs.svg')" />
    </div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">Role Management</span>
        </template>
        <el-menu-item-group>
          <router-link to="/admin/role-management/roles">
            <el-menu-item index="roles-roles">Roles</el-menu-item>
          </router-link>
          <router-link to="/admin/role-management/permissions">
            <el-menu-item index="roles-permissions">Permissions</el-menu-item>
          </router-link>
          <router-link to="/admin/role-management/role-permissions">
            <el-menu-item index="roles-role-permissions">Role Permissions</el-menu-item>
          </router-link>
          <router-link to="/admin/role-management/user-permissions">
            <el-menu-item index="roles-user-permissions">User Permissions</el-menu-item>
          </router-link>
          <router-link to="/admin/role-management/user-roles">
            <el-menu-item index="roles-user-roles">User Roles</el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">User Management</span>
        </template>
        <el-menu-item-group>
          <router-link to="/admin/user-management/users">
            <el-menu-item index="users-users">Users</el-menu-item>
          </router-link>
          <router-link to="/admin/user-management/profiles">
            <el-menu-item index="users-profiles">Profiles</el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">Logging</span>
      </el-menu-item>

      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">Emails</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 100%;
}
.image {
  text-align: center;
  padding: 20px 0;
}
img {
  height: 100px;
  margin: auto;
  width: 100px;
}
.el-menu {
  border-right: 0px;
}
</style>
