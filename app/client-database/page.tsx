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

  const handleCategoryChange = (category: string) => {
    setFilter({ ...filter, category });
  };

  const handleTagChange = (tags: string[]) => {
    setFilter({ ...filter, tags });
  };

  const filteredClients = clients.filter((client) => {
    const nameMatch = client.name.toLowerCase().includes(filter.name.toLowerCase());
    const emailMatch = client.email.toLowerCase().includes(filter.email.toLowerCase());
    const phoneMatch = client.phone.toLowerCase().includes(filter.phone.toLowerCase());
    const categoryMatch = client.category === filter.category || filter.category === '';
    const tagMatch = filter.tags.every((tag) => client.tags.includes(tag));

    return nameMatch && emailMatch && phoneMatch && categoryMatch && tagMatch;
  });

  const handleClientCreate = () => {
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
      setFilter({ name: '', email: '', phone: '', category: '', tags: [] });
    }
  };

  const handleClientEdit = () => {
    if (validateClientData(editedClient as Client)) {
      const updatedClients = clients.map((client) => {
        if (client.name === editedClient?.name) {
          return { ...client, ...editedClient };
        }
        return client;
      });

      setClients(updatedClients);
      setEditedClient(null);
    }
  };

  const handleClientDelete = (client: Client) => {
    const updatedClients = clients.filter((c) => c.name !== client.name);
    setClients(updatedClients);
  };

  return (
    <Layout>
      <div className="flex flex-col">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Client Database</h1>
          <Button onClick={handleClientCreate}>Create New Client</Button>
        </div>
        <div className="flex flex-col mb-4">
          <Input
            type="text"
            value={filter.name}
            onChange={(e) => setFilter({ ...filter, name: e.target.value })}
            placeholder="Search by name"
          />
          <Input
            type="email"
            value={filter.email}
            onChange={(e) => setFilter({ ...filter, email: e.target.value })}
            placeholder="Search by email"
          />
          <Input
            type="text"
            value={filter.phone}
            onChange={(e) => setFilter({ ...filter, phone: e.target.value })}
            placeholder="Search by phone"
          />
          <Select
            options={categories}
            value={filter.category}
            onChange={handleCategoryChange}
            placeholder="Select category"
          />
          <TagInput
            tags={filter.tags}
            onChange={handleTagChange}
            placeholder="Add tags"
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
          onEdit={(client) => setEditedClient(client)}
          onDelete={handleClientDelete}
        />
        {isNewClient && (
          <div className="flex flex-col mb-4">
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
              options={categories}
              value={filter.category}
              onChange={handleCategoryChange}
              placeholder="Select category"
            />
            <TagInput
              tags={filter.tags}
              onChange={handleTagChange}
              placeholder="Add tags"
            />
            <Button onClick={handleClientCreate}>Create Client</Button>
          </div>
        )}
        {editedClient && (
          <div className="flex flex-col mb-4">
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
              options={categories}
              value={editedClient.category}
              onChange={(category) => setEditedClient({ ...editedClient, category })}
              placeholder="Select category"
            />
            <TagInput
              tags={editedClient.tags}
              onChange={(tags) => setEditedClient({ ...editedClient, tags })}
              placeholder="Add tags"
            />
            <Button onClick={handleClientEdit}>Save Changes</Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ClientDatabasePage;