import { Box, Flex, Text, useBreakpointValue } from "@chakra-ui/react";

const Footer = () => {
  // Use useBreakpointValue to apply styles based on breakpoints
  const flexDirection = useBreakpointValue({ base: "column", md: "row", lg: "row" });

  return (
    <Flex
      as="footer"
      align="center"
      justify="center"
      direction={flexDirection}
      bg="gray.800"
      color="white"
      p={4}
    >
      <Box mb={{ base: 4, md: 0 }}>
        <Text>&copy; 2024 My Website</Text>
      </Box>
      <Box ml={{ base: 0, md: 4 }}>
        <Text>Privacy Policy</Text>
      </Box>
      <Box ml={{ base: 0, md: 4 }}>
        <Text>Terms of Service</Text>
      </Box>
    </Flex>
  );
};

export default Footer;