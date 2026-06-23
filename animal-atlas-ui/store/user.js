import {
	defineStore
} from 'pinia'
import jwtDecode from 'jwt-decode'

export const userStore = defineStore('user', {
	state: () => ({
		user: {
			id: '',
			role: '',
			phone: '',
			username: '',
			avatar: '',
		}
	}),
	getters: {

	},
	actions: {
		getUserInfo() {
			let token = uni.getStorageSync('token');
			this.user = token == '' ? null : jwtDecode(token);
		}
	}
})
