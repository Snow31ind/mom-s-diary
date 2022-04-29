import { slugify } from '../../utils/helpers';

export const selectSections = () => (state) => state.sections.sections;

export const selectSection = () => (state) => state.sections.section;

export const selectPost = () => (state) => state.sections.post;

export const selectLoading = () => (state) => state.sections.loading;

export const selectError = () => (state) => state.sections.error;

export const selectStatus = () => (state) => state.sections.status;

export const selectPostBySlug = (sectionSlug, postSlug) => (state) => {
  const correspondingSection = state.sections.sections.find(
    (section) => slugify(section.title) === sectionSlug
  );

  return correspondingSection
    ? correspondingSection.posts.find((post) => slugify(post.name) === postSlug)
    : null;
};

export const selectSectionBySlug = (sectionSlug) => (state) => {
  const existingSection = state.sections.sections.find(
    (section) => slugify(section.title) === sectionSlug
  );

  return existingSection || null;
};

export const selectSectionTitleBySlug = (sectionSlug) => (state) => {
  const existingSection = state.sections.sections.find(
    (section) => slugify(section.title) === sectionSlug
  );

  return existingSection ? existingSection.title : '';
};

export const selectSectionTypes = () => (state) => {
  return state.sections.sections.map((section) => ({
    label: section.title,
    value: section.id,
  }));
};
