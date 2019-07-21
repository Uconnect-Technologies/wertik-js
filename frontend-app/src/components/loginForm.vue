<template>
  <div class="home">
  	<form @submit.prevent="login" >
  		<div>
				<label>Email</label>
				<input type="email" name="email" v-model="form.email" >
  		</div>
  		<div>
  			<label>Password</label>
  			<input type="password" name="password" v-model="form.password">
  		</div>
  		<div>
  			<button type="submit" >login</button>
  		</div>
  	</form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import login from "@/graphql/mutations/login.js";

export default Vue.extend({
  name: 'LoginForm',
  data() {
  	return {
  		form :{
  			email: "ilyas.datoo@gmail.com",
  			password: "passpass"
  		}
  	}
  },
  methods: {
  	async login() {
  		if (this.form.email && this.form.password) {
  			try {
	  			let response = await this.$httpGraphql.post('',{
	  				query: login,
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
