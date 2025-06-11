import React from "react";
import { Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CardBase from "./CardBase";

export default function SessionsCard() {
  return (
    <CardBase
      title="Próximas sessões"
      avatar={<CalendarMonthIcon color="primary" />}
      centerContent
    >
      <Typography variant="body2" color="text.secondary">
        Você ainda não cadastrou nenhuma sessão. <br />
        No momento, não há nenhuma sessão agendada.
      </Typography>
    </CardBase>
  );
}
