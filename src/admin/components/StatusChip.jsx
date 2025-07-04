import React from 'react';
import { Chip } from '@mui/material';

const statusColors = {
  active: {
    backgroundColor: 'rgba(46, 125, 50, 0.08)',
    color: '#2e7d32',
  },
  inactive: {
    backgroundColor: 'rgba(211, 47, 47, 0.08)',
    color: '#d32f2f',
  },
  pending: {
    backgroundColor: 'rgba(237, 108, 2, 0.08)',
    color: '#ed6c02',
  },
  completed: {
    backgroundColor: 'rgba(13, 92, 145, 0.08)',
    color: 'var(--main-color2)',
  },
};

export default function StatusChip({ status }) {
  const color = statusColors[status.toLowerCase()] || {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    color: 'rgba(0, 0, 0, 0.87)',
  };

  return (
    <Chip
      label={status}
      size="small"
      sx={{
        ...color,
        borderRadius: '6px',
        fontWeight: 500,
        textTransform: 'capitalize',
      }}
    />
  );
} 