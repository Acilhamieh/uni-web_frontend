import React from 'react';
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  Box,
  Typography,
  OutlinedInput,
  FormHelperText,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

export default function FormField({
  type,
  name,
  label,
  value,
  onChange,
  required,
  options = [],
  error,
  helperText,
  hidden,
  courses,
  accept,
  ...props
}) {
  if (hidden) return null;

  const handleChange = (e) => {
    if (type === 'file') {
      onChange(name, e.target.files[0]);
    } else {
      onChange(name, e.target.value);
    }
  };

  const getDisplayLabel = (option) => {
    if (name === 'type') {
      switch(option) {
        case 'textBook':
          return 'Text Book';
        case 'playlist':
          return 'YouTube Playlist';
        case 'documentation':
          return 'Documentation';
        default:
          return option;
      }
    }
    if (name === 'course' && courses) {
      const course = courses.find(c => c.code === option);
      return course ? course.name : option;
    }
    return option;
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
                accept={accept}
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
              {option.label || getDisplayLabel(option)}
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
} 