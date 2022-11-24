import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserDetail } from '@/api/user/user';

export const getUserAction = createAsyncThunk('user', async () => {
  const { data } = await getUserDetail();
  if (data.code === 200) {
    return data.detail;
  } else {
    return null;
  }
});