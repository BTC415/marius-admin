// ==============================|| OVERRIDES - DIALOG CONTENT TEXT ||============================== //

export default function DialogContentText(theme) {
  return {
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          color: theme.palette.text.primary
        }
      }
    }
  };
}
