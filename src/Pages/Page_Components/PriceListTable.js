import React from 'react';
import { useEffect, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { activeClient } from '../../Redux/Actions/actions';
// import Lorem

import axios from 'axios';

import {
  Button,
  Text,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading
} from '@chakra-ui/react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

var modalId;

const PriceListTable = ({currentClient, activeClient}) => {

  const [client, setActiveClient] = useState("")
  const [activeMessage, setActiveMessage] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isLoadingModal, setIsLoadingModal] = useState(false)
  const [ProceedBtn, setProceedBtn] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async() => {
      setIsLoadingModal(false)
      try{
        const response = await(axios.get('http://localhost:5000/activeClient'))
        console.log(response.data)
        setActiveClient(response.data.activeclient)
        setActiveMessage(response.data.message)
        activeClient(response.data.activeclient)
      }
      catch(err){
        console.log(err)
      }
      finally{
        setIsLoadingModal(true)
        clearTimeout(modalId)
      }
    }
    modalId = setTimeout(fetchUser, 5000)
  }, [])

  return (
    <Box p={4}>

    {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal isOpen={isLoadingModal} onClose={() => {setIsLoadingModal(false)}}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{`Welcome ${client}`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <Lorem count={2} /> */}
            <Text fontFamily={'Poppins, sans-serif'}>{activeMessage}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => {navigate('/register')}}>
              Back
            </Button>
            <Button colorScheme='green' onClick={() => {setIsLoadingModal(false); setProceedBtn(true)}}>Continue</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Heading as={'h1'}>View Price List</Heading>
      <Table variant="striped" colorScheme="blue" size="sm" mb={4}>
        <Thead>
          <Tr>
            <Th fontFamily={'Poppins, sans-serif'}>Name</Th>
            <Th isNumeric>Price Per Item($)</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>T-shirt</Td>
            <Td isNumeric>5</Td>
          </Tr>
          <Tr> 
            <Td>Jeans</Td>
            <Td isNumeric>10</Td>
          </Tr>
          <Tr>
            <Td>Sweater</Td>
            <Td isNumeric>8</Td>
          </Tr>
          <Tr>
            <Td>Dress</Td>
            <Td isNumeric>12</Td>
          </Tr>
          <Tr>
            <Td>Jacket</Td>
            <Td isNumeric>15</Td>
          </Tr>
          <Tr>
            <Td>Gown</Td>
            <Td isNumeric>20</Td>
          </Tr>
          <Tr>
            <Td>Blouse</Td>
            <Td isNumeric>13</Td>
          </Tr>
        </Tbody>
      </Table>
      {ProceedBtn? <Button onClick={() => {navigate("/register/pricelist/laundryform")}}>Proceed to Next Page</Button> : null}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {currentClient: state.activeClient}
}

export default connect(null, { activeClient })(PriceListTable);