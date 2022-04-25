import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../components/Layouts/Layout';
import { useSelector } from 'react-redux';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from '@mui/material';

const PostDetail = () => {
  const { type, id } = useParams();
  const { sections } = useSelector((state) => state.sections);
  const post = sections
    .find((section) => section.id === type)
    .posts.find((post) => post.id === id);

  const createdTime = new Date(post.createdAt).toLocaleString();

  return (
    <Layout>
      <Box>
        <Card>
          <CardMedia component="img" src={post.photo} height={400} />
          <CardHeader title={<Typography>{createdTime}</Typography>} />
          <CardContent>
            <Typography variant="h4">{post.name}</Typography>
            <Typography variant="h6">{post.desc}</Typography>
            <Typography variant="body2">{post.content}</Typography>
          </CardContent>
        </Card>
      </Box>
    </Layout>
  );
};

export default PostDetail;
