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
import { slugify } from '../../utils/helpers';
import { selectIsAdmin } from '../../features/user/selector';

const PostListItem = ({ post, sectionTitle }) => {
  // const { isAdmin } = useSelector((state) => state.user);
  const isAdmin = useSelector(selectIsAdmin());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const viewHandler = (id) => {
    navigate(`/handbook/${slugify(sectionTitle)}/${slugify(post.name)}`);
  };

  const removeHandler = (sectionId, id) => {
    dispatch(removePost({ sectionId, id }));
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
            onClick={() => removeHandler(post.sectionId, post.id)}
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
