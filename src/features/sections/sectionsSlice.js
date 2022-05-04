import { createSlice } from '@reduxjs/toolkit';
import {
  fetchSections,
  createPost,
  createSection,
  removePost,
  removeSection,
  fetchSectionBySlug,
  updatePostById,
  updateSection,
} from '../../thunks/sections';
import { toast } from 'react-toastify';
import { TOAST_LOADING } from '../../constants/toast';
import {
  postCreatedMessage,
  postUpdatedMessage,
  sectionCreatedMessage,
  sectionUpdatedMessage,
} from '../../toasts/messageCreator';

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
  reducers: {
    setPost: (state, action) => {
      state.post = action.payload;
    },
    clearPost: (state) => {
      state.post = null;
    },
    setSection: (state, action) => {
      state.section = action.payload;
    },
    clearSection: (state) => {
      state.section = null;
    },
  },
  extraReducers: {
    [fetchSections.pending]: (state) => {
      state.status = 'loading';
      state.loading = true;
    },
    [fetchSections.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.sections = action.payload;
      state.loading = false;
    },
    [fetchSections.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
      state.loading = false;
    },

    [createPost.pending]: (state) => {
      state.loading = true;

      toast.loading('Creating new post', {
        toastId: TOAST_LOADING,
      });
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

      state.loading = false;

      toast.success(postCreatedMessage(correspondingSection.title, post), {
        onOpen: (props) => toast.dismiss(TOAST_LOADING),
      });
    },
    [createPost.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    [updatePostById.pending]: (state) => {
      state.loading = true;

      toast.loading('Updating post', {
        toastId: TOAST_LOADING,
      });
    },
    [updatePostById.fulfilled]: (state, action) => {
      state.loading = false;

      const updatedPost = action.payload;

      const correspondingSection = state.sections.find(
        (section) => section.id === updatedPost.sectionId
      );

      const updatedSection = {
        ...correspondingSection,
        posts: correspondingSection.posts.map((post) =>
          post.id !== updatedPost.id ? post : updatedPost
        ),
      };

      state.sections = state.sections.map((section) =>
        section.id !== updatedSection.id ? section : updatedSection
      );

      toast.success(
        postUpdatedMessage(correspondingSection.title, updatedPost),
        {
          onOpen: (props) => toast.dismiss(TOAST_LOADING),
        }
      );
    },
    [updatePostById.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    [createSection.pending]: (state) => {
      state.loading = true;

      toast.loading('Creating new section', {
        toastId: TOAST_LOADING,
      });
    },
    [createSection.fulfilled]: (state, action) => {
      const section = action.payload;

      state.loading = false;
      state.sections = [...state.sections, section];

      toast.success(sectionCreatedMessage(section), {
        onOpen: (props) => toast.dismiss(TOAST_LOADING),
      });
    },
    [createSection.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    [removePost.pending]: (state) => {
      state.loading = true;

      toast.loading('Removing post', {
        toastId: TOAST_LOADING,
      });
    },
    [removePost.fulfilled]: (state, action) => {
      state.loading = false;

      const { sectionId, id } = action.payload;

      state.sections = state.sections.map((section) => {
        if (section.id !== sectionId) {
          return section;
        } else {
          const posts = section.posts.filter((post) => post.id !== id);
          return { ...section, posts };
        }
      });

      toast.success('Post removed', {
        onOpen: (props) => toast.dismiss(TOAST_LOADING),
      });
    },
    [removePost.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    [removeSection.pending]: (state) => {
      state.loading = true;

      toast.loading('Removing post', {
        toastId: TOAST_LOADING,
      });
    },
    [removeSection.fulfilled]: (state, action) => {
      const id = action.payload;
      state.loading = false;
      state.sections = state.sections.filter((section) => section.id !== id);

      toast.success('Section removed', {
        onOpen: (props) => toast.dismiss(TOAST_LOADING),
      });
    },
    [removeSection.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    [updateSection.pending]: (state) => {
      state.loading = true;

      toast.loading('Updating section', {
        toastId: TOAST_LOADING,
      });
    },
    [updateSection.fulfilled]: (state, action) => {
      state.loading = false;

      const updatedSection = action.payload;

      state.sections = state.sections.map((section) =>
        section.id !== updatedSection.id
          ? section
          : { ...section, ...updatedSection }
      );

      toast.success(sectionUpdatedMessage(updatedSection), {
        onOpen: (props) => toast.dismiss(TOAST_LOADING),
      });
    },
    [updateSection.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setPost, setSection, clearPost, clearSection } =
  sectionsSlice.actions;

export default sectionsSlice.reducer;
