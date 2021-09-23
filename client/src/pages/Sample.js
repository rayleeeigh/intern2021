import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    ListItem,
    List,
    ListIcon ,
    // useToast,
    useColorModeValue,
  } from '@chakra-ui/react';
  import React, { useState,useEffect } from "react";
  // import { Link } from "react-router-dom";
  // import { useForm } from "react-hook-form";
  import Axios from "axios";
  
  export default function SimpleCard() {

    const [userEmail, setUserEmail]=useState('')
    const [userPassword,setUserPassword]=useState('')
    const [userList , setUserList] = useState([])


    useEffect(()=>{
      Axios.get('http://localhost:3001/users/get').then((response)=>{
        setUserList(response.data);
      })
    })
    const submitReview = ()=>{
      Axios.post('http://localhost:3001/users/insert',{userEmail:userEmail, userPassword:userPassword}).then(()=>{
        alert("Insert Successful");
      })
    };

    const deleteUser = (user) => {
      Axios.get(`http://localhost:3001/users/delete/${user}`);
    };

    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" name="email" onChange={(e)=>{
                  setUserEmail(e.target.value)
                }} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" name="password" onChange={(e)=>{
                  setUserPassword(e.target.value)
                }} />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={submitReview}
                  >
                  Sign Up
                </Button>
              </Stack>
            </Stack>

          </Box>
          {userList.map((val)=>{
              return (
                <List>
                  <Box bg="white" w="100%" p={4} color="black">
                  <ListItem paddingBottom="20px">
                  Email : {val.userEmail} Password: {val.userPassword}
                  </ListItem >
                  <Button bg={'red.400'}
                  color={'white'}
                  _hover={{
                    bg: 'red.1000',
                  }}
                  onClick={()=>{deleteUser(val.userID)}}
                  >Delete</Button>
                  </Box>
                </List>
              );
            })}
        </Stack>
      </Flex>
    );
  }