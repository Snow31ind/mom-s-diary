import { Add, Delete, Edit } from '@mui/icons-material';
import { Box, LinearProgress, Modal, Stack } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearPost, setPost } from '../../../features/sections/sectionsSlice';
import {
  selectLoading,
  selectSections,
  selectSectionTypes,
} from '../../../features/sections/selector';
import GrowthBox from '../../GrowthBox/GrowthBox';
import PostForm from '../../PostForm/PostForm';
import CustomNoRowsOverlay from '../../Styled/CustomNoRowsOverlay';
import SquareIconButton from '../../Styled/SquareIconButton';

const PostDataGrid = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading());
  const sections = useSelector(selectSections());
  const types = useSelector(selectSectionTypes());
  const posts = sections
    .map((section) =>
      section.posts.map((post) => ({ ...post, sectionTitle: section.title }))
    )
    .flat(1);

  const [openPostForm, setOpenPostForm] = useState({
    status: false,
    action: '',
  });

  const columns = [
    {
      field: 'id',
      flex: 1,
      description: 'Post ID',
      renderHeader: () => <strong>ID</strong>,
    },
    {
      field: 'sectionTitle',
      flex: 1,
      type: 'singleSelect',
      description: 'Post type',
      valueOptions: sections.map((section) => ({
        label: section.title,
        value: section.title,
      })),
      renderHeader: () => <strong>Type</strong>,
    },
    {
      field: 'name',
      flex: 1,
      description: 'Post name',
      renderHeader: () => <strong>Name</strong>,
    },
    {
      field: 'desc',
      flex: 1,
      description: 'Post description',
      renderHeader: () => <strong>Description</strong>,
    },
    {
      field: 'content',
      flex: 1,
      description: 'Post content',
      renderHeader: () => <strong>Content</strong>,
    },
    {
      field: 'createdAt',
      type: 'date',
      flex: 1,
      description: 'Post publish day',
      renderHeader: () => <strong>Published</strong>,
      valueFormatter: (params) =>
        `${new Date(params.value).toLocaleDateString()}`,
    },
    {
      field: 'updatedAt',
      type: 'date',
      flex: 1,
      description: 'Post last update day',
      renderHeader: () => <strong>Last updated</strong>,
      valueFormatter: (params) =>
        `${new Date(params.value).toLocaleDateString()}`,
    },
    {
      field: 'actions',
      type: 'actions',
      flex: 1,
      description: 'Actions',
      renderHeader: () => <strong>Actions</strong>,
      getActions: (params) => [
        <GridActionsCellItem
          label="Update"
          icon={<Edit />}
          onClick={() => {
            dispatch(setPost(params.row));
            setOpenPostForm({ status: true, action: 'update' });
          }}
        />,
        <GridActionsCellItem
          showInMenu
          label="Remove"
          icon={<Delete />}
          onClick={() => {}}
        />,
      ],
    },
  ];

  const createNewPostHandler = () => {
    setOpenPostForm({ status: true, action: 'create' });
  };

  return (
    <React.Fragment>
      <Box sx={{ flex: 1 }}>
        <Stack direction="row">
          <GrowthBox />
          <Box>
            <SquareIconButton onClick={createNewPostHandler}>
              <Add />
            </SquareIconButton>
          </Box>
        </Stack>
        <DataGrid
          autoHeight
          loading={loading}
          columns={columns}
          rows={posts}
          components={{
            Toolbar: GridToolbar,
            LoadingOverlay: LinearProgress,
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
          initialState={{
            columns: {
              columnVisibilityModel: {
                id: false,
                createdAt: false,
                updatedAt: false,
              },
            },
          }}
        />
      </Box>

      <Modal
        open={openPostForm.status}
        onClose={() => {
          setOpenPostForm({ status: false, action: '' });
          dispatch(clearPost());
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '35%',
            left: '50%',
            transform: 'translate(-50%, -35%)',
            width: 800,
            minHeight: '60vh',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <PostForm
            closePostFormModalHandler={() =>
              setOpenPostForm({ status: false, action: '' })
            }
            action={openPostForm.action}
          />
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default PostDataGrid;
