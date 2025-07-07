import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import Link from '@mui/material/Link';
import Chip from '@mui/material/Chip';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AddIcon from '@mui/icons-material/Add';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import DataTable from '../components/DataTable';
import FormDialog from '../components/FormDialog';
import FormField from '../components/FormField';
import ActionButtons from '../components/ActionButtons';
import { useDataFetching } from '../hooks/useDataFetching';
import { useFormHandling } from '../hooks/useFormHandling';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const projectsUrl = `${backendUrl}/api/projects/`;

const doctorsUrl = `${backendUrl}/api/doctors/`;

const FORM_FIELDS = [
  { name: 'title', label: 'Project Title', type: 'text', required: true },
  {
    name: 'supervisor_id',
    label: 'Supervisor',
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
    name: 'description',
    label: 'Description',
    type: 'text',
    required: true,
    multiline: true,
    rows: 4
  },
  {
    name: 'team_members',
    label: 'Team Members',
    type: 'text',
    required: true,
    helperText: 'Enter team member names separated by commas (e.g., "John Smith, Jane Doe")'
  },
  {
    name: 'report_url_pdf',
    label: 'Project Report',
    type: 'file',
    required: true,
    accept: '.pdf',
    helperText: 'Upload your project report (PDF format only, max 10MB)'
  },
  {
    name: 'presentation_url_pdf',
    label: 'Project Presentation',
    type: 'file',
    required: true,
    accept: '.pdf',
    helperText: 'Upload your project presentation (PDF format only, max 10MB)'
  }
];

export default function Projects() {
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
  } = useDataFetching(projectsUrl);

  const {
    data: doctorsData,
    loading: doctorsLoading,
    error: doctorsError
  } = useDataFetching(doctorsUrl);

  useEffect(() => {
    if (doctorsData) {
      const supervisorField = FORM_FIELDS.find(field => field.name === 'supervisor_id');
      if (supervisorField) {
        supervisorField.options = doctorsData.map(doctor => ({
          value: doctor.id,
          label: doctor.full_name
        }));
      }
      setDoctors(doctorsData);
    }
  }, [doctorsData]);

  const COLUMNS = [
    { field: 'id', headerName: 'ID', width: 90, sortable: true },
    { field: 'title', headerName: 'Title', width: 300, sortable: true },
    {
      field: 'supervisor_id',
      headerName: 'Supervisor',
      width: 180,
      sortable: true,
      renderCell: (row) => {
        const doctor = doctors.find(d => d.id === row.supervisor_id);
        return doctor ? doctor.full_name : '';
      }
    },
    {
      field: 'team_members',
      headerName: 'Team Members',
      width: 200,
      renderCell: (row) => (
        <Typography variant="body2">
          {row.team_members.join(', ')}
        </Typography>
      )
    },
    { field: 'academic_year', headerName: 'Academic Year', width: 150, sortable: true },
    {
      field: 'report_url_pdf',
      headerName: 'Report PDF',
      width: 150,
      sortable: false,
      renderCell: (row) => (
        row.report_url_pdf ? (
          <Link
            href={row.report_url_pdf}
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
      field: 'presentation_url_pdf',
      headerName: 'Presentation PDF',
      width: 150,
      sortable: false,
      renderCell: (row) => (
        row.presentation_url_pdf ? (
          <Link
            href={row.presentation_url_pdf}
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
          onEdit={() => handleEditOpen(row)}
          onDelete={() => handleDelete(row.id, projectsUrl)}
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
      // Validate file sizes (max 10MB)
      const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

      // Consistent file field names
      if (data.report_url_pdf && data.report_url_pdf.size > MAX_FILE_SIZE) {
        throw new Error('Project report file size must be less than 10MB');
      }
      if (data.presentation_url_pdf && data.presentation_url_pdf.size > MAX_FILE_SIZE) {
        throw new Error('Project presentation file size must be less than 10MB');
      }

      // Create FormData object to handle file uploads
      const formData = new FormData();

      // Add basic project data
      formData.append('title', data.title);
      formData.append('supervisor_id', data.supervisor_id); // This should be the doctor's ID
      formData.append('academic_year', data.academic_year);
      formData.append('description', data.description);

      // Add team members as JSON string (array of strings, not objects)
      const team = data.team_members.split(',').map(name => name.trim());
      formData.append('team_members', JSON.stringify(team));

      // Only append files if they exist (important for edit mode)
      if (data.report_url_pdf) {
        formData.append('report_pdf', data.report_url_pdf);
      }
      if (data.presentation_url_pdf) {
        formData.append('presentation_pdf', data.presentation_url_pdf);
      }

      // For edit mode, ensure the project ID is included
      if (mode === 'edit' && data.id) {
        formData.append('id', data.id);
      }

      // Send the FormData to the server
      return mode === 'edit' ? handleUpdate(formData, projectsUrl) : handleCreate(formData, projectsUrl);
    }
  });

  // Function to handle opening the edit form with pre-processed data
  const handleEditOpen = (row) => {
    handleOpen('edit', {
      ...row,
      supervisor: row.supervisor // Ensure the supervisor ID is passed correctly
    });
  };

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
      {error && <Typography variant="caption">Project Data Error: {error.message || 'Unknown error'}</Typography>}
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
          Add Project
        </Button>
      </Box>
      <DataTable
        title="Projects"
        rows={sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)} //pagination
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
        title={editMode ? 'Edit Project' : 'Add Project'}
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