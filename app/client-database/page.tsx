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
        setIsNewClient(false);
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
    try {
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
        setName('');
        setEmail('');
        setPhone('');
        setIsNewClient(false);
      }
    } catch (error) {
      setFormSubmissionError('Failed to update client');
    }
  };

  const handleDeleteClient = (clientId: number) => {
    try {
      setClients((prevClients) => prevClients.filter((client) => client.id !== clientId));
    } catch (error) {
      setFormSubmissionError('Failed to delete client');
    }
  };

  const filteredClients = clients.filter((client) => {
    const clientName = client.name.toLowerCase();
    const clientEmail = client.email.toLowerCase();
    const clientPhone = client.phone.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();

    return (
      clientName.includes(searchTermLower) ||
      clientEmail.includes(searchTermLower) ||
      clientPhone.includes(searchTermLower)
    );
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
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Client Database</h1>
        <Button onClick={() => setIsNewClient(true)}>Add New Client</Button>
      </div>

      {isNewClient && (
        <div className="mb-4">
          <h2 className="text-xl font-bold">Add New Client</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter client name"
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
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter client email"
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
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter client phone number"
              />
              {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
            </div>

            <Button onClick={handleAddClient}>Add Client</Button>
          </form>
        </div>
      )}

      {editedClient && (
        <div className="mb-4">
          <h2 className="text-xl font-bold">Edit Client</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter client name"
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
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter client email"
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
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter client phone number"
              />
              {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
            </div>

            <Button onClick={handleUpdateClient}>Update Client</Button>
          </form>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="searchTerm">
          Search
        </label>
        <Input
          type="text"
          id="searchTerm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search clients"
        />
      </div>

      <Table>
        <thead>
          <tr>
            <th
              onClick={() => {
                setSortField('name');
                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
              }}
            >
              Name
            </th>
            <th
              onClick={() => {
                setSortField('email');
                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
              }}
            >
              Email
            </th>
            <th
              onClick={() => {
                setSortField('phone');
                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
              }}
            >
              Phone
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

      <div className="flex justify-between">
        <Button onClick={() => setPageNumber(pageNumber - 1)}>Previous</Button>
        <p>
          Page {pageNumber} of {Math.ceil(filteredClients.length / itemsPerPage)}
        </p>
        <Button onClick={() => setPageNumber(pageNumber + 1)}>Next</Button>
      </div>
    </Layout>
  );
};

export default ClientDatabasePage;