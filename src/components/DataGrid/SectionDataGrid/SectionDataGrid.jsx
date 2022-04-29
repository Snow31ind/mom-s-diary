import React from 'react';
import { useSelector } from 'react-redux';
import { selectSections } from '../../../features/sections/selector';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import { Box, LinearProgress } from '@mui/material';
import moment from 'moment';
import { Delete, Edit } from '@mui/icons-material';

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
          showInMenu
          icon={<Delete />}
          onClick={() => {}}
          label="Delete"
        />,
        <GridActionsCellItem icon={<Edit />} onClick={() => {}} label="Edit" />,
      ];
    },
  },
];

const SectionDataGrid = () => {
  const sections = useSelector(selectSections());

  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        autoHeight
        hideFooter
        // checkboxSelection
        // loading={}
        columns={columns}
        rows={sections}
        components={{ Toolbar: GridToolbar, LoadingOverlay: LinearProgress }}
        initialState={{
          columns: {
            columnVisibilityModel: {
              id: false,
              createdAt: false,
              updatedAt: false,
            },
          },
        }}
        // experimentalFeatures={{
        //   newEditingApi: true,
        // }}
        // getRowId={(row) => row.id}
        // onCellEditStart={(params, event, details) => {
        //   console.log(params.value);
        //   console.log('onCellEditStart');
        // }}
        // onCellEditStop={(params, event, details) => {
        //   console.log(params.value);
        //   console.log('onCellEditEnd');
        // }}
        // onRowEditStart={(params, event, details) => {
        //   console.log(params.value);
        //   console.log('onRowEditStart');
        // }}
        // onRowEditStop={(params, event, details) => {
        //   console.log(params.value);
        //   console.log('onRowEditEnd');
        // }}
      />
    </Box>
  );
};

export default SectionDataGrid;
