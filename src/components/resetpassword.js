import { Box, Heading, Input, Button, Text } from "@chakra-ui/react";
import React, { useState } from "react"; 
import { useForm } from "react-hook-form";

const ResetPassword = () => {
  const [email,setEmail] = useState("");

  const handleChange = (e)=>{
    setEmail(e.target.value);
  };

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => alert("Reset Successful");
  

  return (

    <Box textAlign="center" position="absolute" bgGradient="linear(to-b, blue.200, yellow.500)" w="100%" h="100vh">
      <Box bg="white" border="1px" borderColor="gold" mt="9%" pt="3%" ml="25%" w="50%" h="50%">
        <Heading mb="5%">Reset Password</Heading>
        <form id="data" onSubmit={handleSubmit(onSubmit)} >
          <Box display="block">
            <Text display="inline-block">Email</Text>
            <Input {...register("email", { required: true })} type="email" value={email} onChange={handleChange} display="inline-block" mr="-14vh"  w="50%" variant="outline" placeholder="Email"/>
          </Box>
          <Box display="block">
            <Text display="inline-block">Password</Text>
            <Input {...register("password", { required: true, minLength: {value: 8, message: 'roar'} })} type="password" mr="-9vh" display="inline-block" w="50%" variant="outline" placeholder="Password"/>
          </Box>
          <Box display="block">
            <Text display="inline-block">Confirm Password</Text>
            <Input {...register("confirmpassword", { required: true, minLength: {value: 8, message: 'roar'} })} type="password" display="inline-block" w="50%" variant="outline" placeholder="Confirm Password"/>
          </Box>
          <Button type="submit" colorScheme="blue" mt="2%" disabled={email.length<1}>Reset Password</Button>
        </form>
      </Box>
    </Box>
  );
}

export default ResetPassword;
