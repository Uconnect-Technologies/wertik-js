<template>
  <div class="home">
  	<form @submit.prevent="signup" >
  		<div>
				<label>Email</label>
				<input type="email" name="email" v-model="form.email" >
  		</div>
  		<div>
  			<label>Password</label>
  			<input type="password" name="password" v-model="form.password">
  		</div>
      <div>
        <label>Confirm Password</label>
        <input type="password" name="confirmPassword" v-model="form.confirmPassword">
      </div>
  		<div>
  			<button type="submit" >signup</button>
  		</div>
  	</form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import signup from "@/graphql/mutations/signup.js";

export default Vue.extend({
  name: 'SignupForm',
  data() {
  	return {
  		form :{
  			email: "ilyas.datoo@gmail.com",
  			password: "passpass",
        confirmPassword: "passpass"
  		}
  	}
  },
  methods: {
  	async signup() {
  		if (this.form.email && this.form.password) {
  			try {
	  			let response = await this.$httpGraphql.post('',{
	  				query: signup,
	  				variables: this.form
	  			});
	  			console.log(response);
	  			let {data, errors} = response.data;
	  			if (errors.length > 0) {
	  				alert(errors[0].message)
	  			}
  			} catch (error) {
  				console.log(error);
  			}
  		}else {
  			alert("Enter your email and password")
  		}
  	},
  }
});
</script>
