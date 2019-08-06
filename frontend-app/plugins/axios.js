import axios from 'axios'
import Vue from 'vue'
import { get } from 'lodash'

let axiosGraphql = axios

axiosGraphql.defaults.baseURL = 'http://localhost:1209/graphql'

Vue.prototype.$axiosGraphql = axiosGraphql

Vue.prototype.$post = async function(query, variables) {
  try {
    let response = await axiosGraphql.post('', {
      query: query,
      variables: variables
    })
    let responseData = response.data
    let errors = get(responseData, 'errors', [])
    let responseActualData = get(responseData, 'data', null)
    let totalErrors = errors.length
    if (totalErrors > 0) {
      return {
        success: false,
        errors: errors.map(c => c.message),
        message: 'Something went wrong'
      }
    } else {
      return {
        success: true,
        data: responseActualData,
        message: 'Success'
      }
    }
  } catch (e) {
    console.log(e.message)
    return {
      success: false,
      message: e.message,
      error: e
    }
  }
}
