import React from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../components/hook-form/FormProvider";
import { Button, LinearProgress, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { authRequestToggle, verifyOTPAsync } from "../../Redux/slices/auth/authSlice";
import RHFCodes from "../../components/hook-form/RHFCodes";

const VerifyForm = () => {
  const authRequest = useSelector((state) => state.auth.authRequest);
  const email = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();

  const verifySchema = Yup.object().shape({
    code1: Yup.string().required("Code is required"),
    code2: Yup.string().required("Code is required"),
    code3: Yup.string().required("Code is required"),
    code4: Yup.string().required("Code is required"),
    code5: Yup.string().required("Code is required"),
    code6: Yup.string().required("Code is required"),
  });

  const defaultValues = {
    code1: "",
    code2: "",
    code3: "",
    code4: "",
    code5: "",
    code6: "",
  };

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(verifySchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      // Submit data to backend
      const OTP = Object.keys(data)
        .map((key) => {
          return data[key];
        })
        .reduce((otp, number) => {
          return (otp += number);
        });
        dispatch(authRequestToggle());
        dispatch(verifyOTPAsync({email:email, otp:OTP}))
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {/* Custom OTP Input */}

        <RHFCodes
          keyName="code"
          inputs={["code1", "code2", "code3", "code4", "code5", "code6"]}
        />

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
          Verify
        </Button>
        {authRequest ? <LinearProgress color="secondary" /> : null}
      </Stack>
    </FormProvider>
  );
};

export default VerifyForm;
