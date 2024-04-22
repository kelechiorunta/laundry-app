import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { activeClient } from '../../Redux/Actions/actions';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaTrashAlt } from 'react-icons/fa';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Heading,
  Select,
  useBreakpointValue,
  Text,
  Flex,
  ListItem,
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
import HeaderLaundryForm from './HeaderLaundryForm';
import { FaAllergies, FaEject } from 'react-icons/fa';

const LaundryForm = ({client, activeClient}) => {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [activeUser, setActiveUser] = useState('')
  const [isLoadingUpdateForm, setIsLoadingUpdateForm] = useState(false)
  const [uploaddata, setUploadData] = useState([])
  const [updateInfo, setUpdateInfo] = useState({})
  const [updateOrder, setUpdateOrder] = useState([])
  const [order, setOrder] = useState([])
  var timerUpdate;
  const navigate = useNavigate()
  var inPutRef = useRef(null)

  useEffect(() => {
    const fetchUser = async() => {
      try{
        const response = await(axios.get('http://localhost:5000/activeClient'))
        console.log(response.data)
        setActiveUser(response.data.activeclient)
        activeClient(response.data.activeclient)
      }
      catch(err){
        console.log(err)
      }
    }
    fetchUser()
  }, [])

  const handleAddItem = () => {
    if (item.trim() && quantity.trim()) {
      setItems([...items, { item, quantity }]);
      
      setItem('');
      setQuantity('');
    }
  };

  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const showUpdateModal = () =>{
    setIsLoadingUpdateForm(!isLoadingUpdateForm)
    handleShowUpdate()
   
  }

  const handleSubmit = async() => {
        try{
            
            console.log(items)
            const response = await(axios.post('http://localhost:5000/registerWares', { name: activeUser, order: [...items] }))
            console.log(response.data)
        }
        catch(err){
            console.error(err)
        }
        finally{
            setItems([])
        }
  }

  const handleShowUpdate = async() => {
    try{
       // console.log(items)
        const response = await(axios.get('http://localhost:5000/registerWares'))
        setUploadData(response.data)
        console.log(response.data)
        
        const selectedOrder = response.data.find(i=>i.name === activeUser)

        console.log(selectedOrder)
        console.log(selectedOrder['order'])
        selectedOrder['order'].map(i => {
            return setUpdateInfo(prev=>({...prev, [i.item]: i.quantity}))
        })
        response.data.map((i) => {
            return (
                (i.name===activeUser)? setUpdateOrder(p=>[...i.order]): null
                )}
        )
        console.log(updateOrder)
        console.log(updateInfo)
        // setOrder(updateOrder)
        
    }
    catch(err){
        console.error(err)
    }
    
}

  
  const handleUpdate = async() => {

    try{
        const response = await(axios.put('http://localhost:5000/registerWares/' + activeUser, {updateInfo, updateOrder}))
        setUploadData([...response.data])
        console.log(response.data)
        handleShowUpdate()
    }
    catch(err){
        console.error(err)
    }
    finally{
         setUpdateInfo({})
         //setUploadData([])
         setUpdateOrder(updateOrder)
        //  handleShowUpdate()
         //setUpdateInfo(updateInfo)
    }
    console.log(updateInfo)

  }

  const handleRemove = (itemname) => {
     const filteredData = [...updateOrder].filter((i, index) => i.item !== itemname )
     console.log(filteredData)
     setUpdateOrder([...filteredData])
     const updatedwaresInfo = {...updateInfo}//Object.entries(updateInfo).filter(i=>i !== itemname)
     delete updatedwaresInfo[itemname]
    setUpdateInfo(updatedwaresInfo)
    console.log(updatedwaresInfo)
     console.log(updateInfo)
     //setUpdateOrder(updateOrder)
  }

  useEffect(()=>{
    // uploaddata.map((i) => {
    //     return (
    //         (i.name===activeUser)? setUpdateOrder(i.order): null
    //         )}
    // )
    // console.log(updateOrder)
    // // setOrder(updateOrder)
    // updateOrder.map(i => {
    //     return setUpdateInfo(prev=>({...prev, [i.item]: i.quantity}))
    // })
    // console.log(updateInfo)
  }, [])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setUpdateOrder(updateOrder)
    // console.log(updateInfo)
  };

  const breakpointValue = useBreakpointValue({ base: 'column', md: 'row' });

  return (
    <Box p={4} maxW="1000px" mx="auto">
        <HeaderLaundryForm showModal={showUpdateModal}/>

        <Modal isOpen={isLoadingUpdateForm} onClose={() => {setIsLoadingUpdateForm(false)}}>
            <ModalOverlay  />
            <ModalContent>
                <ModalHeader>{`Welcome ${activeUser}`}</ModalHeader>
                <ModalCloseButton />
                <ModalBody >
                    <Text mb={3} fontFamily={'Poppins, sans-serif'}>{`${activeUser} needs some changes`}</Text>
                    {console.log(updateOrder)}
                   {(updateOrder && updateOrder.length>0) && updateOrder.map((client, index) => {
                        return (<Box key={client.item}>
                                <Flex gap={3} alignItems={'center'} key={client.item}>
                                <Text width={150}><strong>{`${client.item}:`}</strong></Text><Input key={index} name={client.item} 
                                type='number' value={updateInfo[`${client.item}`]} width={'75px'} onChange={handleChange}
                                /><Button onClick={()=>handleRemove(client.item)}><FaTrashAlt /></Button>
                                </Flex>
                                {/* <Text onLoad={()=>alert("hello")} textAlign={'center'}>{client.quantity}</Text> */}
                        </Box>)})
                   }
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={() => {navigate('/register')}}>
                        Back To Register
                    </Button>
                    <Button colorScheme='green' onClick={handleUpdate} isDisabled={updateInfo[`${client.item}`]===""}>Update</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

      <Heading as="h1" mb={4}>
        {console.log(client.name)}
        {`Laundry Registration Form for ${activeUser}.`}
      </Heading>
      <Text fontFamily={'Poppins'}>{`${activeUser} is here to register items for laundry services.`}</Text>
      <Stack spacing={4} mt={4}>
        {items.map((item, index) => (
          <Box key={index} display="flex" alignItems='center' justifyContent="space-between">
            <Box display={'flex'} alignSelf={'flex-end'}>
              <strong>{item.item}</strong> - Quantity: {item.quantity}
            </Box>
            <Button colorScheme="red" onClick={() => handleRemoveItem(index)}>
              Remove
            </Button>
          </Box>
        ))}
      </Stack>
      
      <FormControl mt={4}>
        <FormLabel>Item</FormLabel>
        <Input
          type="text"
          name="item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="Enter item"
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Quantity</FormLabel>
        <Input
          type="number"
          name="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Enter quantity"
        />
      </FormControl>
      <Stack mt={4} direction={breakpointValue}>
        <Button colorScheme="blue" onClick={handleAddItem}>
          Add Item
        </Button>
        <Button isDisabled={items.length <= 0} colorScheme="green" onClick={handleSubmit}>Submit</Button>
      </Stack>
    </Box>
  );
};

const mapStateToProps = (state) => {
    return {client: state.activeClient}
}

export default connect(mapStateToProps, {activeClient})(LaundryForm);


