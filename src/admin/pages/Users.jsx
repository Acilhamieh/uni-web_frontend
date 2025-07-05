import React, { useState } from 'react';
import { Box, Button, Chip, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import DataTable from '../components/DataTable';
import FormDialog from '../components/FormDialog';
import FormField from '../components/FormField';
import ActionButtons from '../components/ActionButtons';
import { useDataFetching } from '../hooks/useDataFetching';
import { useFormHandling } from '../hooks/useFormHandling';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const usersUrl = `${backendUrl}/api/users/`;

const FORM_FIELDS = [
  { name: 'first_name', label: 'First Name', type: 'text', required: true },
  { name: 'last_name', label: 'Last Name', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  {
    name: 'role',
    label: 'Role',
    type: 'select',
    required: true,
    options: ['superadmin', 'admin', 'student']
  },
  { name: 'password', label: 'Password', type: 'password', required: true },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    required: true
  }
];

export default function Users() {
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
  } = useDataFetching(usersUrl);

  const COLUMNS = [
    { field: 'id', headerName: 'ID', width: 90, sortable: true },
    {
      field: 'full_name',
      headerName: 'Full Name',
      width: 250,
      sortable: true,
      renderCell: (row) => {
        const firstName = row.first_name || '';
        const lastName = row.last_name || '';
        return `${firstName} ${lastName}`.trim();
      }
    },
    { field: 'email', headerName: 'Email', width: 220, sortable: true },
    {
      field: 'role',
      headerName: 'Role',
      width: 130,
      sortable: true,
      renderCell: (row) => {
        const roleColors = {
          'superadmin': { bg: 'rgba(156, 39, 176, 0.1)', color: '#9c27b0' },
          'admin': { bg: 'rgba(25, 118, 210, 0.1)', color: '#1976d2' },
          'student': { bg: 'rgba(46, 125, 50, 0.1)', color: '#2e7d32' },
        };
        return (
          <Chip
            label={row.role}
            size="small"
            sx={{
              backgroundColor: roleColors[row.role]?.bg || 'rgba(97, 97, 97, 0.1)',
              color: roleColors[row.role]?.color || '#616161',
              fontWeight: 500,
              textTransform: 'capitalize',
            }}
          />
        );
      }
    },
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
            handleDelete(row.id, usersUrl);
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
      // Validate password match
      if (data.password !== data.confirmPassword) {
        toast.error("Passwords don't match");
      }

      // Remove confirmPassword before sending to API
      const { confirmPassword, ...submitData } = data;
      return mode === 'edit' ? handleUpdate(submitData , usersUrl) : handleCreate(submitData , usersUrl);
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

  // Check if current user has permission to manage admins
  const canManageAdmins = true; // This should be replaced with actual permission check

  // Filter form fields based on permissions
  const visibleFormFields = FORM_FIELDS.map(field => {
    if (field.name === 'role') {
      return {
        ...field,
        options: canManageAdmins 
          ? field.options 
          : field.options.filter(role => !['superadmin', 'admin'].includes(role))
      };
    }
    return field;
  });

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
      {error && <Typography variant="caption">User Data Error: {error.message || 'Unknown error'}</Typography>}
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
          Add User
        </Button>
      </Box>
      <DataTable
        title="Users Management"
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
        title={editMode ? 'Edit User' : 'Add User'}
        onClose={() => {
          handleClose();
          resetForm();
        }}
        onSubmit={handleSubmit}
      >
        {visibleFormFields.map((field) => (
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