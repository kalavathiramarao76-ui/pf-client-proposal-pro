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
          setFormSubmissionError('');
        } else {
          setErrors(validationErrors);
          setFormSubmissionError('Please fill out all required fields');
        }
      } else {
        setFormSubmissionError('Please fill out all required fields');
      }
    } catch (error) {
      setFormSubmissionError('Error adding client: ' + error.message);
    }
  };

  const handleEditClient = (client: Client) => {
    try {
      const validationErrors = validateClientData(client);
      if (Object.values(validationErrors).every((error) => error === '')) {
        setEditedClient(client);
        setIsNewClient(false);
        setName(client.name);
        setEmail(client.email);
        setPhone(client.phone);
        setFormSubmissionError('');
      } else {
        setErrors(validationErrors);
        setFormSubmissionError('Please fill out all required fields');
      }
    } catch (error) {
      setFormSubmissionError('Error editing client: ' + error.message);
    }
  };

  const handleUpdateClient = () => {
    try {
      if (validateForm()) {
        if (editedClient) {
          const updatedClient: Client = {
            id: editedClient.id,
            name,
            email,
            phone,
          };
          const validationErrors = validateClientData(updatedClient);
          if (Object.values(validationErrors).every((error) => error === '')) {
            const updatedClients = clients.map((client) => {
              if (client.id === editedClient.id) {
                return updatedClient;
              }
              return client;
            });
            setClients(updatedClients);
            setIsNewClient(false);
            setName('');
            setEmail('');
            setPhone('');
            setFormSubmissionError('');
          } else {
            setErrors(validationErrors);
            setFormSubmissionError('Please fill out all required fields');
          }
        }
      } else {
        setFormSubmissionError('Please fill out all required fields');
      }
    } catch (error) {
      setFormSubmissionError('Error updating client: ' + error.message);
    }
  };

  return (
    <Layout>
      <Table
        clients={clients}
        handleEditClient={handleEditClient}
        searchTerm={searchTerm}
        pageNumber={pageNumber}
        itemsPerPage={itemsPerPage}
      />
      <form>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          error={errors.name}
        />
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          error={errors.email}
        />
        <Input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
          error={errors.phone}
        />
        {isNewClient ? (
          <Button onClick={handleAddClient}>Add Client</Button>
        ) : (
          <Button onClick={handleUpdateClient}>Update Client</Button>
        )}
        {formSubmissionError && <p style={{ color: 'red' }}>{formSubmissionError}</p>}
      </form>
    </Layout>
  );
};

export default ClientDatabasePage;