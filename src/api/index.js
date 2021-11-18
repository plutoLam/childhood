import { request } from '@/utils'

export function login(username, password) {
  return request({
    method: "post",
    url: '/user/login',
    data: {
      username,
      password,
    }
  });
}

export function register(username, password, name, avatarIndex) {
  return request({
    method: "post",
    url: '/user/register',
    data: {
      username,
      password,
      name,
      avatarIndex
    }
  });
}

export function getMessageBoard(page, size, token, sort) {
  return request({
    method: "get",
    url: '/message-board',
    params: {
      page,
      size,
      sort,
    },
    headers: {
      Authorization: token
    }
  });
}

export function postContent(content, token) {
  return request({
    method: "post",
    url: '/message-board',
    data: {
      content
    },
    headers: {
      Authorization: token
    }
  });
}

export function likeControl(id, token) {
  return request({
    method: "put",
    url: `/message-board/${id}`,
    headers: {
      Authorization: token
      // Authorization: ''
    }
  });
}

export function changeAvatar(id, token) {
  return request({
    method: "put",
    url: `/user`,
    data: {
      avatarIndex: id
    },
    headers: {
      Authorization: token
      // Authorization: ''
    }
  });
}