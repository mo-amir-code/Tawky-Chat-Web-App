import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import {
  ArchiveBox,
  CircleDashed,
  MagnifyingGlass,
  Users,
} from "phosphor-react";
import React, { useState } from "react";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search/index";
import { useTheme } from "@mui/material/styles";
import { ChatList } from "../../data";
import ChatElement from "../../components/ChatElement";
import Friends from "../../sections/main/Friends";
import { useEffect } from "react";
// import { SimpleBarStyle } from "../../components/Scrollbar";
import { socket } from '../../socket'
import { useSelector } from "react-redux";


const Chats = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const theme = useTheme();
  const { userId } = useSelector((state) => state.auth )
  const {conversations} = useSelector((state) => state.conversation.directChat )

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
   
  useEffect(()=>{
    socket.emit("get-direct-conversations", {userId}, (data)=>{
      // data --> list of conversation
    })
  }, [])

  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: 320,
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F8FAFF"
              : theme.palette.background.paper,
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Stack p={3} spacing={2} sx={{ height: "100vh" }}>
          <Stack
            direction="row"
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography variant="h5">Chats</Typography>
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <IconButton
                onClick={() => {
                  handleOpenDialog();
                }}
              >
                <Users />
              </IconButton>
              <IconButton>
                <CircleDashed />
              </IconButton>
            </Stack>
          </Stack>

          <Stack sx={{ width: "100%" }}>
            <Search>
              <SearchIconWrapper>
                <MagnifyingGlass color="#709CE6" />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search" />
            </Search>
          </Stack>

          <Stack spacing={1}>
            <Stack direction={"row"} alignItems={"center"} spacing={1.5}>
              <ArchiveBox size={24} />
              <Button>Archive</Button>
            </Stack>
            <Divider />
          </Stack>

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
            {/* <SimpleBarStyle> */}
            {/* <Stack spacing={2.4}>
              <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                Pinned
              </Typography>
              {ChatList.filter((el) => el.pinned).map((el) => (
                <ChatElement {...el} />
              ))}
            </Stack> */}
            <Stack spacing={2.4}>
              <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                All Chats
              </Typography>
              {conversations.filter((el) => !el.pinned).map((el) => (
                <ChatElement {...el} />
              ))}
            </Stack>
            {/* </SimpleBarStyle> */}
          </Stack>
        </Stack>
      </Box>
      {openDialog && (
        <Friends open={openDialog} handleClose={handleCloseDialog} />
      )}
    </>
  );
};

export default Chats;
