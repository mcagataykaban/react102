import React, { useState, useEffect } from 'react';
import './App.css';
import CreateTemplateForm from './components/CreateTemplateForm';
import { TemplateMetadataList } from 'aws-sdk/clients/ses';
import Templates from './components/Templates';
import SendEmailForm from './components/SendEmail';
import { listTemplates } from './services';

function App() {
  const [templates, setTemplates] = useState<TemplateMetadataList>([]);

  useEffect(() => {
    async function fetchTemplates() {
      const response = await listTemplates()
      if (response.TemplatesMetadata) {
        setTemplates(response.TemplatesMetadata)
      }
    }

    fetchTemplates()
  }, [])
  

  return (
    <div className='wrapper border-pink'>
      <Templates templates={templates} setTemplates={setTemplates} />
      <CreateTemplateForm setTemplates={setTemplates} />
      <SendEmailForm />
    </div>
  );
}

export default App;


