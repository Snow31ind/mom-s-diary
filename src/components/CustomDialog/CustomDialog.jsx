import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearDialog, closeDialog } from '../../features/dialog/dialogSlice';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CustomDialog = () => {
  const dispatch = useDispatch();
  const { open, title, message, onCancelText, onProcessText, onProcess } =
    useSelector((state) => state.dialog);

  const closeHandler = () => {
    dispatch(clearDialog());
    dispatch(closeDialog());
  };

  const processHandler = () => {
    console.log('Processed');
    onProcess();
    closeHandler();
  };

  return (
    <Dialog
      keepMounted
      open={open}
      onClose={closeHandler}
      TransitionComponent={Transition}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions disableSpacing sx={{ justifyContent: 'space-between' }}>
        <Button color="warning" variant="text" onClick={closeHandler}>
          {onCancelText}
        </Button>

        <Button color="primary" variant="text" onClick={processHandler}>
          {onProcessText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
