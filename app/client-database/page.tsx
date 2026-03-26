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

  const validateForm = () => {
    const newErrors = {
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
      newErrors.phone = 'Invalid phone number (use XXX-XXX-XXXX format)';
    }

    if (!filter.category) {
      newErrors.category = 'Category is required';
    } else if (!clientCategories.find((category) => category.value === filter.category)) {
      newErrors.category = 'Invalid category';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const newClients = [...clients];
    const [reorderedItem] = newClients.splice(result.source.index, 1);
    newClients.splice(result.destination.index, 0, reorderedItem);
    setClients(newClients);
  };

  const handleInlineEdit = (client: Client, field: string, value: string) => {
    const newClients = [...clients];
    const index = newClients.findIndex((c) => c === client);
    if (index !== -1) {
      newClients[index][field] = value;
      setClients(newClients);
    }
  };

  const handleColumnVisibilityToggle = (column: string) => {
    setColumnVisibility((prevColumnVisibility) => ({
      ...prevColumnVisibility,
      [column]: !prevColumnVisibility[column],
    }));
  };

  return (
    <Layout>
      <div className="flex flex-col">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Client Database</h1>
          <Button onClick={() => setIsNewClient(true)}>Add New Client</Button>
        </div>
        <div className="flex flex-col mb-4">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search clients"
          />
          <Select
            value={filter.category}
            onChange={(e) => setFilter((prevFilter) => ({ ...prevFilter, category: e.target.value }))}
            options={clientCategories}
          />
          <TagInput
            value={filter.tags}
            onChange={(tags) => setFilter((prevFilter) => ({ ...prevFilter, tags }))}
          />
        </div>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="clients">
            {(provided) => (
              <Table
                {...provided.droppableProps}
                ref={provided.innerRef}
                columns={[
                  {
                    Header: 'Name',
                    accessor: 'name',
                    visible: columnVisibility.name,
                  },
                  {
                    Header: 'Email',
                    accessor: 'email',
                    visible: columnVisibility.email,
                  },
                  {
                    Header: 'Phone',
                    accessor: 'phone',
                    visible: columnVisibility.phone,
                  },
                  {
                    Header: 'Category',
                    accessor: 'category',
                    visible: columnVisibility.category,
                  },
                  {
                    Header: 'Tags',
                    accessor: 'tags',
                    visible: columnVisibility.tags,
                  },
                ]}
                data={clients}
                onInlineEdit={handleInlineEdit}
              >
                {clients.map((client, index) => (
                  <Draggable key={client.name} draggableId={client.name} index={index}>
                    {(provided) => (
                      <tr
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <td>
                          <Input
                            type="text"
                            value={client.name}
                            onChange={(e) => handleInlineEdit(client, 'name', e.target.value)}
                          />
                        </td>
                        <td>
                          <Input
                            type="email"
                            value={client.email}
                            onChange={(e) => handleInlineEdit(client, 'email', e.target.value)}
                          />
                        </td>
                        <td>
                          <Input
                            type="text"
                            value={client.phone}
                            onChange={(e) => handleInlineEdit(client, 'phone', e.target.value)}
                          />
                        </td>
                        <td>
                          <Select
                            value={client.category}
                            onChange={(e) => handleInlineEdit(client, 'category', e.target.value)}
                            options={clientCategories}
                          />
                        </td>
                        <td>
                          <TagInput
                            value={client.tags}
                            onChange={(tags) => handleInlineEdit(client, 'tags', tags)}
                          />
                        </td>
                      </tr>
                    )}
                  </Draggable>
                ))}
              </Table>
            )}
          </Droppable>
        </DragDropContext>
        <div className="flex justify-between mt-4">
          <div className="flex">
            {Object.keys(columnVisibility).map((column) => (
              <Button
                key={column}
                onClick={() => handleColumnVisibilityToggle(column)}
                className={columnVisibility[column] ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-300 hover:bg-gray-500'}
              >
                {column.charAt(0).toUpperCase() + column.slice(1)}
              </Button>
            ))}
          </div>
          <div className="flex">
            <Button onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber === 1}>
              Previous
            </Button>
            <Button onClick={() => setPageNumber(pageNumber + 1)}>Next</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ClientDatabasePage;