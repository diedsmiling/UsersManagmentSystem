import configureMockStore from 'redux-mock-store'
import fetchMock from 'fetch-mock'
import thunk from 'redux-thunk'
import update from 'react-addons-update'
import {
  fetchUsers,
  fetchGroups,
  filterData,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  FILTER_DATA,
  initialState,
  default as homeReducer
  } from 'routes/Home/modules/home'
import { API_SERVER } from 'config'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('(Redux Module) Home', () => {
  it('Should export constants', () => {
    expect(FETCH_DATA_REQUEST).to.equal('FETCH_DATA_REQUEST')
    expect(FETCH_DATA_SUCCESS).to.equal('FETCH_DATA_SUCCESS')
    expect(FETCH_DATA_FAILURE).to.equal('FETCH_DATA_FAILURE')
    expect(FILTER_DATA).to.equal('FILTER_DATA')
  })

  describe('(Reducer)', () => {
    it('Should be a function.', () => {
      expect(homeReducer).to.be.a('function')
    })

    it('Should initialize state with empty users array.', () => {
      expect(homeReducer(undefined, {})).to.deep.equal(initialState)
    })

    it('Should return the previous state if an action was not matched.', () => {
      let state = homeReducer(undefined, {})
      expect(state).to.deep.equal(initialState)
      state = homeReducer(state, {type: '@@@@@@@'})
      expect(state).to.deep.equal(initialState)
      state = 'mocked state'
      state = homeReducer(state, {type: '@@@@@@@'})
      expect(state).to.equal('mocked state')
    })
    assertReducerHandling('users')
    assertReducerHandling('groups')
  })

  describe('(Action Creater) fetchUsers', () => {
    afterEach(() => {
      fetchMock.restore()
    })

    it('should be exported as a function', () => {
      expect(fetchUsers).to.be.a('function')
    })

    it('should create FETCH_DATA_SUCCESS and set payload from response on a successful request', (done) => {
      const mockedResponse = { users: ['mocked data'] }
      const expectedActions = [
        { type: FETCH_DATA_REQUEST, collection: 'users' },
        { type: FETCH_DATA_SUCCESS,  collection: 'users', body: mockedResponse }
      ]

      assertDataFetch(
        expectedActions,
        API_SERVER + '/v1/users',
        mockedResponse,
        fetchUsers,
        done
      )
    })

    it('should create FETCH_DATA_FAILURE and set error as payload on a failed request', (done) => {
      const expectedActions = [
        { type: FETCH_DATA_REQUEST, collection: 'users' },
        { type: FETCH_DATA_FAILURE, collection: 'users', error: 'Internal Server Error' }
      ]

      assertDataFetch(
        expectedActions,
        API_SERVER + '/v1/users',
        500,
        {"code":500, "message":"Forms not found"},
        fetchUsers,
        done
      )
    })
  })

  describe('(Action Creater) fetchGroups', () => {
    afterEach(() => {
      fetchMock.restore()
    })

    it('should be exported as a function', () => {
      expect(fetchGroups).to.be.a('function')
    })

    it('should create FETCH_DATA_SUCCESS and set payload from response on a successful request', (done) => {
      const mockedResponse = { groups: ['mocked groups'] }
      const expectedActions = [
        { type: FETCH_DATA_REQUEST, collection: 'groups' },
        { type: FETCH_DATA_SUCCESS, collection: 'groups', body: mockedResponse }
      ]

      assertDataFetch(
        expectedActions,
        API_SERVER + '/v1/groups',
        mockedResponse,
        fetchUsers,
        done
      )
    })

    it('should create FETCH_GROUPS_FAILURE and set error as payload on a failed request', (done) => {
      const expectedActions = [
        { type: FETCH_DATA_REQUEST, collection: 'groups'},
        { type: FETCH_DATA_FAILURE, collection: 'groups', error: 'Internal Server Error' }
      ]

      assertDataFetch(
        expectedActions,
        API_SERVER + '/v1/groups',
        500,
        {"code":500, "message":"Groups not found"},
        fetchGroups,
        done
      )
    })
  })

  describe('(Action Creater) filterData', () => {
    it('should be exported as a function', () => {
      expect(filterData).to.be.a('function')
    })
    assertFilterData('users')
    assertFilterData('groups')
  })

})

/**
 * Asserts search action creator
 *
 * @param {string} collection
 */
function assertFilterData (collection) {
  it('should create FILTER_DATA with collection name and search pattern as the payload', () => {
    const store = mockStore({})
    const expectedActions = [{
      type: FILTER_DATA,
      collection,
      pattern: 'Foo'
    }]

    store.dispatch(filterData(collection, 'Foo'))
    expect(store.getActions()).to.deep.equal(expectedActions)
  })
}

/**
 * Asserts async fetching action creators
 *
 * @param {object}  expectedActions
 * @param {string} url
 * @param {int} responseCode
 * @param {object} payload
 * @param {function} fetchMethod
 * @param {function} done
 */
function assertDataFetch(expectedActions, url, responseCode, payload, fetchMethod, done) {
  const store = mockStore({})
  fetchMock.mock(url, responseCode, payload)

  store.dispatch(fetchMethod())
    .then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
      done()
    })
}

/**
 * Assets reducer actions handling for different entities
 *
 * @param {string} collection
 */
function assertReducerHandling(collection) {
  it('should handle FETCH_DATA_SUCCESS for ' + collection, () => {
    const defaultState = update(initialState, {
      [collection]: {
        loading: {$set: true}
      }
    })

    const expectedState = update(initialState, {
      [collection]: {
        loading: {$set: false},
        entities: {$set: ['mocked data']}
      }
    })

    expect(
      homeReducer(
        defaultState,
        {
          type: FETCH_DATA_SUCCESS,
          collection,
          body: {
            [collection]: ['mocked data']
          }
        }
      )).to.deep.equal(expectedState)
  })

  it('should handle FETCH_DATA_FAILURE for ' + collection, () => {
    const defaultState = update(initialState, {
      [collection]: {
        loading: {$set: true}
      }
    })

    const expectedState = update(initialState, {
      [collection]: {
        loading: {$set: false},
        error: {$set: 'An error'}
      }
    })

    expect(
      homeReducer(
        defaultState,
        {
          type: FETCH_DATA_FAILURE,
          collection,
          error: 'An error'
        }
      )).to.deep.equal(expectedState)
  })

  it('should handle FETCH_DATA_REQUEST for ' + collection, () => {
    const expectedState = update(initialState, {
      [collection]: {
        loading: {$set: true}
      }
    })

    expect(
      homeReducer(
        initialState,
        {
          type: FETCH_DATA_REQUEST,
          collection: collection
        }
      )).to.deep.equal(expectedState)
  })

  it('sholud handle FILTER_DATA for ' + collection, () => {
    const expectedState = update(initialState, {
      [collection]: {
        filterPattern: {$set: 'foo'}
      }
    })

    expect(
      homeReducer(
        initialState,
        {
          type: FILTER_DATA,
          collection,
          pattern: 'foo'
        }
      )
    ).to.deep.equal(expectedState)
  })
}
