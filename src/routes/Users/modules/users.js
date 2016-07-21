import 'whatwg-fetch'
import { API_SERVER } from 'config'
import update from 'react-addons-update'

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST'
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE'
export const FETCH_GROUPS_REQUEST = 'FETCH_GROUPS_REQUEST'
export const FETCH_GROUPS_SUCCESS = 'FETCH_GROUPS_SUCCESS'
export const FETCH_GROUPS_FAILURE = 'FETCH_GROUPS_FAILURE'
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS'
export const USER_UPDATE_REQUEST = 'USER_UPDATE_REQUEST'
export const CLEAR_DATA = 'CLEAR_DATA'

// ------------------------------------
// Actions
// ------------------------------------

function fetchUserRequest (collection) {
  return {
    type: FETCH_USER_REQUEST
  }
}

function fetchUserSuccess (body) {
  return {
    type: FETCH_USER_SUCCESS,
    body
  }
}

function fetchUserFailure (collection, error) {
  return {
    type: FETCH_USER_FAILURE,
    collection,
    error
  }
}

function fetchGroupsRequest () {
  return {
    type: FETCH_GROUPS_REQUEST
  }
}

function fetchGroupsSuccess (body) {
  return {
    type: FETCH_GROUPS_SUCCESS,
    body
  }
}

function fetchGroupsFailure (error) {
  return {
    type: FETCH_GROUPS_FAILURE,
    error
  }
}

function userUpdateSuccess () {
  return {
    type: USER_UPDATE_SUCCESS
  }
}

function userUpdateRequest () {
  return {
    type: USER_UPDATE_REQUEST
  }
}

export function clearData () {
  return {
    type: CLEAR_DATA
  }
}

export function fetchGroups () {
  return dispatch => {
    dispatch(fetchGroupsRequest())
    return fetch(API_SERVER + '/v1/groups/')
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText)
        }
        return res.json()
      })
      .then(json => {
        dispatch(fetchGroupsSuccess(json))
      })
      .catch(error => {
        dispatch(fetchGroupsFailure(error.message))
      })
  }
}

export function fetchUser (id) {
  return dispatch => {
    dispatch(fetchUserRequest())
    return fetch(API_SERVER + '/v1/users/' + id)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText)
        }
        return res.json()
      })
      .then(json => {
        dispatch(fetchUserSuccess(json))
      })
      .catch(error => {
        dispatch(fetchUserFailure(error.message))
      })
  }
}

export function updateData (data) {
  return requestData(
    data,
    API_SERVER + '/v1/users/',
    'PUT',
    userUpdateRequest,
    userUpdateSuccess
  )
}

export function saveData (data) {
  return requestData(
    data,
    API_SERVER + '/v1/users/',
    'POST',
    userUpdateRequest,
    userUpdateSuccess
  )
}

function requestData (data, url, method, beforeSendCb, cb) {
  let payload = new FormData()
  payload.append('user', JSON.stringify(data))
  return dispatch => {
    return fetch(
      url,
      {
        method: method,
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({user: data})
      }
    )
      .then(res => res.json())
      .then(json => {
        dispatch(cb())
      })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_USER_SUCCESS]: (state, action) => update(state, {
    data: {$set: action.body.user}
  }),
  [FETCH_GROUPS_SUCCESS]: (state, action) => update(state, {
    groups: {$set: action.body.groups}
  }),
  [USER_UPDATE_SUCCESS]: (state, action) => update(state, {
    updated: {$set: true}
  }),
  [USER_UPDATE_REQUEST]: (state, action) => update(state, {
    updated: {$set: false}
  }),
  [FETCH_GROUPS_REQUEST]: (state, action) => update(state, {
    updated: {$set: false},
    data: {$set: initialState.data}
  }),
  [CLEAR_DATA]: (state, action) => update(state, {
    updated: {$set: false},
    data: {$set: initialState.data}
  })

}

// ------------------------------------
// Reducer
// ------------------------------------
export const initialState = {
  data: {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    nickname: null,
    groups: []
  },
  updated: false,
  groups: []
}
export default function usersReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
