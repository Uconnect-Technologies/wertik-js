export const state = () => ({
  isLoggedIn: false,
  profile: {},
  email: '',
  accessToken: ''
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
  },
  setProfile(state, profile) {
    state.profile = profile
  },
  logout(state) {
    state.profile = null
    state.email = ''
    state.isLoggedIn = false
    state.accessToken = ''
    localStorage.clear()
  }
}
