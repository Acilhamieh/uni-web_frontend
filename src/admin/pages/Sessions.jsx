import React, { useState, useEffect } from 'react';
import { Box, Button, Chip, Link, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import DataTable from '../components/DataTable';
import FormDialog from '../components/FormDialog';
import FormField from '../components/FormField';
import ActionButtons from '../components/ActionButtons';
import { useDataFetching } from '../hooks/useDataFetching';
import { useFormHandling } from '../hooks/useFormHandling';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const sessionsUrl = `${backendUrl}/api/sessions/`;

const FORM_FIELDS = [
  { 
    name: 'course_code', 
    label: 'Course', 
    type: 'select', 
    required: true,
    options: [], // Will be populated with course codes
    helperText: 'Select the course for this session'
  },
  { 
    name: 'academic_year', 
    label: 'Academic Year', 
    type: 'select', 
    required: true,
    options: [
      '2024-2025',
      '2023-2024',
      '2022-2023',
      '2021-2022',
      '2020-2021',
      '2019-2020',
      '2018-2019',
      '2017-2018'
    ]
  },
  {
    name: 'exam_type',
    label: 'Exam Type',
    type: 'select',
    required: true,
    options: ['partial', 'final'],
    helperText: 'Select whether this is a partial or final exam'
  },
  { 
    name: 'question_pdf_url', 
    label: 'Question Paper PDF URL', 
    type: 'text', 
    required: true,
    helperText: 'Enter the URL for the question paper PDF'
  },
  { 
    name: 'solution_pdf_url', 
    label: 'Solution PDF URL', 
    type: 'text', 
    required: false,
    helperText: 'Enter the URL for the solution PDF (optional)'
  },
];

export default function Sessions() {
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
  } = useDataFetching(sessionsUrl);

  const COLUMNS = [
    { field: 'id', headerName: 'ID', width: 90, sortable: true },
    { 
      field: 'course_code',
      headerName: 'Course',
      width: 250,
      sortable: true,
      renderCell: (row) => (
        <Typography variant="body2" sx={{ color: 'var(--main-color2)' }}>
          {row.courseName}
        </Typography>
      ),
    },
    { field: 'academic_year', headerName: 'Academic Year', width: 150, sortable: true },
    { 
      field: 'exam_type', 
      headerName: 'Exam Type', 
      width: 130, 
      sortable: true,
      renderCell: (row) => (
        <Chip
          label={row.examType}
          size="small"
          sx={{
            backgroundColor: 
              row.examType === 'partial' ? 'rgba(25, 118, 210, 0.1)' : 'rgba(46, 125, 50, 0.1)',
            color: 
              row.examType === 'partial' ? '#1976d2' : '#2e7d32',
            fontWeight: 500,
            textTransform: 'capitalize'
          }}
        />
      ),
    },
    { 
      field: 'question_pdf_url', 
      headerName: 'Question Paper', 
      width: 150,
      sortable: false,
      renderCell: (row) => (
        row.question_pdf_url ? (
          <Link 
            href={row.question_pdf_url} 
            target="_blank" 
            rel="noopener noreferrer"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: 'var(--main-color2)',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            <PictureAsPdfIcon fontSize="small" />
            View PDF
          </Link>
        ) : (
          <Chip
            label="No PDF"
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
      field: 'solution_pdf_url', 
      headerName: 'Solution', 
      width: 150,
      sortable: false,
      renderCell: (row) => (
        row.solution_pdf_url ? (
          <Link 
            href={row.solution_pdf_url} 
            target="_blank" 
            rel="noopener noreferrer"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: 'var(--main-color2)',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            <PictureAsPdfIcon fontSize="small" />
            View PDF
          </Link>
        ) : (
          <Chip
            label="No PDF"
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
          onDelete={() => handleDelete(row.id, sessionsUrl)}
        />
      )
    }
  ];
  
  const {
    data: coursesData,
    loading: coursesLoading,
    error: coursesError
  } = useDataFetching('/api/courses');

  useEffect(() => {
    if (coursesData) {
      // Create options with code as value but name as display text
      const courseOptions = coursesData.map(course => ({
        value: course.code,
        label: course.name
      }));
      
      // Find the course field and update its options
      const courseField = FORM_FIELDS.find(field => field.name === 'course_code');
      if (courseField) {
        courseField.options = courseOptions;
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
    onSubmit: (data, mode) => {
      // Only send the courseCode to the backend, not the full course object
      const submitData = {
        ...data,
        course_code: data.course_code
      };
      return mode === 'edit' ? handleUpdate(submitData) : handleCreate(submitData);
    }
  });

  // Enhance the session data with course names
  const enhancedData = data.map(session => {
    const course = courses.find(c => c.code === session.course_code);
    return {
      ...session,
      courseName: course ? course.name : 'Unknown Course'
    };
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
      {error && <Typography variant="caption">Session Data Error: {error.message || 'Unknown error'}</Typography>}
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
          Add Session
        </Button>
      </Box>
      <DataTable
        title="Past Sessions"
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
        title={editMode ? 'Edit Session' : 'Add Session'}
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
            courses={field.name === 'course_code' ? courses : undefined}
          />
        ))}
      </FormDialog>
    </Box>
  );
} 