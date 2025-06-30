import axios from "axios";
import { FinanceData } from "../types/finance";

const API_URL = "/data/financeData.json";

export const fetchFinanceData = async (): Promise<FinanceData> => {
  try {
    const response = await axios.get<FinanceData>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados financeiros:", error);
    throw new Error("Erro ao buscar dados financeiros.");
  }
};
