import { combineReducers } from 'redux'
import todos from './todoApp'
import posts from './Post'

export default combineReducers({
  todos,
  posts
})