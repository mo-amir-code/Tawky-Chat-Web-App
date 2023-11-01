import { Box, IconButton, Stack } from "@mui/material";
import { Check, X } from "phosphor-react";
import { useSelector } from "react-redux";
import { DocMsg, LinkMsg, MediaMsg, ReplyMessage, TextMsg } from "./Conversation/MsgTypes";


const CapturedImagePreview = ({ image, setImageShow, setCapturedPhoto }) => {
  return (
    <>
      <Box
        component={"img"}
        src={image}
        sx={{
          maxWidth: "100%",
          boxShadow: "1px 1px 15px black ",
          borderRadius: 1.5
        }}
      />
      <Stack
        direction={"row"}
        justifyContent={"end"}
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          width: "100%",
        }}
      >
        <IconButton
          onClick={() => {
            setCapturedPhoto(null);
            setImageShow(null);
          }}
        >
          <X color="white" size={25} />
        </IconButton>
      </Stack>
    </>
  );
};

const ReplyMessagePreview = () => {
  const { selectedReplyMessage } = useSelector((state) => state.conversation );

  return <>
  {(()=>{
    switch(selectedReplyMessage.subtype){
      case "text":
        return <TextMsg el={selectedReplyMessage} preview={true} />
      case "link":
        return <LinkMsg el={selectedReplyMessage} preview={true} />
      case "img":
        return <MediaMsg el={selectedReplyMessage} preview={true} />
      case "doc":
        return <DocMsg el={selectedReplyMessage} preview={true} />
      default:
        return <DocMsg el={selectedReplyMessage} preview={true} />
    }
  })()}
  
  </>
}


const ReplyMessageTemplate = ({message, isReply, incoming}) => {

  return (()=>{
    switch(message.type){
      case "text":
        return <TextMsg el={{...message, incoming}} isReply={isReply} preview={true} />
      case "link":
        return <LinkMsg el={{...message, incoming}} isReply={isReply} preview={true} />
      case "img":
        return <MediaMsg el={{...message, incoming}} isReply={isReply} preview={true} />
      case "doc":
        return <DocMsg el={{...message, incoming}} isReply={isReply} preview={true} />
      default:
        return;
    }
  })()
}

export { CapturedImagePreview, ReplyMessagePreview,ReplyMessageTemplate };
