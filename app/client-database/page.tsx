import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Client } from '../types/Client';
import { Layout } from '../components/Layout';
import { Table } from '../components/Table';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { TagInput } from '../components/TagInput';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const ClientForm = ({
  name,
  email,
  phone,
  setName,
  setEmail,
  setPhone,
  errors,
  setErrors,
  categories,
  clientCategories,
  setFilter,
  filter,
  tags,
  setTags,
  isNewClient,
  editedClient,
}) => {
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {
      name: '',
      email: '',
      phone: '',
      category: '',
      tags: '',
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
      newErrors.phone = 'Invalid phone number';
    }

    setErrors(newErrors);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validateForm();
  };

  return (
    <form onSubmit={handleSubmit}>
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
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email"
        error={errors.email}
      />
      <Input
        type="text"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
        placeholder="Phone"
        error={errors.phone}
      />
      <Select
        options={categories}
        value={filter.category}
        onChange={(event) => setFilter({ ...filter, category: event.target.value })}
      />
      <TagInput
        tags={tags}
        setTags={setTags}
        error={errors.tags}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

const ClientTable = ({
  clients,
  setClients,
  searchTerm,
  pageNumber,
  itemsPerPage,
  sortOrder,
  sortField,
  columnVisibility,
}) => {
  const filteredClients = clients.filter((client) => {
    return (
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const sortedClients = filteredClients.sort((a, b) => {
    if (sortOrder === 'asc') {
      if (a[sortField] < b[sortField]) {
        return -1;
      }
      if (a[sortField] > b[sortField]) {
        return 1;
      }
      return 0;
    } else {
      if (a[sortField] < b[sortField]) {
        return 1;
      }
      if (a[sortField] > b[sortField]) {
        return -1;
      }
      return 0;
    }
  });

  const paginatedClients = sortedClients.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage);

  return (
    <Table
      columns={[
        { name: 'Name', field: 'name', visible: columnVisibility.name },
        { name: 'Email', field: 'email', visible: columnVisibility.email },
        { name: 'Phone', field: 'phone', visible: columnVisibility.phone },
        { name: 'Category', field: 'category', visible: columnVisibility.category },
        { name: 'Tags', field: 'tags', visible: columnVisibility.tags },
      ]}
      data={paginatedClients}
      onRowClick={(client) => console.log(client)}
    />
  );
};

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
    category: '',
    tags: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [formSubmissionError, setFormSubmissionError] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortField, setSortField] = useState<'name' | 'email' | 'phone'>('name');
  const [suggestions, setSuggestions] = useState<Client[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [filter, setFilter] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    tags: [],
  });
  const [categories, setCategories] = useState([
    { value: 'individual', label: 'Individual' },
    { value: 'business', label: 'Business' },
  ]);
  const [tags, setTags] = useState([]);
  const [clientCategories, setClientCategories] = useState([
    { value: 'lead', label: 'Lead' },
    { value: 'prospect', label: 'Prospect' },
    { value: 'customer', label: 'Customer' },
  ]);
  const [columnVisibility, setColumnVisibility] = useState({
    name: true,
    email: true,
    phone: true,
    category: true,
    tags: true,
  });

  useEffect(() => {
    const storedClients = localStorage.getItem('clients');
    if (storedClients) {
      setClients(JSON.parse(storedClients));
    }
  }, []);

  return (
    <Layout>
      <ClientForm
        name={name}
        email={email}
        phone={phone}
        setName={setName}
        setEmail={setEmail}
        setPhone={setPhone}
        errors={errors}
        setErrors={setErrors}
        categories={categories}
        clientCategories={clientCategories}
        setFilter={setFilter}
        filter={filter}
        tags={tags}
        setTags={setTags}
        isNewClient={isNewClient}
        editedClient={editedClient}
      />
      <ClientTable
        clients={clients}
        setClients={setClients}
        searchTerm={searchTerm}
        pageNumber={pageNumber}
        itemsPerPage={itemsPerPage}
        sortOrder={sortOrder}
        sortField={sortField}
        columnVisibility={columnVisibility}
      />
    </Layout>
  );
};

export default ClientDatabasePage;