import * as types from '../../constants/constants'

export default function reducer(state = {
    india: [],
    isFetching: false,
    fetched: false,
    error: null
}, action) {

    switch (action.type) {
        case types.FETCH_INDIA:
            {
                return { ...state, isFetching: true, fetched: false, error: action.payload }
            }
        case types.FETCH_INDIA_FULFILLED:
            {
                return { ...state, isFetching: false, fetched: true, india: action.payload.data }
            }
        case types.FETCH_INDIA_REJECTED:
            {
                return { ...state, isFetching: false, fetched: false, error: action.payload }
            }
        case types.FETCH_SINGLE_REGION_FULFILLED:
            {
                return { ...state, isFetching: false, fetched: false, singleRegion: action.payload }
            }
    }
    return state
}