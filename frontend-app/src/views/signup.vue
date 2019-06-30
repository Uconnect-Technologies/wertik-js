<template>
  <div class="home">
  	<signup-form />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import signupForm from "@/components/signupForm.vue";

export default Vue.extend({
  name: 'Signup',
  components: {
  	signupForm
  }
});
</script>
