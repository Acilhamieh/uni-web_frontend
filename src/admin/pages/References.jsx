import React, { useState, useEffect } from 'react';
import { Box, Button, Chip, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ArticleIcon from '@mui/icons-material/Article';
import LinkIcon from '@mui/icons-material/Link';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import DataTable from '../components/DataTable';
import FormDialog from '../components/FormDialog';
import FormField from '../components/FormField';
import ActionButtons from '../components/ActionButtons';
import { useDataFetching } from '../hooks/useDataFetching';
import { useFormHandling } from '../hooks/useFormHandling';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const referencesUrl = `${backendUrl}/api/references/`;

const coursesUrl = `${backendUrl}/api/courses/`;

const REFERENCE_TYPES = {
  'textbook': { color: '#2196f3', icon: MenuBookIcon },
  'article': { color: '#4caf50', icon: ArticleIcon },
  'online': { color: '#ff9800', icon: LinkIcon },
};

const COLUMNS = [
  { field: 'id', headerName: 'ID', width: 90, sortable: true },
  { 
    field: 'title', 
    headerName: 'Title', 
    width: 300, 
    sortable: true,
    renderCell: (row) => {
      const TypeIcon = REFERENCE_TYPES[row.type].icon;
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TypeIcon sx={{ color: REFERENCE_TYPES[row.type].color }} />
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
          backgroundColor: `${REFERENCE_TYPES[row.type].color}20`,
          color: REFERENCE_TYPES[row.type].color,
          fontWeight: 500,
        }}
      />
    )
  },
  { field: 'author', headerName: 'Author', width: 200, sortable: true },
  { field: 'courseCode', headerName: 'Course Code', width: 200, sortable: true },
  { 
    field: 'year', 
    headerName: 'Year', 
    width: 100, 
    sortable: true,
    type: 'number'
  },
  { 
    field: 'status', 
    headerName: 'Status', 
    width: 130, 
    sortable: true,
    renderCell: (row) => (
      <Chip
        label={row.status}
        size="small"
        sx={{
          backgroundColor: row.status === 'available' ? 'rgba(46, 125, 50, 0.1)' : 'rgba(211, 47, 47, 0.1)',
          color: row.status === 'available' ? '#2e7d32' : '#d32f2f',
          fontWeight: 500,
        }}
      />
    )
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 120,
    sortable: false,
    renderCell: (row) => (
      <ActionButtons
        onEdit={() => handleOpen('edit', row)}
        onDelete={() => handleDelete(row.id, referencesUrl)}
      />
    )
  }
];

const FORM_FIELDS = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { 
    name: 'type', 
    label: 'Type', 
    type: 'select', 
    required: true,
    options: ['textBook', 'playlist', 'documentation']
  },
  { name: 'author', label: 'Author', type: 'text', required: true },
  { 
    name: 'courseCode', 
    label: 'CourseCode', 
    type: 'select', 
    required: true,
    options: [], // Will be populated with course codes
    helperText: 'Select the course for this reference'
  },
  { name: 'year', label: 'Year', type: 'number', required: true },
  { 
    name: 'description', 
    label: 'Description', 
    type: 'text', 
    required: true,
    multiline: true,
    rows: 3
  },
  { name: 'url', label: 'URL', type: 'text', required: false },
  { 
    name: 'status', 
    label: 'Status', 
    type: 'select', 
    required: true,
    options: ['available', 'unavailable']
  },
];

export default function References() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');
  const [courses, setCourses] = useState([]);

  const {
    data,
    loading,
    error,
    handleCreate,
    handleUpdate,
    handleDelete
  } = useDataFetching(referencesUrl);

  const {
    data: coursesData,
    loading: coursesLoading,
    error: coursesError
  } = useDataFetching(coursesUrl);

  useEffect(() => {
    if (coursesData) {
      // Update the course options in FORM_FIELDS with just the course codes
      const courseField = FORM_FIELDS.find(field => field.name === 'courseCode');
      if (courseField) {
        courseField.options = coursesData.map(course => course.code);
      }
      setCourses(coursesData);
    }
  }, [coursesData]);

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
    onSubmit: (data, mode) => mode === 'edit' ? handleUpdate(data, referencesUrl) : handleCreate(data, referencesUrl)
  });

  // Filter and sort data
  const filteredData = (data || []).filter(row =>
    Object.values(row).some(value =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const sortedData = [...filteredData].sort((a, b) => {
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
      setSortDirection('asc');
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (error || coursesError) return (
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
      {error && <Typography variant="caption">Reference Data Error: {error.message || 'Unknown error'}</Typography>}
      {coursesError && <Typography variant="caption">Course Data Error: {coursesError.message || 'Unknown error'}</Typography>}
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
          Add Reference
        </Button>
      </Box>
      <DataTable
        title="References"
        rows={sortedData}
        columns={COLUMNS}
        loading={loading || coursesLoading}
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
        title={editMode ? 'Edit Reference' : 'Add Reference'}
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