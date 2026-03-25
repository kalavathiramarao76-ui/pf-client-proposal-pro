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
          id: Date.now(),
          name,
          email,
          phone,
        };
        setClients([...clients, newClient]);
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
    if (searchTerm.length > 0) {
      setIsSearching(true);
      const filteredClients = clients.filter((client) =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filteredClients);
    } else {
      setIsSearching(false);
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (client: Client) => {
    setSearchTerm(client.name);
    setSuggestions([]);
    setIsSearching(false);
  };

  return (
    <Layout>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Client Database</h1>
        <Button onClick={() => setIsNewClient(true)}>Add New Client</Button>
      </div>
      <div className="mb-4">
        <Input
          type="search"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search clients"
        />
        {isSearching && (
          <ul className="absolute bg-white border shadow-md w-full mt-2">
            {suggestions.map((client) => (
              <li
                key={client.id}
                className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelectSuggestion(client)}
              >
                {client.name}
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
        onPageChange={(pageNumber) => setPageNumber(pageNumber)}
        onSortChange={(sortOrder, sortField) => {
          setSortOrder(sortOrder);
          setSortField(sortField);
        }}
      />
      {isNewClient && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 shadow-md w-1/2">
            <h2 className="text-2xl font-bold mb-4">Add New Client</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <Input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="john.doe@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                  Phone
                </label>
                <Input
                  type="text"
                  id="phone"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="123-456-7890"
                />
                {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
              </div>
              <Button onClick={handleAddClient}>Add Client</Button>
              <Button onClick={() => setIsNewClient(false)}>Cancel</Button>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ClientDatabasePage;