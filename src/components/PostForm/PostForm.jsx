import { Close } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearPost } from '../../features/sections/sectionsSlice';
import {
  selectLoading,
  selectPost,
  selectSection,
  selectSections,
  selectSectionTypes,
} from '../../features/sections/selector';
import { createPost, updatePostById } from '../../thunks/sections';
import GrowthBox from '../GrowthBox/GrowthBox';

// action = "create" | "update" | "createWithinSection"
const PostForm = ({ closeHandler, action }) => {
  const dispatch = useDispatch();

  const sections = useSelector(selectSections());
  const loading = useSelector(selectLoading());
  const post = useSelector(selectPost());
  const section = useSelector(selectSection());
  const types = useSelector(selectSectionTypes());

  const [image, setImage] = useState('');

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    setError,
    getValues,
  } = useForm();

  const isEditingPost = action === 'update';
  const isCreatingPost = action === 'create';
  const isCreatingPostWithinSection = action === 'createWithinSection';

  useEffect(() => {
    if (isEditingPost) {
      // Set the default value for the form if the post in the storage management exists
      setValue('name', post.name);
      setValue('desc', post.desc);
      setValue('content', post.content);
      setValue('sectionId', post.sectionId);
      setImage(post.photo);
    }
  }, [post, isEditingPost]);

  const submitHandler = async ({ name, desc, content, sectionId, photo }) => {
    if (isEditingPost) {
      const existingPost = sections
        .find((section) => section.id === sectionId)
        .posts.find((post) => post.name === name);

      if (existingPost) {
        if (
          post.desc === desc &&
          post.content === content &&
          post.photo === image
        ) {
          return toast.error('Tên bài học nãy đã tồn tại, hãy nhập tên khác.');
        } else {
          const file = photo[0] || null;

          const data = {
            name,
            desc,
            content,
            photo: file ? file.name : image,
            sectionId,
          };

          // Update post if the post in the storage management exists.
          dispatch(updatePostById({ file, data, id: post.id }));
        }
      } else {
        const file = photo[0] || null;

        const data = {
          sectionId,
          name,
          desc,
          content,
          photo: file ? file.name : image,
        };

        // Update post if the post in the storage management exists.
        dispatch(updatePostById({ file, data, id: post.id }));
      }
    } else {
      if (isCreatingPostWithinSection) {
        if (
          sections
            .find((section) => section.id === sectionId)
            .posts.find((post) => post.name === name)
        ) {
          return toast.error('Tên bài học nãy đã tồn tại, hãy nhập tên khác.');
        }
      }

      if (isCreatingPost) {
        if (
          sections
            .find((section) => section.id === sectionId)
            .posts.find((post) => post.name === name)
        ) {
          return toast.error('Tên bài học nãy đã tồn tại, hãy nhập tên khác.');
        }
      }

      // Else we would create a new post
      const data = {
        name,
        desc,
        content,
        photo: photo[0].name,
        sectionId,
      };
      const file = photo[0];

      dispatch(createPost({ file, data }));
    }

    closeHandler();
    clearHandler();
  };

  const clearHandler = () => {
    console.log('Hello');
    setValue('name', '');
    setValue('desc', '');
    setValue('content', '');
    setValue('photo', '');

    if (!isCreatingPostWithinSection) {
      setValue('sectionId', '');
    }
  };

  const resetHandler = () => {
    if (isCreatingPost) {
      setValue('name', '');
      setValue('desc', '');
      setValue('content', '');
      setValue('photo', '');
      setValue('sectionId', '');
      setImage('');
    } else if (isEditingPost) {
      setValue('name', post.name);
      setValue('desc', post.desc);
      setValue('content', post.content);
    } else if (isCreatingPostWithinSection) {
      setValue('name', '');
      setValue('desc', '');
      setValue('content', '');
      setValue('photo', '');
      setImage('');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography textAlign="center" variant="h6" fontWeight="bold">
        {isEditingPost && 'Cập nhật bài học'}
        {isCreatingPostWithinSection && 'Bài học mới'}
        {isCreatingPost && 'Bài học mới'}
      </Typography>

      <form onSubmit={handleSubmit(submitHandler)}>
        <List>
          {/* Section Title */}
          <ListItem
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
          >
            <Controller
              name="sectionId"
              control={control}
              defaultValue={post ? post.sectionId : ''}
              rules={{
                required: true,
                minLength: 1,
              }}
              render={({ field }) => (
                <FormControl fullWidth variant="filled">
                  <InputLabel id="select-type">Tiêu đề danh mục</InputLabel>
                  <Select
                    disabled={
                      isCreatingPostWithinSection || isEditingPost
                        ? true
                        : false
                    }
                    labelId="select-type"
                    label="Type"
                    error={Boolean(errors.sectionId)}
                    {...field}
                  >
                    {types.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            {errors.sectionId && (
              <Typography
                color="error.main"
                variant="caption"
                sx={{ ml: 1.5, mt: 1 }}
              >
                Tiêu đề danh mục không được trống
              </Typography>
            )}
          </ListItem>

          {/* Name */}
          <ListItem>
            <Controller
              name="name"
              control={control}
              defaultValue={post ? post.name : ''}
              rules={{
                required: true,
                minLength: 1,
              }}
              render={({ field }) => (
                <TextField
                  autoFocus
                  fullWidth
                  multiline
                  variant="outlined"
                  label="Tên bài học"
                  inputProps={{ type: 'text' }}
                  error={Boolean(errors.name)}
                  helperText={
                    errors.name
                      ? errors.name.type === 'minLength'
                        ? 'Tên bài học không hợp lệ'
                        : 'Tên bài học không được trống'
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>

          {/* Description */}
          <ListItem>
            <Controller
              name="desc"
              control={control}
              defaultValue={post ? post.desc : ''}
              rules={{
                required: true,
                minLength: 1,
              }}
              render={({ field }) => (
                <TextField
                  autoFocus
                  fullWidth
                  multiline
                  minRows={2}
                  maxRows={2}
                  variant="outlined"
                  label="Miêu tả bài học"
                  inputProps={{ type: 'text' }}
                  error={Boolean(errors.desc)}
                  helperText={
                    errors.desc
                      ? errors.desc.type === 'minLength'
                        ? 'Miêu tả bài học không hợp lệ'
                        : 'Miêu tả bài học không được trống'
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>

          {/* Content */}
          <ListItem>
            <Controller
              name="content"
              control={control}
              defaultValue={post ? post.content : ''}
              rules={{
                required: true,
                minLength: 1,
              }}
              render={({ field }) => (
                <TextField
                  autoFocus
                  fullWidth
                  multiline
                  minRows={12}
                  maxRows={12}
                  variant="outlined"
                  label="Nội dung bài học"
                  inputProps={{ type: 'text' }}
                  error={Boolean(errors.desc)}
                  helperText={
                    errors.content
                      ? errors.content.type === 'minLength'
                        ? 'Nội dung bài học không hợp lệ'
                        : 'Nội dung bài học không được trống'
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>

          {/* Image */}
          <ListItem
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
          >
            <input
              {...register('photo', {
                ...((isCreatingPost || isCreatingPostWithinSection) && {
                  minLength: 1,
                  required: true,
                }),
              })}
              type="file"
              style={{ color: 'rgba(0,0,0,0)' }}
              onChange={(e) => setImage(e.currentTarget.files[0].name)}
            />
            {errors.photo && (
              <Typography
                color="error.main"
                variant="caption"
                sx={{ ml: 1.5, mt: 1 }}
              >
                Chọn file hình ảnh cho tiêu đề
              </Typography>
            )}
            {image && <Typography>{image}</Typography>}
          </ListItem>

          <ListItem
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button variant="contained" color="warning" onClick={resetHandler}>
              {'Đặt lại'}
            </Button>
            <GrowthBox />
            {!loading ? (
              <Button type="submit" color="success" variant="contained">
                {isEditingPost ? 'Cập nhật' : 'Tạo'}
              </Button>
            ) : (
              <Button variant="contained" disabled>
                <CircularProgress color="inherit" size={26} />
              </Button>
            )}
          </ListItem>
        </List>
      </form>

      <IconButton
        onClick={closeHandler}
        sx={{ position: 'absolute', right: 15, top: 15 }}
      >
        <Close color="error" fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default PostForm;
