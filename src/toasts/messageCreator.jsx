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
      <Typography>{'Bài học được tạo thành công'}</Typography>
      <Link to={`/handbook/${slugify(sectionType)}/${slugify(post.name)}`}>
        {'Xem'}
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
      <Typography>{'Bài học được cập nhật thành công'}</Typography>
      <Link to={`/handbook/${slugify(sectionType)}/${slugify(post.name)}`}>
        {'Xem'}
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
      <Typography>{'Danh mục được tạo thành công'}</Typography>
      <Link to={`/handbook/${slugify(section.title)}`}>{'Xem'}</Link>
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
      <Typography>{'Danh mục được cập nhật thành công'}</Typography>
      <Link to={`/handbook/${slugify(section.title)}`}>{'Xem'}</Link>
    </Box>
  );
};
