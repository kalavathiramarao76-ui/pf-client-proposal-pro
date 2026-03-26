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
    const newErrors = {
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
      setFormSubmissionError('Please fix the errors in the form');
    }
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
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case 'category':
        setFilter(prevFilter => ({ ...prevFilter, category: value }));
        break;
      default:
        break;
    }
  };

  const handleTagInput = (tags: string[]) => {
    setFilter(prevFilter => ({ ...prevFilter, tags }));
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
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
          onChange={handleSelectChange}
          options={categories}
          error={errors.category}
        />
        <TagInput
          name="tags"
          value={filter.tags}
          onChange={handleTagInput}
          error={errors.tags}
        />
        {formSubmissionError && <div style={{ color: 'red' }}>{formSubmissionError}</div>}
        <Button type="submit">Submit</Button>
      </form>
      <Table
        data={clients}
        columns={[
          { name: 'Name', selector: 'name' },
          { name: 'Email', selector: 'email' },
          { name: 'Phone', selector: 'phone' },
          { name: 'Category', selector: 'category' },
          { name: 'Tags', selector: 'tags' },
        ]}
        columnVisibility={columnVisibility}
        onColumnVisibilityChange={setColumnVisibility}
      />
    </Layout>
  );
};

export default ClientDatabasePage;