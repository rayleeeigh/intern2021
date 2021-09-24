import React, { useState } from "react";
import { Box, Input, Container, Button, Center, Heading, FormControl, FormLabel, Stack} from "@chakra-ui/react";
import Axios from 'axios';
import {useForm} from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Image } from "@chakra-ui/react"
import Background from "../assets/images/background.png";


const Register = () => {
    const { register,formState: { errors }, handleSubmit } = useForm();
    const [user,setUser] = useState({
      email: "",
      password:""
    });
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    const onSubmit = data => {
      console.log(data);
    }

    const history = useHistory();
    
    const addAccount = async(e) =>{
      e.preventDefault();
      await Axios.post('http://localhost:5000/create', user)
        .then((res)=>{
          if(res.status===200){
            alert("SUCCESSFUL REGISTER " + user.email);
            user.email ="";
            user.password="";
            console.log(res)
            history.push("/login");
          }else if(res.status===404){
            alert("Account Exist Already");
            user.email ="";
            user.password="";
          }
        })
        .catch((err)=>{
          console.log(err);
        })
    }
  return (
    <Box position="relative" w="100%" h="100vh" bgGradient="linear(to-r, green.200, pink.500)">
        <Center>
        <Box mt="10vh" bg="gray.200" w="50%" align="center" h="80vh" boxShadow="2xl">
          <Container position="relative" display="inline-block" w="50%">
          <Container position="absolute" >
          <Container mt="20%">
            <Heading size="md"> Create Account</Heading>
          </Container>
          <Container mt="15%">
          <form  onSubmit={handleSubmit(onSubmit)}>
              <Container>
                <FormControl id="email" >
                  <FormLabel>Email Address</FormLabel>
                    <Input
                      {...register("email",{ required: "Email is required",
                         pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$/i,
                         message:"Invalid format"})}
                      type="email" 
                      placeholder="Enter email"
                      variant="filled" 
                      onChange={(event)=>setUser({...user,email:event.target.value})}/>
                      <p style={{color:"red"}}>
                        {errors.email && errors.email.message}
                      </p>
                   
                </FormControl>
              </Container>
              <Container>
                <FormControl id="password" >
                  <FormLabel>Password</FormLabel>
                    <Input
                      {...register("password",{ required: 'Password is required', maxLength:{value:5,message:'You exceed the max length'}})} 
                      type={show ? "text" : "password"} 
                      placeholder="Enter password" 
                      variant="filled" 
                      onChange={(event)=> setUser({...user,password:event.target.value})}/>
                  <Button 
                    position="absolute" 
                    ml="-10vh" mt="1vh" h="1.75rem" 
                    size="sm" 
                    onMouseDown={handleClick} 
                    onMouseUp={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                  <p style={{color:"red"}}>
                      {errors.password && errors.password.message}
                  </p>
                </FormControl>
              </Container>
              <Container>
              <Stack spacing={10} paddingTop={8} paddingBottom={8}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
                >
                <Button  
                bg="gray.800"
                color="white"
                type="submit"
                _hover={{
                  bg: "gray.500",
                }}
                w="45%"
                disabled={!user.email && !user.password}
                onClick={addAccount}
                >Sign-up
                </Button>

                <Button  
                bg="gray.200"
                color="gray.800"
                _hover={{
                  bg: "gray.500",
                }}
                w="45%"
                border="1px"
                to="/login"
                >Login
                </Button>
                </Stack>
                </Stack>
              </Container>
              </form>
          </Container>
          </Container>
          </Container>
          <Container position="relative" display="inline-block" w="50%">
            <Container position="absolute"  mt="-18px">
            <Image src={Background}/>
            </Container>
          </Container>
        </Box>
      </Center>
    </Box>
  )};

export default Register;
