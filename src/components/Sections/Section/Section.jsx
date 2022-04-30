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
  Link as MuiLink,
  Divider,
  Modal,
  Fab,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GrowthBox from '../../GrowthBox/GrowthBox';
import PostCard from './PostCard/PostCard';
import { Add, Delete, Edit, Hexagon } from '@mui/icons-material';
import { removeSection } from '../../../thunks/sections';
import { Link, useNavigate } from 'react-router-dom';
import { slugify } from '../../../utils/helpers';
import SquareIconButton from '../../Styled/SquareIconButton';
import PostForm from '../../PostForm/PostForm';
import {
  clearPost,
  clearSection,
  setSection,
} from '../../../features/sections/sectionsSlice';
import SectionForm from '../../SectionForm/SectionForm';

const Section = ({ section, isLast }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAdmin } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.sections);

  const [openPostForm, setOpenPostForm] = useState(false);
  const [openSectionForm, setOpenSectionForm] = useState(false);

  const [postFormAction, setPostFormAction] = useState('');

  const { posts } = section;

  const openEditPostFormModalHandler = () => {
    setPostFormAction('update');
    setOpenPostForm(true);
  };

  const removeHandler = (id) => {
    dispatch(removeSection({ id }));
  };

  const openCreatePostFormModalHandler = () => {
    dispatch(setSection(section));
    setPostFormAction('createWithinSection');
    setOpenPostForm(true);
  };

  const openEditSectionFormModalHandler = () => {
    dispatch(setSection(section));
    setOpenSectionForm(true);
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

  const onCloseSectionFormHandler = () => {
    dispatch(clearSection());
    setOpenSectionForm(false);
  };

  return (
    <>
      <Box sx={{ mt: 5 }}>
        <Stack direction="row">
          <Stack>
            <Link
              // underline="hover"
              to={`/handbook/${slugify(section.title)}`}
            >
              <Typography
                variant="h6"
                sx={{ color: 'text.primary', fontWeight: 'bold' }}
              >
                {section.title}
              </Typography>
            </Link>
          </Stack>

          {/* Admin tools */}
          {isAdmin && (
            <>
              <GrowthBox />
              <Stack direction="row" alignItems="center" spacing={1}>
                <SquareIconButton
                  size="small"
                  color="primary"
                  onClick={openEditSectionFormModalHandler}
                >
                  <Edit />
                </SquareIconButton>
                <SquareIconButton
                  size="small"
                  color="success"
                  onClick={openCreatePostFormModalHandler}
                >
                  <Add />
                </SquareIconButton>
                <SquareIconButton
                  size="small"
                  color="error"
                  onClick={() => removeHandler(section.id)}
                >
                  <Delete />
                </SquareIconButton>
              </Stack>
            </>
          )}
        </Stack>
        {/* <Divider sx={{ borderWidth: 1, mb: 1, mt: 1 }} /> */}
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {posts.map((post) => (
            <Grid key={post.id} item xl={3} sx={{ width: 300 }}>
              <PostCard
                post={post}
                type={section.title}
                openPostFormModalHandler={openEditPostFormModalHandler}
              />
            </Grid>
          ))}
        </Grid>

        {!isLast && (
          <Divider textAlign="center" sx={{ mt: 2 }}>
            <Hexagon color="action" />
          </Divider>
        )}
      </Box>

      <Modal
        open={openPostForm || openSectionForm}
        onClose={
          openPostForm ? onClosePostFormHandler : onCloseSectionFormHandler
        }
      >
        <Box
          sx={{
            position: 'absolute',
            top: '35%',
            left: '50%',
            transform: 'translate(-50%, -35%)',
            width: 800,
            // minHeight: '60vh',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          {openPostForm && (
            <PostForm
              closePostFormModalHandler={() => setOpenPostForm(false)}
              action={postFormAction}
            />
          )}
          {openSectionForm && (
            <SectionForm
              closeHandler={() => setOpenSectionForm(false)}
              action="update"
            />
          )}
        </Box>
      </Modal>
    </>
  );
};

export default Section;
