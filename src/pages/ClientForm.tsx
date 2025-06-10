import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

interface ClientData {
  name: string;
  email: string;
  phone: string;
  birthdate: string;
}

interface FormInputProps {
  id: string;
  label: string;
  name: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  name,
  type = "text",
  value,
  placeholder,
  onChange,
}) => {
  return (
    <div className="form-input">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

const ClientForm: React.FC = () => {
  const [formData, setFormData] = useState<ClientData>({
    name: "",
    email: "",
    phone: "",
    birthdate: "",
  });

  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(
      (prev: ClientData): ClientData => ({
        ...prev,
        [name]: value,
      })
    );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log(formData);
    setSubmitted(true);
  };

  return (
    <div className="client-form-container">
      <h2>Cadastro de Cliente</h2>
      <form onSubmit={handleSubmit} className="client-form">
        <FormInput
          id="name"
          label="Nome Completo"
          name="name"
          value={formData.name}
          placeholder="Ex: João da Silva"
          onChange={handleChange}
        />
        <FormInput
          id="email"
          label="E-mail"
          name="email"
          type="email"
          value={formData.email}
          placeholder="Ex: joaodasilva@email.com"
          onChange={handleChange}
        />
        <FormInput
          id="phone"
          label="Telefone"
          name="phone"
          type="tel"
          value={formData.phone}
          placeholder="(00) 00000-0000"
          onChange={handleChange}
        />
        <FormInput
          id="birthDate"
          label="Data de nascimento"
          name="birthDate"
          type="date"
          value={formData.birthdate}
          onChange={handleChange}
        />
        <button type="submit">Cadastrar</button>
      </form>
      {submitted && <p>Formulário enviado com sucesso!</p>}
    </div>
  );
};

export default ClientForm;
