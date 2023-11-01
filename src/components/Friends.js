import React from "react";
import styled from "@emotion/styled";
import { Avatar, Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import StyledBadge from "./StyledBadge";
import { socket } from "../socket";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Chat } from "phosphor-react";

const StyledChatBox = styled(Box)(({ theme }) => ({
  "&:hover": {
    cursor: "pointer",
  },
}));

const UserComponent = ({ firstName, lastName, id, online, img }) => {
  const { userId } = useSelector((state) => state.auth);
  const theme = useTheme();
  const name = `${firstName} ${lastName}`;
  return (
    <StyledChatBox
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: theme.palette.background.paper,
      }}
      p={2}
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
              <Avatar src={img} alt={name} />
            </StyledBadge>
          ) : (
            <Avatar src={img} alt={name} />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
          </Stack>
        </Stack>
        <Stack spacing={2} alignItems={"center"} direction={"row"}>
          <Button
            onClick={() => {
              socket.emit("friend-request", { to: id, from: userId }, () => {
                toast.success("Request sent");
              });
            }}
          >
            Send Request
          </Button>
        </Stack>
      </Stack>
    </StyledChatBox>
  );
};

const FriendsComponent = ({ firstName, lastName, id, online, img, setOpenDialog }) => {
  const { userId } = useSelector((state) => state.auth);
  const theme = useTheme();
  const name = `${firstName} ${lastName}`;
  return (
    <StyledChatBox
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: theme.palette.background.paper,
      }}
      p={2}
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
              <Avatar src={img} alt={name} />
            </StyledBadge>
          ) : (
            <Avatar src={img} alt={name} />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
          </Stack>
        </Stack>
        <Stack spacing={2} alignItems={"center"} direction={"row"}>
          <IconButton onClick={()=>{
            socket.emit("start-conversation", {to:id, from:userId})
            setOpenDialog(false)
          }} >
            <Chat/>
          </IconButton>
        </Stack>
      </Stack>
    </StyledChatBox>
  );
};

const FriendRequestsComponent = ({ firstName, lastName, id, online, img, requestId }) => {
  const theme = useTheme();
  const name = `${firstName} ${lastName}`;
  return (
    <StyledChatBox
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: theme.palette.background.paper,
      }}
      p={2}
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
              <Avatar src={img} alt={name} />
            </StyledBadge>
          ) : (
            <Avatar src={img} alt={name} />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
          </Stack>
        </Stack>
        <Stack spacing={2} alignItems={"center"} direction={"row"}>
          <Button
            onClick={() => {
              socket.emit("accept-request", { requestId:requestId })
            }}
          >
            Accept Request
          </Button>
        </Stack>
      </Stack>
    </StyledChatBox>
  );
};

export { UserComponent, FriendRequestsComponent, FriendsComponent };
