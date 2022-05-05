import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSections } from '../../../features/sections/selector';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Link as MuiLink,
  Modal,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { Add, Delete, Edit, Person } from '@mui/icons-material';
import { selectLoading } from '../../../features/sections/selector';
import SquareIconButton from '../../Styled/SquareIconButton';
import GrowthBox from '../../GrowthBox/GrowthBox';
import { Link, useNavigate } from 'react-router-dom';
import { removeSection } from '../../../thunks/sections';
import CustomNoRowsOverlay from '../../Styled/CustomNoRowsOverlay';
import { setSection } from '../../../features/sections/sectionsSlice';
import CustomLinearProgress from '../../Styled/CustomLinearProgress';
import SectionForm from '../../SectionForm/SectionForm';
import { slugify } from '../../../utils/helpers';
import {
  createDialogState,
  openDialog,
  setDialog,
} from '../../../features/dialog/dialogSlice';
import CustomGridToolbar from '../../CustomGridToolbar/CustomGridToolbar';

const SectionDataGrid = () => {
  const dispatch = useDispatch();

  const sections = useSelector(selectSections());
  const loading = useSelector(selectLoading());

  const navigate = useNavigate();

  const [openSectionForm, setOpenSectionForm] = useState({
    status: false,
    action: '',
  });

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1,
      // valueFormatter: (params) => `${params.value}`,
      renderHeader: (params) => <strong>{'ID'}</strong>,
      renderCell: (params) => (
        <Link to={`/handbook/${slugify(params.row.title)}`}>
          {params.value}
        </Link>
      ),
    },
    {
      field: 'title',
      headerName: 'Tiêu đề',
      flex: 1,
      description: 'Tiêu đề danh mục',
      // editable: true,
      renderHeader: (params) => <strong>{'Tiêu đề'}</strong>,
      valueFormatter: (params) => `${params.value}`,
    },
    {
      field: 'count',
      headerName: 'Số lượng bài viết',
      flex: 1,
      type: 'number',
      valueGetter: (params) => `${params.row.posts.length}`,
      renderHeader: (params) => <strong>{'Số lượng bài viết'}</strong>,
    },
    {
      field: 'createdAt',
      headerName: 'Ngày khởi tạo',
      flex: 1,
      type: 'date',
      valueFormatter: (params) =>
        `${new Date(params.value).toLocaleDateString()}`,
      renderHeader: (params) => <strong>{'Ngày khởi tạo'}</strong>,
    },
    {
      field: 'updatedAt',
      headerName: 'Lần cập nhật gần nhất',
      flex: 1,
      type: 'date',
      valueFormatter: (params) => `${new Date(params.value).toLocaleString()}`,
      renderHeader: (params) => <strong>{'Lần cập nhật gần nhất'}</strong>,
    },
    {
      field: 'actions',
      headerName: 'Thao tác',
      renderHeader: (params) => <strong>{'Thao tác'}</strong>,
      flex: 1,
      type: 'actions',
      getActions: (params) => {
        return [
          {
            isVisible: true,
            component: (
              <GridActionsCellItem
                label="Edit"
                icon={<Edit />}
                onClick={() => {
                  const section = { id: params.id, title: params.row.title };
                  // console.log(section);
                  dispatch(setSection(section));
                  setOpenSectionForm({
                    status: true,
                    action: 'update',
                  });
                }}
              />
            ),
          },
          {
            isVisible: !sections.find((section) => section.id === params.id)
              .posts.length,
            component: (
              <GridActionsCellItem
                showInMenu
                icon={<Delete />}
                onClick={() => {
                  const id = params.id;

                  dispatch(
                    setDialog(
                      createDialogState(
                        'Section removal',
                        'Are you sure you want to remove this section?',
                        'Cancel',
                        'Remove',
                        () => dispatch(removeSection({ id }))
                      )
                    )
                  );

                  dispatch(openDialog());
                }}
                label="Xóa"
              />
            ),
          },
        ]
          .filter(({ isVisible, component }) => isVisible)
          .map((action) => action.component);
      },
    },
  ];

  const createSectionHandler = (e) => {
    setOpenSectionForm({ status: true, action: 'create' });
  };

  return (
    <React.Fragment>
      <Box>
        {/* Admin tools */}
        <Stack direction="row">
          <GrowthBox />

          <Tooltip title="Tạo danh mục">
            <SquareIconButton size="small" onClick={createSectionHandler}>
              <Add />
            </SquareIconButton>
          </Tooltip>
        </Stack>

        <DataGrid
          autoHeight
          pagination
          rowsPerPageOptions={[10, 25, 100]}
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
          loading={loading}
          columns={columns}
          rows={sections}
          components={{
            Toolbar: CustomGridToolbar,
            LoadingOverlay: CustomLinearProgress,
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
          componentsProps={{}}
          initialState={{
            columns: {
              columnVisibilityModel: {
                // id: false,
                createdAt: false,
                updatedAt: false,
              },
            },
          }}
          sx={{ mt: 2 }}
        />
      </Box>

      {/* Modal for CURD sections */}
      <Modal
        open={openSectionForm.status}
        onClose={() => setOpenSectionForm({ status: false, action: '' })}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '35%',
            left: '50%',
            transform: 'translate(-50%, -35%)',
            width: 600,
            // minHeight: '60vh',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <SectionForm
            closeHandler={() =>
              setOpenSectionForm({ status: false, action: '' })
            }
            action={openSectionForm.action}
          />
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default SectionDataGrid;
