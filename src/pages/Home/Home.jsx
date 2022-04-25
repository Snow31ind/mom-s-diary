import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, CircularProgress, Box, Typography } from '@mui/material';
import Layout from '../../components/Layouts/Layout';
import { fetchPostsByType } from '../../thunks/posts';
import { fetchSections } from '../../thunks/sections';
import Sections from '../../components/Sections/Sections';
import PostForm from '../../components/PostForm/PostForm';
import SectionForm from '../../components/SectionForm/SectionForm';

const Home = () => {
  return (
    <Layout>
      <Typography>Home</Typography>
      <Box>
        <Typography>Create post</Typography>
        <PostForm />
      </Box>
      <Box>
        <Typography>Create section</Typography>
        <SectionForm />
      </Box>
      <Sections />
    </Layout>
  );
};

export default Home;