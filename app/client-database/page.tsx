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

  const handleSortChange = (field: 'name' | 'email' | 'phone', order: 'asc' | 'desc') => {
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
      <div className="client-database-page">
        <h1>Client Database</h1>
        <div className="filter-section">
          <Input
            label="Name"
            value={filter.name}
            onChange={(e) => handleFilterChange('name', e.target.value)}
          />
          <Input
            label="Email"
            value={filter.email}
            onChange={(e) => handleFilterChange('email', e.target.value)}
          />
          <Input
            label="Phone"
            value={filter.phone}
            onChange={(e) => handleFilterChange('phone', e.target.value)}
          />
          <Select
            label="Category"
            value={filter.category}
            options={clientCategories}
            onChange={(value) => handleFilterChange('category', value)}
          />
          <TagInput
            label="Tags"
            value={filter.tags}
            onChange={(tags) => handleFilterChange('tags', tags)}
          />
        </div>
        <div className="sort-section">
          <Select
            label="Sort By"
            value={sortField}
            options={[
              { value: 'name', label: 'Name' },
              { value: 'email', label: 'Email' },
              { value: 'phone', label: 'Phone' },
            ]}
            onChange={(value) => handleSortChange(value as 'name' | 'email' | 'phone', sortOrder)}
          />
          <Select
            label="Order"
            value={sortOrder}
            options={[
              { value: 'asc', label: 'Ascending' },
              { value: 'desc', label: 'Descending' },
            ]}
            onChange={(value) => handleSortChange(sortField, value as 'asc' | 'desc')}
          />
        </div>
        <div className="pagination-section">
          <Select
            label="Items Per Page"
            value={itemsPerPage}
            options={[5, 10, 20, 50]}
            onChange={(value) => handleItemsPerPageChange(value as number)}
          />
          <Button onClick={() => handlePageChange(pageNumber - 1)}>Previous</Button>
          <Button onClick={() => handlePageChange(pageNumber + 1)}>Next</Button>
        </div>
        <Table
          columns={[
            { label: 'Name', field: 'name' },
            { label: 'Email', field: 'email' },
            { label: 'Phone', field: 'phone' },
            { label: 'Category', field: 'category' },
            { label: 'Tags', field: 'tags' },
          ]}
          data={paginatedClients}
        />
      </div>
    </Layout>
  );
};

export default ClientDatabasePage;