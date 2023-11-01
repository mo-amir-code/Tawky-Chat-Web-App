import React, { useState } from "react";
import {
  Camera,
  File,
  Image,
  LinkSimple,
  PaperPlaneTilt,
  Smiley,
  Sticker,
  User,
  X,
} from "phosphor-react";
import {
  Box,
  Fab,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { socket } from "../../socket";
import { useDispatch, useSelector } from "react-redux";
import TakePhoto from "../web-cam/TakePhoto";
import SelectFile from "../SelectFile";
import { useRef } from "react";
import { CapturedImagePreview, ReplyMessagePreview } from "../PreviewMessages";
import { ToggleIsReplyStatus } from "../../Redux/slices/conversation/conversation";
import { useEffect } from "react";

const StyledInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    paddingTop: "12px",
    paddingBottom: "12px",
  },
}));

const ChatInput = ({
  setOpenPicker,
  setInputText,
  inputText,
  setOpenCamera,
  handleMessageSubmit,
  inputRef,
}) => {
  const [openActions, setOpenActions] = useState(false);

  const handleCamera = (title) => {
    switch (title) {
      case "Image":
        setOpenCamera(true);
        break;
      case "Photo/Video":
        inputRef.current.click();
        break;
      case "Document":
        inputRef.current.click();
        break;
      default:
        return;
    }
  };

  const handleKey = (e) => {
    if (e.key == "Enter") {
      handleMessageSubmit();
    }
  };

  return (
    <StyledInput
      fullWidth
      onKeyDown={handleKey}
      value={inputText}
      onChange={(e) => setInputText(e.target.value)}
      placeholder="Write a message..."
      variant="filled"
      InputProps={{
        disableUnderline: true,
        startAdornment: (
          <Stack sx={{ width: "max-content" }}>
            <Stack
              sx={{
                position: "relative",
                display: openActions ? "inline" : "none",
              }}
            >
              {Actions.map((el, idx) => (
                <Tooltip key={idx} title={el.title} placement="right">
                  <Fab
                    onClick={() => {
                      handleCamera(el.title);
                      setOpenActions((prev) => !prev);
                    }}
                    sx={{
                      position: "absolute",
                      top: -el.y,
                      backgroundColor: el.color,
                    }}
                  >
                    {el.icon}
                  </Fab>
                </Tooltip>
              ))}
            </Stack>
            <InputAdornment>
              <IconButton onClick={() => setOpenActions((prev) => !prev)}>
                <LinkSimple />
              </IconButton>
            </InputAdornment>
          </Stack>
        ),
        endAdornment: (
          <InputAdornment>
            <IconButton onClick={() => setOpenPicker((prev) => !prev)}>
              <Smiley />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

const Actions = [
  {
    color: "#4da5fe",
    icon: <Image size={24} />,
    y: 102,
    title: "Photo/Video",
  },
  {
    color: "#1b8cfe",
    icon: <Sticker size={24} />,
    y: 172,
    title: "Stickers",
  },
  {
    color: "#0172e4",
    icon: <Camera size={24} />,
    y: 242,
    title: "Image",
  },
  {
    color: "#0159b2",
    icon: <File size={24} />,
    y: 312,
    title: "Document",
  },
  {
    color: "#013f7f",
    icon: <User size={24} />,
    y: 382,
    title: "Contact",
  },
];

const Footer = () => {
  const [openPicker, setOpenPicker] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);
  const [inputText, setInputText] = useState("");
  const [inputFile, setInputFile] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [captureImageShow, setCaptureImageShow] = useState(null);
  const [replyElementHeight, setReplyElementHeight] = useState(null);
  const replyRef = useRef();
  const inputRef = useRef();
  const dispatch = useDispatch();
  const { isReply, selectedReplyMessage } = useSelector(
    (state) => state.conversation
  );
  const { currentConversation } = useSelector(
    (state) => state.conversation.directChat
  );
  const { userId } = useSelector((state) => state.auth);
  const theme = useTheme();

  const handleMessageSubmit = () => {
    let msg = {
      to: currentConversation.userId,
      from: userId,
      type: "Text",
      message: inputText,
      isCapturedImage: false,
      conversationId: currentConversation.id,
      userId,
    };
    if (isReply) {
      delete msg["isCapturedImage"];
      msg.type = "Reply";
      if (inputFile !== null) {
        if (inputFile.type.startsWith("image")) {
          msg["subtype"] = "Media";
        } else {
          msg["subtype"] = "Document";
        }
        msg.message = inputFile;
        msg["fileName"] = inputFile.name;
        setInputFile(null);
      } else if (capturedPhoto !== null) {
        msg["subtype"] = "Media";
        msg.message = capturedPhoto;
        msg["fileName"] = `camera${Math.floor(Math.random() * 1000000)}`;
        setCapturedPhoto(null);
      } else if (inputText.at(-3) === "." || inputText.at(-4) === ".") {
        msg["subtype"] = "Link";
        msg.message = inputText;
        setInputText("");
      } else if (inputText.length > 0) {
        msg["subtype"] = "Text";
        msg.message = inputText;
        setInputText("");
      }
      msg["reply"] = {
        type: selectedReplyMessage.subtype,
        message: selectedReplyMessage.message || selectedReplyMessage.file,
      };
      socket.emit("reply-message", msg);
      dispatch(ToggleIsReplyStatus({ type: false }));
    } else if (
      inputText.length == 0 &&
      inputFile === null &&
      capturedPhoto === null
    ) {
      return;
    } else if (capturedPhoto !== null) {
      msg.type = "Media";
      msg.isCapturedImage = true;
      msg["file"] = capturedPhoto;
      socket.emit("file-message", msg);
      setCapturedPhoto(null);
      setCaptureImageShow(null);
    } else if (inputFile !== null) {
      if (inputFile.type.startsWith("image")) {
        msg.type = "Media";
      } else {
        msg.type = "Document";
      }
      msg["file"] = inputFile;
      msg["fileName"] = inputFile.name;
      socket.emit("file-message", msg);
      setInputFile();
    } else if (inputText.at(-3) === "." || inputText.at(-4) === ".") {
      msg.type = "Link";
      setInputText("");
      socket.emit("text-message", msg);
    } else if (inputText.length > 0) {
      setInputText("");
      socket.emit("text-message", msg);
    }
  };

  useEffect(() => {
    if (isReply) {
      const replyElemenHeight = replyRef.current.offsetHeight;
      setReplyElementHeight(replyElemenHeight);
    }
  }, [selectedReplyMessage]);

  const handleCloseCamera = () => {
    setOpenCamera(false);
  };

  const handleEmojiSelect = (e) => {
    setInputText((prev) => prev + e.native);
  };

  return (
    <Box sx={{ position: "relative" }}>
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
        <Stack direction={"row"} alignItems={"center"} spacing={3}>
          <Stack sx={{ width: "100%" }}>
            {/* chat input */}
            <SelectFile inputFileRef={inputRef} setInputFile={setInputFile} />
            <Box
              sx={{
                display: openPicker ? "inline" : "none",
                zIndex: 0,
                position: "fixed",
                bottom: 81,
                right: 100,
              }}
            >
              <Picker
                data={data}
                onEmojiSelect={(e) => {
                  handleEmojiSelect(e);
                }}
                theme={theme.palette.mode}
              />
            </Box>
            <ChatInput
              setOpenPicker={setOpenPicker}
              setInputText={setInputText}
              inputText={inputText}
              setOpenCamera={setOpenCamera}
              handleMessageSubmit={handleMessageSubmit}
              inputRef={inputRef}
            />
          </Stack>
          <Box
            sx={{
              height: 48,
              width: 48,
              backgroundColor: theme.palette.primary.main,
              borderRadius: 1.5,
            }}
          >
            <Stack
              sx={{ height: "100%", width: "100%" }}
              alignItems={"center"}
              justifyContent={"center"}
              onClick={() => handleMessageSubmit()}
            >
              <IconButton>
                <PaperPlaneTilt color="#fff" />
              </IconButton>
            </Stack>
          </Box>
        </Stack>
      </Box>
      {openCamera && (
        <TakePhoto
          open={openCamera}
          handleClose={handleCloseCamera}
          setCaptureImage={setCapturedPhoto}
          setCaptureImageShow={setCaptureImageShow}
        />
      )}
      {!!captureImageShow && (
        <Box
          sx={{
            position: "absolute",
            bottom: isReply ? replyElementHeight + 98 : 80,
            left: isReply ? 14 : 0,
            width: isReply ? "30%" : "45%",
            backgroundColor: theme.palette.primary.main,
            borderRadius: 1.5,
            my: 2,
            mx: 2,
          }}
        >
          <Box sx={{ p: 1, borderRadius: 1.5 }}>
            <CapturedImagePreview
              image={captureImageShow}
              setImageShow={setCaptureImageShow}
              setCapturedPhoto={setCapturedPhoto}
            />
          </Box>
        </Box>
      )}
      {isReply && (
        <Box
          ref={replyRef}
          sx={{
            position: "absolute",
            bottom: "100%",
            left: "0",
            width: "100%",
            borderRadius: 1.5,
            my: 2,
            px: 4,
          }}
        >
          <Box
            sx={{
              p: 1,
              borderRadius: 1.5,
              width: "100%",
              backgroundColor: theme.palette.primary.main,
            }}
          >
            <ReplyMessagePreview />
            <Stack sx={{ position: "absolute", top: 20, right: 55 }}>
              <IconButton
                onClick={() => dispatch(ToggleIsReplyStatus({ type: false }))}
              >
                <X color={theme.palette.primary.main} />
              </IconButton>
            </Stack>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Footer;
