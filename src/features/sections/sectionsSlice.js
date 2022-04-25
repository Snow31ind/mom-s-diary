import { createSlice } from '@reduxjs/toolkit';
import {
  fetchSections,
  createPost,
  createSection,
  removePost,
  removeSection,
} from '../../thunks/sections';

const initialState = {
  sections: [],
  loading: false,
  error: '',
  status: 'idle',
};

const sectionsSlice = createSlice({
  name: 'sections',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSections.fulfilled]: (state, action) => {
      state.sections = action.payload;
      state.status = 'success';
    },
    [createPost.fulfilled]: (state, action) => {
      const post = action.payload;

      const correspondingSection = state.sections.find(
        (section) => section.id === post.type
      );

      const newSection = {
        ...correspondingSection,
        posts: [...correspondingSection.posts, post],
      };

      state.sections = state.sections.map((section) =>
        section.id !== post.type ? section : newSection
      );
    },

    [createSection.fulfilled]: (state, action) => {
      const section = action.payload;

      state.sections = [...state.sections, section];
    },

    [removePost.fulfilled]: (state, action) => {
      const { type, id } = action.payload;
      console.log(type, id);

      const correspondingSection = state.sections.find(
        (section) => section.id === type
      );

      if (correspondingSection.posts.length > 1) {
        const newSection = {
          ...correspondingSection,
          posts: correspondingSection.posts.filter((post) => post.id !== id),
        };

        // console.log(newSection);

        state.sections = state.sections.map((section) =>
          section.id !== type ? section : newSection
        );
      } else {
        state.sections = state.sections.filter(
          (section) => section.id !== type
        );
      }
    },

    [removeSection.fulfilled]: (state, action) => {
      const type = action.payload;
      state.sections = state.sections.filter((section) => section.id !== type);
    },
  },
});

export default sectionsSlice.reducer;
