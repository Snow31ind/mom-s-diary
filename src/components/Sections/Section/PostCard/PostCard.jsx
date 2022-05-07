import { Edit, Remove, Delete } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Link,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removePost } from '../../../../thunks/sections';
import { slugify } from '../../../../utils/helpers';
import GrowthBox from '../../../GrowthBox/GrowthBox';
import SquareIconButton from '../../../Styled/SquareIconButton';
import moment from 'moment';
import { setPost } from '../../../../features/sections/sectionsSlice';
import { useState } from 'react';
import { selectLoading } from '../../../../features/sections/selector';
import {
  closeDialog,
  createDialogState,
  onProcessWithDialog,
  openDialog,
  setDialog,
} from '../../../../features/dialog/dialogSlice';

const PostCard = ({ post, type, clickHandler, openPostFormModalHandler }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAdmin } = useSelector((state) => state.user);
  const loading = useSelector(selectLoading());

  const [contentText, setContentText] = useState(
    post.content.slice(0, post.content.indexOf(' ', 100))
  );
  // const [image, setImage] = useState(null);

  const { sectionId, content, photo, desc, name, createdAt, updatedAt, image } =
    post;

  const removeHandler = (sectionId, id) => {
    dispatch(removePost({ sectionId, id }));
  };

  const openDialogToRemoveHandler = (sectionId, id) => {
    dispatch(
      setDialog(
        createDialogState(
          'Xóa bài học',
          'Bạn chắc chắn xóa bài học này?',
          'Quay lại',
          'Tiếp tục',
          () => removeHandler(sectionId, id)
        )
      )
    );
    dispatch(openDialog());
  };

  const editHandler = () => {
    dispatch(setPost(post));
    openPostFormModalHandler();
  };

  const viewHandler = (post) => {
    navigate(`/handbook/${slugify(type)}/${slugify(post.name)}`);
  };

  return (
    <Card
      onClick={clickHandler}
      elevation={0}
      sx={{
        height: '100%',
        borderRadius: 0,
        bgcolor: 'grey.100',
        display: 'flex',
        flexDirection: 'column',
        borderWidth: '0 2px 0 0',
        borderStyle: 'ridge',
        pr: 1.7,
        flex: 1,
        ml: 1,
        mr: 1,
      }}
    >
      <CardActionArea onClick={() => viewHandler(post)}>
        {loading ? (
          <Typography>Hello</Typography>
        ) : (
          <CardMedia
            component="img"
            src={image}
            alt={name}
            sx={{ width: '100%', height: 200, borderRadius: 2 }}
          />
        )}
      </CardActionArea>

      <CardContent sx={{ flex: 1 }}>
        <Typography
          variant="subtitle2"
          gutterBottom
          fontSize={14}
          sx={{ mt: 1, color: 'text.secondary' }}
        >{`${moment(createdAt).format('LL')}`}</Typography>
        <Typography
          variant="h5"
          fontWeight="bold"
          fontSize={22}
          gutterBottom
          sx={{ mt: 1 }}
        >
          {name}
        </Typography>
      </CardContent>

      {/* Admin tools */}
      {isAdmin && (
        <CardActions
          sx={{
            display: 'flex',
          }}
        >
          <GrowthBox />
          <Tooltip title="Xóa bài học">
            <SquareIconButton
              size="small"
              color="error"
              onClick={() => openDialogToRemoveHandler(post.sectionId, post.id)}
            >
              <Delete />
            </SquareIconButton>
          </Tooltip>

          <Tooltip title="Cập nhật bài học">
            <SquareIconButton
              size="small"
              color="primary"
              onClick={editHandler}
            >
              <Edit />
            </SquareIconButton>
          </Tooltip>
        </CardActions>
      )}
    </Card>
  );
};

export default PostCard;
