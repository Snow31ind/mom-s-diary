import { Box, Stack, Typography, Link as MuiLink, Button } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { slugify } from '../utils/helpers';

export const postCreatedMessage = (sectionType, post) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography>New post created</Typography>
      <Link to={`/handbook/${slugify(sectionType)}/${slugify(post.name)}`}>
        View
      </Link>
    </Box>
  );
};

export const postUpdatedMessage = (sectionType, post) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography>Post updated</Typography>
      <Link to={`/handbook/${slugify(sectionType)}/${slugify(post.name)}`}>
        View
      </Link>
    </Box>
  );
};

export const sectionCreatedMessage = (section) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography>New section created</Typography>
      <Link to={`/handbook/${slugify(section.title)}`}>View</Link>
    </Box>
  );
};

export const sectionUpdatedMessage = (section) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography>Section updated</Typography>
      <Link to={`/handbook/${slugify(section.title)}`}>View</Link>
    </Box>
  );
};
