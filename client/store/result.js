import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_RESULT = 'GET_RESULT'
const ADD_RESULT = 'ADD_RESULT'

/**
 * INITIAL STATE
 */
const defaultResult = {}

/**
 * ACTION CREATORS
 */
const getResult = () => ({type: GET_RESULT})
const addResult = result => ({type: ADD_RESULT, result})

/**
 * THUNK CREATORS
 */
export const fetchResult = (dispatch) => {
    dispatch(getResult());
};
export const setResult = submission => (dispatch) => {
  dispatch(addResult(submission))
}
/**
 * REDUCER
 */
export default function (state = defaultResult, action) {
  switch (action.type) {
    case GET_RESULT:
      return action.result
    case ADD_RESULT:
      return action.result
    default:
      return state
  }
}
