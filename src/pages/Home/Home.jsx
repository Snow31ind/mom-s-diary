import React from 'react';
import Slider from 'react-slick';
import Layout from '../../components/Layouts/Layout';
import Sections from '../../components/Sections/Sections';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Card, CardContent, Pagination, Typography } from '@mui/material';

const Home = () => {
  return (
    <Layout>
      <Sections />
    </Layout>
  );
};

export default Home;
