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
import { slugify } from '../../utils/helpers';
import { useEffect } from 'react';
import { fetchSections } from '../../thunks/sections';
import { NavigateNext } from '@mui/icons-material';

const PostDetail = () => {
  const dispatch = useDispatch();

  const { sectionSlug, postSlug } = useParams();
  // console.log(sectionSlug, postSlug);
  const { sections } = useSelector((state) => state.sections);
  const correspondingSection = sections.find(
    (section) => slugify(section.title) === sectionSlug
  );
  const post = correspondingSection
    ? correspondingSection.posts.find((post) => slugify(post.name) === postSlug)
    : null;

  // useEffect(() => {
  //   if (!sections.length) {
  //     console.log(`Fetching post ${postSlug} at PostDetail`);
  //     dispatch(fetchSections());
  //   }
  // }, [dispatch, sections]);

  if (!sections.length) {
    return <div>Loading</div>;
  }

  const publishedAt = new Date(post.createdAt).toLocaleString();

  return (
    <Layout>
      <Box>
        <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
          <Link to="/">Home</Link>
          <Link to={`/handbook/${sectionSlug}`}>
            {correspondingSection.title}
          </Link>
          <Typography color="black" fontWeight="bold">
            {post.name}
          </Typography>
        </Breadcrumbs>

        <Card>
          <CardMedia component="img" src={post.photo} height={400} />
          <CardHeader title={<Typography>{publishedAt}</Typography>} />
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
