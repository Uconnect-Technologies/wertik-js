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
      console.log(1)
      if (this.email && this.password) {
        try {
          let response = await this.$httpGraphql.post('', {
            query: loginMutation,
            variables: { email: this.email, password: this.password }
          })
          let { accessToken, email } = response.data.data.login
          window.localStorage.setItem('accessToken', accessToken)
          window.localStorage.setItem('email', email)
          this.$router.replace('/')
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