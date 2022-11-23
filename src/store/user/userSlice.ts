import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getUserAction } from './userAsyncAction';

export interface user {
  username: string | null
  name: string | null
}

const initialState: user = {
  username: null,
  name: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder.addCase(getUserAction.fulfilled, (state, action: PayloadAction<user>) => {
      state = action.payload;
    });
  }
});

export default userSlice.reducer;