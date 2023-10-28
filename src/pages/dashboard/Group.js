import React from "react";
import {
  Box,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
import { MagnifyingGlass, Plus } from "phosphor-react";
import { ChatList } from "../../data";
import ChatElement from "../../components/ChatElement";
import Conversation from "../../components/Conversation";
import { useSelector } from "react-redux";
import Contact from "../../components/Contact";
import StarredMessages from "../../components/StarredMessages";
import SharedMessages from "../../components/SharedMessages";
import CreateGroup from "../../sections/main/CreateGroup";
import { useState } from "react";

const Group = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const theme = useTheme();
  const {sidebar} = useSelector((store)=>store.app);


  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  return (
    <>
      <Stack direction={"row"} sx={{ width: "100%" }}>
        {/* Left */}
        <Box
          sx={{
            height: "100vh",
            width: 320,
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,
          }}
        >
          <Stack p={3} spacing={2} sx={{ maxHeight: "100vh" }}>
            <Stack>
              <Typography variant="h5">Groups</Typography>
            </Stack>
            <Stack sx={{ width: "100%" }}>
              <Search>
                <SearchIconWrapper>
                  <MagnifyingGlass color="#709CE6" />
                </SearchIconWrapper>
                <StyledInputBase placeholder="Search" />
              </Search>
            </Stack>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography variant="subtitle2" component={Link}>
                Create New Group
              </Typography>
              <IconButton onClick={()=>setOpenDialog(true)} >
                <Plus style={{ color: theme.palette.primary.main }} />
              </IconButton>
            </Stack>
            <Divider />
            <Stack
              spacing={2}
              direction={"column"}
              sx={{
                flexGrow: 1,
                overflowY: "auto",
                height: "100%",
                "::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              <Stack spacing={2.4}>
                <Typography variant="subtitle2" sx={{ color: "#676667" }}>
                  Pinned
                </Typography>
                {/* Chat List */}
                {ChatList.filter((el) => el.pinned).map((el) => (
                  <ChatElement {...el} />
                ))}
              </Stack>
              <Stack spacing={2.4}>
                <Typography variant="subtitle2" sx={{ color: "#676667" }}>
                  All Groups
                </Typography>
                {/* Chat List */}
                {ChatList.filter((el) => !el.pinned).map((el) => (
                  <ChatElement {...el} />
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Box>

        {/* Right */}
        {/* Reuse conversation component */}
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
          <Conversation />
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
      {openDialog && <CreateGroup open={openDialog} handleClose={handleCloseDialog} />}
    </>
  );
};

export default Group;
