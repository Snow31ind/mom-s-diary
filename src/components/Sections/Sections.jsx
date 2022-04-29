import { Add } from '@mui/icons-material';
import { Box, Modal, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectLoading,
  selectSections,
} from '../../features/sections/selector';
import { selectIsAdmin } from '../../features/user/selector';
import GrowthBox from '../GrowthBox/GrowthBox';
import LoadingSection from '../Loading/LoadingSection';
import SectionForm from '../SectionForm/SectionForm';
import SquareIconButton from '../Styled/SquareIconButton';
import Section from './Section/Section';

const Sections = () => {
  const sections = useSelector(selectSections());
  const loading = useSelector(selectLoading());
  const isAdmin = useSelector(selectIsAdmin());

  const [openSectionForm, setOpenSectionForm] = useState(false);

  useEffect(() => {
    console.log('Rerendering component Sections');
  }, []);

  return (
    <>
      <Box>
        {isAdmin && (
          <Stack direction="row">
            <GrowthBox />
            <SquareIconButton
              variant="contained"
              size="small"
              color="inherit"
              onClick={() => setOpenSectionForm(true)}
            >
              <Add />
            </SquareIconButton>
          </Stack>
        )}
        {loading ? (
          <>
            {/* Loading Posts */}
            {Array(1, 2, 3).map((e) => (
              <LoadingSection key={e} />
            ))}
          </>
        ) : (
          <>
            {/* Posts loaded */}
            {sections.map((section) => (
              <Section key={section.title} section={section} />
            ))}
          </>
        )}
      </Box>

      <Modal open={openSectionForm} onClose={() => setOpenSectionForm(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <SectionForm
            closeSectionFormModalHandler={() => setOpenSectionForm(false)}
          />
        </Box>
      </Modal>
    </>
  );
};

export default Sections;
