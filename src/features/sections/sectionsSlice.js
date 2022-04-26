import { createSlice } from '@reduxjs/toolkit';
import {
  fetchSections,
  createPost,
  createSection,
  removePost,
  removeSection,
  fetchSectionBySlug,
} from '../../thunks/sections';

const initialState = {
  sections: [],
  section: null,
  post: null,
  loading: false,
  error: '',
  status: 'idle',
};

const sectionsSlice = createSlice({
  name: 'sections',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSections.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchSections.fulfilled]: (state, action) => {
      state.sections = action.payload;
      state.loading = false;
      // state.status = 'success';
    },
    [fetchSections.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // [fetchSectionBySlug.pending]: (state) => {
    //   state.loading = true;
    // },
    // [fetchSectionBySlug.fulfilled]: (state, action) => {
    //   state.section = action.payload;
    //   state.sections = [...state.sections, action.payload];
    //   state.loading = false;
    // },
    // [fetchSectionBySlug.rejected]: (state, action) => {
    //   state.error = action.payload;
    //   state.loading = false;
    // },

    [createPost.pending]: (state) => {
      state.loading = true;
    },
    [createPost.fulfilled]: (state, action) => {
      const post = action.payload;

      const correspondingSection = state.sections.find(
        (section) => section.id === post.sectionId
      );

      const newSection = {
        ...correspondingSection,
        posts: [...correspondingSection.posts, post],
      };

      state.sections = state.sections.map((section) =>
        section.id !== post.sectionId ? section : newSection
      );
    },
    [createPost.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    [createSection.pending]: (state) => {
      state.loading = true;
    },
    [createSection.fulfilled]: (state, action) => {
      const section = action.payload;
      const newSection = { ...section, posts: [] };

      state.sections = [...state.sections, newSection];
    },
    [createSection.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    [removePost.pending]: (state) => {
      state.loading = true;
    },
    [removePost.fulfilled]: (state, action) => {
      const { sectionId, id } = action.payload;
      // console.log(sectionId, id);

      const correspondingSection = state.sections.find(
        (section) => section.id === sectionId
      );

      if (correspondingSection.posts.length > 1) {
        const newSection = {
          ...correspondingSection,
          posts: correspondingSection.posts.filter((post) => post.id !== id),
        };

        // console.log(newSection);

        state.sections = state.sections.map((section) =>
          section.id !== sectionId ? section : newSection
        );
      } else {
        state.sections = state.sections.filter(
          (section) => section.id !== sectionId
        );
      }
    },
    [removePost.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    [removeSection.pending]: (state) => {
      state.loading = true;
    },
    [removeSection.fulfilled]: (state, action) => {
      const id = action.payload;
      state.sections = state.sections.filter((section) => section.id !== id);
    },
    [removeSection.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export default sectionsSlice.reducer;
