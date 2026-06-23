import {
	myRequest
} from '../index.js'


export const getReplyById = (id) => {
	return myRequest({
		url: '/reply/getReplyList/post/' + id,
		method: 'get',
	})
}

export const addReply = (id, content) => {
	return myRequest({
		url: '/reply/addReply/post/' + id,
		method: 'post',
		data: content
	})
}
