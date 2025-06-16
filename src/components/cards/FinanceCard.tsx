import React from "react";
import { Typography, Box } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CardBase from "./CardBase";

export default function FinanceCard() {
  return (
    <CardBase
      title="Relatório financeiro"
      avatar={<AccountBalanceIcon color="primary" />}
      sx={{ minHeight: 400 }}
    >
      <Box sx={{ display: "flex", gap: 8 }}>
        <Box sx={{ flex: 3 }}>
          <Typography variant="subtitle2">Saldo bloqueado</Typography>
          <Typography color="warning.main">R$ 0,00</Typography>
        </Box>
        <Box sx={{ flex: 3 }}>
          <Typography variant="subtitle2">
            Saldo disponível para saque
          </Typography>
          <Typography color="primary">R$ 0,00</Typography>
        </Box>
      </Box>
    </CardBase>
  );
}
