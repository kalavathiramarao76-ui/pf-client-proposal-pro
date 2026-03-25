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

    if (filter.tags.length === 0) {
      newErrors.tags = 'At least one tag is required';
    } else if (filter.tags.some((tag) => typeof tag !== 'string' || tag.trim() === '')) {
      newErrors.tags = 'Invalid tags';
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === '');
  };

  const validateClientData = (client: Client) => {
    const newErrors = {
      name: '',
      email: '',
      category: '',
      tags: '',
    };

    if (!client.name) {
      newErrors.name = 'Name is required';
    }

    if (!client.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(client.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!client.category) {
      newErrors.category = 'Category is required';
    } else if (!clientCategories.find((category) => category.value === client.category)) {
      newErrors.category = 'Invalid category';
    }

    if (client.tags.length === 0) {
      newErrors.tags = 'At least one tag is required';
    } else if (client.tags.some((tag) => typeof tag !== 'string' || tag.trim() === '')) {
      newErrors.tags = 'Invalid tags';
    }

    return Object.values(newErrors).every((error) => error === '');
  };

  return (
    <Layout>
      <Table
        clients={clients}
        filter={filter}
        setFilter={setFilter}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        sortField={sortField}
        setSortField={setSortField}
      />
      <Button onClick={() => setIsNewClient(true)}>Add New Client</Button>
      {isNewClient && (
        <form>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <Input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
          />
          <Select
            value={filter.category}
            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
            options={clientCategories}
          />
          <TagInput
            tags={filter.tags}
            setTags={(tags) => setFilter({ ...filter, tags })}
          />
          <Button type="submit" onClick={(e) => {
            e.preventDefault();
            if (validateForm()) {
              const newClient: Client = {
                name,
                email,
                phone,
                category: filter.category,
                tags: filter.tags,
              };
              setClients([...clients, newClient]);
              setName('');
              setEmail('');
              setPhone('');
              setFilter({
                name: '',
                email: '',
                phone: '',
                category: '',
                tags: [],
              });
              setIsNewClient(false);
            }
          }}>Add Client</Button>
        </form>
      )}
      {editedClient && (
        <form>
          <Input
            type="text"
            value={editedClient.name}
            onChange={(e) => setEditedClient({ ...editedClient, name: e.target.value })}
            placeholder="Name"
          />
          <Input
            type="email"
            value={editedClient.email}
            onChange={(e) => setEditedClient({ ...editedClient, email: e.target.value })}
            placeholder="Email"
          />
          <Input
            type="text"
            value={editedClient.phone}
            onChange={(e) => setEditedClient({ ...editedClient, phone: e.target.value })}
            placeholder="Phone"
          />
          <Select
            value={editedClient.category}
            onChange={(e) => setEditedClient({ ...editedClient, category: e.target.value })}
            options={clientCategories}
          />
          <TagInput
            tags={editedClient.tags}
            setTags={(tags) => setEditedClient({ ...editedClient, tags })}
          />
          <Button type="submit" onClick={(e) => {
            e.preventDefault();
            if (validateClientData(editedClient)) {
              const updatedClients = clients.map((client) => client.id === editedClient.id ? editedClient : client);
              setClients(updatedClients);
              setEditedClient(null);
            }
          }}>Save Changes</Button>
        </form>
      )}
    </Layout>
  );
};

export default ClientDatabasePage;