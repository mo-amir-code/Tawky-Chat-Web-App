import React from "react";
import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AuthSocial from "../../sections/auth/AuthSocial";
import LoginForm from "../../sections/auth/LoginForm";

const Login = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">Login to Tawk</Typography>
        <Stack direction={"row"} alignItems={"center"} spacing={0.5}>
          <Typography variant="body2">New User?</Typography>
          <Typography variant="subtitle2">
            <Link to={"/auth/register"}>Create an account</Link>
          </Typography>
        </Stack>
        {/* Login form */}
        <LoginForm />
        {/* Auth Social */}
        <AuthSocial />
      </Stack>
    </>
  );
};

export default Login;
