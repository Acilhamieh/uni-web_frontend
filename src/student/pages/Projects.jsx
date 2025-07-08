import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Chip,
    IconButton,
    Card,
    CardContent,
    Typography,
    Box,
    Grid,
    CircularProgress,
    FormHelperText,
    OutlinedInput,
} from '@mui/material';
import {
    Add as AddIcon,
    Close as CloseIcon,
    Description as DescriptionIcon,
    Slideshow as SlideshowIcon,
    Person as PersonIcon,
    CalendarToday as CalendarIcon,
    Group as GroupIcon,
    UploadFile as UploadFileIcon,
} from '@mui/icons-material';
import '../styles/Projects.css';

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
                        maxHeight: 224,
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
        name: 'report_pdf',
        label: 'Project Report',
        type: 'file',
        required: true,
        accept: '.pdf',
        helperText: 'Upload your project report (PDF format only, max 10MB)'
    },
    {
        name: 'presentation_pdf',
        label: 'Project Presentation',
        type: 'file',
        required: true,
        accept: '.pdf',
        helperText: 'Upload your project presentation (PDF format only, max 10MB)'
    }
];

const FormField = ({ type, name, label, value, onChange, required, options = [], error, helperText, ...props }) => {
    const handleChange = (e) => {
        if (type === 'file') {
            onChange(name, e.target.files[0]);
        } else {
            onChange(name, e.target.value);
        }
    };

    const commonProps = {
        fullWidth: true,
        margin: "normal",
        size: "small",
        required,
        error: !!error,
        helperText: error || helperText,
        sx: {
            '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                '& fieldset': {
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                },
                '&:hover fieldset': {
                    borderColor: 'var(--main-color2)',
                },
                '&.Mui-focused fieldset': {
                    borderColor: 'var(--main-color2)',
                },
            },
            '& .MuiInputLabel-root.Mui-focused': {
                color: 'var(--main-color2)',
            },
        },
    };

    if (type === 'file') {
        return (
            <FormControl {...commonProps}>
                <InputLabel 
                    shrink 
                    error={!!error}
                    sx={{
                        backgroundColor: 'white',
                        px: 1,
                    }}
                >
                    {label}
                </InputLabel>
                <OutlinedInput
                    notched
                    label={label}
                    error={!!error}
                    endAdornment={
                        <label htmlFor={name}>
                            <input
                                accept=".pdf"
                                id={name}
                                name={name}
                                type="file"
                                onChange={handleChange}
                                style={{ display: 'none' }}
                            />
                            <Button
                                variant="contained"
                                component="span"
                                size="small"
                                startIcon={<UploadFileIcon />}
                                sx={{
                                    backgroundColor: 'var(--main-color2)',
                                    '&:hover': {
                                        backgroundColor: 'var(--main-color2)',
                                        opacity: 0.9,
                                    },
                                }}
                            >
                                Browse
                            </Button>
                        </label>
                    }
                    value={value ? value.name : ''}
                    readOnly
                    sx={{
                        '& .MuiOutlinedInput-input': {
                            cursor: 'default',
                            '&:focus': {
                                cursor: 'default',
                            },
                        },
                    }}
                />
                {(error || helperText) && (
                    <FormHelperText error={!!error}>
                        {error || helperText}
                    </FormHelperText>
                )}
            </FormControl>
        );
    }

    if (type === 'select') {
        return (
            <FormControl {...commonProps}>
                <InputLabel id={`${name}-label`}>{label}</InputLabel>
                <Select
                    labelId={`${name}-label`}
                    id={name}
                    value={value || ''}
                    label={label}
                    onChange={handleChange}
                    {...props}
                >
                    {options.map((option) => (
                        <MenuItem 
                            key={option.value || option}
                            value={option.value || option}
                            sx={{
                                '&.Mui-selected': {
                                    backgroundColor: 'rgba(13, 92, 145, 0.08)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(13, 92, 145, 0.12)',
                                    },
                                },
                                '&:hover': {
                                    backgroundColor: 'rgba(13, 92, 145, 0.04)',
                                },
                            }}
                        >
                            {option.label || option}
                        </MenuItem>
                    ))}
                </Select>
                {(error || helperText) && (
                    <FormHelperText error={!!error}>
                        {error || helperText}
                    </FormHelperText>
                )}
            </FormControl>
        );
    }

    return (
        <TextField
            {...commonProps}
            {...props}
            type={type}
            name={name}
            label={label}
            value={value || ''}
            onChange={handleChange}
        />
    );
};

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [formData, setFormData] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [supervisors, setSupervisors] = useState([]);

    useEffect(() => {
        fetchProjects();
        fetchSupervisors();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/projects');
            const result = await response.json();
            
            if (result.success) {
                setProjects(result.data);
            } else {
                toast.error('Failed to fetch projects');
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
            toast.error('Error loading projects');
        } finally {
            setLoading(false);
        }
    };

    const fetchSupervisors = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/doctors');
            const result = await response.json();
            
            if (result.success) {
                const supervisorOptions = result.data.map(doctor => ({
                    value: doctor.id,
                    label: doctor.full_name
                }));
                const supervisorField = FORM_FIELDS.find(field => field.name === 'supervisor_id');
                if (supervisorField) {
                    supervisorField.options = supervisorOptions;
                }
                setSupervisors(result.data);
            }
        } catch (error) {
            console.error('Error fetching supervisors:', error);
            toast.error('Error loading supervisors');
        }
    };

    const validateForm = () => {
        const errors = {};
        FORM_FIELDS.forEach(field => {
            if (field.required && !formData[field.name]) {
                errors[field.name] = 'This field is required';
            }
        });

        // File size validation (max 10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB in bytes
        if (formData.report_pdf && formData.report_pdf.size > maxSize) {
            errors.report_pdf = 'Report file size must be less than 10MB';
        }
        if (formData.presentation_pdf && formData.presentation_pdf.size > maxSize) {
            errors.presentation_pdf = 'Presentation file size must be less than 10MB';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        const formDataToSend = new FormData();

        // Convert team_members string to array
        if (formData.team_members) {
            const teamMembers = formData.team_members.split(',').map(member => member.trim());
            formDataToSend.append('team_members', JSON.stringify(teamMembers));
        }

        // Append other form data
        Object.keys(formData).forEach(key => {
            if (key !== 'team_members') {
                formDataToSend.append(key, formData[key]);
            }
        });

        try {
            const response = await fetch('http://localhost:4000/api/projects', {
                method: 'POST',
                body: formDataToSend,
            });
            const result = await response.json();

            if (result.success) {
                toast.success('Project submitted successfully');
                setOpenDialog(false);
                fetchProjects();
                resetForm();
            } else {
                toast.error(result.message || 'Failed to submit project');
            }
        } catch (error) {
            console.error('Error submitting project:', error);
            toast.error('Error submitting project');
        } finally {
            setLoading(false);
        }
    };

    const handleFieldChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when field is changed
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const resetForm = () => {
        setFormData({});
        setFormErrors({});
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return '#ffa726';
            case 'approved': return '#66bb6a';
            case 'rejected': return '#ef5350';
            default: return '#757575';
        }
    };

    if (loading && projects.length === 0) {
        return (
            <div className="projects-loading">
                <CircularProgress />
                <Typography>Loading projects...</Typography>
            </div>
        );
    }

    return (
        <div className="projects-container">
            <div className="projects-header">
                <Typography 
                    variant="h1" 
                    className="section-title" 
                    sx={{ 
                        width: '100%', 
                        textAlign: 'center', 
                        marginBottom: '24px'
                    }}
                >
                    Student Projects
                </Typography>
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    marginBottom: '32px'
                }}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setOpenDialog(true)}
                        sx={{
                            backgroundColor: 'var(--main-color2)',
                            '&:hover': {
                                backgroundColor: 'var(--main-color2)',
                                opacity: 0.9
                            },
                            borderRadius: '8px',
                            padding: '8px 16px',
                            textTransform: 'none',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            fontSize: '0.875rem',
                            fontWeight: 500
                        }}
                    >
                        Submit Your Project
                    </Button>
                </Box>
            </div>

            <Grid container spacing={3} className="projects-grid">
                {projects
                    .filter(project => project.status === 'accepted')
                    .map((project) => (
                    <Grid item xs={12} md={6} lg={4} key={project.id}>
                        <Card className="project-card">
                            <CardContent>
                                <Typography variant="h5" className="project-title">
                                    {project.title}
                                </Typography>

                                <Box className="project-info">
                                    <Typography className="info-row">
                                        <PersonIcon className="info-icon" />
                                        Supervisor: {project.supervisor_name}
                                    </Typography>
                                    <Typography className="info-row">
                                        <CalendarIcon className="info-icon" />
                                        {project.academic_year}
                                    </Typography>
                                    <Typography className="info-row">
                                        <GroupIcon className="info-icon" />
                                        Team: {project.team_members.join(', ')}
                                    </Typography>
                                </Box>

                                <Typography className="project-description">
                                    {project.description}
                                </Typography>

                                <Box className="project-actions">
                                    {project.report_url_pdf && (
                                        <Button
                                            variant="contained"
                                            startIcon={<DescriptionIcon />}
                                            href={project.report_url_pdf}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{
                                                backgroundColor: '#27ae60',
                                                '&:hover': {
                                                    backgroundColor: '#219a52'
                                                },
                                                borderRadius: '8px',
                                                textTransform: 'none',
                                                flex: 1,
                                                boxShadow: 'none'
                                            }}
                                        >
                                            View Report
                                        </Button>
                                    )}
                                    {project.presentation_url_pdf && (
                                        <Button
                                            variant="contained"
                                            startIcon={<SlideshowIcon />}
                                            href={project.presentation_url_pdf}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{
                                                backgroundColor: '#e67e22',
                                                '&:hover': {
                                                    backgroundColor: '#d35400'
                                                },
                                                borderRadius: '8px',
                                                textTransform: 'none',
                                                flex: 1,
                                                boxShadow: 'none'
                                            }}
                                        >
                                            View Slides
                                        </Button>
                                    )}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Dialog 
                open={openDialog} 
                onClose={() => setOpenDialog(false)}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: '12px',
                        backgroundColor: '#fff',
                    },
                }}
            >
                <DialogTitle sx={{ 
                    m: 0, 
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: { xs: '1.1rem', sm: '1.2rem' },
                            fontWeight: 600,
                            color: 'var(--main-color2)',
                        }}
                    >
                        Submit Your Project
                    </Typography>
                    <IconButton
                        onClick={() => setOpenDialog(false)}
                        sx={{
                            color: 'var(--main-color2)',
                            '&:hover': {
                                backgroundColor: 'rgba(13, 92, 145, 0.04)',
                            },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ p: 2 }}>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        {FORM_FIELDS.map((field) => (
                            <FormField
                                key={field.name}
                                {...field}
                                value={formData[field.name]}
                                onChange={handleFieldChange}
                                error={formErrors[field.name]}
                            />
                        ))}
                    </Box>
                </DialogContent>
                <DialogActions sx={{ 
                    p: 2,
                    borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                }}>
                    <Button
                        onClick={() => setOpenDialog(false)}
                        variant="outlined"
                        sx={{
                            borderRadius: '8px',
                            textTransform: 'none',
                            minWidth: '100px',
                            borderColor: 'rgba(0, 0, 0, 0.12)',
                            color: 'var(--main-color2)',
                            '&:hover': {
                                borderColor: 'var(--main-color2)',
                                backgroundColor: 'rgba(13, 92, 145, 0.04)',
                            },
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        disabled={loading}
                        sx={{
                            borderRadius: '8px',
                            textTransform: 'none',
                            minWidth: '100px',
                            backgroundColor: 'var(--main-color2)',
                            '&:hover': {
                                backgroundColor: 'var(--main-color2)',
                                opacity: 0.9,
                            },
                        }}
                    >
                        {loading ? 'Submitting...' : 'Submit Project'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
