function getEasterDate(year: number): Date {
  const f = Math.floor;
  const G = year % 19;
  const C = f(year / 100);
  const H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30;
  const I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11));
  const J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7;
  const L = I - J;
  const month = 3 + f((L + 40) / 44);
  const day = L + 28 - 31 * f(month / 4);

  return new Date(year, month - 1, day);
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function getBrazilianHolidays(
  year: number = new Date().getFullYear()
): string[] {
  const easter = getEasterDate(year);

  const addDays = (date: Date, days: number): Date => {
    const copy = new Date(date);
    copy.setDate(copy.getDate() + days);
    return copy;
  };

  const holidays: Date[] = [
    new Date(year, 0, 1),
    addDays(easter, -48),
    addDays(easter, -47),
    addDays(easter, -2),
    easter,
    new Date(year, 3, 21),
    new Date(year, 4, 1),
    addDays(easter, 60),
    new Date(year, 8, 7),
    new Date(year, 9, 12),
    new Date(year, 10, 2),
    new Date(year, 10, 15),
    new Date(year, 11, 25),
  ];

  return holidays.map(formatDate);
}
