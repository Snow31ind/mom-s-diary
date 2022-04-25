import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../firebase/services';

export const fetchSections = createAsyncThunk(
  '/handbook',
  async (params, thunkAPI) => {
    const sections = await api.fetchSections();

    return sections;
  }
);

export const createPost = createAsyncThunk(
  '/handbook/posts/create',
  async (params, thunkAPI) => {
    const { data } = params;

    const post = await api.createPost(data);
    // console.log(post);

    return post;
  }
);

export const removePost = createAsyncThunk(
  '/handbook/posts/remove',
  async (params, thunkAPI) => {
    const { type, id } = params;

    console.log(type, id);

    await api.removePost(type, id);

    return { type, id };
  }
);

export const createSection = createAsyncThunk(
  '/handbook/section/create',
  async (params, thunkAPI) => {
    const { data } = params;

    const section = await api.createSection(data);

    return section;
  }
);

export const removeSection = createAsyncThunk(
  'handbook/section/remove',
  async (params, thunkAPI) => {
    const { type } = params;
    console.log(type);

    try {
      await api.removeSection(type);
      return type;
    } catch (error) {
      console.log(error);
    }
  }
);
