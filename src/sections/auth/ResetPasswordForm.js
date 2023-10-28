import React from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../components/hook-form/FormProvider";
import { Alert, Button, LinearProgress, Stack } from "@mui/material";
import { RHFTextField } from "../../components/hook-form";
import { useDispatch, useSelector } from "react-redux";
import { authRequestToggle, forgotPasswordAsync } from "../../Redux/slices/auth/authSlice";

const ResetPasswordForm = () => {
  const dispatch = useDispatch()
  const authRequest = useSelector((state)=>state.auth.authRequest)
  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be valid email address"),
  });

  const defaultValues = {
    email: "",
  };

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
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
      dispatch(authRequestToggle())
      dispatch(forgotPasswordAsync(data))
    } catch (error) {
      console.log(error);
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.message,
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        <RHFTextField name="email" label="Email address" />
        <Button
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: "text.primary",
          color: (theme) =>
            theme.palette.mode === "light" ? "common.white" : "grey.800",
          "&:hover": {
            bgcolor: "text.primary",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
          },
        }}
      >
        Send Email
      </Button>
      {authRequest?<LinearProgress color="secondary" /> : null}
      </Stack>
    </FormProvider>
  );
};

export default ResetPasswordForm;
