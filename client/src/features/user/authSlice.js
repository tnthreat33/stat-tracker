import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const autoLogin = createAsyncThunk('auth/autoLogin', async () => {
    try {
      const response = await fetch("/auth");
      if (response.ok) {
        const user = await response.json();
        return user;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.errors.login);
      }
    } catch (error) {
      throw error;
    }
  });
  
  
export const login = createAsyncThunk('auth/login', async (credentials) => {
    // Perform login API request here and return user data and token
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
  
    if (!response.ok) {
      throw new Error('Login failed');
    }
  
    const data = await response.json();
    console.log(data)
    return data;
  });
  
  export const signup = createAsyncThunk('auth/signup', async (newUser) => {
    // Perform signup API request here and return user data and token
    const response = await fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });
  
    if (!response.ok) {
      throw new Error('Signup failed');
    }
  
    const data = await response.json();
    return data;
  });

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user.push(action.payload)
    },
    setToken: (state, action) => {
      state.token.push( action.payload);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: {
    // handle async actions: pending, fulfilled, rejected (for errors)
    [autoLogin.pending](state) {
      state.isAuthenticated = "loading";
    },
    [autoLogin.fulfilled](state, action) {
      state.user = action.payload;
      state.isAuthenticated = "true";
    },
  }
});

export const { setUser, setToken, logout } = authSlice.actions;
export default authSlice.reducer;