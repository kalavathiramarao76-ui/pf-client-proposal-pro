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

  const handleCategoryBlur = (event: React.FocusEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    const newErrors = { ...errors };

    if (name === 'category') {
      if (!value) {
        newErrors.category = 'Category is required';
      } else {
        newErrors.category = '';
      }
    }

    setErrors(newErrors);
  };

  const handleTagsBlur = () => {
    const newErrors = { ...errors };

    if (tags.length === 0) {
      newErrors.tags = 'At least one tag is required';
    } else {
      newErrors.tags = '';
    }

    setErrors(newErrors);
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          onBlur={handleBlur}
          placeholder="Name"
          error={errors.name}
        />
        <Input
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onBlur={handleBlur}
          placeholder="Email"
          error={errors.email}
        />
        <Input
          type="text"
          name="phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          onBlur={handleBlur}
          placeholder="Phone"
          error={errors.phone}
        />
        <Select
          name="category"
          value={filter.category}
          onChange={(event) => setFilter({ ...filter, category: event.target.value })}
          onBlur={handleCategoryBlur}
          options={categories}
          error={errors.category}
        />
        <TagInput
          tags={tags}
          setTags={setTags}
          onBlur={handleTagsBlur}
          error={errors.tags}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Layout>
  );
};

export default ClientForm;