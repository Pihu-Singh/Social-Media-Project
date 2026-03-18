<<<<<<< HEAD
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';
=======
import { createSlice } from '@reduxjs/toolkit';
>>>>>>> a2ad62028278bf67f321407f62bb8034a405806b

const initialState = {
  connections: [],
  pendingConnections: [],
  followers: [],
  following: [],
};

<<<<<<< HEAD
export const fetchConnections = createAsyncThunk(
  'connections/fetchConnections',
  async (token) => {
    const { data } = await api.get('/api/user/connections', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data.success ? data : null;
  },
);

=======
>>>>>>> a2ad62028278bf67f321407f62bb8034a405806b
const connectionsSlice = createSlice({
  name: 'connections',
  initialState,
  reducers: {},
<<<<<<< HEAD
  extraReducers: (builder) => {
    builder.addCase(fetchConnections.fulfilled, (state, action) => {
      if (action.payload) {
        state.connections = action.payload.connections;
        state.pendingConnections = action.payload.pendingConnections;
        state.followers = action.payload.followers;
        state.following = action.payload.following;
      }
    });
  },
=======
>>>>>>> a2ad62028278bf67f321407f62bb8034a405806b
});

export default connectionsSlice.reducer;
