import React, { useEffect, useState } from 'react';
import { Box, Flex, Heading, FormControl, FormLabel, Input, Button, useToast } from '@chakra-ui/react';
import { connect, useSelector } from 'react-redux'
import { registerClient } from '../../Redux/Actions/actions';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { UseSelector, useDispatch } from 'react-redux';
import PriceListTable from './PriceListTable';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
var finaldata;
var timerId;

const RegisterForm = ({currentClients, registerClient}) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast();
  const navigate = useNavigate();

  finaldata = useSelector((state) => state.registeredclients)
//   useEffect(()=>{
//     //registerClient(formData)//setData(prev=>([...prev, currentClients]))
//   }, [registerClient])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const postRegisteredClients = () =>{

    setIsLoading(true)

    const navigateNextSite = async() =>{


    try{
        console.log(finaldata)
        const response = await(axios.post('http://localhost:5000/registerClients', formData))
        console.log(response.data)
        setData(response.data)
        
        toast({
            title: 'Registration Successful',
            description: 'Client has been registered successfully.',
            status: 'success',
            duration: 5000,
            isClosable: true,
            
          });

          navigate('/register/pricelist')
        
    }
    catch(err){
        console.error(err)
    }
    finally{
        setFormData({ name: '', email: '', password: '' });
        setIsLoading(false)
        clearTimeout(timerId)
       
        // navigate('/register/pricelist')
    }
}

timerId = setTimeout(navigateNextSite, 3000)
    
  }

  const handleSubmit = async(e) => {

    e.preventDefault();
    const { name, email, password } = formData
    

    if (name === "" || email === "" || password === ""){

        toast({
            title: 'Registeration Incomplete!',
            description: 'Please fill in all sensitive details.',
            // status: 'success',
            duration: 3000,
            isClosable: true,
        });
        return

    }else{
        // You can add your registration logic here, like sending data to an API
        console.log(formData);
        registerClient(formData)
        //setData((prev)=>([...prev, {name, email, password}]))
        postRegisteredClients()
        
    }
  };

  return (
    <Box p={4}>
      <Heading as="h2" mb={4}>Register Client</Heading>
      {/* <PriceListTable /> */}
      <form  method='POST' onSubmit={handleSubmit}>
        <FormControl id="name" mb={4}>
          <FormLabel>Name</FormLabel>
          <Input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter name" />
        </FormControl>
        <FormControl id="email" mb={4}>
          <FormLabel>Email</FormLabel>
          <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" />
        </FormControl>
        <FormControl id="password" mb={4}>
          <FormLabel>Password</FormLabel>
          <Input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter password" />
        </FormControl> 
        <Button isLoading={isLoading} type="submit" colorScheme="blue" w="100%">Register</Button>
        {/* <Button type="button" colorScheme="blue" w="100%" onClick={()=>{postRegisteredClients(); }}>Post</Button> */}
        
      </form>
      {/* <PriceListTable /> */}
    </Box>
  );
};

const mapStateToProps = (state) => {
    return {currentClients : state.registeredclients}
}

// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators({registerClient}, dispatch)
// }

export default connect(mapStateToProps, {registerClient})(RegisterForm);
