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

  return (
    <Layout>
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
        <h1 className="text-3xl font-bold mb-4">Client Database</h1>
        {isNewClient || editedClient ? (
          <div className="flex flex-col mb-4">
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
            {errors.name && <div className="text-red-500">{errors.name}</div>}
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            {errors.email && <div className="text-red-500">{errors.email}</div>}
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
            />
            {errors.phone && <div className="text-red-500">{errors.phone}</div>}
            {isNewClient ? (
              <Button onClick={handleAddClient}>Add Client</Button>
            ) : (
              <Button onClick={handleUpdateClient}>Update Client</Button>
            )}
          </div>
        ) : (
          <Table
            clients={clients}
            handleEditClient={handleEditClient}
            handleDeleteClient={handleDeleteClient}
          />
        )}
      </div>
    </Layout>
  );
};

export default ClientDatabasePage;