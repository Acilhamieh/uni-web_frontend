import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import DataTable from '../components/DataTable';
import FormDialog from '../components/FormDialog';
import FormField from '../components/FormField';
import ActionButtons from '../components/ActionButtons';
import { useDataFetching } from '../hooks/useDataFetching';
import { useFormHandling } from '../hooks/useFormHandling';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const traineesUrl = `${backendUrl}/api/trainees/`;

const PROGRAM_TYPES = {
  'internship': { color: '#2196f3', icon: WorkIcon },
  'training': { color: '#4caf50', icon: SchoolIcon },
};

const FORM_FIELDS = [
  { name: 'tile', label: 'Title', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Phone', type: 'text', required: true },
  { name: 'institution', label: 'Institution', type: 'text', required: true },
  { name: 'domain', label: 'Domain', type: 'text', required: true },
  { name: 'program', label: 'Program', type: 'text', required: true },
  { name: 'start_date', label: 'Start Date', type: 'date', required: true },
  { name: 'end_date', label: 'End Date', type: 'date', required: true },
  { name: 'supervisor', label: 'Supervisor', type: 'text', required: true },
  {
    name: 'objectives',
    label: 'Objectives',
    type: 'text',
    multiline: true,
    rows: 3,
    required: true,
    helperText: 'Enter objectives separated by commas (e.g., "Learn React, Improve teamwork")'
  },
  {
    name: 'skills',
    label: 'Skills',
    type: 'text',
    multiline: true,
    rows: 3,
    required: true,
    helperText: 'Enter skills separated by commas (e.g., "JavaScript, React, Teamwork")'
  },
  { name: 'notes', label: 'Notes', type: 'text', multiline: true, rows: 2, required: false ,helperText: 'Enter any additional notes or comments separated by commas' },
];

const TraineeCard = ({ trainee }) => {
    const [skillsExpanded, setSkillsExpanded] = useState(false);
    const [objectivesExpanded, setObjectivesExpanded] = useState(false);

    return (
        <div className="trainee-card">
            <div className="trainee-card-content">
                <span className="program-badge">{trainee.program}</span>
                <div className="trainee-header">
                    <div className="trainee-avatar-container">
                        <Person className="trainee-avatar" />
                    </div>
                    <div className="trainee-main-info">
                        <h2 className="trainee-title">{trainee.name}</h2>
                        <div className="trainee-contact">
                            <span>{trainee.email}</span>
                            <span>{trainee.phone}</span>
                        </div>
                    </div>
                </div>

                <div className="trainee-details">
                    <div className="info-row">
                        <Business className="info-icon" />
                        <span>{trainee.institution}</span>
                    </div>
                    <div className="info-row">
                        <SchoolIcon className="info-icon" />
                        <span>{trainee.domain}</span>
                    </div>
                    <div className="info-row">
                        <LocationOn className="info-icon" />
                        <span>{trainee.location}</span>
                    </div>
                </div>

                <div className={`trainee-skills ${skillsExpanded ? 'expanded' : ''}`}>
                    <div 
                        className="section-toggle"
                        onClick={() => setSkillsExpanded(!skillsExpanded)}
                    >
                        <h3>Skills</h3>
                        <KeyboardArrowDown className="toggle-arrow" />
                    </div>
                    <div className="skills-container">
                        {trainee.skills.map((skill, index) => (
                            <span key={index} className="skill-badge">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                <div className={`trainee-objectives ${objectivesExpanded ? 'expanded' : ''}`}>
                    <div 
                        className="section-toggle"
                        onClick={() => setObjectivesExpanded(!objectivesExpanded)}
                    >
                        <h3>Objectives</h3>
                        <KeyboardArrowDown className="toggle-arrow" />
                    </div>
                    <ul>
                        {trainee.objectives.map((objective, index) => (
                            <li key={index}>{objective}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default function Trainees() {
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
  } = useDataFetching(traineesUrl);

  const COLUMNS = [
    { field: 'id', headerName: 'ID', width: 90, sortable: true },
    { field: 'title', headerName: 'Title', width: 200, sortable: true },
    { field: 'email', headerName: 'Email', width: 220, sortable: true },
    { field: 'phone', headerName: 'Phone', width: 150, sortable: true },
    { field: 'institution', headerName: 'Institution', width: 200, sortable: true },
    { field: 'domain', headerName: 'Domain', width: 200, sortable: true },
    { field: 'program', headerName: 'Program', width: 150, sortable: true },
    { field: 'start_date', headerName: 'Start Date', width: 150, sortable: true },
    { field: 'end_date', headerName: 'End Date', width: 150, sortable: true },
    { field: 'supervisor', headerName: 'Supervisor', width: 180, sortable: true },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (row) => (
        <ActionButtons
          onEdit={() => handleOpen('edit', row)}
          onDelete={() => handleDelete(row.id, traineesUrl)}
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
    resetForm
  } = useFormHandling({
    initialData: {},
    onSubmit: (data, mode) => {

      const objectives = data.objectives.split(',').map(objective => ({
        objective: objective.trim()
      }));

      const skills = data.skills.split(',').map(skill => ({
        skill: skill.trim()
      }));

      const notes = data.notes.split(',').map(note => ({
        note: note.trim()
      }));

      const processedData = {
        ...data,
        objectives: objectives,
        skills: skills,
        notes: notes,
        created_by: 1,
      };

      if (mode === 'edit' && data.id) {
        processedData.id = data.id;
      }
      return mode === 'edit' ?
        handleUpdate(processedData, traineesUrl) :
        handleCreate(processedData, traineesUrl);
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
      {error && <Typography variant="caption">Trainee Data Error: {error.message || 'Unknown error'}</Typography>}
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
          Add Trainee
        </Button>
      </Box>
      <DataTable
        title="Trainees Management"
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
        title={editMode ? 'Edit Trainee' : 'Add Trainee'}
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