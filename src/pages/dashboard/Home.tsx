import React from "react";
import { Container, Box } from "@mui/material";
import SessionsCard from "../../components/cards/SessionsCard";
import FinanceCard from "../../components/cards/FinanceCard";
import TabsCard from "../../components/cards/TabsCard";
import TasksCard from "../../components/cards/TasksCard";

export default function DashboardHome(): JSX.Element {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
          gridAutoRows: "min-content",
          gridTemplateAreas: {
            xs: `
              "sessions"
              "finance"
              "tabs"
              "tasks"
            `,
            md: `
              "sessions finance"
              "tabs    tasks"
            `,
          },
        }}
      >
        <Box sx={{ gridArea: "sessions" }}>
          <SessionsCard />
        </Box>

        <Box sx={{ gridArea: "finance" }}>
          <FinanceCard />
        </Box>

        <Box sx={{ gridArea: "tabs" }}>
          <TabsCard />
        </Box>

        <Box sx={{ gridArea: "tasks" }}>
          <TasksCard />
        </Box>
      </Box>
    </Container>
  );
}
