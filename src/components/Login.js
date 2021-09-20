import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Box,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Stack,
} from "@chakra-ui/react";
import Validation from "./Validation";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => alert("Login Successful");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrors(Validation(user));
    if (Object.keys(Validation(user)).length === 0) {
      alert("Login Successful");
      user.email = "";
      user.password = "";
    }
  };

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <Box
          textAlign="center"
          position="absolute"
          bgGradient="linear(to-b, blue.200, yellow.500)"
          w="100%"
          h="100vh"
        >
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={40}>
            <Box
              rounded="lg"
              bg="white"
              border="1px"
              borderColor="gold"
              boxShadow="lg"
              p={8}
            >
              <Box paddingBottom={12}>
                <Heading mb="5%" color="black">
                  Login Here
                </Heading>
              </Box>
              <Stack spacing={5}>
                <form id="data" onSubmit={handleSubmit(onSubmit)}>
                  <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input
                      {...register("email", { required: true })}
                      variant="outline"
                      type="email"
                      name="email"
                      placeholder="Email Address..."
                      value={user.email}
                      onChange={handleChange}
                      style={{ border: errors.email ? "1px solid red" : "" }}
                    />
                    {errors.email && (
                      <p style={{ color: "red" }}>{errors.email}</p>
                    )}
                  </FormControl>
                  <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <Input
                      {...register("password", {
                        required: true,
                        minLength: 5,
                      })}
                      variant="outline"
                      color="black"
                      type="password"
                      name="password"
                      placeholder="Password..."
                      value={user.password}
                      onChange={handleChange}
                      border="red"
                      style={{ border: errors.password ? "1px solid red" : "" }}
                    />
                    {errors.password && (
                      <p style={{ color: "red" }}>{errors.password}</p>
                    )}
                  </FormControl>
                  <Stack spacing={10} paddingTop={8} paddingBottom={8}>
                    <Stack
                      direction={{ base: "column", sm: "row" }}
                      align={"start"}
                      justify={"space-between"}
                    >
                      <a href="*" style={{ color: "blue" }}>
                        <Link to="/form">No Account? Signup Here</Link>
                      </a>
                      <a href="*" style={{ color: "blue" }}>
                        <Link to="/reset">Forgot Password</Link>
                      </a>
                    </Stack>
                    <Button
                      colorScheme="blue"
                      _hover={{
                        bg: "blue.500",
                      }}
                      disabled={!user.email && !user.password}
                      type="submit"
                      onClick={handleFormSubmit}
                    >
                      Login
                    </Button>
                  </Stack>
                </form>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </header>
    </div>
  );
};

export default Login;
