import { DynamicFeed, Person } from '@mui/icons-material';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const Dashboard = ({ selectedSection }) => {
  const navigate = useNavigate();

  const sections = [
    {
      name: 'Sections',
      label: 'sections',
      icon: <DynamicFeed />,
      onClick: () => navigate('/admin/sections'),
    },
    {
      name: 'Posts',
      label: 'posts',
      icon: <DynamicFeed />,
      onClick: () => navigate('/admin/posts'),
    },
  ];

  return (
    <List>
      {sections.map((section) => (
        <ListItemButton
          key={section.name}
          onClick={section.onClick}
          selected={selectedSection === section.label}
        >
          <ListItemIcon>{section.icon}</ListItemIcon>
          <ListItemText primary={section.name} />
        </ListItemButton>
      ))}
    </List>
  );
};

export default Dashboard;
