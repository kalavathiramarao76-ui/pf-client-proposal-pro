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
        setClients([...clients, newClient]);
        setName('');
        setEmail('');
        setPhone('');
      }
    } catch (error) {
      setFormSubmissionError('Error adding client');
    }
  };

  const handleEditClient = (client: Client) => {
    setEditedClient(client);
    setName(client.name);
    setEmail(client.email);
    setPhone(client.phone);
  };

  const handleUpdateClient = () => {
    try {
      if (validateForm()) {
        const updatedClients = clients.map((client) =>
          client.id === editedClient?.id ? { ...editedClient, name, email, phone } : client
        );
        setClients(updatedClients);
        setEditedClient(null);
        setName('');
        setEmail('');
        setPhone('');
      }
    } catch (error) {
      setFormSubmissionError('Error updating client');
    }
  };

  const handleDeleteClient = (clientId: number) => {
    try {
      const updatedClients = clients.filter((client) => client.id !== clientId);
      setClients(updatedClients);
    } catch (error) {
      setFormSubmissionError('Error deleting client');
    }
  };

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <Button onClick={handleAddClient}>Add Client</Button>
      </div>
      <div className="flex justify-between mb-4">
        <Input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search clients"
        />
        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value as 'name' | 'email' | 'phone')}
        >
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
        </select>
        <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
          {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        </button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
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
      <div className="flex justify-between mb-4">
        <button
          onClick={() => setPageNumber(pageNumber - 1)}
          disabled={pageNumber === 1}
        >
          Previous
        </button>
        <span>
          Page {pageNumber} of {Math.ceil(sortedClients.length / itemsPerPage)}
        </span>
        <button
          onClick={() => setPageNumber(pageNumber + 1)}
          disabled={pageNumber === Math.ceil(sortedClients.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
      {isNewClient && (
        <div>
          <h2>Add Client</h2>
          <form>
            <label>
              Name:
              <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
              {errors.name && <div className="text-red-500">{errors.name}</div>}
            </label>
            <label>
              Email:
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              {errors.email && <div className="text-red-500">{errors.email}</div>}
            </label>
            <label>
              Phone:
              <Input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
              {errors.phone && <div className="text-red-500">{errors.phone}</div>}
            </label>
            <Button type="submit" onClick={handleAddClient}>
              Add Client
            </Button>
          </form>
        </div>
      )}
      {editedClient && (
        <div>
          <h2>Edit Client</h2>
          <form>
            <label>
              Name:
              <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
              {errors.name && <div className="text-red-500">{errors.name}</div>}
            </label>
            <label>
              Email:
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              {errors.email && <div className="text-red-500">{errors.email}</div>}
            </label>
            <label>
              Phone:
              <Input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
              {errors.phone && <div className="text-red-500">{errors.phone}</div>}
            </label>
            <Button type="submit" onClick={handleUpdateClient}>
              Update Client
            </Button>
          </form>
        </div>
      )}
    </Layout>
  );
};

export default ClientDatabasePage;