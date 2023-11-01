import { Box, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { Chat_History } from "../../data";
import {
  DocMsg,
  LinkMsg,
  MediaMsg,
  ReplyMessage,
  TextMsg,
  TimeLine,
} from "./MsgTypes";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../socket";
import { NewMessageForOtherConversation, newMessage } from "../../Redux/slices/conversation/conversation";

const Message = ({ menu }) => {
  const dispatch = useDispatch();
  const { userId } = useSelector((state)=>state.auth)
  const { currentMessages, currentConversation, conversations } = useSelector(
    (state) => state.conversation.directChat
  );

  useEffect(() => {
    socket.on("new-message", (data) => {
      if(data.conversationId == currentConversation.id){
        dispatch(newMessage({ message:data.message }));
      }else{
        dispatch(NewMessageForOtherConversation({message:data}))
      }
    });

    return () => {
      socket?.off("new-message");
    };
  });


  return (
    <Box p={3}>
      <Stack spacing={3} >
        {currentMessages?.map((el, idx) => {
          switch (el.type) {
            case "divider":
              //timeline
              return <TimeLine key={idx} el={el} />;
            case "msg":
              switch (el.subtype) {
                case "img":
                  //image msg
                  return <MediaMsg key={idx} el={el} menu={menu} />;
                case "doc":
                  //Document msg
                  return <DocMsg key={idx} el={el} menu={menu} />;
                case "link":
                  //Link msg
                  return <LinkMsg key={idx} el={el} menu={menu} />;
                case "reply":
                  //Reply msg
                  return <ReplyMessage key={idx} el={el} menu={menu} />;
                default:
                  //text msg
                  return <TextMsg key={idx} el={el} menu={menu} />;
              }
            default:
              return <></>;
          }
        })}
      </Stack>
    </Box>
  );
};

export default Message;
