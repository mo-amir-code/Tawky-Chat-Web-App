import { Box, Stack } from "@mui/material";
import React from "react";
import { Chat_History } from "../../data";
import {
  DocMsg,
  LinkMsg,
  MediaMsg,
  ReplyMessage,
  TextMsg,
  TimeLine,
} from "./MsgTypes";

const Message = ({menu}) => {
  return (
    <Box p={3}>
      <Stack spacing={3}  >
        {Chat_History.map((el) => {
          switch (el.type) {
            case "divider":
              //timeline
              return <TimeLine el={el} />;
            case "msg":
              switch (el.subtype) {
                case "img":
                  //image msg
                  return <MediaMsg el={el} menu={menu} />;
                case "doc":
                  //Document msg
                  return <DocMsg el={el} menu={menu} />;
                case "link":
                  //Link msg
                  return <LinkMsg el={el} menu={menu} />;
                case "reply":
                  //Reply msg
                  return <ReplyMessage el={el} menu={menu} />;
                default:
                  //text msg
                  return <TextMsg el={el} menu={menu} />;
              }
            default:
              return<></>;
          }
        })}
      </Stack>
    </Box>
  );
};

export default Message;
