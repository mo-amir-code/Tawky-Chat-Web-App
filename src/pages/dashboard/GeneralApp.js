import React from "react";
import Chats from "./Chats";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import Conversation from "../../components/Conversation";
import Contact from "../../components/Contact";
import { useSelector } from "react-redux";
import SharedMessages from "../../components/SharedMessages";
import StarredMessages from "../../components/StarredMessages";
import NoChat from "../../assets/Illustration/NoChat";

const GeneralApp = () => {
  const theme = useTheme();
  const { sidebar, chatType, roomId } = useSelector((state) => state.app);
  return (
    <Stack direction={"row"} sx={{ width: "100%" }}>
      {/* Chats Component */}
      <Chats />
      {/* Conversation */}
      <Box
        sx={{
          height: "100%",
          width: sidebar.open ? "calc(100vw - 740px)" : "calc(100vw - 420px)",
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F0F4FA"
              : theme.palette.background.default,
        }}
      >
        {roomId !== null && chatType === "individual" ? (
          <Conversation />
        ) : (
          <Stack
            spacing={2}
            alignItems={"center"}
            justifyContent={"center"}
            sx={{ width: "100%", height: "100%" }}
          >
            <NoChat/>
            <Typography variant="subtitle2">
              Select a conversation or start a new one
            </Typography>
          </Stack>
        )}
      </Box>

      {/* Contact */}
      {sidebar.open &&
        (() => {
          switch (sidebar.type) {
            case "CONTACT":
              return <Contact />;
            case "STARRED":
              return <StarredMessages />;
            case "SHARED":
              return <SharedMessages />;
            default:
              return;
          }
        })()}
    </Stack>
  );
};

export default GeneralApp;
