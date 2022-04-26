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
  Divider,
  Modal,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GrowthBox from '../../GrowthBox/GrowthBox';
import PostCard from './PostCard/PostCard';
import { Add, Delete } from '@mui/icons-material';
import { removeSection } from '../../../thunks/sections';
import { useNavigate } from 'react-router-dom';
import { slugify } from '../../../utils/helpers';
import moment from 'moment';
import SquareIconButton from '../../Styled/SquareIconButton';
import SquareButton from '../../Styled/SquareButon';
import PostForm from '../../PostForm/PostForm';
import LoadingSection from '../../Loading/LoadingSection';
import {
  clearPost,
  clearSection,
  setPost,
  setSection,
} from '../../../features/sections/sectionsSlice';

const Section = ({ section }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAdmin } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.sections);

  const [openPostForm, setOpenPostForm] = useState(false);

  const { posts } = section;
  // console.log(section);

  const removeHandler = (id) => {
    dispatch(removeSection({ id }));
  };

  const createPostHandler = () => {
    dispatch(setSection(section));
    setOpenPostForm(true);
  };

  const viewHandler = (type) => {
    navigate(`/handbook/${slugify(type)}`);
  };

  const onClosePostFormHandler = () => {
    dispatch(clearPost());
    dispatch(clearSection());
    console.log('Close modal');

    setOpenPostForm(false);
  };

  return (
    <>
      <Box sx={{ mt: 5 }}>
        <Stack direction="row">
          <Stack>
            <Link onClick={() => viewHandler(section.title)}>
              <Typography variant="h4">{section.title}</Typography>
            </Link>
            <Typography variant="body1">
              {`Created ${moment(section.createdAt).fromNow()}`}
            </Typography>
          </Stack>

          {/* Admin tools */}
          {isAdmin && (
            <>
              <GrowthBox />
              <Stack direction="row" alignItems="center" spacing={1}>
                <SquareIconButton
                  variant="contained"
                  size="small"
                  color="inherit"
                  onClick={createPostHandler}
                >
                  <Add />
                </SquareIconButton>
                <SquareIconButton
                  variant="contained"
                  size="small"
                  color="inherit"
                  onClick={() => removeHandler(section.id)}
                >
                  <Delete />
                </SquareIconButton>
              </Stack>
            </>
          )}
        </Stack>
        <Divider sx={{ borderWidth: 1, mb: 1, mt: 1 }} />
        <Grid container spacing={2}>
          {posts.map((post) => (
            <Grid key={post.id} item xl={3} sx={{ width: 300 }}>
              <PostCard
                post={post}
                type={section.title}
                openPostFormModalHandler={() => setOpenPostForm(true)}
              />
            </Grid>
          ))}
          <Grid item xl={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => viewHandler(section.title)}
              >
                VIEW ALL
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Modal open={openPostForm} onClose={onClosePostFormHandler}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <PostForm
            closePostFormModalHandler={() => setOpenPostForm(false)}
            // sectionInfo={{ id: section.id, title: section.title }}
          />
        </Box>
      </Modal>
    </>
  );
};

export default Section;
