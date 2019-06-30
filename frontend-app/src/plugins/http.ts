import axios from "axios";

const instance = axios.create({
	baseURL: process.env.VUE_APP_API_BASE_URL
});

const instanceGraphql = axios.create({
	baseURL: process.env.VUE_APP_API_BASE_URL
});

export default {
	http: instance,
	httpGraphql: instanceGraphql
};