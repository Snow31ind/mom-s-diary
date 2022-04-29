import React from 'react';
import Home from '../pages/Home/Home';
import SectionDetail from '../pages/SectionDetail/SectionDetail';
import { Routes, Route, Navigate } from 'react-router-dom';
import PostDetail from '../pages/PostDetail/PostDetail';
import Admin from '../pages/Admin/Admin';

const routes = [
  {
    path: '/',
    element: <Navigate to="/handbook" replace={true} />,
    caseSensitive: true,
  },
  {
    path: '/handbook',
    element: <Home />,
    caseSensitive: true,
  },
  {
    path: '/handbook/:sectionSlug',
    element: <SectionDetail />,
  },
  {
    path: '/handbook/:sectionSlug/:postSlug',
    element: <PostDetail />,
  },
  {
    path: '/admin',
    element: <Navigate to="/admin/sections" />,
  },
  {
    path: '/admin/:selectedSection',
    element: <Admin />,
  },
];

const AppRoutes = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} {...route} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
