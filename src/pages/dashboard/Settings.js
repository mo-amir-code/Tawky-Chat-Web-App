import React from "react";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Bell,
  CaretLeft,
  Image,
  Info,
  Key,
  Keyboard,
  Lock,
  Note,
  PencilCircle,
} from "phosphor-react";
import { faker } from "@faker-js/faker";
import ShortCuts from "../../sections/settings/ShortCuts";
import { useState } from "react";

const Settings = () => {
  const [openShortCuts, setOpenShortCuts] = useState(false);
  const theme = useTheme();

  const handleOpenShortcuts = () => {
    setOpenShortCuts(true);
  };

  const handleCloseShortcuts = () => {
    setOpenShortCuts(false);
  };

  const list = [
    {
      key: 0,
      icon: <Bell size={20} />,
      title: "Notifications",
      onclick: () => {},
    },
    {
      key: 1,
      icon: <Lock size={20} />,
      title: "Privacy",
      onclick: () => {},
    },
    {
      key: 2,
      icon: <Key size={20} />,
      title: "Secuirity",
      onclick: () => {},
    },
    {
      key: 3,
      icon: <PencilCircle size={20} />,
      title: "Theme",
      onclick: () => {},
    },
    {
      key: 4,
      icon: <Image size={20} />,
      title: "Chat Wallpaper",
      onclick: () => {},
    },
    {
      key: 5,
      icon: <Note size={20} />,
      title: "Request Account Info",
      onclick: () => {},
    },
    {
      key: 6,
      icon: <Keyboard size={20} />,
      title: "Keyboard Shortcuts",
      onclick: handleOpenShortcuts,
      //   onclick: () => {},
    },
    {
      key: 7,
      icon: <Info size={20} />,
      title: "Help",
      onclick: () => {},
    },
  ];

  return (
    <>
      <Stack direction={"row"} sx={{ width: "100%" }}>
        {/* Left Panel */}
        <Box
          sx={{
            overflowY: "auto",
            height: "100vh",
            width: 320,
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Stack p={4} spacing={3}>
            {/* Headers */}
            <Stack direction={"row"} alignItems={"center"} spacing={3}>
              <IconButton>
                <CaretLeft size={24} color="#4B4B4B" />
              </IconButton>
              <Typography variant="h6">Settings</Typography>
            </Stack>
            {/* Profile */}
            <Stack direction={"row"} spacing={3}>
              <Avatar
                sx={{ height: 56, width: 56 }}
                src={faker.image.avatar()}
                alt={faker.name.fullName()}
              />
              <Stack spacing={0.5}>
                <Typography variant="article">
                  {" "}
                  {faker.name.fullName()}{" "}
                </Typography>
                <Typography variant="body2">
                  {" "}
                  {faker.random.words()}{" "}
                </Typography>
              </Stack>
            </Stack>
            {/* List of options */}
            <Stack spacing={4}>
              {list.map(({ key, icon, title, onclick }) => (
                <>
                  <Stack
                    key={key}
                    sx={{ cursor: "pointer" }}
                    spacing={2}
                    onClick={onclick}
                  >
                    <Stack direction={"row"} spacing={2} alignItems={"center"}>
                      {icon}
                      <Typography variant="body2">{title}</Typography>
                    </Stack>
                    {key !== 7 && <Divider />}
                  </Stack>
                </>
              ))}
            </Stack>
          </Stack>
        </Box>
        {/* Right Panel */}
      </Stack>
      {openShortCuts && (
        <ShortCuts open={openShortCuts} handleClose={handleCloseShortcuts} />
      )}
    </>
  );
};

export default Settings;
