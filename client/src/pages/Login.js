import React, { useState } from "react";
import { Link ,useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Box,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Stack,
  Center,
  Text
} from "@chakra-ui/react";
import Validation from "./Validation";
import Axios from "axios";
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  
  const [logUsers , setLogUsers] = useState({})

  const refreshToken = async () =>{
    try {
      const res = await axios.post("/refresh",{
        token:logUsers.refreshToken
      });
      setLogUsers({
        ...logUsers,
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      });
      return res.data
    }catch(err){
      console.log(err);
    }
  }

  // axios.interceptors.request.use(async(config)=>{
  //   let currentDate = new Date();
  //   const decodeToken = jwt_decode(logUsers.accessToken);
  //   if(decodeToken.exp * 1000< currentDate.getTime()){
  //     const data = await refreshToken();
  //     config.headers["authorization"] = "Bearer" + data.accessToken;
  //   }
  //   return config
  // },(error) =>{
  //   return Promise.reject(error);
  // })  

  const history = useHistory();
  
  const [errors, setErrors] = useState({});

  const { register, handleSubmit } = useForm({});

  const onSubmit = (data) => alert("Login Successful");

  // const logout = (data) =>{
  //   // alert("logout");
  //   if(data){
  //     Axios.post('http://localhost:5000/logout',{
  //       headers:{authorization : "Bearer" + logUsers.accessToken},
  //     });
  //   }
  // }
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrors(Validation(user));
    if (Object.keys(Validation(user)).length === 0) {
      Axios.post('http://localhost:5000/login',{
        email: user.email,
        password: user.password
      }).then((res)=>{
        if(res.status==200){
          // console.log(res.data);
          alert("Login SuccessFul");
          console.log(res.data);
          history.push({pathname:'/home', state:{user:res.data}});
        }else{
          console.log("failed");
          alert("Login Failed");
        }
      });

    } 
  };

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  return (
        <Box
          textAlign="center"
          position="absolute"
          bgGradient="linear(to-r, green.200, pink.500)"
          w="100%"
          h="100vh"
        >
          <Center>
          <Stack spacing={8} mx={"auto"} maxW={"lg"} mt="20vh">
            <Box
              rounded="lg"
              boxShadow="lg"
              p={8}
              bg="gray.200"
              h="62vh"
              w="60vh"
              boxShadow="2xl"
            >
              <Box paddingBottom={4}>
                <Heading mb="5%" size="lg" color="black">
                  Welcome Back!
                </Heading>
                <Text>Login or create account</Text>
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
                      style={{ border: errors.email ? "1px solid red" : "1px solid black" }}
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
                      style={{ border: errors.password ? "1px solid red" : "1px solid black" }}
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
                      <Link to="/reset">Forgot Password?</Link>

                      <Button
                      bg="gray.800"
                      color="white"
                      _hover={{
                        bg: "gray.500",
                      }}
                      disabled={!user.email && !user.password}
                      type="submit"
                      onClick={handleFormSubmit}
                    >
                      Login
                    </Button>
                    </Stack>
                    <Stack>
                    <Box bg="gray.300" py={3} ml="-32px" w="60vh" rounded="lg">
                      <Text display="inline-block">Don't have an account? <a href="*" style={{ color: "blue" }}><Link to="/register">Register</Link></a></Text>
                    </Box>
                    </Stack>
                    
                  </Stack>
                </form>
              </Stack>
            </Box>
          </Stack>
          </Center>
        </Box>
  );
};
export default Login;
