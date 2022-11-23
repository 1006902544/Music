import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserDetail } from '@/api/user/user';

export const getUserAction = createAsyncThunk('user', async () => {
  const { data } = await getUserDetail();
  return data.detail;
});