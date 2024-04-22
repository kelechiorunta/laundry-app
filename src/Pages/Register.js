// Home.js
import React from 'react';
import HeaderLogin from './Page_Components/HeaderLogin';
import { Box, Flex, Heading, Spacer } from "@chakra-ui/react";
import RegisterForm from './Page_Components/RegisterForm';
// import { FaHome, FaInfoCircle, FaCogs } from "react-icons/fa"; // Import desired icons

const Register = () => {
  return (
    <Box>
      <HeaderLogin/>
      <RegisterForm/>
      {/* <Heading>Please Register Your Wares</Heading>  */}
    </Box>
  )
};

export default Register;