<template>
  <div>
    <div>Login to your account</div>
    <div>
      <el-input type="text" v-model="email" />
      <el-input type="password" v-model="password" />
      <el-button v-loading="loading" @click.prevent="login()">Login</el-button>
    </div>
    <br />
    <router-link to="/">Go Back</router-link>
    <router-link to="/signup">Signup</router-link>
  </div>
</template>
<script>
import loginMutation from '~/graphql/auth/mutation.login.js'
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      email: '',
      password: '',
      loading: false
    }
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
    async login() {
      if (this.email && this.password) {
        this.loading = true
        let response = await this.$post(loginMutation, {
          email: this.email,
          password: this.password
        })
        this.loading = false
        console.log(response)
        if (response.success) {
          this.$notify.success({
            title: 'Success',
            message: 'Login successfull'
          })
          let { accessToken, email, profile } = response.data.login
          window.localStorage.setItem('accessToken', accessToken)
          window.localStorage.setItem('email', email)
          window.localStorage.setItem('profile', JSON.stringify(profile))
          this.setProfile(profile)
          this.setEmail(email)
          this.setLoggedIn()
          this.setAccessToken(accessToken)
          this.$router.replace('/')
        } else {
          response.errors.forEach(element => {
            this.$notify.error({
              title: response.message,
              message: element
            })
          })
        }
      } else {
        alert('Email and/or Password is required')
      }
    }
  },
  mounted() {}
}
</script>
<style>
</style>