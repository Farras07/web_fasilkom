import { createSlice } from '@reduxjs/toolkit'

export const pageVisitSlice = createSlice({
    name: 'pageVisit',
    initialState: {
      value: '',
    },
    reducers: {
      setStatePageVisit: (state,{payload}) => {
        state.value = payload.page
      },
    },
  })

export const {setStatePageVisit} = pageVisitSlice.actions
export default pageVisitSlice.reducer 