import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Link as MuiLink,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { Edit, Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { removePost } from '../../thunks/sections';
import { Link, useNavigate } from 'react-router-dom';
import { slugify } from '../../utils/helpers';
import { selectIsAdmin } from '../../features/user/selector';

const PostListItem = ({ post, sectionTitle }) => {
  // const { isAdmin } = useSelector((state) => state.user);
  const isAdmin = useSelector(selectIsAdmin());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [contentText, setContentText] = useState(
    post.content.slice(0, post.content.indexOf(' ', 600))
  );

  const viewHandler = (id) => {
    navigate(`/handbook/${slugify(sectionTitle)}/${slugify(post.name)}`);
  };

  const removeHandler = (sectionId, id) => {
    dispatch(removePost({ sectionId, id }));
  };

  const editHandler = () => {};

  return (
    <Card elevation={0} sx={{ mt: 3, borderRadius: 0, bgcolor: 'grey.100' }}>
      <CardActionArea onClick={() => viewHandler(post.id)}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}
        >
          <img src={post.image} width={200} style={{ borderRadius: 5 }} />
          <Box sx={{ ml: 2 }}>
            <Typography variant="h5" fontWeight="bold">
              {post.name}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {post.desc}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {contentText}
              {'...'}
              <Link
                to={`/handbook/${slugify(sectionTitle)}/${slugify(post.name)}`}
              >
                Read more
              </Link>
            </Typography>
          </Box>
        </Box>
      </CardActionArea>
      {/* {isAdmin && (
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
      )} */}
    </Card>
  );
};

export default PostListItem;
