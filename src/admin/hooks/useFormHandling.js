import { useState } from 'react';

export const useFormHandling = ({ initialData = {}, onSubmit }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [editMode, setEditMode] = useState(false);

  const handleOpen = (mode, data = {}) => {
    setEditMode(mode === 'edit');
    setFormData(mode === 'edit' ? data : initialData);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    try {
      await onSubmit(formData, editMode ? 'edit' : 'add');
      handleClose();
      resetForm();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const resetForm = () => {
    setFormData(initialData);
    setEditMode(false);
  };

  return {
    open,
    formData,
    editMode,
    handleOpen,
    handleClose,
    handleChange,
    handleSubmit,
    resetForm
  };
}; 