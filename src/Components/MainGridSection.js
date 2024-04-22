import { Box, Grid, GridItem, useBreakpointValue } from "@chakra-ui/react";

const MainGridSection = () => {
  // Use useBreakpointValue to apply styles based on breakpoints
  const gridColumns = useBreakpointValue({ base: "1fr", md: "1.25fr 1.75fr", lg: "1.25fr 1.75fr", xl: "0.75fr 1.25fr 0.75fr" });

  return (
    <Grid
      templateColumns={gridColumns}
      gap={4}
      p={4}
    >
      <GridItem colSpan={1}>
        <Box bg="blue.200" h="100vh">
          Left Sidebar
        </Box>
      </GridItem>
      <GridItem colSpan={1}>
        <Box bg="green.200" h="100vh">
          Main Content
        </Box>
      </GridItem>
      <GridItem colSpan={1}>
        <Box bg="orange.200" h="100vh">
          Right Sidebar
        </Box>
      </GridItem>
    </Grid>
  );
};

export default MainGridSection;