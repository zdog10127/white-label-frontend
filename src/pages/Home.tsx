import { Box, Typography } from "@mui/material";
import PatientsStatsCard from "../components/cards/PatientsStatsCard";
import RecentPatientsCard from "../components/cards/RecentPatientsCard";
import SessionsCard from "../components/cards/SessionsCard";
import FinanceCard from "../components/cards/FinanceCard";
import TabsCard from "../components/cards/TabsCard";
import TasksCard from "../components/cards/TasksCard";

export default function DashboardHome(): JSX.Element {
  return (
    <Box
      sx={{
        mt: 2,
        mb: 2,
        px: 5,
      }}
    >
      {/* Título do Dashboard */}
      <Box mb={3}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Visão geral do sistema AMPARA - White Label
        </Typography>
      </Box>

      {/* Estatísticas de Pacientes */}
      <Box mb={4}>
        <PatientsStatsCard />
      </Box>

      {/* Grid com Cards */}
      <Box
        sx={{
          display: "grid",
          gap: 4,
          gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
          gridAutoRows: "min-content",
          gridTemplateAreas: {
            xs: `
              "recent"
              "sessions"
              "finance"
              "tabs"
              "tasks"
            `,
            md: `
              "recent   sessions"
              "recent   finance"
              "tabs     tasks"
            `,
          },
        }}
      >
        <Box sx={{ gridArea: "recent" }}>
          <RecentPatientsCard />
        </Box>

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
    </Box>
  );
}