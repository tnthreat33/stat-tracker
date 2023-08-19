import { createAsyncThunk } from '@reduxjs/toolkit';

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
  return data;
});

export const signup = createAsyncThunk('auth/signup', async (newUser) => {
  // Perform signup API request here and return user data and token
  const response = await fetch('/signup', {
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
