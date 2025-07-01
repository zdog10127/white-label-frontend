import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardProps,
} from "@mui/material";

import { CustomCardBaseProps } from "../../types/cardBase";

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
      elevation={6}
      sx={{
        boxShadow: 5,

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
