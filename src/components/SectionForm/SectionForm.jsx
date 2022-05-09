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
import { useState } from 'react';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import sectionsSlice, {
  clearSection,
} from '../../features/sections/sectionsSlice';
import {
  selectLoading,
  selectSection,
  selectSections,
} from '../../features/sections/selector';
import {
  createSection,
  updateSection,
  updateSectionById,
} from '../../thunks/sections';
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
    setError,
    getValues,
  } = useForm();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading());
  const section = useSelector(selectSection());
  const sections = useSelector(selectSections());

  const [image, setImage] = useState('');

  // const [photoName, setPhotoName] = useState(section.photo);
  // const [file, setFile] = useState(null);

  const isCreatingSection = action === 'create';
  const isUpdatingSection = action === 'update';

  useEffect(() => {
    if (isUpdatingSection) {
      setValue('title', section.title);
      setValue('name', section.name);
      setImage(section.photo);
    }
  }, [action]);

  const submitHandler = ({ title, id, name, photo }) => {
    // Creating a new section
    if (isCreatingSection) {
      // The title already exists
      if (sections.find((section) => section.id === slugify(title))) {
        return toast.error(
          'Danh mục với tiêu đề này đã tồn tại, hãy tạo danh mục với tiêu đè khác.'
        );
      } else {
        // The title does not exist -> add new section
        const file = photo[0];

        const section = {
          title,
          name,
          photo: file.name,
        };

        dispatch(createSection({ section, id: slugify(title), file }));
        clearForm();
        closeHandler();
      }
    } else if (isUpdatingSection) {
      // Updating section

      // The title is not changed
      if (section.id === slugify(title)) {
        // At least one field is changed -> update section
        if (section.name !== name || section.photo !== image) {
          const file = photo ? photo[0] : null;

          const newSection = {
            name,
            photo: photo[0] ? photo[0].name : image,
          };

          dispatch(updateSectionById({ section: newSection, id, file }));
          clearForm();
          closeHandler();
        } else {
          // None field is changed -> toast
          return toast.error('Thay đổi nội dung để cập nhật danh mục.');
        }
      } else if (sections.find((section) => section.id === slugify(title))) {
        // The title is changed but it has already existed -> toast
        return toast.error('Danh mục này đã tồn tại.');
      } else {
        // Everything is changed -> update section
        const file = photo[0] || null;

        const newSection = {
          title,
          name,
          photo: photo[0] ? photo[0].name : image,
        };

        dispatch(updateSection({ section: newSection, id, file }));
        clearForm();
        closeHandler();
      }
    }
  };

  const clearForm = () => {
    if (isCreatingSection) {
      setValue('title', '');
      setValue('name', '');
      setValue('desc', '');
      setValue('content', '');
      setValue('photo', '');
      setImage('');
    } else if (isUpdatingSection) {
      setValue('title', section.title);
      setValue('name', section.name);
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
                        ? 'Tiêu đề không hợp lệ'
                        : 'Tiêu đề là bắt buộc'
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
                ...(isCreatingSection && {
                  minLength: 1,
                  required: true,
                }),
              })}
              type="file"
              // value={image}
              onChange={(e) => {
                // console.log(e.currentTarget.files[0]);
                setImage(e.currentTarget.files[0].name);
              }}
              style={{ color: 'rgba(0,0,0,0)' }}
            />
            {errors.photo && (
              <Typography
                color="error.main"
                variant="caption"
                sx={{ ml: 1.5, mt: 1 }}
              >
                Chọn file hình ảnh cho danh mục
              </Typography>
            )}
            {image && <Typography>{image}</Typography>}
          </ListItem>

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

      <IconButton
        onClick={closeHandler}
        sx={{ position: 'absolute', right: 15, top: 15 }}
      >
        <Close color="error" fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default SectionForm;
