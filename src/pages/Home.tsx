import { Box } from "@mui/material";
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
      <Box
        sx={{
          display: "grid",
          gap: 4,
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
    </Box>
  );
}
