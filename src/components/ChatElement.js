import { Avatar, Badge, Box, Stack, Typography, styled, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { SelectConversation } from "../Redux/slices/app/app";
import { socket } from '../socket'
import { ClearUnread, selectExistingConversation } from "../Redux/slices/conversation/conversation";


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

const ChatElement = ({ id, name, img, msg, time, unread, online, userId }) => {
    const theme = useTheme()
    const dispatch = useDispatch()
  return (
    <Box
      p={2}
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: theme.palette.mode === "light"? "#fff" : theme.palette.background.default,
      }}
      onClick={()=>{
        dispatch(SelectConversation({roomId:id}))
        dispatch(ClearUnread({id}))
        socket.emit("select-existing-conversation", {roomId:id, userId}, (data) => {
          dispatch(selectExistingConversation({roomId:data.id, messages:data.messages}))
        } )
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} spacing={2}>
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
            <Typography variant="caption">
              {msg.slice(0, 16)}
              {msg.length > 16 ? "..." : ""}
            </Typography>
          </Stack>
        </Stack>
        <Stack spacing={2} alignItems={"center"}>
          <Typography sx={{ fontWeight: 600 }} variant="caption">
            {time}
          </Typography>
          <Badge color="primary" badgeContent={unread} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default ChatElement