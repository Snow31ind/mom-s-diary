import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Dashboard from '../../components/Dashboard/Dashboard';
import Layout from '../../components/Layouts/Layout';
import { DataGrid } from '@mui/x-data-grid';
import SectionDataGrid from '../../components/DataGrid/SectionDataGrid/SectionDataGrid';
import PostDataGrid from '../../components/DataGrid/PostDataGrid/PostDataGrid';
import UserDataGrid from '../../components/DataGrid/UserDataGrid/UserDataGrid';
import { selectIsAdmin } from '../../features/user/selector';

const Admin = () => {
  const navigate = useNavigate();
  const isAdmin = useSelector(selectIsAdmin());
  const { selectedSection } = useParams();

  useEffect(() => {
    if (!isAdmin) {
      navigate('/handbook', { replace: true });
    }
  }, [isAdmin]);

  const func = () => {
    return <Typography>Hi</Typography>;
  };

  const renderComponent = (selectedSection) => {
    if (selectedSection === 'sections') {
      return <SectionDataGrid />;
    }

    if (selectedSection === 'posts') {
      return <PostDataGrid />;
    }

    if (selectedSection === 'users') {
      return <UserDataGrid />;
    }
  };

  return (
    <Layout>
      <Box sx={{ flexDirection: 'row' }}>
        <Grid container spacing={2}>
          <Grid item sm={3} md={3} xl={3}>
            <Dashboard selectedSection={selectedSection} />
          </Grid>
          <Grid item sm={9} md={9} xl={9}>
            {renderComponent(selectedSection)}
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Admin;
