<template>
  <div class="home">
  	<login-form />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import loginForm from "@/components/loginForm.vue";

export default Vue.extend({
  name: 'LOgin',
  components: {
  	loginForm
  }
});
</script>
