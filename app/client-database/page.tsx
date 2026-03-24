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

        setClients((prevClients) => [...prevClients, newClient]);
        setName('');
        setEmail('');
        setPhone('');
      }
    } catch (error) {
      setFormSubmissionError('Failed to add client');
    }
  };

  const handleEditClient = (client: Client) => {
    setEditedClient(client);
    setIsNewClient(false);
    setName(client.name);
    setEmail(client.email);
    setPhone(client.phone);
  };

  const handleUpdateClient = () => {
    if (editedClient) {
      const updatedClient: Client = {
        id: editedClient.id,
        name,
        email,
        phone,
      };

      setClients((prevClients) =>
        prevClients.map((client) => (client.id === editedClient.id ? updatedClient : client))
      );
      setEditedClient(null);
      setIsNewClient(false);
      setName('');
      setEmail('');
      setPhone('');
    }
  };

  const handleDeleteClient = (clientId: number) => {
    setClients((prevClients) => prevClients.filter((client) => client.id !== clientId));
  };

  const filteredClients = clients.filter((client) => {
    const clientString = `${client.name} ${client.email} ${client.phone}`.toLowerCase();
    return clientString.includes(searchTerm.toLowerCase());
  });

  const sortedClients = filteredClients.sort((a, b) => {
    if (sortField === 'name') {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    } else if (sortField === 'email') {
      if (sortOrder === 'asc') {
        return a.email.localeCompare(b.email);
      } else {
        return b.email.localeCompare(a.email);
      }
    } else if (sortField === 'phone') {
      if (sortOrder === 'asc') {
        return a.phone.localeCompare(b.phone);
      } else {
        return b.phone.localeCompare(a.phone);
      }
    }
    return 0;
  });

  const paginatedClients = sortedClients.slice(
    (pageNumber - 1) * itemsPerPage,
    pageNumber * itemsPerPage
  );

  return (
    <Layout>
      <h1>Client Database</h1>
      <Input
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search clients"
      />
      <Table>
        <thead>
          <tr>
            <th>
              <Button
                onClick={() => setSortField('name')}
                className={sortField === 'name' ? 'active' : ''}
              >
                Name
              </Button>
              {sortField === 'name' && (
                <Button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className={sortOrder === 'asc' ? 'asc' : 'desc'}
                >
                  {sortOrder === 'asc' ? '↑' : '↓'}
                </Button>
              )}
            </th>
            <th>
              <Button
                onClick={() => setSortField('email')}
                className={sortField === 'email' ? 'active' : ''}
              >
                Email
              </Button>
              {sortField === 'email' && (
                <Button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className={sortOrder === 'asc' ? 'asc' : 'desc'}
                >
                  {sortOrder === 'asc' ? '↑' : '↓'}
                </Button>
              )}
            </th>
            <th>
              <Button
                onClick={() => setSortField('phone')}
                className={sortField === 'phone' ? 'active' : ''}
              >
                Phone
              </Button>
              {sortField === 'phone' && (
                <Button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className={sortOrder === 'asc' ? 'asc' : 'desc'}
                >
                  {sortOrder === 'asc' ? '↑' : '↓'}
                </Button>
              )}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedClients.map((client) => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>
              <td>
                <Button onClick={() => handleEditClient(client)}>Edit</Button>
                <Button onClick={() => handleDeleteClient(client.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div>
        <Button onClick={() => setPageNumber(pageNumber - 1)}>Previous</Button>
        <span>
          Page {pageNumber} of {Math.ceil(sortedClients.length / itemsPerPage)}
        </span>
        <Button onClick={() => setPageNumber(pageNumber + 1)}>Next</Button>
      </div>
      <div>
        <Input
          type="number"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
          placeholder="Items per page"
        />
      </div>
      {isNewClient || editedClient ? (
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
          {isNewClient ? (
            <Button onClick={handleAddClient}>Add Client</Button>
          ) : (
            <Button onClick={handleUpdateClient}>Update Client</Button>
          )}
        </div>
      ) : (
        <Button onClick={() => setIsNewClient(true)}>Add New Client</Button>
      )}
    </Layout>
  );
};

export default ClientDatabasePage;