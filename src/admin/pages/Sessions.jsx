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

const coursesUrl = `${backendUrl}/api/courses/`;

const FORM_FIELDS = [
  {
    name: 'course_id',
    label: 'Course Name',
    type: 'select',
    required: true,
    helperText: 'Select the course for this reference'
    // options will be passed dynamically
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
    name: 'final_type',
    label: 'Fianl Type',
    type: 'select',
    required: true,
    options: ['tp', 'td'],
    helperText: 'Select whether this is a TP or TD exam'
  },
  {
    name: 'question_pdf_url',
    label: 'Question Paper PDF URL',
    type: 'file',
    required: true,
    helperText: 'Upload the PDF for the question paper',
    accept: '.pdf',

  },
  {
    name: 'solution_pdf_url',
    label: 'Solution PDF URL',
    type: 'file',
    required: false,
    helperText: 'Upload the PDF for the solution (optional)',
    accept: '.pdf',
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
      field: 'course_id',
      headerName: 'Course Name',
      width: 200,
      sortable: true,
      renderCell: (row) => {
        const course = courses.find(c => c.id === row.course_id);
        return course ? course.name : '';
      }
    },

    { field: 'academic_year', headerName: 'Academic Year', width: 150, sortable: true },
    {
      field: 'exam_type',
      headerName: 'Exam Type',
      width: 130,
      sortable: true,
      renderCell: (row) => (
        <Chip
          label={row.exam_type}
          size="small"
          sx={{
            backgroundColor:
              row.exam_type === 'partial' ? 'rgba(25, 118, 210, 0.1)' : 'rgba(46, 125, 50, 0.1)',
            color:
              row.exam_type === 'partial' ? '#1976d2' : '#2e7d32',
            fontWeight: 500,
            textTransform: 'capitalize'
          }}
        />
      ),
    },
    {
      field: 'final_type',
      headerName: 'Final Type',
      width: 130,
      sortable: true,
      renderCell: (row) => (
        <Chip
          label={row.final_type}
          size="small"
          sx={{
            backgroundColor:
              row.final_type === 'tp' ? 'rgba(25, 118, 210, 0.1)' : 'rgba(46, 125, 50, 0.1)',
            color:
              row.final_type === 'td' ? '#1976d2' : '#2e7d32',
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
  } = useDataFetching(coursesUrl);

  useEffect(() => {
    if (coursesData) {
      // Update the course options in FORM_FIELDS with value/label pairs for select
      const courseField = FORM_FIELDS.find(field => field.name === 'course_id');
      if (courseField) {
        courseField.options = coursesData.map(course => ({ value: course.id, label: course.name }));
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
      // Validate PDF URLs
      // if (data.question_pdf_url && !data.question_pdf_url.trim().toLowerCase().endsWith('.pdf')) {
      //   Toast.error('The Question Paper URL must end with .pdf');
      //   return;
      // }
      // if (data.solution_pdf_url && data.solution_pdf_url.trim() !== '' && !data.solution_pdf_url.trim().toLowerCase().endsWith('.pdf')) {
      //   Toast.error('The Solution PDF URL must end with .pdf');
      //   return;
      // }


      // Ensure we never send course_name, only course_id, and never send id in update
      const cleanedData = { ...data };

      if ('course_name' in cleanedData) delete cleanedData.course_name;
      //if (mode === 'edit' && 'id' in cleanedData) delete cleanedData.id;

      console.log("data after edit or create :", cleanedData);

      // Add created_by field for create operation

      if (mode === 'create') {
        cleanedData.created_by = 1; // Replace with actual user ID
      }

      return mode === 'edit' ? handleUpdate(cleanedData, sessionsUrl) : handleCreate(cleanedData, sessionsUrl);
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
        rows={sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)} //pagination
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