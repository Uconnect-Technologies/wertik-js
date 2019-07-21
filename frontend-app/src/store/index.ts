import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
	},
	getters: {

	},
	mutations: {

	},
	modules: {
		auth: {
			state: {
				accessToken: "blahblah",
				user: {}
			},
			getters: {
				isLoggedIn(state) {
					return !!state.accessToken
				},
				user(state) {
					return state.user;
				}
			},
			actions: {

			},
			mutations: {

			}
		}
	}
});