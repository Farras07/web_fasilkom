import { createSlice } from '@reduxjs/toolkit'

export const navbarSlice = createSlice({
  name: 'hamburgerMode',
  initialState: {
    value: false,
  },
  reducers: {
    setStateNavbar: (state, { payload }) => {
      state.value = payload === 'Homepage' ? state.value : !state.value
    },
  },
})

export const {setStateNavbar} = navbarSlice.actions

export default navbarSlice.reducer 