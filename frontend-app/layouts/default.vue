<template>
  <div>
    <el-container v-if="isLoggedIn">
      <el-aside width="280px">
        <admin-sidebar />
      </el-aside>
      <el-container>
        <el-header>
          <admin-navbar />
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
import AdminSidebar from '@/components/AdminSidebar'
import AdminNavbar from '@/components/AdminNavbar'
export default {
  data() {
    return {}
  },
  components: {
    AdminSidebar,
    AdminNavbar
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
