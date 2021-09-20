import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box, Heading, Input, Button } from "@chakra-ui/react";
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
          <Box
            bg="white"
            border="1px"
            borderColor="gold"
            mt="9%"
            pt="3%"
            ml="25%"
            w="50%"
            h="50%"
          >
            <Heading mb="5%" color="black">
              Login
            </Heading>
            <form id="data" onSubmit={handleSubmit(onSubmit)}>
              <Input
                {...register("email", { required: true })}
                display="block"
                ml="25%"
                w="50%"
                variant="outline"
                type="email"
                name="email"
                placeholder="Email Address..."
                value={user.email}
                onChange={handleChange}
              />
              {errors.email && <p>{errors.email}</p>}
              <br></br>
              <Input
                {...register("password", {
                  required: true,
                  minLength: 5,
                })}
                display="block"
                ml="25%"
                w="50%"
                variant="outline"
                color="black"
                type="password"
                name="password"
                placeholder="Password..."
                value={user.password}
                onChange={handleChange}
              />
              {errors.password && <p>{errors.password}</p>}

              <div style={{ paddingTop: 20 }}>
                <a href="*" style={{ color: "blue" }}>
                  <Link to="/reset">Forgot Password</Link>
                </a>
              </div>
              <Button
                colorScheme="blue"
                mt="2%"
                disabled={!user.email && !user.password}
                type="submit"
                onClick={handleFormSubmit}
              >
                Login
              </Button>
              <br></br>

              <Button colorScheme="blue" mt="2%">
                <Link to="/form">Sign Up</Link>
              </Button>
            </form>
          </Box>
        </Box>
      </header>
    </div>
  );
};

export default Login;
