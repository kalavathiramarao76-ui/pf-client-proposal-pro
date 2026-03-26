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
      newErrors.name = 'Name is required';
    } else if (name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!phone) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{3}-\d{3}-\d{4}$/.test(phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    if (!filter.category) {
      newErrors.category = 'Category is required';
    }

    if (tags.length === 0) {
      newErrors.tags = 'At least one tag is required';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      // Form is valid, proceed with submission
      console.log('Form submitted successfully');
    } else {
      // Form is invalid, display error messages
      console.log('Form submission failed due to errors');
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newErrors = { ...errors };

    switch (name) {
      case 'name':
        if (!value) {
          newErrors.name = 'Name is required';
        } else if (value.length < 2) {
          newErrors.name = 'Name must be at least 2 characters long';
        } else {
          newErrors.name = '';
        }
        break;
      case 'email':
        if (!value) {
          newErrors.email = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          newErrors.email = 'Invalid email address';
        } else {
          newErrors.email = '';
        }
        break;
      case 'phone':
        if (!value) {
          newErrors.phone = 'Phone is required';
        } else if (!/^\d{3}-\d{3}-\d{4}$/.test(value)) {
          newErrors.phone = 'Invalid phone number';
        } else {
          newErrors.phone = '';
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        onBlur={handleBlur}
        placeholder="Name"
        error={errors.name}
        className={errors.name ? 'border-red-500' : 'border-gray-300'}
      />
      <Input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        onBlur={handleBlur}
        placeholder="Email"
        error={errors.email}
        className={errors.email ? 'border-red-500' : 'border-gray-300'}
      />
      <Input
        type="text"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
        onBlur={handleBlur}
        placeholder="Phone"
        error={errors.phone}
        className={errors.phone ? 'border-red-500' : 'border-gray-300'}
      />
      <Select
        options={categories}
        value={filter.category}
        onChange={(event) => setFilter({ ...filter, category: event.target.value })}
        error={errors.category}
        className={errors.category ? 'border-red-500' : 'border-gray-300'}
      />
      <TagInput
        tags={tags}
        setTags={setTags}
      />
      {Object.keys(errors).some((key) => errors[key] !== '') && (
        <div className="text-red-500 text-sm mt-2">
          Please fix the errors before submitting the form.
        </div>
      )}
      <Button type="submit" className="mt-4">
        Submit
      </Button>
    </form>
  );
};

export default ClientForm;