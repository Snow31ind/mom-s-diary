import { Add, Delete, Edit } from '@mui/icons-material';
import { Box, LinearProgress, Modal, Stack, Tooltip } from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
} from '@mui/x-data-grid';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  createDialogState,
  openDialog,
  setDialog,
} from '../../../features/dialog/dialogSlice';
import { clearPost, setPost } from '../../../features/sections/sectionsSlice';
import {
  selectLoading,
  selectSections,
  selectSectionTypes,
} from '../../../features/sections/selector';
import { removePost } from '../../../thunks/sections';
import { slugify } from '../../../utils/helpers';
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
      renderHeader: () => <strong>ID</strong>,
      renderCell: (params) => (
        <Link
          to={`/handbook/${slugify(params.row.sectionTitle)}/${slugify(
            params.row.name
          )}`}
        >
          {params.value}
        </Link>
      ),
    },
    {
      field: 'sectionId',
      flex: 1,
      renderHeader: () => <strong>Danh mục</strong>,
    },
    {
      field: 'sectionTitle',
      flex: 1,
      type: 'singleSelect',
      valueOptions: sections.map((section) => ({
        label: section.title,
        value: section.title,
      })),
      renderHeader: () => <strong>Loại danh mục</strong>,
    },
    {
      field: 'name',
      flex: 1,
      description: 'Post name',
      renderHeader: () => <strong>Tên</strong>,
    },
    {
      field: 'desc',
      flex: 1,
      description: 'Post description',
      renderHeader: () => <strong>Miêu tả</strong>,
    },
    {
      field: 'content',
      flex: 1,
      description: 'Post content',
      renderHeader: () => <strong>Nội dung</strong>,
    },
    {
      field: 'createdAt',
      type: 'date',
      flex: 1,
      description: 'Post publish day',
      renderHeader: () => <strong>Ngày khởi tạo</strong>,
      valueFormatter: (params) =>
        `${new Date(params.value).toLocaleDateString()}`,
    },
    {
      field: 'updatedAt',
      type: 'date',
      flex: 1,
      description: 'Post last update day',
      renderHeader: () => <strong>Lần cập nhật gần nhất</strong>,
      valueFormatter: (params) =>
        `${new Date(params.value).toLocaleDateString()}`,
    },
    {
      field: 'actions',
      type: 'actions',
      flex: 1,
      getActions: (params) => [
        <GridActionsCellItem
          label="Chỉnh sửa"
          icon={<Edit />}
          onClick={() => {
            dispatch(setPost(params.row));
            setOpenPostForm({ status: true, action: 'update' });
          }}
        />,
        <GridActionsCellItem
          showInMenu
          label="Xóa"
          icon={<Delete />}
          onClick={() => {
            dispatch(
              setDialog(
                createDialogState(
                  'Post removal',
                  'Are you sure you want to remove this post?',
                  'Cancel',
                  'Process',
                  () =>
                    dispatch(
                      removePost({
                        sectionId: params.row.sectionId,
                        id: params.id,
                      })
                    )
                )
              )
            );

            dispatch(openDialog());
          }}
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
            <Tooltip title="Tạo bài viết">
              <SquareIconButton size="small" onClick={createNewPostHandler}>
                <Add />
              </SquareIconButton>
            </Tooltip>
          </Box>
        </Stack>
        <DataGrid
          autoHeight
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
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
                // id: false,
                sectionId: false,
                createdAt: false,
                updatedAt: false,
              },
            },
          }}
          sx={{ mt: 2 }}
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
