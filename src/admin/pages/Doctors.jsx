import React, { useState } from 'react';
import { Box, Button, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DataTable from '../components/DataTable';
import FormDialog from '../components/FormDialog';
import FormField from '../components/FormField';
import ActionButtons from '../components/ActionButtons';
import { useDataFetching } from '../hooks/useDataFetching';
import { useFormHandling } from '../hooks/useFormHandling';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const doctorsUrl = `${backendUrl}/api/doctors/`;

const FORM_FIELDS = [
  /*{ 
    name: 'academicRank', 
    label: 'Academic Rank', 
    type: 'select', 
    required: true,
    options: ['Dr.', 'Prof.', 'Assoc. Prof.', 'Assist. Prof.'],
    helperText: 'Select the academic rank of the doctor'
  },*/
  { name: 'first_name', label: 'First Name', type: 'text', required: true },
  { name: 'last_name', label: 'Last Name', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Phone', type: 'text', required: true },
  { name: 'linkedin_url', label: 'Linkedin Account', type: 'text', required: true },
  { name: 'office_room', label: 'Office Room', type: 'text', required: false },
];

export default function Doctors() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');

  const {
    data,
    loading,
    error,
    handleCreate,
    handleUpdate,
    handleDelete
  } = useDataFetching(doctorsUrl);

  const COLUMNS = [
    { field: 'id', headerName: 'ID', width: 90, sortable: true },
    { field: 'full_name', headerName: 'Full Name', width: 250, sortable: true },
    { field: 'email', headerName: 'Email', width: 220, sortable: true },
    { field: 'phone', headerName: 'Phone', width: 150, sortable: true },
    { field: 'linkedin_url', headerName: 'Linkedin Account', width: 150, sortable: true },
    { field: 'office_room', headerName: 'Office Room', width: 90, sortable: true },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (row) => (
        <ActionButtons
          onEdit={() => {
            console.log(row);
            handleOpen('edit', row)
          }}
          onDelete={() => {
            handleDelete(row.id, doctorsUrl);
          }}
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

    onSubmit: (data, mode) => {
      // Add a computed 'name' field for display purposes
      const processedData = {
        ...data,
        created_by: 1,
      };

      // Make sure to include the id when updating
      if (mode === 'edit' && data.id) {
        processedData.id = data.id;
      }

      return mode === 'edit' ?
        handleUpdate(processedData, doctorsUrl) :
        handleCreate(processedData, doctorsUrl);
    }
  });

  // When opening the form for editing, split the name into its components
  const handleEditOpen = (row) => {
    console.log(row);
    handleOpen('edit', {
      id: row.id,
      first_name: (row.full_name).split(' ')[0],
      last_name: (row.full_name).split(' ')[1],
      email: row.email,
      phone: row.phone,
      linkedin_url: row.linkedin_url,
      office_room: row.office_room,
      created_by: row.created_by
    });
  };

  // Filter and sort data
  const filteredData = data.filter(row =>
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
      {error && <Typography variant="caption">Doctor Data Error: {error.message || 'Unknown error'}</Typography>}
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
          Add Doctor
        </Button>
      </Box>
      <DataTable
        title="Doctors"
        rows={sortedData}
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
        onEdit={handleEditOpen}
      />
      <FormDialog
        open={open}
        title={editMode ? 'Edit Doctor' : 'Add Doctor'}
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