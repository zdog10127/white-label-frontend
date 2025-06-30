export interface FinanceData {
  financialSummary: {
    currentBalance: number;
    availableForWithdrawal: number;
  };
  financialGraphData: {
    date: string;
    income: number;
    expenses: number;
  }[];
}