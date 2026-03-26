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
        placeholder="Name"
        error={errors.name}
        className={errors.name ? 'border-red-500' : 'border-gray-300'}
      />
      <Input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email"
        error={errors.email}
        className={errors.email ? 'border-red-500' : 'border-gray-300'}
      />
      <Input
        type="text"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
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
        error={errors.tags}
        className={errors.tags ? 'border-red-500' : 'border-gray-300'}
      />
      <Button type="submit">Submit</Button>
      {Object.keys(errors).some((key) => errors[key] !== '') && (
        <div className="text-red-500 mt-2">
          Please fix the following errors:
          <ul>
            {Object.keys(errors).map((key) => (
              <li key={key}>{errors[key]}</li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
};

const ClientTable = ({
  clients,
  setClients,
  searchTerm,
  pageNumber,
  itemsPerPage,
  sortOrder,
  sortField,
  columnVisibility,
}) => {
  const filteredClients = clients.filter((client) => {
    return (
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const sortedClients = filteredClients.sort((a, b) => {
    if (sortOrder === 'asc') {
      if (a[sortField] < b[sortField]) {
        return -1;
      }
      if (a[sortField] > b[sortField]) {
        return 1;
      }
      return 0;
    } else {
      if (a[sortField] < b[sortField]) {
        return 1;
      }
      if (a[sortField] > b[sortField]) {
        return -1;
      }
      return 0;
    }
  });

  return (
    <Table
      clients={sortedClients}
      setClients={setClients}
      searchTerm={searchTerm}
      pageNumber={pageNumber}
      itemsPerPage={itemsPerPage}
      sortOrder={sortOrder}
      sortField={sortField}
      columnVisibility={columnVisibility}
    />
  );
};

export default ClientForm;