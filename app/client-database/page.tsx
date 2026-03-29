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
  const [formErrors, setFormErrors] = useState({
    name: { error: '', suggestion: '' },
    email: { error: '', suggestion: '' },
    phone: { error: '', suggestion: '' },
    category: { error: '', suggestion: '' },
    tags: { error: '', suggestion: '' },
  });

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
    const newErrors = { ...formErrors };

    Object.keys(validationRules).forEach((field) => {
      const value = {
        name: name,
        email: email,
        phone: phone,
        category: clientCategories,
        tags: tags,
      }[field];

      const { error, suggestion } = validateField(field, value);

      newErrors[field] = { error, suggestion };
    });

    setFormErrors(newErrors);
  };

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
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

    validateForm();
  };

  const handleSelectChange = (field: string, value: string) => {
    switch (field) {
      case 'category':
        setFilter(value);
        break;
      default:
        break;
    }

    validateForm();
  };

  const handleTagChange = (field: string, value: string[]) => {
    switch (field) {
      case 'tags':
        setTags(value);
        break;
      default:
        break;
    }

    validateForm();
  };

  useEffect(() => {
    validateForm();
  }, [name, email, phone, clientCategories, tags]);

  return (
    <Layout>
      <div>
        <Input
          label="Name"
          value={name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          error={formErrors.name.error}
          suggestion={formErrors.name.suggestion}
        />
        <Input
          label="Email"
          value={email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={formErrors.email.error}
          suggestion={formErrors.email.suggestion}
        />
        <Input
          label="Phone"
          value={phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          error={formErrors.phone.error}
          suggestion={formErrors.phone.suggestion}
        />
        <Select
          label="Category"
          value={clientCategories}
          onChange={(e) => handleSelectChange('category', e.target.value)}
          options={categories}
          error={formErrors.category.error}
          suggestion={formErrors.category.suggestion}
        />
        <TagInput
          label="Tags"
          value={tags}
          onChange={(e) => handleTagChange('tags', e)}
          error={formErrors.tags.error}
          suggestion={formErrors.tags.suggestion}
        />
      </div>
    </Layout>
  );
};

export default ClientForm;