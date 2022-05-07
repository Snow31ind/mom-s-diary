import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../firebase/services';
import { toast } from 'react-toastify';

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

    return section;
  }
);

export const createPost = createAsyncThunk(
  '/posts/createPost',
  async (params, thunkAPI) => {
    const { file, data } = params;
    const createdPost = await api.createPost(file, data);

    return createdPost;
  }
);

export const removePost = createAsyncThunk(
  '/post/removePost',
  async (params, thunkAPI) => {
    const { sectionId, id } = params;
    await api.removePost(sectionId, id);

    return { sectionId, id };
  }
);

export const updatePostById = createAsyncThunk(
  '/post/update',
  async (params, thunkAPI) => {
    const { file, data, id } = params;
    const updatedPost = await api.updatePostById(file, id, data);

    return updatedPost;
  }
);

export const createSection = createAsyncThunk(
  '/section/createSection',
  async (params, thunkAPI) => {
    const { section, file, id } = params;

    const createdSection = await api.createSection(section, id, file);

    return createdSection;
  }
);

export const removeSection = createAsyncThunk(
  '/section/removeSection',
  async (params, thunkAPI) => {
    const { id } = params;
    await api.removeSection(id);

    return id;
  }
);

export const updateSection = createAsyncThunk(
  '/section/update',
  async (params, thunkAPI) => {
    const { section, id } = params;

    const updatedSection = await api.updateSection(id, section);

    return { updatedSection, oldSectionId: id };
  }
);

export const updateSectionById = createAsyncThunk(
  '/sections/updateById',
  async (params) => {
    const { section, id } = params;

    const updatedSection = await api.updateSectionById(section, id);

    return updatedSection;
  }
);
