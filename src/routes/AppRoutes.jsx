import React from 'react';
import Home from '../pages/Home/Home';
import SectionDetail from '../pages/SectionDetail/SectionDetail';
import { Routes, Route, Navigate } from 'react-router-dom';
import PostDetail from '../pages/PostDetail/PostDetail';
import Admin from '../pages/Admin/Admin';
import Login from '../modals/Login';
import CreateSection from '../modals/CreateSection';
import NotFound from '../pages/NotFound/NotFound';
import App from '../App';

const routes = [
  {
    path: '/',
    element: <Navigate to="/handbook" replace={true} />,
  },
  {
    path: '/handbook',
    element: <Home />,
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
  {
    path: '*',
    element: <NotFound />,
  },
];

const AppRoutes = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} {...route} />
      ))}
      {/* <Route path="/" element={<Navigate to="/handbook" />} />

      <Route path="/handbook" element={<Home />}>
        <Route path=":sectionSlug" element={<SectionDetail />}>
          <Route path=":postSlug" element={<PostDetail />} />
        </Route>
      </Route>

      <Route path="/admin" element={<Admin />}>
        <Route path=":selectedSection" element={<Admin />} />
      </Route>

      <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default AppRoutes;
