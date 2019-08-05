<template>
  <div>
    <div>Login to your account</div>
    <div>
      <input type="text" v-model="email" />
      <input type="password" v-model="password" />
      <input type="password" v-model="confirmPassword" />
      <button @click.prevent="signup()">Login</button>
    </div>
  </div>
</template>
<script>
import signupMutation from '~/graphql/auth/mutation.signup.js'
export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    async signup() {
      console.log(1)
      if (this.email && this.password) {
        try {
          let response = await this.$httpGraphql.post('', {
            query: signupMutation,
            variables: {
              email: this.email,
              password: this.password,
              confirmPassword: this.confirmPassword
            }
          })
          let { accessToken, email } = response.data.data.signup
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