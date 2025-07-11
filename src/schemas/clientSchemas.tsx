import { z } from "zod";

export const clientSchema = z.object({
  nomeCompleto: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .optional(),

  cpf: z
    .string()
    .min(1, "CPF é obrigatório")
    .regex(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      "CPF deve estar no formato 999.999.999-99"
    ),

  rg: z.string().optional(),

  email: z.string().email("E-mail deve ser válido").optional(),

  telefone: z
    .string()
    .regex(
      /^\(\d{2}\) \d{5}-\d{4}$/,
      "Telefone deve estar no formato (99) 99999-9999"
    )
    .optional(),

  dataNascimento: z
    .string()
    .regex(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/,
      "Data deve estar no formato DD/MM/YYYY"
    )
    .optional(),

  genero: z.string().optional(),

  nomeSocial: z.string().optional(),

  nacionalidade: z.string().optional(),

  endereco: z.string().optional(),
  numero: z.string().optional(),
  complemento: z.string().optional(),
  bairro: z.string().optional(),
  cidade: z.string().optional(),
  estado: z.string().optional(),

  cep: z
    .string()
    .regex(/^\d{5}-\d{3}$/, "CEP deve estar no formato 99999-999")
    .optional(),

  dadosBancarios: z
    .object({
      banco: z.string().optional(),
      agencia: z.string().optional(),
      conta: z.string().optional(),
    })
    .optional(),

  parente: z
    .object({
      nome: z.string().optional(),
      parentesco: z.string().optional(),
      telefone: z.string().optional(),
    })
    .optional(),

  profissao: z.string().optional(),

  renda: z
    .string()
    .regex(/^\d+([.,]\d{2})?$/, "Renda deve ser um valor válido (ex: 1500,00)")
    .optional(),

  pagamento: z.string().optional(),
  escolaridade: z.string().optional(),
  ondeNosConheceu: z.string().optional(),
  encaminhadoPor: z.string().optional(),
  observacoes: z.string().optional(),
  tags: z.array(z.string()).optional(),
  corIdentificacao: z.string().optional(),

  name: z.string().optional(),
  cellphone: z.string().optional(),
  gender: z.string().optional(),
  group: z.string().optional(),
  naturalidade: z.string().optional(),

  banco: z.string().optional(),
  agencia: z.string().optional(),
  conta: z.string().optional(),

  nomeParente: z.string().optional(),
  telefoneParente: z.string().optional(),
  parentesco: z.string().optional(),

  birth: z.any().optional(),
  age: z.string().optional(),

  sessao: z
    .object({
      Data: z.string().optional(),
      Horario: z.string().optional(),
      Status: z.string().optional(),
      Frequencia: z.string().optional(),
    })
    .optional(),
});
