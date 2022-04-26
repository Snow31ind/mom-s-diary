import {
  Box,
  CircularProgress,
  Container,
  Typography,
  List,
  ListItem,
  Card,
  CardContent,
  Grid,
  Stack,
  IconButton,
  Button,
  Link,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GrowthBox from '../../GrowthBox/GrowthBox';
import PostCard from './PostCard/PostCard';
import { Delete } from '@mui/icons-material';
import { removeSection } from '../../../thunks/sections';
import { useNavigate } from 'react-router-dom';
import { slugify } from '../../../utils/helpers';

const Section = ({ section }) => {
  const { isAdmin } = useSelector((state) => state.user);
  const { posts } = section;
  // console.log(section);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeHandler = (id) => {
    dispatch(removeSection({ id }));
  };

  const viewHandler = (type) => {
    navigate(`/${slugify(type)}`);
  };

  return (
    <Box sx={{ mt: 5 }}>
      <Stack direction="row" display="flex">
        <Stack>
          <Link onClick={() => viewHandler(section.title)}>
            <Typography variant="h4">{section.title}</Typography>
          </Link>
          <Typography variant="body1">
            {new Date(section.createdAt).toLocaleString()}
          </Typography>
        </Stack>

        <GrowthBox />
        {isAdmin && (
          <IconButton color="warning" onClick={() => removeHandler(section.id)}>
            <Delete />
          </IconButton>
        )}
      </Stack>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid key={post.id} item xl={3} sx={{ width: 300 }}>
            <PostCard post={post} type={section.title} />
          </Grid>
        ))}
        <Grid item xl={12}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="outlined"
              onClick={() => viewHandler(section.title)}
            >
              VIEW ALL
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Section;
