import {
  Box,
  Divider,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { DotsThreeVertical, DownloadSimple, Image } from "phosphor-react";
import React from "react";
import { Message_options } from "../../data";
import { shortDocName } from "../../services/services";
import { useDispatch } from "react-redux";
import { ToggleIsReplyStatus } from "../../Redux/slices/conversation/conversation";
import { ReplyMessageTemplate } from "../PreviewMessages";

const DocMsg = ({ el, menu, preview }) => {

  const theme = useTheme();
  return (
    <Stack direction={"row"} justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.mode === "light"
              ? "#fff"
              : "#212B36"
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: preview? "100%": "max-content",
          maxWidth:"60%"
        }}
      >
        <Stack spacing={2}>
          <Stack
            p={2}
            direction={"row"}
            alignItems={"center"}
            spacing={3}
            sx={{
              backgroundColor:
                theme.palette.mode === "light" ? "#F0F4FA" : "#161C24",
              borderRadius: 1,
            }}
          >
            <Image size={48} />
            <Typography variant="cation">
              {shortDocName(el.fileName)}
            </Typography>
            <IconButton>
              <DownloadSimple />
            </IconButton>
          </Stack>
          <Typography
            variant="body2"
            sx={{ color: el.incoming ? theme.palette.text : "#fff" }}
          >
            {el.message}
          </Typography>
        </Stack>
      </Box>
      {(menu || !preview) && <MessageActions id={el.id} />}
    </Stack>
  );
};

const LinkMsg = ({ el, menu, preview }) => {

  const theme = useTheme();

  const isPreview = (message) => {
    if (message.startsWith("http")) {
      return true;
    }
    return false;
  };

  return (
    <Stack direction={"row"} justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.mode === "light"
              ? "#fff"
              : "#212B36"
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width:preview? "100%": "max-content",
          maxWidth:"60%"
        }}
      >
        <Stack spacing={2}>
          <Stack
            p={2}
            spacing={3}
            // alignItems={"center"}
            sx={{
              backgroundColor:
                theme.palette.mode === "light" ? "#F0F4FA" : "#161C24",
              borderRadius: 1,
            }}
          >
            {isPreview(el.message) && (
              <img
                src={el.message}
                alt={el.message}
                style={{ maxHeight: 210, borderRadius: "10px", height: 25 }}
              />
            )}
            <Stack spacing={2}>
              {isPreview(el.message) ? (
                <Typography
                  variant="subtitle2"
                  component={Link}
                  color={theme.palette.primary.main}
                  href={isPreview(el.message) ? el.message : ""}
                  target="_blank"
                >
                  {el.message}
                </Typography>
              ) : (
                <Typography
                  variant="subtitle2"
                  color={theme.palette.primary.main}
                >
                  {el.message}
                </Typography>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Box>
      {(menu || !preview) && <MessageActions id={el.id} />}
    </Stack>
  );
};

const ReplyMessage = ({ el, menu, preview }) => {

  const theme = useTheme();
  return (
    <Stack direction={"row"} justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.mode === "light"
              ? "#fff"
              : "#212B36"
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width:preview? "100%": "max-content",
          maxWidth:"60%"
        }}
      >
        <Stack spacing={2}>
          <Box
            // p={2}
            direction={"column"}
            spacing={3}
            alignItems={"center"}
            sx={{
              backgroundColor:
                theme.palette.mode === "light" ? "#F0F4FA" : "#161C24",
              borderRadius: 1,
            }}
          >
            <ReplyMessageTemplate message={el.reply} incoming={el.incoming} isReply={true} />
          </Box>
          <Typography
            ariant="body2"
            color={el.incoming ? theme.palette.text : "#fff"}
          >
            {el.message}
          </Typography>
        </Stack>
      </Box>
      {(menu || !preview) && <MessageActions id={el.id} />}
    </Stack>
  );
};

const MediaMsg = ({ el, menu, preview }) => {

  const theme = useTheme();
  return (
    <Stack direction={"row"} justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.mode === "light"
              ? "#fff"
              : "#212B36"
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: preview? "100%": "max-content",
          maxWidth:"60%"
        }}
      >
        <Stack spacing={1}>
          <img
            src={el.img}
            alt={el.message}
            style={{ maxHeight: 210, borderRadius: "10px" }}
          />
          <Typography
            variant="body2"
            color={el.incoming ? theme.palette.text : "#fff"}
          >
            {el.message}
          </Typography>
        </Stack>
      </Box>
      {(menu || !preview) && <MessageActions id={el.id} />}
    </Stack>
  );
};

const TextMsg = ({ el, menu, preview, isReply }) => {

  const theme = useTheme();
  return (
    <Stack direction={"row"} justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.mode === "light"
              ? isReply? "transparent" : "#fff"
              : isReply? "transparent" : "#212B36"
            : isReply? "transparent" : theme.palette.primary.main,
          borderRadius: 1.5,
          width: preview? "100%": "max-content",
          maxWidth:"60%"
        }}
      >
        <Typography
          variant="body2"
          color={el.incoming ? theme.palette.text : isReply?theme.palette.mode === "light"? "#000" : "#fff" : "#fff"}
          sx={{textAlign: el.incoming ?"start" : "end"}}
        >
          {el.message}
        </Typography>
      </Box>
      {/* dots three icon */}
      {(menu || !preview) && <MessageActions id={el.id} />}
    </Stack>
  );
};

const TimeLine = ({ el }) => {
  const theme = useTheme();
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Divider width={"46%"} />
      <Typography variant="caption" sx={{ color: theme.palette.text }}>
        {el.text}
      </Typography>
      <Divider width={"46%"} />
    </Stack>
  );
};

const MessageActions = ({id}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch()
  const handleClick = ({e, action}) => {
    setAnchorEl(e.currentTarget);
    if(action === "Reply"){
      dispatch(ToggleIsReplyStatus({type:true, id}))
    }
    setAnchorEl(null);
  };

  const handleDotsClick = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <DotsThreeVertical
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleDotsClick}
        size={20}
        cursor={"pointer"}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Stack direction={"column"} spacing={1} px={1}>
          {Message_options.map((el, idx) => (
            <MenuItem key={idx} onClick={(e)=>handleClick({e, action:el.title})}>
              {el.title}
            </MenuItem>
          ))}
        </Stack>
      </Menu>
    </>
  );
};

export { TimeLine, TextMsg, MediaMsg, ReplyMessage, LinkMsg, DocMsg };
