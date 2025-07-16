import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardProps,
} from "@mui/material";

import { CustomCardBaseProps } from "../../types/cardBase";

type CardBaseProps = Omit<CardProps, "title" | "sx"> &
  CustomCardBaseProps & {
    minHeight?: number | string;
  };

export default function CardBase({
  title,
  subheader,
  avatar,
  actions,
  children,
  centerContent = true,
  minHeight = 400,
  sx,
  ...rest
}: CardBaseProps) {
  return (
    <Card
      elevation={6}
      sx={{
        boxShadow: 5,
        width: "100%",
        minHeight: minHeight,
        borderRadius: 4,
        boxSizing: "border-box",

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
