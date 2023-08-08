import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../../api/userApi";
import StorageKeys from "../../constants/storage-keys.js";export const register = createAsyncThunk("user/register", async (payload) => {
  await userApi.register(payload);
  
  //save local storages
});
export const login = createAsyncThunk("user/login", async (payload) => {
  const data = await userApi.login(payload);
  //save local storages
  localStorage.setItem(StorageKeys.TOKEN, JSON.stringify(data.jwt));
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));
  return { ...data.user, jwt: data.jwt };
});



export const profileUser = createAsyncThunk('profileUser', async (userId) => {
  
      const data = await userApi.profile(userId);
   
      localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));
 
   
      return {...data.user};
  }
);
export const updateProfile = createAsyncThunk('user/updateProfile', async (payload) => {
  console.log(111);
  const { userId, updatedFields } = payload;

  // Gọi API để cập nhật thông tin user
  const e= await userApi.updateProfile(userId, updatedFields);
  // Lưu thông tin user mới vào local storage (nếu có)
  const user = JSON.parse(localStorage.getItem(StorageKeys.USER)) || {};
console.log('ela',user);
 
  const updatedUser = { ...user, ...updatedFields };

  localStorage.setItem(StorageKeys.USER, JSON.stringify(updatedUser));

  return updatedUser;
});
export const refresh = createAsyncThunk("user/refresh", async () => {

  const rs = await userApi.refresh();

  //save local storages
  localStorage.setItem(StorageKeys.TOKEN, rs.access_token);

  return rs.access_token;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || { id: 10 },
    setting: {},
  },
  reducers: {
    logOut(state) {
      // clear local storage
      localStorage.removeItem(StorageKeys.USER);
      localStorage.removeItem(StorageKeys.TOKEN);

      // set state
      state.current = { id: 10 };
    },
    Update(state, action) {
      const clone = { ...state.current, ...action.payload };
      localStorage.setItem(StorageKeys.USER, JSON.stringify(clone));
      state.current = clone;
    },
    updateUser: (state, action) => {
      // Cập nhật thông tin người dùng dựa trên payload nhận được từ action
      // const avatar_profile=action.payload.
   console.log(action.payload);
  
      return { ...state, ...action.payload };
    },
  
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.current.jwt = action.payload;
      })
      .addCase(profileUser.fulfilled, (state, action) => {
        state.current.profile = action.payload;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.current = { ...state.current, ...action.payload };
      });
  },
});

const { actions, reducer } = userSlice;
// export const {  } = userSlice.actions;
export const { logOut, Update,updateUser } = actions;
export default reducer;
