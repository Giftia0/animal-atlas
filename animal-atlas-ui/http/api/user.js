import {
	myRequest
} from '../index.js'

export const getCode = (phone) => {
	return myRequest({
		url: '/user/getCheckCode/' + phone
	})
}

export const loginByCode = (phone, code) => {
	return myRequest({
		method: 'post',
		url: '/user/loginByCheckCode',
		data: {
			phone,
			code
		},
	})
}

export const getUserInfo = () => {
	return myRequest({
		url: '/user/getUserInfo'
	})
}

export const updateUserInfo = (user) => {
	return myRequest({
		method:'post',
		url: '/user/updateUserInfo',
		data: user
	})
}
