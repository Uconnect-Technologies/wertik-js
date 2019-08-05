import axios from 'axios'
import Vue from 'vue'

let graphQL = axios

graphQL.defaults.baseURL = 'http://localhost:1209/graphql'

Vue.prototype.$httpGraphql = graphQL
