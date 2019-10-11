<template>
  <div>
    <el-button @click="logoutUser">Logout</el-button>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  methods: {
    ...mapMutations(['logout']),
    logoutUser() {
      this.logout()
      this.$router.replace('/')
    }
  }
}
</script>

<style>
</style>
