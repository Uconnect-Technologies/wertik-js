export const state = () => ({
  isLoggedIn: false,
  profile: {},
  email: ''
})

export const mutations = {
  setAccessToken(state, payload) {
    state.accessToken = payload
  },
  setEmail(state, payload) {
    state.email = payload
  },
  setLoggedIn(state) {
    state.isLoggedIn = true
  },
  setLoggedOut(state) {
    state.isLoggedIn = false
  }
}
