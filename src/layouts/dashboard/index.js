import React from "react";
import { Stack } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { connectSocket, socket } from "../../socket";
import toast from "react-hot-toast";
import {
  addDirectConversation,
  updateDirectConversation,
} from "../../Redux/slices/conversation/conversation";
import { SelectConversation } from "../../Redux/slices/app/app";
import { useTheme } from "@emotion/react";
import { BellRinging } from "phosphor-react";

const DashboardLayout = () => {
  const theme = useTheme();
  const { isLoggedIn, userId } = useSelector((state) => state.auth);
  const { conversations } = useSelector(
    (state) => state.conversation.directChat
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      window.onload = function () {
        if (!window.location.hash) {
          window.location = window.location + "#loaded";
          window.location.reload();
        }
      };

      window.onload();

      if (!socket) {
        connectSocket(userId);
      }

      socket.on("new-friend-request", (data) => {
        toast(data.message, {
          icon: <BellRinging/>,
          style: {
            borderRadius: "10px",
            background: theme.palette.primary.main,
            color: "#fff",
          },
        });
      });
      socket.on("request-accepted", (data) => {
        toast(data.message, {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      });
      socket.on("request-sent", (data) => {
        toast.success(data.message);
      });
      socket.on("start-chat", (data) => {
        const existingConversation = conversations.find(
          (el) => el.id === data.id.toString()
        );
        if (existingConversation) {
          dispatch(updateDirectConversation({ conversations: data, userId }));
        } else {
          dispatch(addDirectConversation({ conversations: data, userId }));
        }
        dispatch(SelectConversation({ roomId: data.id }));
      });
    }

    return () => {
      socket?.off("new-friend-request");
      socket?.off("request-accepted");
      socket?.off("request-sent");
      socket?.off("start-chat");
    };

    // eslint-disable-next-line
  }, [isLoggedIn, userId]);

  if (!isLoggedIn) {
    return <Navigate to={"/auth/login"} />;
  }

  return (
    <Stack direction={"row"}>
      {/* SideBar */}
      <SideBar />
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
