import { configureStore } from '@reduxjs/toolkit'
import navbarSlice from './hamburgerSlices'
import linkClickedSlice from './linkDetectSlices'
import pageVisitSlice from './pageVisitSlices'
export default configureStore({
  reducer: {
    navbarSlice,
    linkClickedSlice,
    pageVisitSlice
  },
})