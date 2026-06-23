"use strict";
const http_index = require("../index.js");
const getAnimal = (list, num) => {
  return http_index.myRequest({
    method: "post",
    url: "/animal/getAnimalRandom/" + num,
    data: list
  });
};
const getAnimalInfo = (id) => {
  return http_index.myRequest({
    method: "get",
    url: "/animal/getAnimalInfo/" + id
  });
};
const changeLike = (userId, animalId) => {
  return http_index.myRequest({
    method: "post",
    url: "/animal/changeLike/" + userId + "/" + animalId
  });
};
const getLikeStatus = (userId, animalId) => {
  return http_index.myRequest({
    method: "get",
    url: "/animal/getLikeStatus/" + userId + "/" + animalId
  });
};
const updateAnimal = (animal) => {
  return http_index.myRequest({
    method: "put",
    url: "/animal/updateAnimal",
    data: animal
  });
};
const getAnimalPhoto = (id) => {
  return http_index.myRequest({
    method: "get",
    url: "/animal/getAnimalPhoto/" + id
  });
};
const deleteAnimalImg = (id) => {
  return http_index.myRequest({
    method: "delete",
    url: "/animal/deleteAnimalImg/" + id
  });
};
const addAnimal = (animal) => {
  return http_index.myRequest({
    method: "post",
    url: "/animal/addAnimal",
    data: animal
  });
};
const deleteAnimal = (id) => {
  return http_index.myRequest({
    method: "delete",
    url: "/animal/deleteAnimal/" + id
  });
};
exports.addAnimal = addAnimal;
exports.changeLike = changeLike;
exports.deleteAnimal = deleteAnimal;
exports.deleteAnimalImg = deleteAnimalImg;
exports.getAnimal = getAnimal;
exports.getAnimalInfo = getAnimalInfo;
exports.getAnimalPhoto = getAnimalPhoto;
exports.getLikeStatus = getLikeStatus;
exports.updateAnimal = updateAnimal;
