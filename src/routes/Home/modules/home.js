// Import fetch.pollyfill for browsers that don't support `fetch` methods
import 'whatwg-fetch'
import { API_SERVER } from 'config'
import update from 'react-addons-update'
import { findIndex } from 'lodash'

// ------------------------------------
// Constants
// ------------------------------------

export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST'
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS'
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE'
export const FILTER_DATA = 'FILTER_DATA'
export const DELETE_DATA = 'DELETE_DATA'

// ------------------------------------
// Actions
// ------------------------------------

function fetchDataRequest (collection) {
  return {
    type: FETCH_DATA_REQUEST,
    collection
  }
}

function fetchDataSuccess (collection, body) {
  return {
    type: FETCH_DATA_SUCCESS,
    collection,
    body
  }
}

function fetchDataFailure (collection, error) {
  return {
    type: FETCH_DATA_FAILURE,
    collection,
    error
  }
}

function fetchData (url, req, success, fail, collection) {
  return dispatch => {
    dispatch(req(collection))
    return fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText)
        }
        return res.json()
      })
      .then(json => {
        dispatch(success(collection, json))
      })
      .catch(error => {
        dispatch(fail(collection, error.message))
      })
  }
}

export function fetchUsers () {
  return fetchData(
    API_SERVER + '/v1/users',
    fetchDataRequest,
    fetchDataSuccess,
    fetchDataFailure,
    'users'
  )
}

export function fetchGroups () {
  return fetchData(
    API_SERVER + '/v1/groups',
    fetchDataRequest,
    fetchDataSuccess,
    fetchDataFailure,
    'groups'
  )
}

export function filterData (collection, pattern) {
  return {
    type: FILTER_DATA,
    collection,
    pattern
  }
}

export function deleteItem (collection, id) {
  return {
    type: DELETE_DATA,
    collection,
    id
  }
}

export function deleteData (collection, id) {
  return dispatch => {
    dispatch(deleteItem(collection, id))
    return fetch(
      API_SERVER + '/v1/' + collection + '/' + id,
      {
        method: 'DELETE',
        mode: 'cors'
      }
    )
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_DATA_SUCCESS]: (state, action) => update(state, {
    [action.collection]: {
      entities: { $set: action.body[action.collection] },
      loading: {$set: false}
    }
  }),
  [FETCH_DATA_FAILURE]: (state, action) => update(state, {
    [action.collection]: {
      error: {$set: action.error},
      loading: {$set: false}
    }
  }),
  [FETCH_DATA_REQUEST]: (state, action) => update(state, {
    [action.collection]: {
      loading: {$set: true}
    }
  }),
  [FILTER_DATA]: (state, action) => update(state, {
    [action.collection]: {
      filterPattern: {$set: action.pattern}
    }
  }),
  [DELETE_DATA]: (state, action) => {
    const { collection, id } = action
    const index = findIndex(state[collection].entities, {id})
    return update(state, {
      [collection]: {
        entities: {$splice: [[index, 1]]}
      }
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export const initialState = {
  users: {
    loading: false,
    entities: [],
    error: null,
    filterPattern: null
  },
  groups: {
    loading: false,
    entities: [],
    error: null,
    filterPattern: null
  }
}

export default function homeReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
