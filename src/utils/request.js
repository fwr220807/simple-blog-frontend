import axios from 'axios'

console.log(import.meta.env.VITE_APP_BASE_API);
// create an axios instance
const request = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_API, // url = base url + request url
	timeout: 5000, // request timeout
})

// request interceptor
request.interceptors.request.use(
	(config) => {
		// do something before request is sent
		// *后期需要补 token 验证
		return config
	},
	(error) => {
		console.log(error) // for debug
		return Promise.reject(error)
	}
)

// response interceptor
request.interceptors.response.use(
	(response) => {
		return response.data
	},
	(error) => {
		return Promise.reject(error)
	}
)

export default request
