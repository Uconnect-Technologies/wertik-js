<template>
  <div>
    <div>Login to your account</div>
    <div>
      <el-input type="text" v-model="email" />
      <el-input type="password" v-model="password" />
      <el-button @click.prevent="login()">Login</el-button>
    </div>
  </div>
</template>
<script>
import loginMutation from '~/graphql/auth/mutation.login.js'
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      if (this.email && this.password) {
        let response = await this.$post(loginMutation, {
          email: this.email,
          password: this.password
        })
        if (response.success) {
          this.$notify.success({
            title: 'Success',
            message: 'Login successfull'
          })
          let { accessToken, email, profile } = response.data.login
          window.localStorage.setItem('accessToken', accessToken)
          window.localStorage.setItem('email', email)
          window.localStorage.setItem('profile', JSON.stringify(profile))
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