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

  export const logout = createAsyncThunk('auth/logout', async () => {
    try {
      const response = await fetch("/logout", {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Logout request failed");
      }
      
      return; // No need to return anything here
  
    } catch (error) {
      console.log("Logout error:", error);
      throw error; // Rethrow the error to be caught by the caller
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
    setLogout: (state) => {
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
    [logout.pending](state) {
      state.isAuthenticated = "loading";
    },
    [logout.fulfilled](state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    [login.pending](state) {
      state.isAuthenticated = "loading";
    },
    [login.fulfilled](state, action) {
      state.user = action.payload;
      state.isAuthenticated = "true";
    },
  }
});

export const { setUser, setToken, setLogout } = authSlice.actions;
export default authSlice.reducer;