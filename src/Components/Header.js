import { Box, Flex, Heading, ListItem, Spacer, UnorderedList, useBreakpointValue } from "@chakra-ui/react";
import { Link } from 'react-router-dom';

const Header = () => {
  // Use useBreakpointValue to apply styles based on breakpoints
  const headerSize = useBreakpointValue({ base: "sm", md: "md", lg: "lg", xl: "xl" });

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      px={4}
      py={2}
      bg="blue.500"
      color="white"
      position={'sticky'}
      top={0}
      zIndex={5}
    >
      <Box>
        <Heading size={headerSize}>My Logo</Heading>
      </Box>
      <Spacer />
      <Box display={{ base: "none", md: "block" }}>
        
          <UnorderedList display={{ base: "none", md: "block", lg: "flex" }}>
         
            <ListItem m = {{ base:4, md:4, lg:4 }}><Link to={"/register"}>Sign In</Link></ListItem>
            <ListItem m = {{ base:4, md:4, lg:4 }}><Link to={"/about"}>About</Link></ListItem>
            <ListItem m = {{ base:4, md:4, lg:4 }}><Link to="/services">Services</Link></ListItem>
          </UnorderedList>
    
      </Box>
    </Flex>
  );
};

export default Header;