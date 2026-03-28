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
    return error;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        setErrors((prevErrors) => ({ ...prevErrors, name: validateField(name, value) }));
        break;
      case 'email':
        setEmail(value);
        setErrors((prevErrors) => ({ ...prevErrors, email: validateField(name, value) }));
        break;
      case 'phone':
        setPhone(value);
        setErrors((prevErrors) => ({ ...prevErrors, phone: validateField(name, value) }));
        break;
      default:
        break;
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFilter((prevFilter) => ({ ...prevFilter, category: value }));
    setErrors((prevErrors) => ({ ...prevErrors, category: validateField(name, value) }));
  };

  const handleTagChange = (tags: string[]) => {
    setTags(tags);
    setErrors((prevErrors) => ({ ...prevErrors, tags: tags.length === 0 ? errorMessages.tagsRequired : '' }));
  };

  return (
    <Layout>
      <form>
        <Input
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
          placeholder="Client Name"
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
          placeholder="Phone Number"
          error={errors.phone}
        />
        <Select
          name="category"
          value={filter.category}
          onChange={handleSelectChange}
          options={categories}
          error={errors.category}
        />
        <TagInput
          tags={tags}
          onChange={handleTagChange}
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