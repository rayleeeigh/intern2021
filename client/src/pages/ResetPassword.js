import React, { useState } from "react";
import { Box, Input, Container, Button, Center, Heading, FormControl, FormLabel, Text } from "@chakra-ui/react";
import Axios from 'axios';
import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react"
import { useRef } from "react";

const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const handleTooglePassword = () => setShowPassword(!showPassword)

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleToogleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword)
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");

    const { register, handleSubmit, watch, formState:{ errors } } = useForm();
    const passwordcheck = useRef({});
    passwordcheck.current = watch("password", "");
    const onSubmit = (data) => toast({
        title: "Reset Password",
        description: "Reset Password Succesful",
        status: "success",
        duration: 5000,
        isClosable: false,
        position:"top"
      });

    const resetPassword = () => {
        Axios.post('http://localhost:5000/resetpassword',{
          email: email,
          password: password
        }).then((res)=>{
          console.log("Success");
        });
      };
    const toast = useToast()

  return (
    <Box w="100%" h="100vh" bgGradient="linear(to-r, green.200, pink.500)">
        <Center>
        <Box mt="10vh" bg="gray.200" w="50%" align="center" borderRadius="3xl" h="70vh" boxShadow="2xl">
          <Container mt="10%">
            <Heading size="lg">Reset Password</Heading>
          </Container>
          <form onSubmit={handleSubmit(onSubmit)}>
          <Container mt="5%">
              <Container>
                <FormControl id="email" isRequired>
                  <FormLabel>Email Address</FormLabel>
                  <Input name="email" {...register("email", { required: true, pattern: {value: /^\S+@\S+$/i, message: "Invalid Email"} })}  placeholder="Enter email..." variant="filled" onChange={(event)=>{setEmail(event.target.value);}}/>
                </FormControl>
                {errors.email &&  (
                    <Text color="red" fontSize="xs">{errors.email.message}</Text>
                )}
              </Container>
              <Container>
                <FormControl id="password" isRequired>
                  <FormLabel>New Password</FormLabel>
                  <Input type={showPassword ? "text" : "password"} name="password" aria-invalid={errors.password ? "true" : "false"} {...register("password", { required: "Field must not be empty", minLength: 8 })} placeholder="Enter password" variant="filled" onChange={(event)=>{setPassword(event.target.value);}}/>
                  <Button position="absolute" ml="-10vh" mt="1vh" h="1.75rem" size="sm" onMouseDown={handleTooglePassword} onMouseUp={handleTooglePassword}>
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </FormControl>
                {errors.password &&  (
                    <Text color="red" fontSize="xs">{errors.password.message}</Text>
                )}
                {errors.password && errors.password.type === "minLength" && (
                    <Text color="red" fontSize="xs">Password must have atleast 8 characters</Text>
                )}
              </Container>
              <Container>
                <FormControl id="password" isRequired>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input name="confirmpassword" aria-invalid={errors.confirmpassword ? "true" : "false"} {...register("confirmpassword", { required: "Field must not be empty", minLength: 8, validate: value => value === passwordcheck.current || "Passwords do not match" })} type={showConfirmPassword ? "text" : "password"} placeholder="Confirm password" variant="filled" onChange={(event)=>{setConfirmPassword(event.target.value);}}/>
                  <Button position="absolute" ml="-10vh" mt="1vh" h="1.75rem" size="sm" onMouseDown={handleToogleConfirmPassword} onMouseUp={handleToogleConfirmPassword}>
                    {showConfirmPassword ? "Hide" : "Show"}
                  </Button>
                </FormControl>
                {errors.confirmpassword &&  (
                    <Text color="red" fontSize="xs">{errors.confirmpassword.message}</Text>
                )}
                {errors.confirmpassword && errors.confirmpassword.type === "minLength" && (
                    <Text color="red" fontSize="xs">Password must have atleast 8 characters</Text>
                )}
              </Container>
              <Container mt="2%">
                <Button type="submit" disabled={email.length<1} onClick={resetPassword}>Reset Password</Button>
              </Container>
          </Container>
          </form>
        </Box>
      </Center>
      </Box>
  )};

export default ResetPassword;