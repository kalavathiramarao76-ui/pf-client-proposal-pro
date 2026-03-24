use client;

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

  useEffect(() => {
    const storedClients = localStorage.getItem('clients');
    if (storedClients) {
      setClients(JSON.parse(storedClients));
    }
  }, []);

  const handleAddClient = () => {
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
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <Input
              type="tel"
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
        <Table>
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td className="px-4 py-2">{client.name}</td>
                <td className="px-4 py-2">{client.email}</td>
                <td className="px-4 py-2">{client.phone}</td>
                <td className="px-4 py-2">
                  <Button onClick={() => handleEditClient(client)}>Edit</Button>
                  <Button onClick={() => handleDeleteClient(client.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Layout>
  );
};

export default ClientDatabasePage;