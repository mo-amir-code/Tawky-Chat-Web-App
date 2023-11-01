import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import Webcam from "react-webcam";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TakePhoto = ({ open, handleClose, setCaptureImage, setCaptureImageShow }) => {
  const webcamRef = React.useRef(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const data = imageSrc.toString().replace("data:image/jpeg;base64,", "");
    setCaptureImageShow(imageSrc);
    setCaptureImage(data);
    handleClose()
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      TransitionComponent={Transition}
      open={open}
      onClose={handleClose}
      keepMounted
      sx={{ p: 4 }}
    >
      <DialogContent sx={{ backgroundColor: "transparent" }}>
        <Stack
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box sx={{ borderRadius: 1.5, overflow: "hidden" }}>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
            />
          </Box>
          <Button onClick={capture} sx={{ my: 1 }}>
            <Typography variant="button">Capture Photo</Typography>
          </Button>
        </Stack>
      </DialogContent>
      {/* {image && (
        <div>
          <h2>Captured Photo:</h2>
          <img src={image} alt="Captured" />
        </div>
      )} */}
    </Dialog>
  );
};

export default TakePhoto;
