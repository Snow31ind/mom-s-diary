import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Edit, Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { removePost } from '../../thunks/sections';
import { useNavigate } from 'react-router-dom';

const PostListItem = ({ post }) => {
  const { isAdmin } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const viewHandler = (id) => {
    navigate(`/${post.type}/${post.id}`);
  };

  const removeHandler = (type, id) => {
    dispatch(removePost({ type, id }));
  };

  const editHandler = () => {};

  return (
    <Card elevation={1} sx={{ mt: 3, borderRadius: 0 }}>
      <CardActionArea onClick={() => viewHandler(post.id)}>
        <CardContent>
          <Box sx={{ display: 'flex' }}>
            <img src={post.photo} width={150} />
            <Box>
              <Typography variant="h4">{post.name}</Typography>
              <Typography variant="h6">{post.desc}</Typography>
              <Typography variant="body2">{post.content}</Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
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

export default PostListItem;
