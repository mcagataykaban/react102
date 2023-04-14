import React, { useState } from "react";
import { sendEmail } from "../services";
import "../App.css";

type SendEmailFormProps = {}

const SendEmailForm: React.FC<SendEmailFormProps> = () => {
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [templateName, setTemplateName] = useState("")

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await sendEmail({
        Source: from,
        Destination: {
          ToAddresses: [to]
        },
        Template: templateName,
        TemplateData: "{}"
      })

      alert(`sended`)

      setFrom("")
      setTemplateName("")
      setTo("")
      
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <form onSubmit={handleSubmit} className="wrapper border-orange">
      <div className="form-group">
        <label htmlFor="from">From:</label>
        <input
          type="email"
          id="from"
          required
          value={from}
          onChange={(e)=> setFrom(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="to">To:</label>
        <input
          type="email"
          id="to"
          required
          value={to}
          onChange={(e)=> setTo(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="template">Template Name:</label>
        <input
          id="template"
          required
          value={templateName}
          onChange={(e)=> setTemplateName(e.target.value)}
        />
      </div>
      <button type="submit">Send Email</button>
    </form>
  );
};

export default SendEmailForm;
