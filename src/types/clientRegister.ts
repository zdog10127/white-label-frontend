import { clientSchema } from "../schemas/clientSchemas";
import { z } from "zod";

export type ClientFormData = z.infer<typeof clientSchema>;

export interface FormErrors {
  [key: string]: string;
}