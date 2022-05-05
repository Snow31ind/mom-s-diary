import { Close } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
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
import { slugify } from '../../utils/helpers';
import GrowthBox from '../GrowthBox/GrowthBox';
import defaultImage from '/images/memories.png';

const SectionForm = ({ action, closeHandler }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    register,
    getValues,
  } = useForm();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading());
  const section = useSelector(selectSection());

  const isCreatingSection = action === 'create';
  const isUpdatingSection = action === 'update';

  useEffect(() => {
    if (isUpdatingSection) {
      setValue('title', section.title);
    }
  }, [action]);

  const submitHandler = ({ title, id, name, photo }) => {
    if (isCreatingSection) {
      const file = photo[0];

      const section = {
        title,
        name,
        photo: file.name,
      };

      dispatch(createSection({ section, id, file }));
      clearForm();
      closeHandler();
    } else if (isUpdatingSection) {
      const section = {
        title,
      };
      dispatch(updateSection({ section, id }));
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
    } else if (isUpdatingSection) {
      setValue('title', section.title);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography textAlign="center" variant="h6" fontWeight="bold">
        {isCreatingSection && 'Danh mục mới'}
        {isUpdatingSection && 'Cập nhật danh mục'}
      </Typography>

      <form onSubmit={handleSubmit(submitHandler)}>
        <List>
          {/* ID */}
          {isUpdatingSection && (
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
                    label="ID cho danh mục"
                    inputProps={{ type: 'text' }}
                    {...field}
                  />
                )}
              />
            </ListItem>
          )}

          {/* Title */}
          <ListItem>
            <Controller
              name="title"
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
                  label="Tiêu đề danh mục"
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

          {/* Type & name */}
          {isCreatingSection && (
            <React.Fragment>
              <ListItem>
                <Controller
                  name="id"
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
                      label="ID cho danh mục"
                      inputProps={{ type: 'text' }}
                      minRows={2}
                      maxRows={2}
                      error={Boolean(errors.id)}
                      helperText={
                        errors.id
                          ? errors.id.type === 'minLength'
                            ? 'ID is invalid'
                            : 'ID is required'
                          : ''
                      }
                      {...field}
                    />
                  )}
                />
              </ListItem>

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
                      label="Tên danh mục"
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

              {/* Image */}
              <ListItem>
                <input {...register('photo')} type="file" />
              </ListItem>
            </React.Fragment>
          )}

          {/* Submit button */}
          <ListItem
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button variant="contained" color="warning" onClick={clearForm}>
              Đặt lại
            </Button>
            <GrowthBox />
            {!loading ? (
              <Button type="submit" color="success" variant="contained">
                {action === 'create'
                  ? 'Tạo'
                  : action === 'update'
                  ? 'Cập nhật'
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

      <IconButton onClick={closeHandler} sx={{ position: 'absolute' }}>
        <Close color="action" fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default SectionForm;
