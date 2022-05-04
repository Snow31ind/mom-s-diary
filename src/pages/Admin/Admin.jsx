import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Layout from '../../components/Layouts/Layout';
import { DataGrid } from '@mui/x-data-grid';
import SectionDataGrid from '../../components/DataGrid/SectionDataGrid/SectionDataGrid';
import PostDataGrid from '../../components/DataGrid/PostDataGrid/PostDataGrid';
import { selectIsAdmin } from '../../features/user/selector';
import SideBar from '../../components/SideBar/SideBar';

const Admin = () => {
  const navigate = useNavigate();
  const isAdmin = useSelector(selectIsAdmin());
  const { selectedSection } = useParams();

  useEffect(() => {
    if (!isAdmin) {
      navigate('/handbook', { replace: true });
    }
  }, [isAdmin]);

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
    <Layout fullWidth>
      <Grid container spacing={1}>
        <Grid item sm={3} md={3} xl={2}>
          <SideBar selectedSection={selectedSection} />
        </Grid>
        <Grid item sm={9} md={9} xl={10}>
          {renderComponent(selectedSection)}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Admin;
