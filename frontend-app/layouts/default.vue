<template>
  <div>
    {{ isLoggedIn }}
    <el-container v-if="isLoggedIn">
      <el-aside style="border-right: 1px solid #eee;" width="200px">Aside</el-aside>
      <el-container>
        <el-header style="border-bottom: 1px solid #eee;">
          <el-button style="float: right;" @click="logoutUser" v-if="isLoggedIn">Logout</el-button>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
    <el-container v-else>
      <router-view />
    </el-container>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  methods: {
    ...mapMutations([
      'logout',
      'setAccessToken',
      'setEmail',
      'setLoggedIn',
      'setLoggedOut',
      'setProfile'
    ]),
    logoutUser() {
      this.logout()
    }
  },
  computed: {
    ...mapState({
      isLoggedIn: state => state.isLoggedIn
    })
  },
  mounted() {
    let profile, accessToken, email
    if (process.browser) {
      profile = JSON.parse(localStorage.profile || '{}')
      accessToken = localStorage.accessToken || ''
      email = localStorage.email || ''
      if (accessToken && email) {
        this.setProfile(profile)
        this.setEmail(email)
        this.setLoggedIn()
        this.setAccessToken(accessToken)
      }
    }
  }
}
</script>
