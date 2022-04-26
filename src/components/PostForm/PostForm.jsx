import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePostById } from '../../thunks/sections';
import GrowthBox from '../GrowthBox/GrowthBox';
import defaultImage from '/images/memories.png';

const PostForm = ({ closePostFormModalHandler }) => {
  const dispatch = useDispatch();
  const { sections, loading, post, section } = useSelector(
    (state) => state.sections
  );

  const types = sections.map((section) => ({
    label: section.title,
    value: section.id,
  }));

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const isEditingPost = Boolean(post);
  const isCreatingPost = Boolean(section);

  useEffect(() => {
    if (isEditingPost) {
      // Set the default value for the form if the post in the storage management exists
      setValue('name', post.name);
      setValue('desc', post.desc);
      setValue('content', post.content);
      // setValue('photo', post.photo);
      setValue('sectionId', post.sectionId);
    }
  }, [post]);

  const submitHandler = async ({ name, desc, content, sectionId, photo }) => {
    const data = {
      name,
      desc,
      content,
      photo: photo[0] || defaultImage,
      sectionId,
    };
    // console.log(data);

    if (isEditingPost) {
      // Update post if the post in the storage management exists.
      console.log(data);
      dispatch(updatePostById({ data, id: post.id }));
    } else {
      // Else we would create a new post
      dispatch(createPost({ data }));
    }

    closePostFormModalHandler();

    clearHandler();
  };

  const clearHandler = () => {
    setValue('name', '');
    setValue('desc', '');
    setValue('content', '');
    setValue('photo', '');

    if (!isCreatingPost) {
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
      <Typography textAlign="center" variant="h6" fontWeight="500">
        {isEditingPost && 'Updating Post'}
        {isCreatingPost && 'Creating New Post'}
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
                  <InputLabel id="select-type">Section title</InputLabel>
                  <Select
                    disabled={isCreatingPost || isEditingPost ? true : false}
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
                  variant="outlined"
                  label="Name *"
                  inputProps={{ type: 'text' }}
                  error={Boolean(errors.name)}
                  helperText={
                    errors.name
                      ? errors.name.type === 'minLength'
                        ? 'Name is invalid'
                        : 'Name is required'
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
                  variant="outlined"
                  label="Description *"
                  inputProps={{ type: 'text' }}
                  error={Boolean(errors.desc)}
                  helperText={
                    errors.desc
                      ? errors.desc.type === 'minLength'
                        ? 'Description is invalid'
                        : 'Description is required'
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
                  variant="outlined"
                  label="Content *"
                  inputProps={{ type: 'text' }}
                  error={Boolean(errors.desc)}
                  helperText={
                    errors.content
                      ? errors.content.type === 'minLength'
                        ? 'Content is invalid'
                        : 'Content is required'
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
              {isEditingPost ? 'RESET' : 'CLEAR'}
            </Button>
            <GrowthBox />
            {!loading ? (
              <Button type="submit" color="success" variant="contained">
                {isEditingPost ? 'UPDATE' : 'CREATE'}
              </Button>
            ) : (
              <Button variant="contained" disabled>
                <CircularProgress color="inherit" size={26} />
              </Button>
            )}
          </ListItem>
        </List>
      </form>
    </Box>
  );
};

export default PostForm;
