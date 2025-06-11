import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardProps,
  SxProps,
  Theme,
} from "@mui/material";

interface CustomCardBaseProps {
  title?: React.ReactNode;
  subheader?: string;
  avatar?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  centerContent?: boolean;
  sx?: SxProps<Theme>;
}

type CardBaseProps = Omit<CardProps, "title" | "sx"> & CustomCardBaseProps;

export default function CardBase({
  title,
  subheader,
  avatar,
  actions,
  children,
  centerContent = false,
  sx,
  ...rest
}: CardBaseProps) {
  return (
    <Card
      elevation={3}
      sx={{
        minHeight: 300,
        minWidth: 300,
        borderRadius: 3,
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.01)",
        },
        ...((sx as object) || {}),
      }}
      {...rest}
    >
      {(title || avatar || subheader || actions) && (
        <CardHeader
          avatar={avatar}
          title={
            typeof title === "string" ? (
              <Typography variant="h6">{title}</Typography>
            ) : (
              title
            )
          }
          subheader={subheader}
          action={actions}
        />
      )}

      <CardContent sx={centerContent ? { textAlign: "center" } : undefined}>
        {children}
      </CardContent>
    </Card>
  );
}
