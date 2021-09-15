import { Box, Heading, Input, Button } from "@chakra-ui/react";

function App() {
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
            <Heading mb="5%">Reset Passwords</Heading>
            <Input
              display="block"
              ml="25%"
              w="50%"
              variant="outline"
              placeholder="Email"
            />
            <Input
              display="block"
              ml="25%"
              w="50%"
              variant="outline"
              placeholder="Password"
            />
            <Input
              display="block"
              ml="25%"
              w="50%"
              variant="outline"
              placeholder="Confirm Password"
            />
            <Button colorScheme="blue" mt="2%">
              Reset Password Arnan
            </Button>
          </Box>
        </Box>
      </header>
    </div>
  );
}

export default App;
