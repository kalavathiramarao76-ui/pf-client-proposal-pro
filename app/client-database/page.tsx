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
        setClients([...clients, newClient]);
        setName('');
        setEmail('');
        setPhone('');
        setIsNewClient(false);
      }
    } catch (error) {
      setFormSubmissionError('Error adding client');
    }
  };

  const handleEditClient = (client: Client) => {
    setEditedClient(client);
    setIsNewClient(false);
  };

  const handleUpdateClient = () => {
    try {
      if (validateForm()) {
        const updatedClients = clients.map((client) =>
          client === editedClient ? { name, email, phone } : client
        );
        setClients(updatedClients);
        setEditedClient(null);
        setIsNewClient(false);
      }
    } catch (error) {
      setFormSubmissionError('Error updating client');
    }
  };

  const handleDeleteClient = (client: Client) => {
    try {
      const updatedClients = clients.filter((c) => c !== client);
      setClients(updatedClients);
    } catch (error) {
      setFormSubmissionError('Error deleting client');
    }
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setIsSearching(true);
    const filteredClients = clients.filter((client) => {
      const clientString = `${client.name} ${client.email} ${client.phone}`.toLowerCase();
      return clientString.includes(searchTerm.toLowerCase());
    });
    setSuggestions(filteredClients);
  };

  const handleSort = (sortField: 'name' | 'email' | 'phone', sortOrder: 'asc' | 'desc') => {
    setSortField(sortField);
    setSortOrder(sortOrder);
    const sortedClients = clients.sort((a, b) => {
      if (sortField === 'name') {
        return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      } else if (sortField === 'email') {
        return sortOrder === 'asc' ? a.email.localeCompare(b.email) : b.email.localeCompare(a.email);
      } else {
        return sortOrder === 'asc' ? a.phone.localeCompare(b.phone) : b.phone.localeCompare(a.phone);
      }
    });
    setClients(sortedClients);
  };

  const handlePagination = (pageNumber: number, itemsPerPage: number) => {
    setPageNumber(pageNumber);
    setItemsPerPage(itemsPerPage);
  };

  const filteredClients = clients.filter((client) => {
    const clientString = `${client.name} ${client.email} ${client.phone}`.toLowerCase();
    return clientString.includes(searchTerm.toLowerCase());
  });

  const paginatedClients = filteredClients.slice(
    (pageNumber - 1) * itemsPerPage,
    pageNumber * itemsPerPage
  );

  return (
    <Layout>
      <h1>Client Database</h1>
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search clients"
      />
      <Table>
        <thead>
          <tr>
            <th>
              <Button onClick={() => handleSort('name', sortOrder === 'asc' ? 'desc' : 'asc')}>
                Name
              </Button>
            </th>
            <th>
              <Button onClick={() => handleSort('email', sortOrder === 'asc' ? 'desc' : 'asc')}>
                Email
              </Button>
            </th>
            <th>
              <Button onClick={() => handleSort('phone', sortOrder === 'asc' ? 'desc' : 'asc')}>
                Phone
              </Button>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedClients.map((client) => (
            <tr key={client.name}>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>
              <td>
                <Button onClick={() => handleEditClient(client)}>Edit</Button>
                <Button onClick={() => handleDeleteClient(client)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div>
        <Button onClick={() => setIsNewClient(true)}>Add Client</Button>
        {isNewClient && (
          <div>
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
            <Button onClick={handleAddClient}>Add</Button>
          </div>
        )}
        {editedClient && (
          <div>
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
            <Button onClick={handleUpdateClient}>Update</Button>
          </div>
        )}
      </div>
      <div>
        <Button onClick={() => handlePagination(pageNumber - 1, itemsPerPage)}>Prev</Button>
        <Button onClick={() => handlePagination(pageNumber + 1, itemsPerPage)}>Next</Button>
      </div>
    </Layout>
  );
};

export default ClientDatabasePage;