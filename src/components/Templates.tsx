import { TemplateMetadataList } from 'aws-sdk/clients/ses'
import React from 'react'
import { deleteTemplate, listTemplates } from '../services';

type TemplatesProps = {
  templates: TemplateMetadataList
  setTemplates: (templates: TemplateMetadataList) => void;
}

const Templates: React.FC<TemplatesProps> = ({
   setTemplates,
   templates
}) => {
  const handleDelete = async (templateName?: string) => {
    if (!templateName) {
      return alert('error')
    }

    try {
      await deleteTemplate(templateName)

      alert(`Template ${templateName} deleted!`)

      const response = await listTemplates()
      if (response.TemplatesMetadata) {
        setTemplates(response.TemplatesMetadata)
      }

    } catch (error) {
      console.log('error', error)
    }
  }


  return (
    <div className='wrapper border-darkblue'>
      <h1>Templates</h1>
      <ul>
        {templates.map((template) => (
          <li key={template.Name}>
            {template.Name}
            <button onClick={() => handleDelete(template.Name)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Templates