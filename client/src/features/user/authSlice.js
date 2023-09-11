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
      
      return; 
  
    } catch (error) {
      console.log("Logout error:", error);
      throw error; 
    }
  });
  
  
  export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData); 
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message); 
    }
  });
  
  
  
  export const signup = createAsyncThunk('auth/signup', async (newUser, { rejectWithValue }) => {
    try {
      const response = await fetch('/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData); 
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message); 
    }
  });
  

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    error: null,
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
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: {
    
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
      state.error = null;
    },
    [login.fulfilled](state, action) {
      state.user = action.payload;
      state.isAuthenticated = "true";
      state.error = null;
    },
    [login.rejected](state, action){
      state.isAuthenticated = false;
      state.error = action.payload;
    },
  
    [signup.pending](state) {
      state.isAuthenticated = "loading";
    },
    [signup.fulfilled](state, action) {
      state.user = action.payload;
      state.isAuthenticated = "true";
    },
    [signup.rejected](state, action){
      state.isAuthenticated = false;
      state.error = action.payload;
    },
  }
});

export const { setUser, setToken, setLogout} = authSlice.actions;
export default authSlice.reducer;