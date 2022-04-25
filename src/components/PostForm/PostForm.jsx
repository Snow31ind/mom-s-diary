import {
  Button,
  FormControl,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../thunks/sections';
import defaultImage from '/images/memories.png';

const PostForm = () => {
  const dispatch = useDispatch();
  const { sections } = useSelector((state) => state.sections);
  const { isAdmin } = useSelector((state) => state.user);
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

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const submitHandler = async ({ name, desc, content, type, photo }) => {
    // console.log({ name, desc, content, type, image });
    const data = { name, desc, content, photo: photo[0] || defaultImage, type };
    dispatch(createPost({ data }));

    setValue('name', '');
    setValue('desc', '');
    setValue('content', '');
    setValue('type', '');
    setValue('image', '');
  };

  const uploadImageHandler = (e) => {
    const fileReader = new FileReader();
    console.log(e.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <List>
        {/* Type */}
        <ListItem>
          <Controller
            name="type"
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <FormControl variant="filled" sx={{ width: 120 }}>
                <InputLabel id="select-type">Type</InputLabel>
                <Select labelId="select-type" label="Type" {...field}>
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
            defaultValue={''}
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
            defaultValue={''}
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
            defaultValue={''}
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
          <Button type="submit" variant="contained">
            CREATE
          </Button>
        </ListItem>
      </List>
    </form>
  );
};

export default PostForm;
