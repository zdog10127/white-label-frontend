import SessionsCard from "../../components/cards/SessionsCard";
import FinanceCard from "../../components/cards/FinanceCard";
import TabsCard from "../../components/cards/TabsCard";
import TasksCard from "../../components/cards/TasksCard";

import { Container, GridLayout, Area } from "./styles";

export default function DashboardHome(): JSX.Element {
  return (
    <Container>
      <GridLayout>
        <Area area="sessions">
          <SessionsCard />
        </Area>

        <Area area="finance">
          <FinanceCard />
        </Area>

        <Area area="tabs">
          <TabsCard />
        </Area>

        <Area area="tasks">
          <TasksCard />
        </Area>
      </GridLayout>
    </Container>
  );
}
