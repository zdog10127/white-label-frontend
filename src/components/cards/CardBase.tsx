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
  centerContent = true,
  sx,
  ...rest
}: CardBaseProps) {
  return (
    <Card
      elevation={3}
      sx={{
        marginTop: 4,
        boxShadow: 5,
        padding: 1,
        marginBottom: 1,
        marginRight: 30,
        marginLeft: 0.1,  
        minHeight: 400,
        width: "100%",
        borderRadius: 4,

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

      <CardContent
        sx={
          centerContent
            ? {
                textAlign: "center",
              }
            : undefined
        }
      >
        {children}
      </CardContent>
    </Card>
  );
}
