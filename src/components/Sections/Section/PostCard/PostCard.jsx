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
  Link,
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

  // useEffect(() => {
  //   // console.log(post);
  //   const fetchImage = async () => {
  //     const imageUrl = await getImage(post.photo);
  //     // console.log('Result:', res);
  //     setImage(imageUrl);
  //   };

  //   fetchImage();
  // }, [post]);

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
      elevation={0}
      sx={{
        height: '100%',
        borderRadius: 0,
        bgcolor: 'grey.100',
        display: 'flex',
        flexDirection: 'column',
        borderWidth: '0 2px 0 0',
        borderStyle: 'ridge',
        pr: 1.8,
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
            sx={{ width: '100%', height: 200, borderRadius: 5 }}
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
        <Typography
          variant="subtitle1"
          fontSize={16}
          sx={{ mt: 2, color: 'text.secondary' }}
        >
          {desc}
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
          <SquareIconButton
            size="small"
            color="error"
            onClick={() => removeHandler(post.sectionId, post.id)}
          >
            <Delete />
          </SquareIconButton>

          <SquareIconButton size="small" color="primary" onClick={editHandler}>
            <Edit />
          </SquareIconButton>
        </CardActions>
      )}
    </Card>
  );
};

export default PostCard;
