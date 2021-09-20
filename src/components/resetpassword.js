import { Box, Heading, Input, Button, Text } from "@chakra-ui/react";
import React, { useState } from "react"; 
import { useRef } from "react";
import { useForm } from "react-hook-form";

const ResetPassword = () => {
  const [email,setEmail] = useState('');

  const handleChange = (e)=>{
    setEmail(e.target.value);
  };

  const { register, handleSubmit, watch, formState:{ errors } } = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  const onSubmit = (data) => alert("Reset Successful");
  
  return (

    <Box textAlign="center" position="absolute" bgGradient="linear(to-b, blue.200, yellow.500)" w="100%" h="100vh">
      <Box bg="white" border="1px" borderColor="gold" mt="9%" pt="3%" ml="25%" w="50%" h="50%">
        <Heading mb="5%">Reset Password</Heading>

        <form id="data" onSubmit={handleSubmit(onSubmit)} >

          <Box display="block">
            <Text display="inline-block">Email</Text>
            <Input name="email" {...register("email", { required: true, pattern: {value: /^\S+@\S+$/i, message: "Invalid Email"} })} style={{ border: errors.email ? '1px solid red' : '' }} type="text" value={email} onChange={handleChange} display="inline-block" mr="-14vh"  w="50%" variant="outline" placeholder="Email"/>
          </Box>
          {errors.email &&  (
            <Text color="red" fontSize="xs">{errors.email.message}</Text>
          )}

          <Box display="block">
            <Text display="inline-block">New Password</Text>
            <Input name="password" aria-invalid={errors.password ? "true" : "false"} {...register("password", { required: "Field must not be empty", minLength: 8 })} style={{ border: errors.password ? '1px solid red' : '' }} type="password" mr="-4vh" display="inline-block" w="50%" variant="outline" placeholder="Password"/>
          </Box>
          {errors.password &&  (
            <Text color="red" fontSize="xs">{errors.password.message}</Text>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <Text color="red" fontSize="xs">Password must have atleast 8 characters</Text>
          )}

          <Box display="block">
            <Text display="inline-block">Confirm Password</Text>
            <Input id="confirmpassword" aria-invalid={errors.confirmpassword ? "true" : "false"} {...register("confirmpassword", { required: "Field must not be empty", minLength: 8, validate: value => value === password.current || "Passwords do not match" })} style={{ border: errors.confirmpassword ? '1px solid red' : '' }} type="password" display="inline-block" w="50%" variant="outline" placeholder="Confirm Password"/>
          </Box>
          {errors.confirmpassword &&  (
            <Text color="red" fontSize="xs">{errors.confirmpassword.message}</Text>
          )}
          {errors.confirmpassword && errors.confirmpassword.type === "minLength" && (
            <Text color="red" fontSize="xs">Password must have atleast 8 characters</Text>
          )}

          <Button type="submit" colorScheme="blue" mt="2%" disabled={email.length<1}>Reset Password</Button>
        </form>
        
      </Box>
    </Box>
  );
}

export default ResetPassword;
