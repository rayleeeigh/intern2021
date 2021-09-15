import React, { useState } from "react";
import Validation from "./Validation";
import { Link } from "react-router-dom";
import { Box, Heading, Input, Button } from "@chakra-ui/react";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (Validation(user) === 0) {
      alert("Login Successful");
    } else {
      alert("Error in Loggin In");
    }
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
              Logins
            </Heading>
            <form>
              <Input
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
              <br></br>
              <Input
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

              <Button colorScheme="blue" mt="2%" onClick={handleFormSubmit}>
                Logins
              </Button>
              <br></br>

              <Button colorScheme="blue" mt="2%">
                <Link to="/sample">Sign Up</Link>
              </Button>
            </form>
          </Box>
        </Box>
      </header>
    </div>
  );
};

export default Login;
