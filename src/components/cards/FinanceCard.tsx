import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  useTheme,
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CardBase from "./CardBase";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function FinanceCard() {
  const theme = useTheme();

  const [financialSummary, setFinancialSummary] = useState<{
    currentBalance: number;
    availableForWithdrawal: number;
  } | null>(null);

  const [financialGraphData, setFinancialGraphData] = useState<
    Array<{ date: string; income: number; expenses: number }>
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const loadFinanceData = async () => {
  //     try {
  //       const data = await fetchFinanceData();
  //       setFinancialSummary(data.financialSummary);
  //       setFinancialGraphData(data.financialGraphData);
  //       setLoading(false);
  //     } catch (err) {
  //       setError("Erro ao carregar dados financeiros.");
  //       setLoading(false);
  //       console.error(err);
  //     }
  //   };

  //   loadFinanceData();
  // }, []);

  if (loading) {
    return (
      <CardBase
        title="Relatório financeiro"
        avatar={<AccountBalanceIcon color="primary" />}
      >
        <Box display="flex" justifyContent="center" p={3}>
          <CircularProgress />
        </Box>
      </CardBase>
    );
  }

  if (error) {
    return (
      <CardBase
        title="Relatório financeiro"
        avatar={<AccountBalanceIcon color="primary" />}
      >
        <Box p={2}>
          <Typography color="error">{error}</Typography>
        </Box>
      </CardBase>
    );
  }

  return (
    <CardBase
      title="Relatório financeiro"
      avatar={<AccountBalanceIcon color="primary" />}
    >
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" color="text.secondary">
            Saldo atual
          </Typography>
          <Typography
            variant="h5"
            sx={{ color: theme.palette.success.main, fontWeight: 600 }}
          >
            R$ {financialSummary?.currentBalance.toFixed(2)}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" color="text.secondary">
            Disponível para saque
          </Typography>
          <Typography
            variant="h5"
            sx={{ color: theme.palette.warning.main, fontWeight: 600 }}
          >
            R$ {financialSummary?.availableForWithdrawal.toFixed(2)}
          </Typography>
        </Grid>
      </Grid>

      <Box sx={{ overflowX: "auto", padding: 1 }}>
        <LineChart
          width={600}
          height={200}
          data={financialGraphData}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip
            formatter={(value: any, name: string) => {
              const formattedValue =
                typeof value === "number"
                  ? value.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : value;

              return [
                `R$ ${formattedValue}`,
                name === "income" ? "Receitas" : "Despesas",
              ];
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="income"
            stroke={theme.palette.primary.main}
            name="Receitas"
          />
          <Line
            type="monotone"
            dataKey="expenses"
            stroke={theme.palette.secondary.main}
            name="Despesas"
          />
        </LineChart>
      </Box>
    </CardBase>
  );
}
