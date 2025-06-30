import type { ChangeEvent } from "react";

export interface ClientData {
  name: string;
  email: string;
  phone: string;
  birthdate: string;
}

export interface FormInputProps {
  id: string;
  label: string;
  name: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
