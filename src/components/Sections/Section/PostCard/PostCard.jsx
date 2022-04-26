import { Edit, Remove, Delete } from '@mui/icons-material';
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removePost } from '../../../../thunks/sections';
import { slugify } from '../../../../utils/helpers';
import GrowthBox from '../../../GrowthBox/GrowthBox';
import SquareIconButton from '../../../Styled/SquareIconButton';
import moment from 'moment';
import { setPost } from '../../../../features/sections/sectionsSlice';

const PostCard = ({ post, type, clickHandler, openPostFormModalHandler }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAdmin } = useSelector((state) => state.user);

  const { sectionId, content, photo, desc, name, createdAt, updatedAt } = post;
  const createdTime = new Date(createdAt).toLocaleString();

  const removeHandler = (sectionId, id) => {
    dispatch(removePost({ sectionId, id }));
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
      elevation={2}
      sx={{ height: '100%', borderRadius: 0 }}
    >
      <CardActionArea onClick={() => viewHandler(post)}>
        <CardMedia
          component="img"
          src={photo}
          alt={desc}
          sx={{ width: '100%', height: 150 }}
        />
      </CardActionArea>

      <CardHeader
        title={<Typography>{`${moment(createdAt).fromNow()}`}</Typography>}
      />
      <CardContent>
        <Typography variant="h5">{name}</Typography>
        <Typography variant="h6">{desc}</Typography>
        <Typography variant="body2">{content}</Typography>
        {/* <Typography>{new Date(createdAt).toISOString()}</Typography> */}
      </CardContent>

      {/* Admin tools */}
      {isAdmin && (
        <CardActions
          sx={{
            display: 'flex',
          }}
        >
          <GrowthBox />
          <SquareIconButton
            variant="contained"
            size="small"
            color="inherit"
            onClick={() => removeHandler(post.sectionId, post.id)}
          >
            <Delete />
          </SquareIconButton>

          <SquareIconButton
            variant="contained"
            size="small"
            color="inherit"
            onClick={editHandler}
          >
            <Edit />
          </SquareIconButton>
        </CardActions>
      )}
    </Card>
  );
};

export default PostCard;
