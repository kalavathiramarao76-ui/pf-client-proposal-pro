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

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    if (!phoneRegex.test(phone)) {
      return 'Invalid phone number (use XXX-XXX-XXXX format)';
    }
    return '';
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      return 'Invalid email address';
    }
    return '';
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const phone = event.target.value;
    setPhone(phone);
    setErrors((prevErrors) => ({ ...prevErrors, phone: validatePhone(phone) }));
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    setEmail(email);
    setErrors((prevErrors) => ({ ...prevErrors, email: validateEmail(email) }));
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
        setErrors({
          name: '',
          email: '',
          phone: '',
        });
      }
    } catch (error) {
      setFormSubmissionError('Error adding client');
    }
  };

  return (
    <Layout>
      <Table
        clients={clients}
        searchTerm={searchTerm}
        pageNumber={pageNumber}
        itemsPerPage={itemsPerPage}
        sortOrder={sortOrder}
        sortField={sortField}
        onSearchTermChange={(term) => setSearchTerm(term)}
        onPageNumberChange={(page) => setPageNumber(page)}
        onItemsPerPageChange={(items) => setItemsPerPage(items)}
        onSortOrderChange={(order) => setSortOrder(order)}
        onSortFieldChange={(field) => setSortField(field)}
      />
      <Button onClick={handleAddClient}>Add Client</Button>
      <Input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Name"
        error={errors.name}
      />
      <Input
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Email"
        error={errors.email}
      />
      <Input
        type="tel"
        value={phone}
        onChange={handlePhoneChange}
        placeholder="Phone (XXX-XXX-XXXX)"
        error={errors.phone}
      />
    </Layout>
  );
};

export default ClientDatabasePage;