import { Box, Flex, Heading, ListItem, Spacer, UnorderedList } from "@chakra-ui/react";
import { FaHome, FaInfoCircle, FaCogs } from "react-icons/fa"; // Import desired icons
import { Link } from "react-router-dom";

const HeaderLogin = () => {
  return (
    <Flex as="header" align="center" justify="space-between" px={4} py={2} bg="blue.500" color="white">
      <Box>
        <Heading as="h1" size="md">My Logo</Heading>
      </Box>
      <Spacer />
      <Box display={{ base: "none", md: "block" }}>
        <nav>
          <UnorderedList display={{base:"block", md:"block", lg:"flex", sm:"block"}}>
            <ListItem m={{base:4, md:4, lg:4, sm:4}}><FaHome /><Link to={'/'}> Home</Link></ListItem>
            <ListItem m={{base:4, md:4, lg:4, sm:4}}><FaInfoCircle /> About</ListItem>
            <ListItem m={{base:4, md:4, lg:4, sm:4}}><FaCogs /> Services</ListItem>
          </UnorderedList>
        </nav>
      </Box>
    </Flex>
  );
};

export default HeaderLogin;