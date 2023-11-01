import React from "react";
import { Box, Stack } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import Message from "./Message";
import { useRef } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Conversation = () => {
  const containerRef = useRef(null);

  const { currentMessages } = useSelector(
    (state) => state.conversation.directChat
  );

  useEffect(() => {
    if (containerRef && containerRef.current) {
      const element = containerRef.current;
      element.scroll({
        top: element.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [currentMessages]);

  return (
    <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
      {/* Chat header */}
      <Header />
      {/* Msg */}
      <Box
        width={"100%"}
        ref={containerRef}
        sx={{
          flexGrow: 1,
          height: "100%",
          overflowY: "auto",
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Message menu={true} />
      </Box>
      {/* Chat Footer */}
      <Footer />
    </Stack>
  );
};

export default Conversation;
