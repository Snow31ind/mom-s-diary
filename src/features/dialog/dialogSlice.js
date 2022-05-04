import { createSlice } from '@reduxjs/toolkit';

export const createDialogState = (
  open,
  title,
  message,
  onCancelText,
  onProcessText
) => {
  return {
    open,
    title,
    message,
    onCancelText,
    onProcessText,
  };
};

const initialState = {
  open: false,
  title: '',
  message: '',
  onCancelText: '',
  onProcessText: '',
};

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    setDialog: (state, action) => {
      const { open, title, message, onCancelText, onProcessText } =
        action.payload;

      state.open = open;
      state.title = title;
      state.message = message;
      state.onCancelText = onCancelText;
      state.onProcessText = onProcessText;
    },
    resetDialog: (state) => {
      state = initialState;
    },
    openDialog: (state) => {
      state.open = true;
    },
    closeDialog: (state) => {
      state.open = false;
      state.title = '';
      state.message = '';
      state.onCancelText = '';
      state.onProcessText = '';
    },
    onProcessWithDialog: (state, action) => {
      const onProcess = action.payload;

      onProcess();
    },
  },
});

export const {
  closeDialog,
  openDialog,
  setDialog,
  resetDialog,
  onProcessWithDialog,
} = dialogSlice.actions;

export default dialogSlice.reducer;
