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
import { MagnifyingGlass, Phone } from "phosphor-react";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
import { useSelector } from "react-redux";
import { useState } from "react";
import { CallLogElement } from "../../components/CallElement";
import { CallLogs } from "../../data";
import StartCall from "../../sections/main/StartCall";

const Call = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const theme = useTheme();
  const { sidebar } = useSelector((store) => store.app);

  const handleClose = () => {
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
              <Typography variant="h5">Call Log</Typography>
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
              <Typography variant="subtitle2" component={Link} >
                Start new conversation
              </Typography>
              <IconButton onClick={() => setOpenDialog(true)}>
                <Phone style={{ color: theme.palette.primary.main }} />
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
                {/* Chat list */}
                {CallLogs.map((log)=>(<CallLogElement {...log} />))}
              </Stack>
            </Stack>
          </Stack>
        </Box>

        {/* Right: This is todo task */}
      </Stack>
      {openDialog && <StartCall open={openDialog} handleClose={handleClose} />}
    </>
  );
};

export default Call;
