import { z } from "zod";

export const clientSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(2, "Nome deve ter pelo menos 2 caracteres"),

  cpf: z
    .string()
    .min(1, "CPF é obrigatório")
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF deve estar no formato 999.999.999-99")
    .refine((cpf) => {
      const digits = cpf.replace(/\D/g, "");
      return digits.length === 11;
    }, "CPF deve conter 11 dígitos"),

  rg: z
    .string()
    .min(1, "RG é obrigatório")
    .min(5, "RG deve ter pelo menos 5 caracteres"),

  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .email("E-mail deve ter um formato válido"),

  cellphone: z
    .string()
    .min(1, "Celular é obrigatório")
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Celular deve estar no formato (99) 99999-9999"),

  birth: z
    .string()
    .min(1, "Data de nascimento é obrigatória")
    .regex(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/,
      "Data de nascimento deve estar no formato DD/MM/YYYY"
    ),

  age: z.string().min(1, "Idade é obrigatória"),

  gender: z.string().min(1, "Gênero é obrigatório"),

  group: z.string().min(1, "Grupo é obrigatório"),

  naturalidade: z.string().min(1, "Naturalidade é obrigatória"),

  nacionalidade: z.string().min(1, "Nacionalidade é obrigatória"),

  nomeSocial: z.string().optional(),

  observacoes: z.string().optional(),

  profissao: z.string().min(1, "Profissão é obrigatória"),

  renda: z
    .string()
    .min(1, "Renda mensal é obrigatória")
    .regex(/^\d+([.,]\d{2})?$/, "Renda deve ser um valor válido (ex: 1500,00)"),

  pagamento: z.string().min(1, "Forma de pagamento é obrigatória"),

  banco: z.string().min(1, "Banco é obrigatório"),

  agencia: z.string().min(1, "Agência é obrigatória"),

  conta: z.string().min(1, "Conta é obrigatória"),

  endereco: z.string().min(1, "Endereço é obrigatório"),

  numero: z.string().optional(),

  complemento: z.string().optional(),

  bairro: z.string().min(1, "Bairro é obrigatório"),

  cidade: z.string().min(1, "Cidade é obrigatória"),

  estado: z.string().min(1, "Estado é obrigatório"),

  cep: z
    .string()
    .min(1, "CEP é obrigatório")
    .regex(/^\d{5}-\d{3}$/, "CEP deve estar no formato 99999-999"),

  escolaridade: z.string().min(1, "Escolaridade é obrigatória"),

  ondeNosConheceu: z.string().min(1, "Campo 'Onde nos conheceu' é obrigatório"),

  encaminhadoPor: z.string().min(1, "Campo 'Encaminhado por' é obrigatório"),

  nomeParente: z.string().min(1, "Nome do parente é obrigatório"),

  parentesco: z.string().min(1, "Parentesco é obrigatório"),

  telefoneParente: z
    .string()
    .min(1, "Telefone do parente é obrigatório")
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Telefone deve estar no formato (99) 99999-9999"),

  tags: z.array(z.string()).optional(),

  corIdentificacao: z.string().min(1, "Cor de identificação é obrigatória"),
});
