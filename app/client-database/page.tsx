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

        setClients((prevClients) => [...prevClients, newClient]);
        setName('');
        setEmail('');
        setPhone('');
        setIsNewClient(false);
      }
    } catch (error) {
      setFormSubmissionError('Error adding client');
    }
  };

  const handleImportClients = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv, .json';
    fileInput.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const fileContent = event.target?.result as string;
            if (file.name.endsWith('.csv')) {
              const csvContent = fileContent.split('\n');
              const clients: Client[] = csvContent.map((row) => {
                const [name, email, phone] = row.split(',');
                return {
                  name: name.trim(),
                  email: email.trim(),
                  phone: phone.trim(),
                };
              });
              setClients(clients);
            } else if (file.name.endsWith('.json')) {
              const jsonContent = JSON.parse(fileContent);
              setClients(jsonContent);
            }
          } catch (error) {
            console.error('Error importing clients:', error);
          }
        };
        reader.readAsText(file);
      }
    };
    fileInput.click();
  };

  const handleExportClients = () => {
    const csvContent = clients.map((client) => `${client.name},${client.email},${client.phone}`).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'clients.csv';
    link.click();
  };

  return (
    <Layout>
      <h1>Client Database</h1>
      <Button onClick={handleImportClients}>Import Clients</Button>
      <Button onClick={handleExportClients}>Export Clients</Button>
      <Table
        data={clients}
        columns={[
          { name: 'Name', selector: (row) => row.name },
          { name: 'Email', selector: (row) => row.email },
          { name: 'Phone', selector: (row) => row.phone },
        ]}
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
        <Button onClick={handleAddClient}>Add Client</Button>
      </form>
    </Layout>
  );
};

export default ClientDatabasePage;