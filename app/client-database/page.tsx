import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Client } from '../types/Client';
import { Layout } from '../components/Layout';
import { Table } from '../components/Table';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { TagInput } from '../components/TagInput';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const errorMessages = {
  required: 'This field is required',
  minLength: 'Must be at least 2 characters long',
  invalidEmail: 'Invalid email address',
  invalidPhone: 'Invalid phone number',
  categoryRequired: 'Category is required',
  tagsRequired: 'At least one tag is required',
};

const suggestions = {
  name: 'Please enter a name with at least 2 characters',
  email: 'Please enter a valid email address',
  phone: 'Please enter a valid phone number',
  category: 'Please select a category',
  tags: 'Please add at least one tag',
};

const ClientForm = ({
  name,
  email,
  phone,
  setName,
  setEmail,
  setPhone,
  errors,
  setErrors,
  categories,
  clientCategories,
  setFilter,
  filter,
  tags,
  setTags,
  isNewClient,
  editedClient,
}) => {
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {
      name: '',
      email: '',
      phone: '',
      category: '',
      tags: '',
    };

    if (!name) {
      newErrors.name = errorMessages.required;
    } else if (name.length < 2) {
      newErrors.name = errorMessages.minLength;
    }

    if (!email) {
      newErrors.email = errorMessages.required;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = errorMessages.invalidEmail;
    }

    if (!phone) {
      newErrors.phone = errorMessages.required;
    } else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone)) {
      newErrors.phone = errorMessages.invalidPhone;
    }

    if (!filter.category) {
      newErrors.category = errorMessages.categoryRequired;
    }

    if (tags.length === 0) {
      newErrors.tags = errorMessages.tagsRequired;
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  const validateField = (fieldName: string, value: string) => {
    let error = '';
    let suggestion = '';
    switch (fieldName) {
      case 'name':
        if (!value) {
          error = errorMessages.required;
          suggestion = suggestions.name;
        } else if (value.length < 2) {
          error = errorMessages.minLength;
          suggestion = suggestions.name;
        }
        break;
      case 'email':
        if (!value) {
          error = errorMessages.required;
          suggestion = suggestions.email;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          error = errorMessages.invalidEmail;
          suggestion = suggestions.email;
        }
        break;
      case 'phone':
        if (!value) {
          error = errorMessages.required;
          suggestion = suggestions.phone;
        } else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value)) {
          error = errorMessages.invalidPhone;
          suggestion = suggestions.phone;
        }
        break;
      case 'category':
        if (!value) {
          error = errorMessages.categoryRequired;
          suggestion = suggestions.category;
        }
        break;
      case 'tags':
        if (value.length === 0) {
          error = errorMessages.tagsRequired;
          suggestion = suggestions.tags;
        }
        break;
      default:
        break;
    }
    return { error, suggestion };
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const fieldName = event.target.name;
    const value = event.target.value;
    const { error, suggestion } = validateField(fieldName, value);
    const newErrors = { ...errors };
    newErrors[fieldName] = error;
    setErrors(newErrors);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = validateForm();
    if (!isValid) {
      return;
    }
    // Submit form logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        onBlur={handleBlur}
        error={errors.name}
      />
      <Input
        type="email"
        name="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        onBlur={handleBlur}
        error={errors.email}
      />
      <Input
        type="text"
        name="phone"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
        onBlur={handleBlur}
        error={errors.phone}
      />
      <Select
        name="category"
        value={filter.category}
        onChange={(event) => setFilter({ ...filter, category: event.target.value })}
        onBlur={handleBlur}
        error={errors.category}
        options={categories}
      />
      <TagInput
        name="tags"
        value={tags}
        onChange={(newTags) => setTags(newTags)}
        onBlur={(event) => handleBlur(event)}
        error={errors.tags}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default ClientForm;