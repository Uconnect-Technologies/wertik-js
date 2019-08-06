<template>
  <div>
    <div>Login to your account</div>
    <div>
      <el-input placeholder="Email" type="text" v-model="email" />
      <el-input placeholder="Password" type="password" v-model="password" />
      <el-input placeholder="Confirm Password" type="password" v-model="confirmPassword" />
      <el-button @click.prevent="signup()">Signup</el-button>
      <br />
      <router-link to="/">Go Back</router-link>
      <router-link to="/login">Login</router-link>
    </div>
  </div>
</template>
<script>
import signupMutation from '~/graphql/auth/mutation.signup.js'
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: ''
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
    async signup() {
      if (this.email && this.password && this.confirmPassword) {
        try {
          let response = await this.$post(signupMutation, {
            email: this.email,
            password: this.password,
            confirmPassword: this.confirmPassword
          })
          console.log(response)
          if (response.success) {
            let { accessToken, email, profile } = response.data.signup
            window.localStorage.setItem('accessToken', accessToken)
            window.localStorage.setItem('profile', JSON.stringify(profile))
            window.localStorage.setItem('email', email)
            this.setAccessToken(accessToken)
            this.setProfile(profile)
            this.setEmail(email)
            this.setLoggedIn()
            this.$notify.success({
              title: 'Success',
              message: 'Welcome to the site'
            })
            this.$router.replace('/')
          } else {
            response.errors.forEach(element => {
              this.$notify.error({
                title: response.message,
                message: element
              })
            })
          }
        } catch (e) {
          console.log(e.message)
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