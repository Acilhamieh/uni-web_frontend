import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function FormDialog({
  open,
  onClose,
  title,
  children,
  onSubmit,
  submitText = 'Save',
  maxWidth = 'sm',
  loading = false,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          backgroundColor: '#fff',
        },
      }}
    >
      <DialogTitle sx={{ 
        m: 0, 
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
      }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: '1.1rem', sm: '1.2rem' },
            fontWeight: 600,
            color: 'var(--main-color2)',
          }}
        >
          {title}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: 'var(--main-color2)',
            '&:hover': {
              backgroundColor: 'rgba(13, 92, 145, 0.04)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 2 }}>
        <Box component="form" onSubmit={onSubmit} noValidate>
          {children}
        </Box>
      </DialogContent>
      <DialogActions sx={{ 
        p: 2,
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
      }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderRadius: '8px',
            textTransform: 'none',
            minWidth: '100px',
            borderColor: 'rgba(0, 0, 0, 0.12)',
            color: 'var(--main-color2)',
            '&:hover': {
              borderColor: 'var(--main-color2)',
              backgroundColor: 'rgba(13, 92, 145, 0.04)',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          variant="contained"
          disabled={loading}
          sx={{
            borderRadius: '8px',
            textTransform: 'none',
            minWidth: '100px',
            backgroundColor: 'var(--main-color2)',
            '&:hover': {
              backgroundColor: 'var(--main-color2)',
              opacity: 0.9,
            },
          }}
        >
          {loading ? 'Saving...' : submitText}
        </Button>
      </DialogActions>
    </Dialog>
  );
} 