import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../firebase/services';

export const fetchSections = createAsyncThunk(
  '/section/fetchSections',
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
  '/posts/createPost',
  async (params, thunkAPI) => {
    const { data } = params;
    // console.log(data);
    const post = await api.createPost(data);
    console.log(post);

    return post;
  }
);

export const removePost = createAsyncThunk(
  '/post/removePost',
  async (params, thunkAPI) => {
    const { sectionId, id } = params;

    // console.log(type, id);

    await api.removePost(sectionId, id);

    return { sectionId, id };
  }
);

export const updatePostById = createAsyncThunk(
  '/post/update',
  async (params, thunkAPI) => {
    const { data, id } = params;
    console.log(data, id);

    const updatedPost = await api.updatePostById(id, data);
    console.log(updatedPost);

    return updatedPost;
  }
);

export const createSection = createAsyncThunk(
  '/section/createSection',
  async (params, thunkAPI) => {
    const { section, post } = params;
    console.log(section, post);

    const createdSection = await api.createSection(section, post);

    return createdSection;
  }
);

export const removeSection = createAsyncThunk(
  '/section/removeSection',
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
