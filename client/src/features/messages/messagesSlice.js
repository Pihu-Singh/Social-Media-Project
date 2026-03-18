<<<<<<< HEAD
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/axios';
=======
import { createSlice } from '@reduxjs/toolkit';
>>>>>>> a2ad62028278bf67f321407f62bb8034a405806b

const initialState = {
  messages: [],
};

<<<<<<< HEAD
export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async ({ token, userId }) => {
    const { data } = await api.post(
      '/api/message/get',
      { to_user_id: userId },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return data.success ? data : null;
  },
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessages: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
    resetMessages: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      if (action.payload) {
        state.messages = action.payload.messages;
      }
    });
  },
});

export const { setMessages, addMessage, resetMessages } = messagesSlice.actions;

=======
const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
});

>>>>>>> a2ad62028278bf67f321407f62bb8034a405806b
export default messagesSlice.reducer;
