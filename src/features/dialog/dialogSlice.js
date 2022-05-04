import { createSlice } from '@reduxjs/toolkit';

export const createDialogState = (
  title,
  message,
  onCancelText,
  onProcessText,
  onProcess
) => {
  return {
    title,
    message,
    onCancelText,
    onProcessText,
    onProcess,
  };
};

const initialState = {
  open: false,
  title: '',
  message: '',
  onCancelText: '',
  onProcessText: '',
  onProcess: () => {},
};

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    setDialog: (state, action) => {
      const { open, title, message, onCancelText, onProcessText, onProcess } =
        action.payload;

      state.open = open;
      state.title = title;
      state.message = message;
      state.onCancelText = onCancelText;
      state.onProcessText = onProcessText;
      state.onProcess = onProcess;
    },
    resetDialog: (state) => {
      state = initialState;
    },
    openDialog: (state) => {
      state.open = true;
    },
    closeDialog: (state) => {
      state.open = false;
    },
    clearDialog: (state) => {
      state.title = '';
      state.message = '';
      state.onCancelText = '';
      state.onProcessText = '';
      state.onProcess = () => {};
    },
  },
});

export const {
  closeDialog,
  openDialog,
  setDialog,
  resetDialog,
  onProcessWithDialog,
  clearDialog,
} = dialogSlice.actions;

export default dialogSlice.reducer;
