/**
 * Função que calcula a idade com base em uma data de nascimento no formato DD/MM/YYYY
 * @param birthDate - string no formato "DD/MM/YYYY"
 * @returns idade (number) ou null se a data for inválida
 */
export const calculateAge = (birthDate: string): number | null => {
  // Verifica se a data contém barras (formato esperado)
  if (!birthDate || !birthDate.includes('/')) {
    return null;
  }

  // Separa dia, mês e ano e converte para números
  const [day, month, year] = birthDate.split('/').map(Number);

  // Cria a data de nascimento (lembrando que o mês começa do 0 no JS)
  const birth = new Date(year, month - 1, day);

  // Valida se é uma data válida
  if (isNaN(birth.getTime())) {
    return null;
  }

  // Data atual
  const today = new Date();

  // Calcula diferença de anos
  let age = today.getFullYear() - birth.getFullYear();
  const monthDifference = today.getMonth() - birth.getMonth();
  const dayDifference = today.getDate() - birth.getDate();

  // Ajusta se ainda não fez aniversário esse ano
  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  return age;
};