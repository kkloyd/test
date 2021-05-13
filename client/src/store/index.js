import { configureStore } from '@reduxjs/toolkit'
import coursesReducer from './courses.js'

export default configureStore({
  reducer: {
    courses: coursesReducer
  },
})