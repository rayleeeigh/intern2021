import React, { useState } from "react";
import { Link ,useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import {
  Box,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Stack,
  Center,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  Container
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

  const [resetEmail, setResetEmail] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [resetConfirmPassword, setResetConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const handleTooglePassword = () => setShowPassword(!showPassword)
  const [errorsLogin,setErrorsLogin] = useState({});
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleToogleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword)

  const history = useHistory();

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
    setErrorsLogin(Validation(user));
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

  const { register, handleSubmit, watch, formState:{ errors }, setErrors } = useForm();
  const passwordcheck = useRef({});
  passwordcheck.current = watch("resetpassword", "");
  const onSubmit = (data) => toast({
      title: "Reset Password",
      description: "Reset Password Succesful",
      status: "success",
      duration: 5000,
      isClosable: false,
      position:"top"
    });

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const resetPasswordf = () => {
    Axios.post('http://localhost:5000/resetpassword',{
      email: resetEmail,
      password: resetPassword
    }).then((res)=>{
      if(res.send==200){
        alert("Reset Success");
      }else{
        alert("Reset Failed");
      }
      
    });
  };
const toast = useToast()

  const { isOpen, onOpen, onClose } = useDisclosure();

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
                      style={{ border: errorsLogin.email ? "1px solid red" : "1px solid black" }}
                    />
                    {errorsLogin.email && (
                      <p style={{ color: "red" }}>{errorsLogin.email}</p>
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
                      style={{ border: errorsLogin.password ? "1px solid red" : "1px solid black" }}
                    />
                    {errorsLogin.password && (
                      <p style={{ color: "red" }}>{errorsLogin.password}</p>
                    )}
                  </FormControl>
                  <Stack spacing={10} paddingTop={8} paddingBottom={8}>
                    <Stack
                      direction={{ base: "column", sm: "row" }}
                      align={"start"}
                      justify={"space-between"}
                    >
                      <Button onClick={onOpen}>Forgot Password?</Button>

                      <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>Reset Password</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>
                          <form onSubmit={handleSubmit(onSubmit)}>
                            <Container mt="5%">
                                <Container>
                                  <FormControl id="email" isRequired>
                                    <FormLabel>Email Address</FormLabel>
                                    <Input name="resetemail" {...register("resetemail", { required: true, pattern: {value: /^\S+@\S+$/i, message: "Invalid Email"} })}  placeholder="Enter email..." variant="filled" onChange={(event)=>{setResetEmail(event.target.value);}}/>
                                  </FormControl>
                                  {errorsLogin.resetemail &&  (
                                      <Text color="red" fontSize="xs">{errorsLogin.resetemail.message}</Text>
                                  )}
                                </Container>
                                <Container>
                                  <FormControl id="password" isRequired>
                                    <FormLabel>New Password</FormLabel>
                                    <Input type={showPassword ? "text" : "password"} name="resetpassword" aria-invalid={errors.password ? "true" : "false"} {...register("resetpassword", { required: "Field must not be empty", minLength: 8 })} placeholder="Enter password" variant="filled" onChange={(event)=>{setResetPassword(event.target.value);}}/>
                                    <Button position="absolute" ml="-10vh" mt="1vh" h="1.75rem" size="sm" onMouseDown={handleTooglePassword} onMouseUp={handleTooglePassword}>
                                      {showPassword ? "Hide" : "Show"}
                                    </Button>
                                  </FormControl>
                                  {errors.resetpassword &&  (
                                      <Text color="red" fontSize="xs">{errors.resetpassword.message}</Text>
                                  )}
                                  {errors.resetpassword && errors.resetpassword.type === "minLength" && (
                                      <Text color="red" fontSize="xs">Password must have atleast 8 characters</Text>
                                  )}
                                </Container>
                                <Container>
                                  <FormControl id="password" isRequired>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <Input name="resetconfirmpassword" aria-invalid={errors.confirmpassword ? "true" : "false"} {...register("resetconfirmpassword", { required: "Field must not be empty", minLength: 8, validate: value => value === passwordcheck.current || "Passwords do not match" })} type={showConfirmPassword ? "text" : "password"} placeholder="Confirm password" variant="filled" onChange={(event)=>{setResetConfirmPassword(event.target.value);}}/>
                                    <Button position="absolute" ml="-10vh" mt="1vh" h="1.75rem" size="sm" onMouseDown={handleToogleConfirmPassword} onMouseUp={handleToogleConfirmPassword}>
                                      {showConfirmPassword ? "Hide" : "Show"}
                                    </Button>
                                  </FormControl>
                                  {errors.resetconfirmpassword &&  (
                                      <Text color="red" fontSize="xs">{errors.resetconfirmpassword.message}</Text>
                                  )}
                                  {errors.resetconfirmpassword && errors.resetconfirmpassword.type === "minLength" && (
                                      <Text color="red" fontSize="xs">Password must have atleast 8 characters</Text>
                                  )}
                                </Container>
                            </Container>
                            </form>
                          </ModalBody>

                          <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onClose}>
                              Close
                            </Button>
                            <Button type="submit" disabled={resetEmail.length<1} onClick={resetPasswordf}>Reset Password</Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>

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
