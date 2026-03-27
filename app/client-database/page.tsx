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
      case 'email':
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          newErrors.email = errorMessages.invalidEmail;
        } else {
          newErrors.email = '';
        }
        break;
      case 'phone':
        if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value)) {
          newErrors.phone = errorMessages.invalidPhone;
        } else {
          newErrors.phone = '';
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const phone = event.target.value;
    const formattedPhone = phone.replace(/[^0-9]/g, '');
    if (formattedPhone.length > 10) {
      setPhone(formattedPhone.slice(0, 10));
    } else {
      setPhone(formattedPhone);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    const formattedEmail = email.trim().toLowerCase();
    setEmail(formattedEmail);
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
          placeholder="Client Name"
          error={errors.name}
        />
        <Input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          onBlur={handleBlur}
          placeholder="Email"
          error={errors.email}
        />
        <Input
          type="tel"
          name="phone"
          value={phone}
          onChange={handlePhoneChange}
          onBlur={handleBlur}
          placeholder="Phone Number"
          error={errors.phone}
        />
        <Select
          name="category"
          value={filter.category}
          onChange={(event) => setFilter({ ...filter, category: event.target.value })}
          options={categories}
          error={errors.category}
        />
        <TagInput
          tags={tags}
          setTags={setTags}
          error={errors.tags}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Layout>
  );
};

export default ClientForm;