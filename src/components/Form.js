import {
  Box,
  Heading,
  Input,
  Button,
  Link,
} from "@chakra-ui/react";
import {useState} from 'react'
import Validation from "./Validation";

const Form = () => {
  const[user,setUser] = useState({
    email:"",
    password:""
  })
  const [errors, setErrors] = useState({});
  const handleSubmit = (e)=>{
    e.preventDefault();
    setErrors(Validation(user));
    console.log(user);
    if (Object.keys(Validation(user)).length === 0) {
      alert("Succesfuly registered " + user.email);
      user.email = "";
      user.password = "";
    }
    console.log(user);
  }
  return (
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
          pr="6%"
          pl="6%"
          ml="25%"
          w="50%"
          h="40%"
        >
          <Heading size="lg" fontSize="30px">
            Registration Form
          </Heading>
          <form id="data" onSubmit={handleSubmit}>
            <label>Email</label>
            <Input
              variant = "flushed"
              type = "email"
              value = {user.email}
              onChange = {(e) => setUser({...user, email:e.target.value})}
            />
             <span style={{
                fontWeight: 'bold',
                color: 'red',
            }}>
            {errors.email && <p>{errors.email}</p>}
            </span>
            <label>Password</label>
            <Input
          
              variant="flushed"
              type="password"
              value = {user.password}
              onChange = {(e) => setUser({...user, password:e.target.value})}
            />
              <span style={{
                fontWeight: 'bold',
                color: 'red',
              }}>{errors.password && <p>{errors.password}</p>}</span>
            <div>
              <Link href="/login" color="blue">
                Login
              </Link>
            </div>
            <div>
            <Button
                colorScheme="blue"
                mt="2%"
                type="submit"
              >
                Sign up
              </Button>
            </div>
          </form>
        </Box>
      </Box>
  )
}



export default Form;
