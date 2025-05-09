import axios from 'axios';
import { setAuthHeader } from '../../redux/auth/operations';
import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
axios.defaults.baseURL = 'https://connections-api.goit.global';

export const clearAuthHeader = () => {
  delete axios.defaults.headers.common.Authorization;
};

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) return thunkAPI.rejectWithValue('No auth token');
    setAuthHeader(token);
    try {
      const response = await axios.get('/contacts');

      return response.data;
    } catch (e) {
      toast.error('Не вдалося завантажити контакти');
      return thunkAPI.rejectWithValue(e.message); // Обробка помилок
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      if (!token) {
        return thunkAPI.rejectWithValue('No auth token');
      }
      const response = await axios.post('/contacts', contact, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(`Контакт "${response.data.name}" додано успішно`);
      return response.data;
    } catch (e) {
      toast.error('Не вдалося додати контакт');
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      await axios.delete(`/contacts/${contactId}`);
      toast.success('Контакт успішно видалено');
      return contactId;
    } catch (e) {
      toast.error('Не вдалося видалити контакт');
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
