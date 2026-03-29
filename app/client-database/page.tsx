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

const validationRules = {
  name: [
    {
      rule: (value: string) => !!value,
      error: errorMessages.required,
      suggestion: suggestions.name,
    },
    {
      rule: (value: string) => value.length >= 2,
      error: errorMessages.minLength,
      suggestion: suggestions.name,
    },
  ],
  email: [
    {
      rule: (value: string) => !!value,
      error: errorMessages.required,
      suggestion: suggestions.email,
    },
    {
      rule: (value: string) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value),
      error: errorMessages.invalidEmail,
      suggestion: suggestions.email,
    },
  ],
  phone: [
    {
      rule: (value: string) => !!value,
      error: errorMessages.required,
      suggestion: suggestions.phone,
    },
    {
      rule: (value: string) => /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value),
      error: errorMessages.invalidPhone,
      suggestion: suggestions.phone,
    },
  ],
  category: [
    {
      rule: (value: string) => !!value,
      error: errorMessages.categoryRequired,
      suggestion: suggestions.category,
    },
  ],
  tags: [
    {
      rule: (value: string[]) => value.length > 0,
      error: errorMessages.tagsRequired,
      suggestion: suggestions.tags,
    },
  ],
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
  const validateField = (field: string, value: string | string[]) => {
    const rules = validationRules[field];
    let error = '';
    let suggestion = '';

    rules.forEach((rule) => {
      if (!rule.rule(value)) {
        error = rule.error;
        suggestion = rule.suggestion;
      }
    });

    return { error, suggestion };
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {
      name: '',
      email: '',
      phone: '',
      category: '',
      tags: '',
    };

    Object.keys(validationRules).forEach((field) => {
      let value: string | string[] = '';
      switch (field) {
        case 'name':
          value = name;
          break;
        case 'email':
          value = email;
          break;
        case 'phone':
          value = phone;
          break;
        case 'category':
          value = clientCategories;
          break;
        case 'tags':
          value = tags;
          break;
        default:
          break;
      }

      const { error, suggestion } = validateField(field, value);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
  };

  const handleBlur = (field: string, value: string | string[]) => {
    const { error, suggestion } = validateField(field, value);
    if (error) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validateForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        onBlur={() => handleBlur('name', name)}
        error={errors.name}
      />
      <Input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        onBlur={() => handleBlur('email', email)}
        error={errors.email}
      />
      <Input
        type="text"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
        onBlur={() => handleBlur('phone', phone)}
        error={errors.phone}
      />
      <Select
        value={clientCategories}
        onChange={(event) => setFilter(event.target.value)}
        onBlur={() => handleBlur('category', clientCategories)}
        error={errors.category}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </Select>
      <TagInput
        value={tags}
        onChange={(newTags) => setTags(newTags)}
        onBlur={() => handleBlur('tags', tags)}
        error={errors.tags}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default ClientForm;