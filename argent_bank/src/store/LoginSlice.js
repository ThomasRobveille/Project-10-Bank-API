import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  error: null,
  userName: {
    firstName: "",
    lastName: ""
  }
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    userLogin(state, action) {
      state.token = action.payload
      state.error = null;
    },
    userLogout(state) {
      state.token = null;
      state.error = null;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setUser(state, action){
      state.userName.firstName = action.payload.firstName;
      state.userName.lastName = action.payload.lastName;
    }
  }
});

export const { userLogin, userLogout, setError, setUser } = loginSlice.actions;
export default loginSlice.reducer;