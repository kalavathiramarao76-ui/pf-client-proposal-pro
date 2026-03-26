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

const ClientDatabasePage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [clients, setClients] = useLocalStorage<Client[]>('clients', []);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isNewClient, setIsNewClient] = useState(false);
  const [editedClient, setEditedClient] = useState<Client | null>(null);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    tags: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [formSubmissionError, setFormSubmissionError] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortField, setSortField] = useState<'name' | 'email' | 'phone'>('name');
  const [suggestions, setSuggestions] = useState<Client[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [filter, setFilter] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    tags: [],
  });
  const [categories, setCategories] = useState([
    { value: 'individual', label: 'Individual' },
    { value: 'business', label: 'Business' },
  ]);
  const [tags, setTags] = useState([]);
  const [clientCategories, setClientCategories] = useState([
    { value: 'lead', label: 'Lead' },
    { value: 'prospect', label: 'Prospect' },
    { value: 'customer', label: 'Customer' },
  ]);
  const [columnVisibility, setColumnVisibility] = useState({
    name: true,
    email: true,
    phone: true,
    category: true,
    tags: true,
  });

  useEffect(() => {
    const storedClients = localStorage.getItem('clients');
    if (storedClients) {
      setClients(JSON.parse(storedClients));
    }
  }, []);

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
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!phone) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{3}-\d{3}-\d{4}$/.test(phone)) {
      newErrors.phone = 'Invalid phone number. Please use the format XXX-XXX-XXXX';
    }

    if (Object.values(newErrors).some(error => error !== '')) {
      setErrors(newErrors);
      return false;
    }

    return true;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      // Form submission logic here
    } else {
      setFormSubmissionError('Please fill out all required fields');
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    if (errors.name) {
      setErrors({ ...errors, name: '' });
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (errors.email) {
      setErrors({ ...errors, email: '' });
    }
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
    if (errors.phone) {
      setErrors({ ...errors, phone: '' });
    }
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
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
          type="text"
          value={phone}
          onChange={handlePhoneChange}
          placeholder="Phone"
          error={errors.phone}
        />
        {formSubmissionError && <p style={{ color: 'red' }}>{formSubmissionError}</p>}
        <Button type="submit">Submit</Button>
      </form>
      <Table
        clients={clients}
        searchTerm={searchTerm}
        pageNumber={pageNumber}
        itemsPerPage={itemsPerPage}
        sortOrder={sortOrder}
        sortField={sortField}
        filter={filter}
        columnVisibility={columnVisibility}
      />
    </Layout>
  );
};

export default ClientDatabasePage;