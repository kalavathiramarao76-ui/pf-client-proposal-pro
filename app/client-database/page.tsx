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
      try {
        // Form is valid, proceed with submission
        console.log('Form submitted successfully');
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrors({
          name: errors.name,
          email: errors.email,
          phone: errors.phone,
          category: errors.category,
          tags: errors.tags,
          form: 'An error occurred while submitting the form. Please try again.',
        });
      }
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

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newErrors = { ...errors };
    if (!event.target.value) {
      newErrors.category = 'Category is required';
    } else {
      newErrors.category = '';
    }
    setErrors(newErrors);
    setFilter({ ...filter, category: event.target.value });
  };

  const handleTagsChange = (newTags: string[]) => {
    const newErrors = { ...errors };
    if (newTags.length === 0) {
      newErrors.tags = 'At least one tag is required';
    } else {
      newErrors.tags = '';
    }
    setErrors(newErrors);
    setTags(newTags);
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
        placeholder="Name"
      />
      <Input
        type="email"
        name="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        onBlur={handleBlur}
        error={errors.email}
        placeholder="Email"
      />
      <Input
        type="text"
        name="phone"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
        onBlur={handleBlur}
        error={errors.phone}
        placeholder="Phone"
      />
      <Select
        name="category"
        value={filter.category}
        onChange={handleCategoryChange}
        error={errors.category}
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </Select>
      <TagInput
        tags={tags}
        onChange={handleTagsChange}
        error={errors.tags}
        placeholder="Tags"
      />
      <Button type="submit">Submit</Button>
      {errors.form && <div style={{ color: 'red' }}>{errors.form}</div>}
    </form>
  );
};

export default ClientForm;