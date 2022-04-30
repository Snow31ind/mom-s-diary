import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSections } from '../../../features/sections/selector';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import { Box, LinearProgress, Modal, Stack, styled } from '@mui/material';
import moment from 'moment';
import { Add, Delete, Edit } from '@mui/icons-material';
import { selectLoading } from '../../../features/sections/selector';
import SquareIconButton from '../../Styled/SquareIconButton';
import GrowthBox from '../../GrowthBox/GrowthBox';
import { useNavigate } from 'react-router-dom';
import CreateSection from '../../../modals/CreateSection';
import { removeSection } from '../../../thunks/sections';
import EditSection from '../../../modals/EditSection';
import CustomNoRowsOverlay from '../../Styled/CustomNoRowsOverlay';
import { setPost, setSection } from '../../../features/sections/sectionsSlice';
import CustomLinearProgress from '../../Styled/CustomLinearProgress';
import SectionForm from '../../SectionForm/SectionForm';

const SectionDataGrid = () => {
  const dispatch = useDispatch();

  const sections = useSelector(selectSections());
  const loading = useSelector(selectLoading());

  const navigate = useNavigate();

  const [sectionId, setSectionId] = useState('');
  const [openCreateSectionForm, setOpenCreateSectionForm] = useState(false);
  const [openEditSectionForm, setOpenEditSectionForm] = useState(false);
  const [openSectionForm, setOpenSectionForm] = useState({
    status: false,
    action: '',
  });

  const columns = [
    {
      field: 'id',
      // headerName: 'Section ID',
      flex: 1,
      description: "Section's id",
      valueFormatter: (params) => `${params.value}`,
      renderHeader: (params) => <strong>{'ID'}</strong>,
    },
    {
      field: 'title',
      // headerName: 'Section title',
      flex: 1,
      description: "Section's title",
      // editable: true,
      valueFormatter: (params) => `${params.value}`,
      renderHeader: (params) => <strong>{'Title'}</strong>,
    },
    {
      field: 'count',
      // headerName: 'Number of posts',
      flex: 1,
      type: 'number',
      valueGetter: (params) => `${params.row.posts.length}`,
      renderHeader: (params) => <strong>{'Posts'}</strong>,
    },
    {
      field: 'createdAt',
      // headerName: 'Published',
      flex: 1,
      type: 'date',
      valueFormatter: (params) =>
        `${new Date(params.value).toLocaleDateString()}`,
      renderHeader: (params) => <strong>{'Published'}</strong>,
    },
    {
      field: 'updatedAt',
      // headerName: 'Last updated',
      flex: 1,
      type: 'date',
      valueFormatter: (params) =>
        `${new Date(params.value).toLocaleDateString()}`,
      renderHeader: (params) => <strong>{'Last updated'}</strong>,
    },
    {
      field: 'actions',
      flex: 1,
      type: 'actions',
      renderHeader: (params) => <strong>{'Actions'}</strong>,
      getActions: (params) => {
        return [
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
          />,
          <GridActionsCellItem
            showInMenu
            icon={<Delete />}
            onClick={() => {
              const id = params.id;
              dispatch(removeSection({ id }));
            }}
            label="Delete"
          />,
        ];
      },
    },
  ];

  const createSectionHandler = (e) => {
    setOpenSectionForm({ status: true, action: 'create' });
  };

  return (
    <React.Fragment>
      <Box sx={{ flex: 1 }}>
        {/* Admin tools */}
        <Stack direction="row">
          <GrowthBox />

          <SquareIconButton size="small" onClick={createSectionHandler}>
            <Add />
          </SquareIconButton>
        </Stack>

        <DataGrid
          autoHeight
          hideFooter
          // checkboxSelection
          loading={loading}
          columns={columns}
          rows={sections}
          components={{
            Toolbar: GridToolbar,
            LoadingOverlay: CustomLinearProgress,
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
          onSelectionModelChange={(selectionModel, details) => {
            setSectionId(selectionModel);
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
