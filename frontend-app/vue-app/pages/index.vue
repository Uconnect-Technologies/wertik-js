<template>
  <div>
    <blockquote class="blockquote">
      <h1>&#8220;Wertick-JS&#8221;</h1>
      <p>
        A library that powers your app with GraphQL + Rest API. UI example showing how to use the library.
        <span
          v-if="!isLoggedIn"
        >Go ahead and go to login to see it in action</span>
      </p>
      <router-link v-if="!isLoggedIn" to="/login">
        <el-button>Login</el-button>
      </router-link>
      <router-link to="/signup" v-if="!isLoggedIn">
        <el-button>Singup</el-button>
      </router-link>

      <p
        v-if="isLoggedIn"
      >Welcome to Wertik authenticated user. Now go ahead and explore already builtin features for your app.</p>
      <div>
        <h2>Role Based Access Control</h2>
        <p>They way we setup RBAC is on permissions, Every user has permissions assigned like, create.article update.article, Accroding to these permissions User is allowed to do an action.</p>
      </div>
      <div>
        <h2>Users & Profiles</h2>
        <p>From the admin panel you can control your user details and their profiles. You can easily see who is registered to your app.</p>
      </div>
      <div>
        <h2>Logging</h2>
        <p>In Logging you can easily check your app history. A log file is saved in your backend folder according to dates.</p>
      </div>
      <div>
        <h2>Emails</h2>
        <p>You can check the list of emails sent to your users.</p>
      </div>
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

