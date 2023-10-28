import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, Stack, Typography } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const list = [
  {
    key: 0,
    title: "Mark as unread",
    combination: ["Cmd", "Shift", "U"],
  },
  {
    key: 1,
    title: "Mute",
    combination: ["Cmd", "Shift", "M"],
  },
  {
    key: 2,
    title: "Archive Chat",
    combination: ["Cmd", "Shift", "E"],
  },
  {
    key: 3,
    title: "Delete Chat",
    combination: ["Cmd", "Shift", "D"],
  },
  {
    key: 4,
    title: "Pin Chat",
    combination: ["Cmd", "Shift", "P"],
  },
  {
    key: 5,
    title: "Search",
    combination: ["Cmd", "F"],
  },
  {
    key: 6,
    title: "Search Chat",
    combination: ["Cmd", "Shift", "F"],
  },
  {
    key: 7,
    title: "New Chat",
    combination: ["Cmd", "N"],
  },
  {
    key: 8,
    title: "Next Chat",
    combination: ["Ctrl", "Tab"],
  },
  {
    key: 9,
    title: "Prevous Chat",
    combination: ["Ctrl", "Shift", "Tab"],
  },
  {
    key: 10,
    title: "New Group",
    combination: ["Cmd", "Shift", "N"],
  },
  {
    key: 11,
    title: "Profile & About",
    combination: ["Cmd", "P"],
  },
  {
    key: 12,
    title: "Increase speed of voice message",
    combination: ["Shift", "."],
  },
  {
    key: 13,
    title: "Decrease speed of voice message",
    combination: ["Shift", "."],
  },
  {
    key: 14,
    title: "Settings",
    combination: ["Shift", "."],
  },
  {
    key: 15,
    title: "Emoji Panel",
    combination: ["Cmd", "E"],
  },
  {
    key: 16,
    title: "Settings",
    combination: ["Cmd", "G"],
  },
  {
    key: 17,
    title: "Sticker Panel",
    combination: ["Cmd", "S"],
  },
];

const ShortCuts = ({ open, handleClose }) => {
  return (
    <>
      <Dialog
        fullWidth
        maxWidth="md"
        TransitionComponent={Transition}
        open={open}
        onClose={handleClose}
        keepMounted
        sx={{ p: 4 }}
      >
        <DialogTitle>Keyboard Shortcuts</DialogTitle>
        <DialogContent sx={{ mt: 4, '::-webkit-scrollbar':{
            display: 'none'
          } }}>
          <Grid container spacing={3}>
            {list.map(({ key, title, combination }) => (
                <Grid item xs={6} key={key} >
                    <Stack direction={'row'} sx={{width: '100%'}} justifyContent={'space-between'} spacing={3} alignItems={'center'} >
                        <Typography variant="caption" sx={{fontSize: 14}} >{title}</Typography>
                        <Stack spacing={2} direction={'row'} >
                            {combination.map((el)=>{
                                return <Button disabled variant="contained" sx={{color: '#212121'}} >{el}</Button>
                            })}
                        </Stack>
                    </Stack>
                </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
            <Button variant="contained" onClick={handleClose} >Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ShortCuts;
