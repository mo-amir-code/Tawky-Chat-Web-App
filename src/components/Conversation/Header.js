import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { faker } from "@faker-js/faker";
import StyledBadge from "../StyledBadge";
import { CaretDown, MagnifyingGlass, Phone, VideoCamera } from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar, updateSidebarType } from "../../Redux/slices/app/app";
import { useState } from "react";
import { useEffect } from "react";

const Header = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { currentConversation } = useSelector(
    (state) => state.conversation.directChat
  );

  // if(!currentConversation){
  //   return;
  // }

  return (
    <Box
      p={2}
      sx={{
        width: "100%",
        backgroundColor:
          theme.palette.mode === "light"
            ? "#F8FAFF"
            : theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Stack
        alignItems={"center"}
        justifyContent={"space-between"}
        direction={"row"}
        sx={{ width: "100%", height: "100%" }}
      >
        <Stack
          onClick={() => {
            // dispatch(updateSidebarType("SHARED"))
            dispatch(toggleSidebar());
          }}
          direction={"row"}
          spacing={2}
        >
          <Box>
            {currentConversation?.online ? (
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar src={currentConversation?.avatar} alt={currentConversation?.name} />
              </StyledBadge>
            ) : (
              <Avatar src={currentConversation?.avatar} alt={currentConversation?.name} />
            )}
          </Box>
          <Stack spacing={0.2}>
            <Typography variant="subtitle2">{currentConversation?.name}</Typography>
            <Typography variant="caption">
              {currentConversation?.online ? "Online" : "Offline" }
            </Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} alignItems={"center"} spacing={3}>
          <IconButton>
            <VideoCamera />
          </IconButton>
          <IconButton>
            <Phone />
          </IconButton>
          <IconButton>
            <MagnifyingGlass />
          </IconButton>
          <Divider orientation="vertical" flexItem={true} />
          <IconButton>
            <CaretDown />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Header;
