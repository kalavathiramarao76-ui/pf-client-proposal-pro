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
      case 'tags':
        if (value === '') {
          error = errorMessages.tagsRequired;
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
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
  };

  const handleCategoryChange = (value: string) => {
    const error = validateField('category', value);
    setErrors((prevErrors) => ({ ...prevErrors, category: error }));
    setFilter((prevFilter) => ({ ...prevFilter, category: value }));
  };

  const handleTagsChange = (tags: string[]) => {
    const error = validateField('tags', tags.join(','));
    setErrors((prevErrors) => ({ ...prevErrors, tags: error }));
    setTags(tags);
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
    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
          onBlur={handleBlur}
          error={errors.name}
          placeholder="Name"
        />
        <Input
          type="email"
          name="email"
          value={email}
          onChange={handleInputChange}
          onBlur={handleBlur}
          error={errors.email}
          placeholder="Email"
        />
        <Input
          type="text"
          name="phone"
          value={phone}
          onChange={handleInputChange}
          onBlur={handleBlur}
          error={errors.phone}
          placeholder="Phone"
        />
        <Select
          name="category"
          value={filter.category}
          onChange={handleCategoryChange}
          error={errors.category}
          options={categories}
        />
        <TagInput
          name="tags"
          value={tags}
          onChange={handleTagsChange}
          error={errors.tags}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Layout>
  );
};

export default ClientForm;