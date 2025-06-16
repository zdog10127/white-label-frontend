import React from "react";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import CardBase from "./CardBase";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography variant="body2" color="text.secondary">
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

export default function TabsCard() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <CardBase
      title="Informações"
      actions={
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="tabs card"
          textColor="primary"
          indicatorColor="primary"
          variant="standard"
        >
          <Tab label="Resumo" />
          <Tab label="Detalhes" />
          <Tab label="Histórico" />
        </Tabs>
      }
    >
      <TabPanel value={value} index={0}>
        Conteúdo do Resumo
      </TabPanel>
      <TabPanel value={value} index={1}>
        Conteúdo dos Detalhes
      </TabPanel>
      <TabPanel value={value} index={2}>
        Conteúdo do Histórico
      </TabPanel>
    </CardBase>
  );
}
