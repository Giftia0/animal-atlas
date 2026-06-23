import {
	myRequest
} from '../index.js'


export const addPost = (post) => {
	return myRequest({
		url: '/post/addPost',
		method:'post',
		data: post
	})
}

export const getPostList = (pageNo, pageSize) => {
	return myRequest({
		url: '/post/getPostList/' + pageNo + '/' +pageSize,
		method:'get',
	})
}

export const getPostInfo = (id) => {
	return myRequest({
		url: '/post/getPostInfo/' + id ,
		method:'get',
	})
}

