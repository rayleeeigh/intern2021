import React, { Component } from 'react'
import { Box,
    Heading,
    Center, 
    Input,
    Button,
    Link,
    FormControl,
    FormLabel,
    FormHelperText, } from "@chakra-ui/react"
class Form extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             email:'',
             password:''
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleEmailChange (event) {
        this.setState({
            email: event.target.value
        })
    }
    handlePasswordChange(event){
        this.setState({
            password: event.target.value
        })
    }
    handleSubmit(event) {
        alert('Successfully registered '+this.state.email+'!');
        event.preventDefault();
    }
    render() {
        return (
            <Box textAlign="center" position="absolute" bgGradient="linear(to-b, blue.200, yellow.500)" w="100%" h="100vh">
                 <Box bg="white" border="1px" borderColor="gold" mt="9%" pr="6%" pl="6%"  ml="25%" w="50%" h="40%">
                     <Heading size="lg" fontSize="30px">Registration Form</Heading>
                    <FormControl id="email" onSubmit={this.handleSubmit} isRequired>
                           <Center><FormLabel>Email</FormLabel></Center>
                            <Input  variant="flushed" type="email" value={this.state.email} 
                            onChange={this.handleEmailChange} 
                            />
                            <FormHelperText>We'll never share your email.</FormHelperText>
                            <Center><FormLabel>Password</FormLabel></Center>
                            <Input variant="flushed" type="password" value ={this.state.password}
                            onChange={this.handlePasswordChange} 
                            />
                        <div>
                            <Link to="/login" color="blue">Login</Link>
                        </div>
                        <div>
                            <Button colorScheme="teal" size="md">
                                Submit
                            </Button>
                        </div>
                    </FormControl>
                 </Box>
            </Box>
           
        )
    }
}

export default Form
