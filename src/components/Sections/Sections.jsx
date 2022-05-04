import { Add } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogTitle,
  Fab,
  Modal,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
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
import { useNavigate } from 'react-router-dom';

const Sections = (props) => {
  const sections = useSelector(selectSections());
  const loading = useSelector(selectLoading());
  const isAdmin = useSelector(selectIsAdmin());

  const [openSectionForm, setOpenSectionForm] = useState(false);

  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Box>
        {isAdmin && (
          <Stack direction="row">
            <GrowthBox />
            <Tooltip title="New section">
              <SquareIconButton
                variant="contained"
                size="small"
                color="success"
                onClick={() => setOpenSectionForm(true)}
              >
                <Add />
              </SquareIconButton>
            </Tooltip>
          </Stack>
        )}

        {loading && Array(1, 2, 3).map((e) => <LoadingSection key={e} />)}
        {!loading &&
          sections.map((section, index) => (
            <Section
              key={section.title}
              section={section}
              isLast={index === sections.length - 1}
            />
          ))}
      </Box>

      {/* Section form */}
      <Modal open={openSectionForm} onClose={() => setOpenSectionForm(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '35%',
            left: '50%',
            transform: 'translate(-50%, -35%)',
            width: 800,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <SectionForm
            closeHandler={() => setOpenSectionForm(false)}
            action="create"
          />
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default Sections;
