import 'whatwg-fetch'
import { API_SERVER } from 'config'
import update from 'react-addons-update'

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_GROUP_REQUEST = 'FETCH_GROUP_REQUEST'
export const FETCH_GROUP_SUCCESS = 'FETCH_GROUP_SUCCESS'
export const FETCH_GROUP_FAILURE = 'FETCH_GROUP_FAILURE'
export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'
export const GROUP_UPDATE_SUCCESS = 'GROUP_UPDATE_SUCCESS'
export const GROUP_UPDATE_REQUEST = 'GROUP_UPDATE_REQUEST'
export const CLEAR_DATA = 'CLEAR_DATA'

// ------------------------------------
// Actions
// ------------------------------------

function fetchGroupRequest (collection) {
  return {
    type: FETCH_GROUP_REQUEST
  }
}

function fetchGroupSuccess (body) {
  return {
    type: FETCH_GROUP_SUCCESS,
    body
  }
}

function fetchGroupFailure (collection, error) {
  return {
    type: FETCH_GROUP_FAILURE,
    collection,
    error
  }
}

function fetchUsersRequest () {
  return {
    type: FETCH_USERS_REQUEST
  }
}

function fetchUsersSuccess (body) {
  return {
    type: FETCH_USERS_SUCCESS,
    body
  }
}

function fetchUsersFailure (error) {
  return {
    type: FETCH_USERS_FAILURE,
    error
  }
}

function groupUpdateSuccess () {
  return {
    type: GROUP_UPDATE_SUCCESS
  }
}

function groupUpdateRequest () {
  return {
    type: GROUP_UPDATE_REQUEST
  }
}

export function clearData () {
  return {
    type: CLEAR_DATA
  }
}

export function fetchUsers () {
  return dispatch => {
    dispatch(fetchUsersRequest())
    return fetch(API_SERVER + '/v1/users/')
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText)
        }
        return res.json()
      })
      .then(json => {
        dispatch(fetchUsersSuccess(json))
      })
      .catch(error => {
        dispatch(fetchUsersFailure(error.message))
      })
  }
}

export function fetchGroup (id) {
  return dispatch => {
    dispatch(fetchGroupRequest())
    return fetch(API_SERVER + '/v1/groups/' + id)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText)
        }
        return res.json()
      })
      .then(json => {
        dispatch(fetchGroupSuccess(json))
      })
      .catch(error => {
        dispatch(fetchGroupFailure(error.message))
      })
  }
}

export function updateData (data) {
  return requestData(
    data,
    API_SERVER + '/v1/groups/',
    'PUT',
    groupUpdateRequest,
    groupUpdateSuccess
  )
}

export function saveData (data) {
  return requestData(
    data,
    API_SERVER + '/v1/groups/',
    'POST',
    groupUpdateRequest,
    groupUpdateSuccess
  )
}

function requestData (data, url, method, beforeSendCb, cb) {
  let payload = new FormData()
  payload.append('group', JSON.stringify(data))
  return dispatch => {
    return fetch(
      url,
      {
        method: method,
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({group: data})
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
  [FETCH_GROUP_SUCCESS]: (state, action) => update(state, {
    data: {$set: action.body.group}
  }),
  [FETCH_USERS_SUCCESS]: (state, action) => update(state, {
    users: {$set: action.body.users}
  }),
  [GROUP_UPDATE_SUCCESS]: (state, action) => update(state, {
    updated: {$set: true}
  }),
  [GROUP_UPDATE_REQUEST]: (state, action) => update(state, {
    updated: {$set: false}
  }),
  [FETCH_USERS_REQUEST]: (state, action) => update(state, {
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
    title: null,
    users: []
  },
  updated: false,
  users: []
}
export default function groupsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
