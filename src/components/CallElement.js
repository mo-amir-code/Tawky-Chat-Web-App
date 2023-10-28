import React from "react";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { faker } from "@faker-js/faker";
import { ArrowDownLeft, ArrowUpRight, Phone, VideoCamera } from "phosphor-react";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const CallLogElement = ({ id, name, img, online, incoming, missed }) => {
  const theme = useTheme();
  return (
    <>
      <Box
        p={2}
        sx={{
          width: "100%",
          borderRadius: 1,
          backgroundColor:
            theme.palette.mode === "light"
              ? "#fff"
              : theme.palette.background.default,
        }}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            {online ? (
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar src={img} />
              </StyledBadge>
            ) : (
              <Avatar src={img} />
            )}

            <Stack spacing={0.3}>
              <Typography variant="subtitle2">{name}</Typography>
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                {incoming ? (
                  <ArrowDownLeft color={missed ? "red" : "green"} />
                ) : (
                  <ArrowUpRight color={missed ? "red" : "green"} />
                )}
                <Typography variant="caption">Yesterday, 21:34</Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack spacing={2} alignItems={"center"}>
            <IconButton>
              <Phone color="green" />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

const CallElement = ({online, img, name}) => {
  const theme = useTheme()
  return (
    <>
      <Box
        p={2}
        sx={{
          width: "100%",
          borderRadius: 1,
          backgroundColor:
            theme.palette.mode === "light"
              ? "#fff"
              : theme.palette.background.default,
        }}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            {online ? (
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar src={img} />
              </StyledBadge>
            ) : (
              <Avatar src={img} />
            )}

            <Stack spacing={0.3}>
              <Typography variant="subtitle2">{name}</Typography>
            </Stack>
          </Stack>
          <Stack spacing={2} direction={'row'} alignItems={"center"}>
            <IconButton>
              <Phone color="green" />
            </IconButton>
            <IconButton>
              <VideoCamera color="green" />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export { CallLogElement, CallElement };
