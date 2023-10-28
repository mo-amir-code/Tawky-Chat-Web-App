import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
} from "@mui/material";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
import { MagnifyingGlass } from "phosphor-react";
import { CallElement } from "../../components/CallElement";
import { CallMembersList } from "../../data";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StartCall = ({ open, handleClose }) => {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      sx={{ p: 4 }}
      onClose={handleClose}
    >
      {/* Title */}
      <DialogTitle sx={{ mb: 4 }}>Start Call</DialogTitle>
      {/* Content */}
      <DialogContent
        direction={"column"}
        sx={{
          mb: 4,
          overflowY: "auto",
          height: "100%",
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Stack spacing={3}>
          <Stack sx={{ width: "100%" }}>
            <Search>
              <SearchIconWrapper>
                <MagnifyingGlass color="#709CE6" />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search" />
            </Search>
          </Stack>
          {CallMembersList.map((el) => (
            <CallElement key={el.id} {...el} />
          ))}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default StartCall;
