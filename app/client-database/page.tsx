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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      default:
        break;
    }
    const { error, suggestion } = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFilter((prevFilter) => ({ ...prevFilter, category: value }));
    const { error, suggestion } = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, category: error }));
  };

  const handleTagChange = (tags: string[]) => {
    setTags(tags);
    const { error, suggestion } = validateField('tags', tags.join(','));
    setErrors((prevErrors) => ({ ...prevErrors, tags: error }));
  };

  return (
    <Layout>
      <form>
        <Input
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
          placeholder="Name"
          error={errors.name}
        />
        <Input
          type="email"
          name="email"
          value={email}
          onChange={handleInputChange}
          placeholder="Email"
          error={errors.email}
        />
        <Input
          type="text"
          name="phone"
          value={phone}
          onChange={handleInputChange}
          placeholder="Phone"
          error={errors.phone}
        />
        <Select
          name="category"
          value={filter.category}
          onChange={handleCategoryChange}
          options={categories}
          error={errors.category}
        />
        <TagInput
          tags={tags}
          onChange={handleTagChange}
          error={errors.tags}
        />
        <Button type="submit" onClick={() => validateForm()}>
          Submit
        </Button>
      </form>
    </Layout>
  );
};

export default ClientForm;