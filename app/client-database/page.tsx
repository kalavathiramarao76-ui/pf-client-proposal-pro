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

  const handleAddClient = () => {
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
  };

  const handleEditClient = (client: Client) => {
    setEditedClient(client);
    setIsNewClient(false);
    setName(client.name);
    setEmail(client.email);
    setPhone(client.phone);
  };

  const handleUpdateClient = () => {
    if (validateForm()) {
      if (editedClient) {
        const updatedClients = clients.map((client) =>
          client.id === editedClient.id ? { ...editedClient, name, email, phone } : client
        );
        setClients(updatedClients);
        setEditedClient(null);
        setIsNewClient(true);
        setName('');
        setEmail('');
        setPhone('');
      }
    }
  };

  const handleDeleteClient = (id: number) => {
    const filteredClients = clients.filter((client) => client.id !== id);
    setClients(filteredClients);
  };

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedClients = filteredClients.slice(
    (pageNumber - 1) * itemsPerPage,
    pageNumber * itemsPerPage
  );

  const handlePageChange = (pageNumber: number) => {
    setPageNumber(pageNumber);
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage);
    setPageNumber(1);
  };

  return (
    <Layout>
      <div>
        <h1>Client Database</h1>
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
          <Button onClick={handleAddClient}>Add Client</Button>
        </div>
        <div>
          <Input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search clients"
          />
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
        <div>
          <Button onClick={() => handlePageChange(pageNumber - 1)}>Previous</Button>
          <span>
            Page {pageNumber} of {Math.ceil(filteredClients.length / itemsPerPage)}
          </span>
          <Button onClick={() => handlePageChange(pageNumber + 1)}>Next</Button>
          <select value={itemsPerPage} onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}>
            <option value={5}>5 items per page</option>
            <option value={10}>10 items per page</option>
            <option value={20}>20 items per page</option>
          </select>
        </div>
      </div>
    </Layout>
  );
};

export default ClientDatabasePage;