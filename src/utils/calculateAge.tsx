export const calculateAge = (birthDate: string): number | null => {
  if (!birthDate || !birthDate.includes("/")) {
    return null;
  }

  const [day, month, year] = birthDate.split("/").map(Number);

  const birth = new Date(year, month - 1, day);

  if (isNaN(birth.getTime())) {
    return null;
  }

  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();
  const monthDifference = today.getMonth() - birth.getMonth();
  const dayDifference = today.getDate() - birth.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  return age;
};
