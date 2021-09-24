import React, { useState } from "react";
import { Redirect  } from "react-router-dom";
import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import axios from "axios";

export default function SplitScreen() {
  const [user, setUser] = useState({ });


  if(!{user}){
    return <Redirect to="/login"/>;
  }

  // const getDetails = async(e) =>{
  //   axios.get("/user/getDetails").then(({data:{email, password}})=>{
  //     this.setUser({email,password});
  //   })
  //   .catch((err)=>console.log(err));
  // }

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: { base: '20%', md: '30%' },
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'blue.400',
                zIndex: -1,
              }}>
              FullSpeed Technologies
            </Text>
            <br />{' '}
            <Text color={'blue.400'} as={'span'}>
              Intern 2021 Project
            </Text>{' '}
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
            This project is created by the interns Arnan Planco, Rayl Xylem Reganon and Cloyd
            Anis. This web-app is created with React, Node and Express.
          </Text>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Button
              rounded={'full'}
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}>
              Get Started
            </Button>
            <Button rounded={'full'}>How It Works</Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
          }
        />
      </Flex>
    </Stack>
  );
}