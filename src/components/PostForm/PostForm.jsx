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
import { ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
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
import defaultImage from '/images/memories.png';

// action = "create" | "update" | "createWithinSection"
const PostForm = ({ closeHandler, action }) => {
  const dispatch = useDispatch();

  const sections = useSelector(selectSections());
  const loading = useSelector(selectLoading());
  const post = useSelector(selectPost());
  const section = useSelector(selectSection());
  const types = useSelector(selectSectionTypes());

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
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
    }
  }, [post, isEditingPost]);

  const submitHandler = async ({ name, desc, content, sectionId, photo }) => {
    if (isEditingPost) {
      // console.log(photo);
      const data = {
        name,
        desc,
        content,
        photo: photo.length ? photo[0].name : post.photo,
        sectionId,
      };
      const file = photo.length ? photo[0] : null;

      // Update post if the post in the storage management exists.
      dispatch(updatePostById({ file, data, id: post.id }));
    } else if (isCreatingPostWithinSection || isCreatingPost) {
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
    setValue('name', '');
    setValue('desc', '');
    setValue('content', '');
    setValue('photo', '');

    if (!isCreatingPostWithinSection) {
      setValue('sectionId', '');
    }
  };

  const resetHandler = () => {
    if (post) {
      setValue('name', post.name);
      setValue('desc', post.desc);
      setValue('content', post.content);
      // setValue('photo', post.photo);
      setValue('sectionId', post.sectionId);
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
          <ListItem>
            <Controller
              name="sectionId"
              control={control}
              defaultValue={section ? section.id : post ? post.sectionId : ''}
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
          <ListItem>
            <input {...register('photo')} type="file" />
          </ListItem>

          <ListItem
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button
              variant="contained"
              color="warning"
              onClick={post ? resetHandler : clearHandler}
            >
              {isEditingPost ? 'Đặt lại' : 'Xóa'}
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
