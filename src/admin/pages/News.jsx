import React, { useState } from 'react';
import { Box, Button, Chip, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import ImageIcon from '@mui/icons-material/Image';
import AddIcon from '@mui/icons-material/Add';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import EventIcon from '@mui/icons-material/Event';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import DataTable from '../components/DataTable';
import FormDialog from '../components/FormDialog';
import FormField from '../components/FormField';
import ActionButtons from '../components/ActionButtons';
import { useDataFetching } from '../hooks/useDataFetching';
import { useFormHandling } from '../hooks/useFormHandling';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const newsUrl = `${backendUrl}/api/news/`;

const NEWS_TYPES = {
  'announcement': { color: '#f44336', icon: AnnouncementIcon },
  'event': { color: '#4caf50', icon: EventIcon },
  'news': { color: '#2196f3', icon: NewspaperIcon },
};

const FORM_FIELDS = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  {
    name: 'type',
    label: 'Type',
    type: 'select',
    required: true,
    options: ['announcement', 'event', 'news']
  },
  { name: 'date', label: 'Date', type: 'date', required: true },
  { name: 'author', label: 'Author', type: 'text', required: true },
  {
    name: 'content',
    label: 'Content',
    type: 'text',
    required: true,
    multiline: true,
    rows: 4
  },
  { name: 'image', label: 'Image', type: 'file', required: false, accept: '.jpeg,.jpg,.png' },
];

export default function News() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');

  const {
    data,
    loading,
    error,
    handleCreate,
    handleUpdate,
    handleDelete
  } = useDataFetching(newsUrl);

  const COLUMNS = [
    { field: 'id', headerName: 'ID', width: 90, sortable: true },
    {
      field: 'title',
      headerName: 'Title',
      width: 300,
      sortable: true,
      renderCell: (row) => {
        const TypeIcon = NEWS_TYPES[row.type].icon;
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TypeIcon sx={{ color: NEWS_TYPES[row.type].color }} />
            {row.title}
          </Box>
        );
      }
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 130,
      sortable: true,
      renderCell: (row) => (
        <Chip
          label={row.type.charAt(0).toUpperCase() + row.type.slice(1)}
          size="small"
          sx={{
            backgroundColor: `${NEWS_TYPES[row.type].color}20`,
            color: NEWS_TYPES[row.type].color,
            fontWeight: 500,
          }}
        />
      )
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 150,
      sortable: true,
      renderCell: (row) => (
        <Typography variant="body2">
          {new Date(row.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </Typography>
      )
    },
    { field: 'author', headerName: 'Author', width: 180, sortable: true },
    {
      field: 'image_url',
      headerName: 'Image',
      width: 150,
      sortable: false,
      renderCell: (row) => (
        row.image_url ? (
          <Link
            href={row.image_url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: 'var(--main-color5)',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            <ImageIcon fontSize="small" />
            View Image
          </Link>
        ) : (
          <Chip
            label="No Image"
            size="small"
            sx={{
              backgroundColor: 'rgba(211, 47, 47, 0.1)',
              color: '#d32f2f',
            }}
          />
        )
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (row) => (
        <ActionButtons
          onEdit={() => handleOpen('edit', row)}
          onDelete={() => handleDelete(row.id, newsUrl)}
        />
      )
    }
  ];

  const {
    open,
    formData,
    editMode,
    handleOpen,
    handleClose,
    handleChange,
    handleSubmit,
    resetForm
  } = useFormHandling({
    initialData: {},
    onSubmit: async (data, mode) => {
      const processedData = { ...data, created_by: 1 };
      const formDataObj = new FormData();
      Object.entries(processedData).forEach(([key, value]) => {
        if (key === 'image' && value instanceof File) {
          const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
          if (!allowedTypes.includes(value.type)) {
            alert('Only .jpeg, .jpg, and .png files are allowed.');
            return;
          }
          formDataObj.append('image', value);
        } else {
          formDataObj.append(key, value);
        }
      });
      if (mode === 'edit' && data.id) {
        formDataObj.append('id', data.id);
      }
      return mode === 'edit'
        ? handleUpdate(formDataObj, newsUrl)
        : handleCreate(formDataObj, newsUrl);
    }
  });

  // Filter and sort data
  const filteredData = (data || []).filter(row =>
    Object.values(row).some(value =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === 'date') {
      return sortDirection === 'asc'
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    }
    if (sortDirection === 'asc') {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    }
    return a[sortBy] < b[sortBy] ? 1 : -1;
  });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('desc');
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (error) return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh', // Adjust as needed for centering
        color: 'error.main',
        textAlign: 'center',
        p: 3
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 60, mb: 2 }} />
      <Typography variant="h6" component="h2" gutterBottom>
        Error loading data.
      </Typography>
      <Typography variant="body1">
        Please check your network connection or try again later.
      </Typography>
      {error && <Typography variant="caption">News Data Error: {error.message || 'Unknown error'}</Typography>}
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen('add')}
          sx={{
            backgroundColor: 'var(--main-color2)',
            borderRadius: '8px',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'var(--main-color2)',
              opacity: 0.9,
            },
          }}
        >
          Add News
        </Button>
      </Box>
      <DataTable
        title="News & Announcements"
        rows={sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)} //pagination
        columns={COLUMNS}
        loading={loading}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        totalRows={filteredData.length}
        searchText={searchText}
        onSearch={setSearchText}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSort={handleSort}
      />
      <FormDialog
        open={open}
        title={editMode ? 'Edit News' : 'Add News'}
        onClose={() => {
          handleClose();
          resetForm();
        }}
        onSubmit={handleSubmit}
      >
        {FORM_FIELDS.map((field) => (
          <FormField
            key={field.name}
            {...field}
            value={formData[field.name]}
            onChange={handleChange}
          />
        ))}
      </FormDialog>
    </Box>
  );
}