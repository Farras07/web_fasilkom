import { createSlice } from '@reduxjs/toolkit'

export const linkClickedSlice = createSlice({
    name: 'linkMode',
    initialState: {
      value: '',
    },
    reducers: {
      setStateLink: (state,{payload}) => {
        state.value = payload.link
      },
    },
  })

export const {setStateLink} = linkClickedSlice.actions
export default linkClickedSlice.reducer 