import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ProposalTemplate } from '../components/ProposalTemplate';
import { Layout } from '../layout';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function ProposalTemplatesPage() {
  const pathname = usePathname();
  const [templates, setTemplates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { getItem, setItem } = useLocalStorage();

  useEffect(() => {
    const storedTemplates = getItem('proposal-templates');
    if (storedTemplates) {
      setTemplates(JSON.parse(storedTemplates));
    } else {
      setTemplates([
        { id: 1, name: 'Template 1', description: 'Description 1' },
        { id: 2, name: 'Template 2', description: 'Description 2' },
        { id: 3, name: 'Template 3', description: 'Description 3' },
      ]);
      setItem('proposal-templates', JSON.stringify([
        { id: 1, name: 'Template 1', description: 'Description 1' },
        { id: 2, name: 'Template 2', description: 'Description 2' },
        { id: 3, name: 'Template 3', description: 'Description 3' },
      ]));
    }
  }, []);

  const filteredTemplates = templates.filter((template) =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
        <h1 className="text-3xl font-bold mb-4">Proposal Templates</h1>
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search templates"
          className="w-full p-2 pl-10 text-sm text-gray-700 border border-gray-200 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500"
        />
        <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => (
            <ProposalTemplate key={template.id} template={template} />
          ))}
        </div>
      </div>
    </Layout>
  );
}