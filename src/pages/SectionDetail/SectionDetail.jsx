import {
  Box,
  Breadcrumbs,
  List,
  Typography,
  Link as MuiLink,
} from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../../components/Layouts/Layout';
import { useDispatch, useSelector } from 'react-redux';
import PostListItem from '../../components/PostListItem/PostListItem';
import { slugify } from '../../utils/helpers';
import { fetchSectionBySlug, fetchSections } from '../../thunks/sections';
import { NavigateNext } from '@mui/icons-material';

const SectionDetail = () => {
  const { sectionSlug } = useParams();
  const dispatch = useDispatch();
  const { sections } = useSelector((state) => state.sections);

  const section = sections.find(
    (section) => slugify(section.title) === sectionSlug
  );

  // console.log(sectionSlug);

  // useEffect(() => {
  //   if (!sections.length) {
  //     console.log(`Fetching section ${sectionSlug} at SectionDetail`);
  //     dispatch(fetchSections());
  //   }
  // }, [dispatch, sections]);

  if (!sections.length) {
    return <div>Loading</div>;
  }

  return (
    <Layout>
      {/* <Typography>{type}</Typography> */}
      <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
        <Link to="/">Home</Link>
        <Typography color="black" fontWeight="bold">
          {section.title}
        </Typography>
      </Breadcrumbs>
      <Typography>{section.title}</Typography>
      <List>
        {section.posts.map((post) => (
          <PostListItem
            key={post.id}
            post={post}
            sectionTitle={section.title}
          />
        ))}
      </List>
    </Layout>
  );
};

export default SectionDetail;
