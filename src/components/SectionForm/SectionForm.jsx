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
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoading, selectSection } from '../../features/sections/selector';
import { createSection, updateSection } from '../../thunks/sections';
import GrowthBox from '../GrowthBox/GrowthBox';
import defaultImage from '/images/memories.png';

const SectionForm = ({ action, closeHandler }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    register,
  } = useForm();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading());
  const section = useSelector(selectSection());

  const isCreatingSection = action === 'create';
  const isUpdateingSection = action === 'update';

  useEffect(() => {
    if (isUpdateingSection) {
      setValue('title', section.title);
    }
  }, [action]);

  const submitHandler = ({ title, name, desc, content, photo }) => {
    if (isCreatingSection) {
      const post = {
        name,
        desc,
        content,
        photo: photo[0].name,
      };

      const file = photo[0];

      dispatch(createSection({ title, file, post }));
      clearForm();
      closeHandler();
    } else if (isUpdateingSection) {
      console.log({ title, id: section.id });
      dispatch(updateSection({ title, id: section.id }));
      clearForm();
      closeHandler();
    }
  };

  const clearForm = () => {
    if (isCreatingSection) {
      setValue('title', '');
      setValue('name', '');
      setValue('desc', '');
      setValue('content', '');
      setValue('image', '');
    } else if (isUpdateingSection) {
      setValue('title', section.title);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography textAlign="center" variant="h6" fontWeight="bold">
        {isCreatingSection && 'New section'}
        {isUpdateingSection && 'Update section'}
      </Typography>

      <form onSubmit={handleSubmit(submitHandler)}>
        <List>
          {isUpdateingSection && (
            <ListItem>
              <Controller
                name="id"
                control={control}
                defaultValue={section.id}
                render={({ field }) => (
                  <TextField
                    disabled
                    fullWidth
                    variant="outlined"
                    label="Section id"
                    inputProps={{ type: 'text' }}
                    {...field}
                  />
                )}
              />
            </ListItem>
          )}

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
                  label="Section title*"
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

          {isCreatingSection && (
            <React.Fragment>
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
                      multiline
                      variant="outlined"
                      label="Name*"
                      inputProps={{ type: 'text' }}
                      minRows={2}
                      maxRows={2}
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
                      multiline
                      minRows={3}
                      maxRows={3}
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
                      multiline
                      minRows={12}
                      // maxRows={16}
                      maxRows={12}
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
            </React.Fragment>
          )}

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
                {action === 'create'
                  ? 'CREATE'
                  : action === 'update'
                  ? 'SAVE'
                  : ''}
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
