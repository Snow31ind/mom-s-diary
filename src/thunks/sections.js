import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../firebase/services';

export const fetchSections = createAsyncThunk(
  '/handbook',
  async (params, thunkAPI) => {
    const sections = await api.fetchSections();

    return sections;
  }
);

export const fetchSectionBySlug = createAsyncThunk(
  'section/postSectionById',
  async (params, thunkAPI) => {
    const { sectionSlug } = params;

    const section = await api.fetchSectionBySlug(sectionSlug);
    console.log(section);

    return section;
  }
);

export const createPost = createAsyncThunk(
  '/handbook/posts/create',
  async (params, thunkAPI) => {
    const { data } = params;
    // console.log(data);
    const post = await api.createPost(data);
    console.log(post);

    return post;
  }
);

export const removePost = createAsyncThunk(
  '/handbook/posts/remove',
  async (params, thunkAPI) => {
    const { sectionId, id } = params;

    // console.log(type, id);

    await api.removePost(sectionId, id);

    return { sectionId, id };
  }
);

export const createSection = createAsyncThunk(
  '/handbook/section/create',
  async (params, thunkAPI) => {
    const { data } = params;

    const section = await api.createSection(data);

    console.log(section);

    return section;
  }
);

export const removeSection = createAsyncThunk(
  'handbook/section/remove',
  async (params, thunkAPI) => {
    const { id } = params;
    // console.log(id);

    try {
      await api.removeSection(id);
      return id;
    } catch (error) {
      console.log(error);
    }
  }
);
