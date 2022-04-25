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

const PostCard = ({ post, clickHandler }) => {
  const { type, content, photo, desc, name, createdAt, updatedAt } = post;
  const createdTime = new Date(createdAt).toLocaleString();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAdmin } = useSelector((state) => state.user);

  const removeHandler = (type, id) => {
    dispatch(removePost({ type, id }));
  };

  const editHandler = () => {};

  const viewHandler = () => {
    navigate(`/${post.type}/${post.id}`);
  };

  return (
    <Card
      onClick={clickHandler}
      elevation={2}
      sx={{ height: '100%', borderRadius: 0 }}
    >
      <CardActionArea onClick={() => viewHandler(post.id)}>
        <CardMedia
          component="img"
          src={photo}
          alt={desc}
          sx={{ width: '100%', height: 150 }}
        />
      </CardActionArea>

      <CardHeader title={<Typography>{createdTime}</Typography>} />
      <CardContent>
        <Typography variant="h5">{name}</Typography>
        <Typography variant="h6">{desc}</Typography>
        <Typography variant="body2">{content}</Typography>
        {/* <Typography>{new Date(createdAt).toISOString()}</Typography> */}
      </CardContent>

      {isAdmin && (
        <CardActions>
          <IconButton
            color="warning"
            onClick={() => removeHandler(post.type, post.id)}
          >
            <Delete />
          </IconButton>

          <IconButton color="primary" onClick={editHandler}>
            <Edit />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
};

export default PostCard;
