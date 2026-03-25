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

  const handleAddClient = () => {
    try {
      if (validateForm()) {
        const newClient: Client = {
          name,
          email,
          phone,
        };

        setClients((prevClients) => [...prevClients, newClient]);
        setName('');
        setEmail('');
        setPhone('');
      }
    } catch (error) {
      setFormSubmissionError('Error adding client');
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    setIsSearching(true);

    if (searchTerm.length > 0) {
      const filteredSuggestions = clients.filter((client) => {
        const clientName = client.name.toLowerCase();
        const clientEmail = client.email.toLowerCase();
        const clientPhone = client.phone.toLowerCase();
        const search = searchTerm.toLowerCase();

        return (
          clientName.includes(search) ||
          clientEmail.includes(search) ||
          clientPhone.includes(search)
        );
      });

      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
      setIsSearching(false);
    }
  };

  const handleSelectSuggestion = (client: Client) => {
    setIsSearching(false);
    setSuggestions([]);
    setSearchTerm(client.name);
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
              {suggestions.map((client) => (
                <li key={client.email}>
                  <button onClick={() => handleSelectSuggestion(client)}>
                    {client.name}
                  </button>
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
          onSort={(field, order) => {
            setSortField(field);
            setSortOrder(order);
          }}
          onPageChange={(pageNumber) => setPageNumber(pageNumber)}
          onItemsPerPageChange={(itemsPerPage) => setItemsPerPage(itemsPerPage)}
        />
        <Button onClick={handleAddClient}>Add Client</Button>
        <form>
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
          {errors.name && <div>{errors.name}</div>}
          {errors.email && <div>{errors.email}</div>}
          {errors.phone && <div>{errors.phone}</div>}
        </form>
      </div>
    </Layout>
  );
};

export default ClientDatabasePage;