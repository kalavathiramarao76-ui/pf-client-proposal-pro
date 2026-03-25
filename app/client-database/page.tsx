import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Client } from '../types/Client';
import { Layout } from '../components/Layout';
import { Table } from '../components/Table';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

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

    return newErrors;
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filteredClients = clients.filter((client) => {
      return (
        client.name.toLowerCase().includes(searchTerm) ||
        client.email.toLowerCase().includes(searchTerm) ||
        client.phone.toLowerCase().includes(searchTerm)
      );
    });
    setSuggestions(filteredClients);
  };

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilter({ ...filter, [name]: value });
    const filteredClients = clients.filter((client) => {
      return (
        (filter.name === '' || client.name.toLowerCase().includes(filter.name.toLowerCase())) &&
        (filter.email === '' || client.email.toLowerCase().includes(filter.email.toLowerCase())) &&
        (filter.phone === '' || client.phone.toLowerCase().includes(filter.phone.toLowerCase()))
      );
    });
    setSuggestions(filteredClients);
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
          <div>
            <label>
              Filter by name:
              <Input
                type="text"
                name="name"
                value={filter.name}
                onChange={handleFilter}
              />
            </label>
            <label>
              Filter by email:
              <Input
                type="text"
                name="email"
                value={filter.email}
                onChange={handleFilter}
              />
            </label>
            <label>
              Filter by phone:
              <Input
                type="text"
                name="phone"
                value={filter.phone}
                onChange={handleFilter}
              />
            </label>
          </div>
        </div>
        <Table
          clients={suggestions.length > 0 ? suggestions : clients}
          pageNumber={pageNumber}
          itemsPerPage={itemsPerPage}
          sortOrder={sortOrder}
          sortField={sortField}
        />
      </div>
    </Layout>
  );
};

export default ClientDatabasePage;