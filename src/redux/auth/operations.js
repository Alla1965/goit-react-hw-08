import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.goit.global';

export const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  delete axios.defaults.headers.common.Authorization;
};

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/users/signup', credentials);

      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      if (error === 'Request failed with status code 400') {
        alert('Користувач із такою email-адресою вже існує.');
      } else {
        console.error('Registration failed:', error);
      }
      console.error(
        'Error details:',
        error.response ? error.response.data : error.message
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    console.log(login);
    try {
      const res = await axios.post('/users/login', credentials);
      console.log(res);
      console.log(res.data);

      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');

    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    console.log(token);

    if (!token) {
      token = localStorage.getItem('token');
      if (!token) {
        return thunkAPI.rejectWithValue('Unable to fetch user');
      }
    }

    try {
      setAuthHeader(token);
      const res = await axios.get('/users/current');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
