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
    switch (fieldName) {
      case 'name':
        if (!value) {
          error = errorMessages.required;
        } else if (value.length < 2) {
          error = errorMessages.minLength;
        }
        break;
      case 'email':
        if (!value) {
          error = errorMessages.required;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          error = errorMessages.invalidEmail;
        }
        break;
      case 'phone':
        if (!value) {
          error = errorMessages.required;
        } else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value)) {
          error = errorMessages.invalidPhone;
        }
        break;
      case 'category':
        if (!value) {
          error = errorMessages.categoryRequired;
        }
        break;
      default:
        break;
    }
    const newErrors = { ...errors };
    newErrors[fieldName] = error;
    setErrors(newErrors);
    return error === '';
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setName(value);
    validateField('name', value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
    validateField('email', value);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPhone(value);
    validateField('phone', value);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setFilter({ ...filter, category: value });
    validateField('category', value);
  };

  const handleTagsChange = (tags: string[]) => {
    setTags(tags);
    const newErrors = { ...errors };
    if (tags.length === 0) {
      newErrors.tags = errorMessages.tagsRequired;
    } else {
      newErrors.tags = '';
    }
    setErrors(newErrors);
  };

  return (
    <Layout>
      <form>
        <Input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Name"
          error={errors.name}
        />
        <Input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          error={errors.email}
        />
        <Input
          type="tel"
          value={phone}
          onChange={handlePhoneChange}
          placeholder="Phone"
          error={errors.phone}
        />
        <Select
          value={filter.category}
          onChange={handleCategoryChange}
          options={categories}
          error={errors.category}
        />
        <TagInput
          tags={tags}
          onChange={handleTagsChange}
          error={errors.tags}
        />
        <Button type="submit" disabled={!validateForm()}>
          Submit
        </Button>
      </form>
    </Layout>
  );
};

export default ClientForm;