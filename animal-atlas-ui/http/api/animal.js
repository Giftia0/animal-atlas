import {
	myRequest
} from '../index.js'

export const getAnimal = (list, num) => {
	return myRequest({
		method: 'post',
		url: '/animal/getAnimalRandom/' + num,
		data: list
	})
}

export const getAnimalInfo = (id) => {
	return myRequest({
		method: 'get',
		url: '/animal/getAnimalInfo/' + id,
	})
}


export const changeLike = (userId, animalId) => {
	return myRequest({
		method: 'post',
		url: '/animal/changeLike/' + userId + '/' + animalId,
	})
}

export const getLikeStatus = (userId, animalId) => {
	return myRequest({
		method: 'get',
		url: '/animal/getLikeStatus/' + userId + '/' + animalId,
	})
}

export const updateAnimal = (animal) => {
	return myRequest({
		method: 'put',
		url: '/animal/updateAnimal',
		data: animal
	})
}

export const getAnimalPhoto = (id) => {
	return myRequest({
		method: 'get',
		url: '/animal/getAnimalPhoto/' + id
	})
}

export const deleteAnimalImg = (id) => {
	return myRequest({
		method: 'delete',
		url: '/animal/deleteAnimalImg/' + id
	})
}

export const addAnimal = (animal) => {
	return myRequest({
		method: 'post',
		url: '/animal/addAnimal',
		data: animal
	})
}

export const deleteAnimal = (id) => {
	return myRequest({
		method: 'delete',
		url: '/animal/deleteAnimal/' + id
	})
}
