import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ActionButtons({ onEdit, onDelete }) {
  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Tooltip title="Edit" arrow>
        <IconButton
          onClick={onEdit}
          size="small"
          sx={{
            color: 'var(--main-color2)',
            '&:hover': {
              backgroundColor: 'rgba(13, 92, 145, 0.04)',
            },
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete" arrow>
        <IconButton
          onClick={onDelete}
          size="small"
          sx={{
            color: '#d32f2f',
            '&:hover': {
              backgroundColor: 'rgba(211, 47, 47, 0.04)',
            },
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
} 