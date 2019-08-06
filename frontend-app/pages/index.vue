<template>
  <div>
    <blockquote class="blockquote">
      <h1>&#8220;Wertick-JS&#8221;</h1>
      <p>A library that powers your app with GraphQL + Rest API</p>
      <p>UI example showing how to use the library. Go ahead and go to login to see it in action</p>
      <router-link v-if="!isLoggedIn" to="/login">
        <el-button>Login</el-button>
      </router-link>
      <router-link to="/signup" v-if="!isLoggedIn">
        <el-button>Singup</el-button>
      </router-link>

      <br />
      <br />
      <iframe
        src="https://ghbtns.com/github-btn.html?user=ilyaskarim&repo=wertik-js&type=star&count=true"
        frameborder="0"
        scrolling="0"
        width="170px"
        height="20px"
      ></iframe>
      <footer></footer>
    </blockquote>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Home',
  computed: {
    ...mapState({
      isLoggedIn: state => state.isLoggedIn
    })
  }
}
</script>

