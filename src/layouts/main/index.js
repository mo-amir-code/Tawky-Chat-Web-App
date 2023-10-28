import { Container, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import logo from '../../assets/Images/logo.ico'
import { useDispatch, useSelector } from "react-redux";
import { authRequestClose } from "../../Redux/slices/auth/authSlice";


const MainLayout = () => {
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)  
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(authRequestClose())
  }, [])


  if(isLoggedIn){
    return <Navigate to={'/app'} />
  }


  return (
    <>
      <Container sx={{mt: 5}} maxWidth={'sm'} >
        <Stack spacing={5} >
          <Stack sx={{width: '100%'}} direction={'column'} alignItems={'center'} >
            <img style={{height: 120, width: 120}} src={logo} alt={"logo"} />
          </Stack>
        </Stack>
        {/* <div>Main Layout</div> */}
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
