import { Box, List, Typography } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../components/Layouts/Layout';
import { useSelector } from 'react-redux';
import PostListItem from '../../components/PostListItem/PostListItem';

const SectionDetail = () => {
  const { type } = useParams();
  const { sections, loading } = useSelector((state) => state.sections);
  const section = sections.find((section) => section.id === type);

  useEffect(() => {}, []);

  return (
    <Layout>
      {/* <Typography>{type}</Typography> */}
      <Typography>{section.title}</Typography>
      <List>
        {section.posts.map((post) => (
          <PostListItem key={post.id} post={post} />
        ))}
      </List>
    </Layout>
  );
};

export default SectionDetail;
