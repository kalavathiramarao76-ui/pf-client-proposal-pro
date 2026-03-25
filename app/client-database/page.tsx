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
      newErrors.phone = 'Invalid phone number (use XXX-XXX-XXXX format)';
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === '');
  };

  const validateClientData = (client: Client) => {
    const newErrors = {
      name: '',
      email: '',
      phone: '',
    };

    if (!client.name) {
      newErrors.name = 'Name is required';
    }

    if (!client.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(client.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!client.phone) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{3}-\d{3}-\d{4}$/.test(client.phone)) {
      newErrors.phone = 'Invalid phone number (use XXX-XXX-XXXX format)';
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === '');
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const handleTagChange = (tags: string[]) => {
    setFilter((prevFilter) => ({ ...prevFilter, tags }));
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const filteredClients = clients.filter((client) => {
    const nameMatch = client.name.toLowerCase().includes(filter.name.toLowerCase());
    const emailMatch = client.email.toLowerCase().includes(filter.email.toLowerCase());
    const phoneMatch = client.phone.toLowerCase().includes(filter.phone.toLowerCase());
    const categoryMatch = client.category === filter.category;
    const tagMatch = filter.tags.every((tag) => client.tags.includes(tag));

    return nameMatch && emailMatch && phoneMatch && categoryMatch && tagMatch;
  });

  return (
    <Layout>
      <h1>Client Database</h1>
      <div>
        <Input
          type="text"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name"
        />
        <Input
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
        />
        <Input
          type="text"
          name="phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="Phone"
        />
        <Select
          name="category"
          value={filter.category}
          onChange={handleCategoryChange}
          options={clientCategories}
        />
        <TagInput
          tags={filter.tags}
          onChange={handleTagChange}
          placeholder="Tags"
        />
        <Button onClick={() => console.log('Add client')}>Add Client</Button>
      </div>
      <div>
        <Input
          type="text"
          name="name"
          value={filter.name}
          onChange={handleFilterChange}
          placeholder="Filter by name"
        />
        <Input
          type="email"
          name="email"
          value={filter.email}
          onChange={handleFilterChange}
          placeholder="Filter by email"
        />
        <Input
          type="text"
          name="phone"
          value={filter.phone}
          onChange={handleFilterChange}
          placeholder="Filter by phone"
        />
        <Select
          name="category"
          value={filter.category}
          onChange={handleCategoryChange}
          options={clientCategories}
        />
        <TagInput
          tags={filter.tags}
          onChange={handleTagChange}
          placeholder="Filter by tags"
        />
      </div>
      <Table
        data={filteredClients}
        columns={[
          { name: 'Name', selector: (row) => row.name },
          { name: 'Email', selector: (row) => row.email },
          { name: 'Phone', selector: (row) => row.phone },
          { name: 'Category', selector: (row) => row.category },
          { name: 'Tags', selector: (row) => row.tags.join(', ') },
        ]}
      />
    </Layout>
  );
};

export default ClientDatabasePage;