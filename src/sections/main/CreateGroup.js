import React from "react";
import {
    Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
} from "@mui/material";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../components/hook-form/FormProvider";
import { RHFTextField } from "../../components/hook-form";
import RHFAutoComplete from "../../components/hook-form/RHFAutoComplete";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MEMBERS = ["Name 1", "Name 2", "Name 3"];

const CreateGroupForm = ({handleClose}) => {
  const newGroupSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    members: Yup.array().min(2, "Must have atleast 2 memmbers."),
  });

  const defaultValues = {
    title: "",
    members: [],
  };

  const methods = useForm({
    resolver: yupResolver(newGroupSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      // Submit data to backend
      console.log("Data", data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name={"title"} label={"Title"} />
        <RHFAutoComplete
          name={"members"}
          label={"Members"}
          multiple
          freeSolo
          options={MEMBERS.map((el)=>el)}
        //   options={MEMBERS}
          ChipProps={{ size: "medium" }}
        />
        <Stack spacing={2} direction={'row'} alignItems={'center'} justifyContent={'flex-end'} >
            <Button onClick={handleClose} >Cancel</Button>
            <Button type="submit" variant="contained" >Create</Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

const CreateGroup = ({ open, handleClose }) => {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      sx={{ p: 4 }}
    >
      {/* Title */}
      <DialogTitle >Create New Group</DialogTitle>
      {/* Content */}
      <DialogContent sx={{mt:4}} >
        {/* Form */}
        <CreateGroupForm handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroup;
