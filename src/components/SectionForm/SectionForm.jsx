import {
  Box,
  Button,
  CircularProgress,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createSection } from '../../thunks/sections';
import GrowthBox from '../GrowthBox/GrowthBox';
import defaultImage from '/images/memories.png';

const SectionForm = ({ closeSectionFormModalHandler }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    register,
  } = useForm();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.sections);

  const submitHandler = ({ title, name, desc, content, photo }) => {
    const section = {
      title,
    };

    const post = {
      name,
      desc,
      content,
      photo: photo[0] || defaultImage,
    };

    dispatch(createSection({ section, post }));

    clearForm();

    closeSectionFormModalHandler();
  };

  const clearForm = () => {
    setValue('title', '');
    setValue('name', '');
    setValue('desc', '');
    setValue('content', '');
    setValue('image', '');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography textAlign="center" variant="h6" fontWeight="500">
        New Section
      </Typography>

      <form onSubmit={handleSubmit(submitHandler)}>
        <List>
          {/* Section title */}
          <ListItem>
            <Controller
              name="title"
              control={control}
              defaultValue={''}
              rules={{
                minLength: 1,
              }}
              render={({ field }) => (
                <TextField
                  autoFocus
                  fullWidth
                  variant="outlined"
                  label="Section title"
                  inputProps={{ type: 'text' }}
                  error={Boolean(errors.title)}
                  helperText={
                    errors.title
                      ? errors.title.type === 'minLength'
                        ? 'Title is invalid'
                        : 'Title is required'
                      : ''
                  }
                  {...field}
                />
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
            <Button variant="contained" color="warning" onClick={clearForm}>
              RESET
            </Button>
            <GrowthBox />
            {!loading ? (
              <Button type="submit" color="success" variant="contained">
                CREATE
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

export default SectionForm;
