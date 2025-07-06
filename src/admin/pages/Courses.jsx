import React, { useState, useEffect } from 'react';
import { Box, Button, Chip, IconButton, Tooltip, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import DataTable from '../components/DataTable';
import FormDialog from '../components/FormDialog';
import FormField from '../components/FormField';
import ActionButtons from '../components/ActionButtons';
import { useDataFetching } from '../hooks/useDataFetching';
import { useFormHandling } from '../hooks/useFormHandling';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const coursesUrl = `${backendUrl}/api/courses/`;

const doctorsUrl = `${backendUrl}/api/doctors/`;

const FORM_FIELDS = [
  { name: 'code', label: 'Course Code', type: 'text', required: true },
  { name: 'name', label: 'Course Name', type: 'text', required: true },
  { name: 'credits', label: 'Credits', type: 'number', required: true },
  { name: 'hours_course', label: 'Course hours', type: 'number', required: true },
  { name: 'hours_td', label: 'TD hours', type: 'number', required: true },
  { name: 'hours_tp', label: 'TP hours', type: 'number', required: true },
  {
    name: 'instructor_id',
    label: 'Instructor',
    type: 'select',
    required: true,
    options: [], // This will be populated dynamically
    SelectProps: {
      MenuProps: {
        PaperProps: {
          style: {
            maxHeight: 224, // Show about 7-8 items at a time
            overflow: 'auto'
          }
        }
      }
    }
  },
  { name: 'classroom_url', label: 'Classroom', type: 'text', required: true },
  {
    name: 'level',
    label: 'Level',
    type: 'select',
    required: true,
    options: ['1', '2', '3']
  },
  {
    name: 'semester',
    label: 'Semester',
    type: 'select',
    required: true,
    options: ['1', '2', '3', '4', '5', '6']
  },
  {
    name: 'description',
    label: 'Description',
    type: 'text',
    required: true,
    multiline: true,
    rows: 4
  },
  {
    name: 'prequisties',
    label: 'Prerequisites',
    type: 'text',
    required: false,
    multiline: true,
    rows: 2
  },
  {
    name: 'objective',
    label: 'Course Objectives',
    type: 'text',
    required: true,
    multiline: true,
    rows: 3
  }
];

export default function Courses() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');
  const [doctors, setDoctors] = useState([]);

  const {
    data,
    loading,
    error,
    handleCreate,
    handleUpdate,
    handleDelete
  } = useDataFetching(coursesUrl);

  const {
    data: doctorsData,
    loading: doctorsLoading,
    error: doctorsError
  } = useDataFetching(doctorsUrl);

  useEffect(() => {
    if (doctorsData) {
      const instructorField = FORM_FIELDS.find(field => field.name === 'instructor_id');
      if (instructorField) {
        instructorField.options = doctorsData.map(doctor => ({
          value: doctor.id,
          label: doctor.full_name
        }));
      }
      setDoctors(doctorsData);
    }
  }, [doctorsData]);

  const COLUMNS = [
    { field: 'id', headerName: 'ID', width: 50, sortable: true },
    { field: 'code', headerName: 'Code', width: 120, sortable: true },
    { field: 'name', headerName: 'Name', width: 250, sortable: true },
    { field: 'credits', headerName: 'Credits', width: 100, sortable: true, type: 'number' },
    { field: 'hours_course', headerName: 'Course Hours', width: 100, sortable: true, type: 'number' },
    { field: 'hours_td', headerName: 'TD Hours', width: 100, sortable: true, type: 'number' },
    { field: 'hours_tp', headerName: 'TP Hours', width: 100, sortable: true, type: 'number' },
    { 
      field: 'instructor_id', 
      headerName: 'Instructor', 
      width: 180, 
      sortable: true,
      renderCell: (row) => {
        const doctor = doctors.find(d => d.id === row.instructor_id);
        return doctor ? doctor.full_name : '';
      }
    },
    { field: 'classroom_url', headerName: 'Classroom', width: 180, sortable: true },
    {
      field: 'level',
      headerName: 'Level',
      width: 130,
      sortable: true,
      renderCell: (row) => {
        const levelColors = {
          '1': { bg: 'rgba(25, 118, 210, 0.1)', color: '#1976d2' },
          '2': { bg: 'rgba(156, 39, 176, 0.1)', color: '#9c27b0' },
          '3': { bg: 'rgba(46, 125, 50, 0.1)', color: '#2e7d32' },
        };
        return (
          <Chip
            label={row.level}
            size="small"
            sx={{
              backgroundColor: levelColors[row.level]?.bg || 'rgba(97, 97, 97, 0.1)',
              color: levelColors[row.level]?.color || '#616161',
              fontWeight: 500,
              textTransform: 'capitalize',
            }}
          />
        );
      }
    },

    {
      field: 'semester',
      headerName: 'Semester',
      width: 130,
      sortable: true,
      renderCell: (row) => (
        <Chip
          label={row.semester}
          size="small"
          sx={{
            backgroundColor: 'rgba(13, 92, 145, 0.1)',
            color: 'var(--main-color2)',
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
          onDelete={() => {
            handleDelete(row.id, coursesUrl);
          }}
        />
      ),
    },
  ];

  const {
    open,
    formData,
    editMode,
    handleOpen,
    handleClose,
    handleChange,
    handleSubmit,
    resetForm,
    setFormData
  } = useFormHandling({
    initialData: {},

    onSubmit: (data, mode) => {
      // Always send instructor_id, never instructor_name
      const processedData = {
        ...data,
        created_by: 1,
      };
      // Remove instructor_name if present
      if ('instructor_name' in processedData) delete processedData.instructor_name;
      // Make sure to include the id when updating
      if (mode === 'edit' && data.id) {
        processedData.id = data.id;
      }
      return mode === 'edit' ? 
        handleUpdate(processedData, coursesUrl) : 
        handleCreate(processedData, coursesUrl);
    }
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

  if (error || doctorsError) return (
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
      {error && <Typography variant="caption">Course Data Error: {error.message || 'Unknown error'}</Typography>}
      {doctorsError && <Typography variant="caption">Doctor Data Error: {doctorsError.message || 'Unknown error'}</Typography>}
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
          Add Course
        </Button>
      </Box>
      <DataTable
        title="Courses"
        rows={sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
        columns={COLUMNS}
        loading={loading || doctorsLoading}
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
        title={editMode ? 'Edit Course' : 'Add Course'}
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
            options={field.name === 'instructor_id' ? doctors.map(d => ({ value: d.id, label: d.full_name })) : field.options}
          />
        ))}
      </FormDialog>
    </Box>
  );
}