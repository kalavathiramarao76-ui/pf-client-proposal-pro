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
      newErrors.tags = 'Tags are required';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  const filteredClients = clients.filter((client) => {
    const nameMatch = client.name.toLowerCase().includes(filter.name.toLowerCase());
    const emailMatch = client.email.toLowerCase().includes(filter.email.toLowerCase());
    const phoneMatch = client.phone.toLowerCase().includes(filter.phone.toLowerCase());
    const categoryMatch = client.category === filter.category;
    const tagsMatch = filter.tags.every((tag) => client.tags.includes(tag));

    return nameMatch && emailMatch && phoneMatch && categoryMatch && tagsMatch;
  });

  const sortedClients = filteredClients.sort((a, b) => {
    if (sortField === 'name') {
      return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else if (sortField === 'email') {
      return sortOrder === 'asc' ? a.email.localeCompare(b.email) : b.email.localeCompare(a.email);
    } else if (sortField === 'phone') {
      return sortOrder === 'asc' ? a.phone.localeCompare(b.phone) : b.phone.localeCompare(a.phone);
    }
    return 0;
  });

  const paginatedClients = sortedClients.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage);

  const handleFilterChange = (field: string, value: string | string[]) => {
    setFilter((prevFilter) => ({ ...prevFilter, [field]: value }));
  };

  const handleSortChange = (field: string, order: 'asc' | 'desc') => {
    setSortField(field);
    setSortOrder(order);
  };

  const handlePageChange = (pageNumber: number) => {
    setPageNumber(pageNumber);
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage);
  };

  return (
    <Layout>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between mb-4">
          <h1 className="text-2xl font-bold">Client Database</h1>
          <Button onClick={() => setIsNewClient(true)}>Add New Client</Button>
        </div>
        <div className="flex flex-row justify-between mb-4">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search clients"
          />
          <Select
            value={filter.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            options={clientCategories}
          />
          <TagInput
            value={filter.tags}
            onChange={(tags) => handleFilterChange('tags', tags)}
            placeholder="Filter by tags"
          />
        </div>
        <Table
          columns={[
            { field: 'name', header: 'Name' },
            { field: 'email', header: 'Email' },
            { field: 'phone', header: 'Phone' },
            { field: 'category', header: 'Category' },
            { field: 'tags', header: 'Tags' },
          ]}
          data={paginatedClients}
          onSortChange={handleSortChange}
          sortOrder={sortOrder}
          sortField={sortField}
        />
        <div className="flex flex-row justify-between mt-4">
          <Button onClick={() => handlePageChange(pageNumber - 1)}>Previous</Button>
          <span>
            Page {pageNumber} of {Math.ceil(sortedClients.length / itemsPerPage)}
          </span>
          <Button onClick={() => handlePageChange(pageNumber + 1)}>Next</Button>
          <Select
            value={itemsPerPage}
            onChange={(e) => handleItemsPerPageChange(parseInt(e.target.value))}
            options={[10, 20, 50]}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ClientDatabasePage;