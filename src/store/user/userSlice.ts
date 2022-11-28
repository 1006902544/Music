import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getUserAction } from './userAsyncAction';

export interface user {
  art_count: number
  avatar: string
  com_count: number
  create_time: number
  fans_count: number
  concern_count: number
  integral: number
  name: string
  permission: 1 | 2
  sex: 0 | 1 | 2
  uid: string
  username: string
}

const initialState: { user: user | null } = { user: null };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder.addCase(getUserAction.fulfilled, (state, action: PayloadAction<user | null>) => {
      state.user = action.payload;
    });
  }
});

export default userSlice.reducer;