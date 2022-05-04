import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog } from '../../features/dialog/dialogSlice';

const CustomDialog = () => {
  const dispatch = useDispatch();
  const { open, title, message, onCancelText, onProcessText } = useSelector(
    (state) => state.dialog
  );

  const closeHandler = () => {
    dispatch(closeDialog());
  };

  const processHandler = () => {
    console.log('Processed');
    // onProcess();
    dispatch(closeDialog());
  };

  return (
    <Dialog open={open} onClose={closeHandler}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="warning" variant="outlined" onClick={closeHandler}>
          {onCancelText}
        </Button>

        <Button color="primary" variant="outlined" onClick={processHandler}>
          {onProcessText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
