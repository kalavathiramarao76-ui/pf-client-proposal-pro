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
        const validationErrors = validateClientData(newClient);
        if (Object.values(validationErrors).every((error) => error === '')) {
          setClients([...clients, newClient]);
          setName('');
          setEmail('');
          setPhone('');
        }
      }
    } catch (error) {
      setFormSubmissionError('Failed to add client');
    }
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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (field: 'name' | 'email' | 'phone') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <Layout>
      <h1>Client Database</h1>
      <Input
        type="search"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search clients"
      />
      <Table>
        <thead>
          <tr>
            <th>
              <button onClick={() => handleSort('name')}>Name</button>
              {sortField === 'name' && sortOrder === 'asc' ? ' ↑' : sortField === 'name' && sortOrder === 'desc' ? ' ↓' : ''}
            </th>
            <th>
              <button onClick={() => handleSort('email')}>Email</button>
              {sortField === 'email' && sortOrder === 'asc' ? ' ↑' : sortField === 'email' && sortOrder === 'desc' ? ' ↓' : ''}
            </th>
            <th>
              <button onClick={() => handleSort('phone')}>Phone</button>
              {sortField === 'phone' && sortOrder === 'asc' ? ' ↑' : sortField === 'phone' && sortOrder === 'desc' ? ' ↓' : ''}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedClients.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage).map((client) => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>
            </tr>
          ))}
        </tbody>
      </Table>
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
      </form>
    </Layout>
  );
};

export default ClientDatabasePage;