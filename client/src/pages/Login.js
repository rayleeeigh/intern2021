import React, { useState } from "react";
import { Box, Input, Container, Button, Center, Heading, FormControl, FormLabel } from "@chakra-ui/react";

const Login = () => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show)
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  return (
    <Box w="100%" h="100vh" bgGradient="linear(to-r, green.200, pink.500)">
        <Center>
        <Box mt="10vh" bg="gray.200" w="50%" align="center" borderRadius="3xl" h="80vh">
          <Container mt="10%">
            <Heading size="md">Welcome!</Heading>
          </Container>
          <Container mt="10%">
              <Container>
                <FormControl id="email" isRequired>
                  <FormLabel>Email Address</FormLabel>
                  <Input type="email" placeholder="Enter email..." variant="filled" onChange={(event)=>{setEmail(event.target.value);}}/>
                </FormControl>
              </Container>
              <Container>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input type={show ? "text" : "password"} placeholder="Enter password" variant="filled" onChange={(event)=>{setPassword(event.target.value);}}/>
                  <Button position="absolute" ml="-10vh" mt="1vh" h="1.75rem" size="sm" onMouseDown={handleClick} onMouseUp={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </FormControl>
              </Container>
              <Container>
                <Button>Login</Button>
              </Container>
          </Container>
        </Box>
      </Center>
      </Box>
  )};

export default Login;
