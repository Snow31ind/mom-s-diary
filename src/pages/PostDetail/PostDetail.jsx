import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../../components/Layouts/Layout';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Breadcrumbs,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from '@mui/material';
import { NavigateNext } from '@mui/icons-material';
import {
  selectPostBySlug,
  selectSectionTitleBySlug,
} from '../../features/sections/selector';

const PostDetail = () => {
  const dispatch = useDispatch();
  const { sectionSlug, postSlug } = useParams();

  const post = useSelector(selectPostBySlug(sectionSlug, postSlug));
  const sectionTitle = useSelector(selectSectionTitleBySlug(sectionSlug));

  if (!post) {
    return <div>Loading</div>;
  }

  const publishedAt = new Date(post.createdAt).toLocaleString();

  return (
    <Layout>
      <Box>
        <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
          <Link to="/">{'Trang chủ'}</Link>
          <Link to={`/handbook/${sectionSlug}`}>{sectionTitle}</Link>
          <Typography color="black" fontWeight="bold">
            {post.name}
          </Typography>
        </Breadcrumbs>

        <Card elevation={0} sx={{ bgcolor: 'grey.100', mt: 2 }}>
          <CardMedia component="img" src={post.image} height={500} />
          {/* <CardHeader title={<Typography>{publishedAt}</Typography>} /> */}
          <CardContent sx={{ pl: 0 }}>
            <Typography variant="h3" fontWeight="bold">
              {post.name}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {post.desc}
            </Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
              {post.content}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Layout>
  );
};

export default PostDetail;
