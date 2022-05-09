import {
  Box,
  Breadcrumbs,
  List,
  Typography,
  Link as MuiLink,
  Modal,
  Stack,
  IconButton,
  Tooltip,
} from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import Layout from '../../components/Layouts/Layout';
import { useDispatch, useSelector } from 'react-redux';
import PostListItem from '../../components/PostListItem/PostListItem';
import { slugify } from '../../utils/helpers';
import { Add, NavigateNext } from '@mui/icons-material';
import {
  selectLoading,
  selectSectionBySlug,
} from '../../features/sections/selector';
import sectionsSlice, {
  clearPost,
  setPost,
} from '../../features/sections/sectionsSlice';
import PostForm from '../../components/PostForm/PostForm';
import GrowthBox from '../../components/GrowthBox/GrowthBox';
import SquareIconButton from '../../components/Styled/SquareIconButton';
import LoadingPostListItem from '../../components/Loading/LoadingPostListItem';

const SectionDetail = () => {
  const { sectionSlug } = useParams();
  const dispatch = useDispatch();

  const section = useSelector(selectSectionBySlug(sectionSlug));
  const loading = useSelector(selectLoading());

  const [openPostForm, setOpenPostForm] = useState(false);

  const openPostFormHandler = () => {
    dispatch(setPost({ sectionId: section.id }));
    setOpenPostForm(true);
  };

  const closePostFormHandler = () => {
    dispatch(clearPost());
    setOpenPostForm(false);
  };

  if (!section || loading) {
    return (
      <Layout>
        {[1, 2, 3, 4].map((e) => (
          <LoadingPostListItem key={e} />
        ))}
      </Layout>
    );
  }

  return (
    <React.Fragment>
      <Layout>
        <Outlet />
        {/* <Typography>{type}</Typography> */}
        <Stack direction="row">
          <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
            <Link to="/">{'Trang chủ'}</Link>
            <Typography color="black" fontWeight="bold">
              {section.title}
            </Typography>
          </Breadcrumbs>

          <GrowthBox />

          <Stack direction="row" spacing={1}>
            <Tooltip title="Bài học mới">
              <SquareIconButton color="success" onClick={openPostFormHandler}>
                <Add />
              </SquareIconButton>
            </Tooltip>
          </Stack>
        </Stack>

        {section.posts.length ? (
          <List>
            {section.posts.map((post) => (
              <PostListItem
                key={post.id}
                post={post}
                sectionTitle={section.title}
              />
            ))}
          </List>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography>Trống</Typography>
          </Box>
        )}
      </Layout>

      <Modal open={openPostForm} onClose={closePostFormHandler}>
        <Box
          sx={{
            position: 'absolute',
            top: '35%',
            left: '50%',
            transform: 'translate(-50%, -35%)',
            width: 800,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <PostForm
            closeHandler={closePostFormHandler}
            action="createWithinSection"
          ></PostForm>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default SectionDetail;
