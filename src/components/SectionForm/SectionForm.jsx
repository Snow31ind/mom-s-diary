import { Button, List, ListItem, TextField } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createSection } from '../../thunks/sections';

const SectionForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const dispatch = useDispatch();

  const submitHandler = ({ title, titleId }) => {
    const data = { title, titleId };

    dispatch(createSection({ data }));

    setValue('title', '');
    setValue('titleId', '');
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <List>
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
                label="Title"
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

        <ListItem>
          <Controller
            name="titleId"
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
                label="Title ID"
                inputProps={{ type: 'text' }}
                error={Boolean(errors.titleId)}
                helperText={
                  errors.titleId
                    ? errors.titleId.type === 'minLength'
                      ? 'Title is invalid'
                      : 'Title is required'
                    : ''
                }
                {...field}
              />
            )}
          />
        </ListItem>

        <ListItem sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button type="submit" variant="contained">
            CREATE
          </Button>
        </ListItem>
      </List>
    </form>
  );
};

export default SectionForm;
