<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    let profile, accessToken, email

    if (process.browser) {
      profile = JSON.parse(localStorage.profile || '{}')
      accessToken = localStorage.accessToken || ''
      email = localStorage.email || ''
      // this.$store.mutate
    }
  }
}
</script>
