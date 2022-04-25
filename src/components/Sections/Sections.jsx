import { Box, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import Section from './Section/Section';

const Sections = () => {
  const { sections } = useSelector((state) => state.sections);

  return (
    <Box sx={{}}>
      {sections.map((section) => (
        <Section key={section.title} section={section} />
      ))}
    </Box>
  );
};

export default Sections;
