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
  Tooltip,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GrowthBox from '../../GrowthBox/GrowthBox';
import PostCard from './PostCard/PostCard';
import { Add, Bookmark, Delete, Edit, Hexagon } from '@mui/icons-material';
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
import CustomSlider from '../../Slider/CustomSlider';
import {
  openDialog,
  createDialogState,
  setDialog,
} from '../../../features/dialog/dialogSlice';

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
    dispatch(
      setDialog(
        createDialogState(
          'Xóa danh mục',
          'Bạn có chắc chắn xóa danh mục này?',
          'Quay lại',
          'Tiếp tục',
          () => dispatch(removeSection({ id }))
        )
      )
    );

    dispatch(openDialog());
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
    setOpenPostForm(false);
  };

  const onCloseSectionFormHandler = () => {
    dispatch(clearSection());
    setOpenSectionForm(false);
  };

  return (
    <>
      <Box sx={{ mt: 2 }}>
        <Stack direction="row">
          <Stack direction="row" alignItems="center" justifyContent="center">
            <Bookmark color="primary" />
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
                <Tooltip title="Cập nhật danh mục">
                  <SquareIconButton
                    size="small"
                    color="primary"
                    onClick={openEditSectionFormModalHandler}
                  >
                    <Edit />
                  </SquareIconButton>
                </Tooltip>

                <Tooltip title="Tạo bài viết">
                  <SquareIconButton
                    size="small"
                    color="success"
                    onClick={openCreatePostFormModalHandler}
                  >
                    <Add />
                  </SquareIconButton>
                </Tooltip>

                {!posts.length && (
                  <Tooltip title="Xóa danh mục">
                    <SquareIconButton
                      size="small"
                      color="error"
                      onClick={() => removeHandler(section.id)}
                    >
                      <Delete />
                    </SquareIconButton>
                  </Tooltip>
                )}
              </Stack>
            </>
          )}
        </Stack>

        {posts.length ? (
          <CustomSlider
            data={posts}
            renderItem={(post) => (
              <PostCard
                post={post}
                type={section.title}
                openPostFormModalHandler={openEditPostFormModalHandler}
              />
            )}
            renderKey={(post) => post.id}
          ></CustomSlider>
        ) : (
          <Box
            sx={{
              height: 150,
              flex: 1,
              // bgcolor: 'gray',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <Typography>Trống</Typography>
          </Box>
        )}

        {!isLast && (
          <Divider textAlign="center" sx={{ mt: 4 }}>
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
              closeHandler={onClosePostFormHandler}
              action={postFormAction}
            />
          )}
          {openSectionForm && (
            <SectionForm
              closeHandler={onCloseSectionFormHandler}
              action="update"
            />
          )}
        </Box>
      </Modal>
    </>
  );
};

export default Section;
