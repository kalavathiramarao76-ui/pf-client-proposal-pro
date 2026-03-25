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
      newErrors.phone = 'Invalid phone number (use XXX-XXX-XXXX format)';
    }

    if (!filter.category) {
      newErrors.category = 'Category is required';
    } else if (!clientCategories.find((category) => category.value === filter.category)) {
      newErrors.category = 'Invalid category';
    }

    if (!filter.tags.length) {
      newErrors.tags = 'Tags are required';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    if (searchTerm.length > 2) {
      const filteredSuggestions = clients.filter((client) => {
        const clientName = client.name.toLowerCase();
        const clientEmail = client.email.toLowerCase();
        const clientPhone = client.phone.toLowerCase();
        return (
          clientName.includes(searchTerm.toLowerCase()) ||
          clientEmail.includes(searchTerm.toLowerCase()) ||
          clientPhone.includes(searchTerm.toLowerCase())
        );
      });
      setSuggestions(filteredSuggestions);
      setIsSearching(true);
    } else {
      setSuggestions([]);
      setIsSearching(false);
    }
  };

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const filteredClients = clients.filter((client) => {
    const clientName = client.name.toLowerCase();
    const clientEmail = client.email.toLowerCase();
    const clientPhone = client.phone.toLowerCase();
    return (
      (filter.name ? clientName.includes(filter.name.toLowerCase()) : true) &&
      (filter.email ? clientEmail.includes(filter.email.toLowerCase()) : true) &&
      (filter.phone ? clientPhone.includes(filter.phone.toLowerCase()) : true) &&
      (filter.category ? client.category === filter.category : true) &&
      (filter.tags.length ? filter.tags.every((tag) => client.tags.includes(tag)) : true)
    );
  });

  return (
    <Layout>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Client Database</h1>
        <Button onClick={() => router.push('/clients/create')}>Create New Client</Button>
      </div>
      <div className="flex flex-col mb-4">
        <Input
          type="search"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search clients..."
          className="w-full mb-2"
        />
        {isSearching && (
          <ul className="list-none p-0 m-0">
            {suggestions.map((suggestion) => (
              <li key={suggestion.id} className="py-2 border-b border-gray-200">
                <a href="#" onClick={() => router.push(`/clients/${suggestion.id}`)}>
                  {suggestion.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex flex-col mb-4">
        <label className="text-lg font-bold mb-2">Filter by:</label>
        <Input
          type="text"
          name="name"
          value={filter.name}
          onChange={handleFilter}
          placeholder="Name"
          className="w-full mb-2"
        />
        <Input
          type="email"
          name="email"
          value={filter.email}
          onChange={handleFilter}
          placeholder="Email"
          className="w-full mb-2"
        />
        <Input
          type="text"
          name="phone"
          value={filter.phone}
          onChange={handleFilter}
          placeholder="Phone"
          className="w-full mb-2"
        />
        <Select
          name="category"
          value={filter.category}
          onChange={handleFilter}
          options={clientCategories}
          className="w-full mb-2"
        />
        <TagInput
          name="tags"
          value={filter.tags}
          onChange={(tags) => setFilter((prevFilter) => ({ ...prevFilter, tags }))}
          className="w-full mb-2"
        />
      </div>
      <Table
        data={filteredClients}
        columns={[
          { label: 'Name', accessor: 'name' },
          { label: 'Email', accessor: 'email' },
          { label: 'Phone', accessor: 'phone' },
          { label: 'Category', accessor: 'category' },
          { label: 'Tags', accessor: 'tags' },
        ]}
      />
    </Layout>
  );
};

export default ClientDatabasePage;