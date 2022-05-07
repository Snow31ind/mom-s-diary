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
import CustomPostGridToolbar from '../../CustomPostGridToolbar/CustomPostGridToolbar';
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
      headerName: 'Mã bài học',
      renderHeader: () => <strong>Mã bài học</strong>,
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
      headerName: 'ID danh mục',
      flex: 1,
      renderHeader: () => <strong>ID danh mục</strong>,
    },
    {
      field: 'sectionTitle',
      headerName: 'Loại danh mục',
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
      headerName: 'Tên',
      flex: 1,
      description: 'Post name',
      renderHeader: () => <strong>Tên</strong>,
    },
    {
      field: 'desc',
      headerName: 'Miêu tả',
      flex: 1,
      description: 'Post description',
      renderHeader: () => <strong>Miêu tả</strong>,
    },
    {
      field: 'content',
      headerName: 'Nội dung',
      flex: 1,
      description: 'Post content',
      renderHeader: () => <strong>Nội dung</strong>,
    },
    {
      field: 'createdAt',
      headerName: 'Ngày khởi tạo',
      type: 'date',
      flex: 1,
      description: 'Post publish day',
      renderHeader: () => <strong>Ngày khởi tạo</strong>,
      valueFormatter: (params) =>
        `${new Date(params.value).toLocaleDateString()}`,
    },
    {
      field: 'updatedAt',
      headerName: 'Lần cập nhật gần nhất',
      type: 'date',
      flex: 1,
      description: 'Post last update day',
      renderHeader: () => <strong>Lần cập nhật gần nhất</strong>,
      valueFormatter: (params) =>
        `${new Date(params.value).toLocaleDateString()}`,
    },
    {
      field: 'actions',
      headerName: 'Thao tác',
      type: 'actions',
      flex: 1,
      renderHeader: () => <strong>Thao tác</strong>,
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
                  'Xóa bài viết',
                  'Bạn chắc chắn xóa bài viết này?',
                  'Quay lại',
                  'Tiếp tục',
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
        <DataGrid
          autoHeight
          rowsPerPageOptions={[10, 25, 100]}
          loading={loading}
          columns={columns}
          rows={posts}
          components={{
            LoadingOverlay: LinearProgress,
            NoRowsOverlay: CustomNoRowsOverlay,
            Toolbar: CustomPostGridToolbar(createNewPostHandler),
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
          localeText={{
            noRowsLabel: 'Dữ liệu không tồn tại',
            noResultsOverlayLabel: 'Không tồn tại dữ liệu cần tìm kiếm',
            errorOverlayDefaultLabel: 'Lỗi',

            toolbarColumns: 'Ẩn/hiện cột',
            toolbarColumnsLabel: 'Ẩn/hiện cột',
            columnsPanelTextFieldLabel: 'Tìm kiếm cột',
            columnsPanelTextFieldPlaceholder: 'Tên cột',
            columnsPanelDragIconLabel: 'Reorder column',
            columnsPanelShowAllButton: 'Hiện tất cả',
            columnsPanelHideAllButton: 'Che tất cả',

            toolbarFilters: 'Lọc',
            toolbarFiltersLabel: 'Lọc',
            toolbarFiltersTooltipActive: (count) =>
              count !== 1 ? `${count} bộ lọc` : `${count} bộ lọc`,

            toolbarDensity: 'Kiêu hiện thị',
            toolbarDensityLabel: 'Kiêu hiện thị',
            toolbarDensityCompact: 'Hẹp',
            toolbarDensityStandard: 'Tương đối',
            toolbarDensityComfortable: 'Rộng',

            toolbarExport: 'Xuất',
            toolbarExportLabel: 'Xuất',
            toolbarExportCSV: 'Format CSV',
            toolbarExportPrint: 'In',

            filterPanelAddFilter: 'Thêm bộ lọc',
            filterPanelDeleteIconLabel: 'Xóa',
            filterPanelLinkOperator: 'Quan hệ logic',
            filterPanelOperators: 'Quan hệ', // TODO v6: rename to filterPanelOperator
            filterPanelOperatorAnd: 'Và',
            filterPanelOperatorOr: 'Hoặc',
            filterPanelColumns: 'Cột',
            filterPanelInputLabel: 'Giá trị',
            filterPanelInputPlaceholder: 'Giá trị để lọc',

            filterOperatorContains: 'Chứa',
            filterOperatorEquals: 'Bằng',
            filterOperatorStartsWith: 'Băt đầu với',
            filterOperatorEndsWith: 'Kết thúc với',
            filterOperatorIs: 'Là',
            filterOperatorNot: 'Không phải là',
            filterOperatorAfter: 'Sau khi',
            filterOperatorOnOrAfter: 'Kể từ khi',
            filterOperatorBefore: 'Trước khi',
            filterOperatorOnOrBefore: 'Kể từ trước khi',
            filterOperatorIsEmpty: 'Rỗng',
            filterOperatorIsNotEmpty: 'Không rỗng',
            filterOperatorIsAnyOf: 'Là bất kì',

            columnMenuLabel: 'Menu',
            columnMenuShowColumns: 'Bật ẩn/hiện cột',
            columnMenuFilter: 'Bật bộ lọc',
            columnMenuHideColumn: 'Ẩn',
            columnMenuUnsort: 'Không sắp xếp',
            columnMenuSortAsc: 'Sắp xếp tăng dần',
            columnMenuSortDesc: 'Sắp xếp giảm dần',

            columnHeaderSortIconLabel: 'Sắp xếp',

            footerRowSelected: (count) =>
              count !== 1
                ? `${count.toLocaleString()} dòng được chọn`
                : `${count.toLocaleString()} dòng được chọn`,
          }}
          sx={{ mt: 1 }}
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
