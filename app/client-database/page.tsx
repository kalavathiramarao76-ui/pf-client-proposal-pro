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
  };

  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);
    if (term.length > 2) {
      const matchingClients = clients.filter((client) => {
        return (
          client.name.toLowerCase().includes(term.toLowerCase()) ||
          client.email.toLowerCase().includes(term.toLowerCase()) ||
          client.phone.toLowerCase().includes(term.toLowerCase())
        );
      });
      setSuggestions(matchingClients);
      setIsSearching(true);
    } else {
      setSuggestions([]);
      setIsSearching(false);
    }
  };

  const handleSuggestionSelect = (selectedClient: Client) => {
    setSearchTerm(selectedClient.name);
    setSuggestions([]);
    setIsSearching(false);
  };

  return (
    <Layout>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Client Database</h1>
        <Button onClick={() => router.push('/clients/create')}>Create New Client</Button>
      </div>
      <div className="mb-4">
        <Input
          type="search"
          value={searchTerm}
          onChange={(e) => handleSearchTermChange(e.target.value)}
          placeholder="Search clients..."
          className="w-full"
        />
        {isSearching && (
          <ul className="absolute bg-white border shadow-md w-full mt-2">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSuggestionSelect(suggestion)}
              >
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <Table
        data={clients}
        columns={[
          { label: 'Name', accessor: 'name' },
          { label: 'Email', accessor: 'email' },
          { label: 'Phone', accessor: 'phone' },
        ]}
        pageNumber={pageNumber}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => setPageNumber(page)}
        onItemsPerPageChange={(items) => setItemsPerPage(items)}
      />
    </Layout>
  );
};

export default ClientDatabasePage;