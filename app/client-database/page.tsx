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

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    if (searchTerm.length > 2) {
      const filteredSuggestions = clients.filter((client) => {
        return (
          client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.phone.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setSuggestions(filteredSuggestions);
      setIsSearching(true);
    } else {
      setSuggestions([]);
      setIsSearching(false);
    }
  };

  const handleSuggestionClick = (suggestion: Client) => {
    setSearchTerm(suggestion.name);
    setSuggestions([]);
    setIsSearching(false);
  };

  return (
    <Layout>
      <div>
        <h1>Client Database</h1>
        <div>
          <Input
            type="search"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search clients"
          />
          {isSearching && (
            <ul>
              {suggestions.map((suggestion) => (
                <li key={suggestion.name} onClick={() => handleSuggestionClick(suggestion)}>
                  {suggestion.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <Table
          clients={clients}
          pageNumber={pageNumber}
          itemsPerPage={itemsPerPage}
          sortOrder={sortOrder}
          sortField={sortField}
          onSortChange={(sortField, sortOrder) => {
            setSortField(sortField);
            setSortOrder(sortOrder);
          }}
          onPageChange={(pageNumber) => setPageNumber(pageNumber)}
          onItemsPerPageChange={(itemsPerPage) => setItemsPerPage(itemsPerPage)}
        />
        <Button onClick={() => setIsNewClient(true)}>Add New Client</Button>
        {isNewClient && (
          <div>
            <Input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Name"
            />
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
            />
            <Input
              type="text"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="Phone"
            />
            <Select
              value={filter.category}
              onChange={(event) => setFilter({ ...filter, category: event.target.value })}
              options={clientCategories}
            />
            <TagInput
              tags={filter.tags}
              onAddTag={(tag) => setFilter({ ...filter, tags: [...filter.tags, tag] })}
              onRemoveTag={(tag) => setFilter({ ...filter, tags: filter.tags.filter((t) => t !== tag) })}
            />
            <Button onClick={validateForm}>Save Client</Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ClientDatabasePage;