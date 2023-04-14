import React, { useState } from "react";
import "../App.css";
import { TemplateMetadataList } from "aws-sdk/clients/ses";
import { createTemplate, listTemplates } from "../services";

type CreateTemplateFormProps = {
  setTemplates: (templates: TemplateMetadataList) => void;
}

const CreateTemplateForm: React.FC<CreateTemplateFormProps> = ({ setTemplates }) => {
  const [templateName, setTemplateName] = useState("")
  const [subject, setSubject] = useState("")
  const [html, setHtml] = useState("")

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      await createTemplate({
        TemplateName: templateName,
        SubjectPart: subject,
        HtmlPart: html
      })

      alert(`Template: ${templateName} created!`)

      const response = await listTemplates()
      if (response.TemplatesMetadata) {
        setTemplates(response.TemplatesMetadata)
      }

      setTemplateName("")
      setSubject("")
      setHtml("")

    } catch (error) {
      console.log('error',error)
    }
  }


  return (
    <form onSubmit={handleSubmit} className="wrapper border-green">
      <div className="form-group">
        <label htmlFor="templateName">Template Name:</label>
        <input
          type="text"
          id="templateName"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="html">HTML Part:</label>
        <textarea
          id="html"
          required
          value={html}
          onChange={(e) => setHtml(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};


export default CreateTemplateForm