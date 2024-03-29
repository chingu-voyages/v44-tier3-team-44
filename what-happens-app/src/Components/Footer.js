import { Box, Grid, Image, Text, Flex } from "@chakra-ui/react";
import what_happens_logo from "../images/what_happens_blue_logo.png";

function Footer() {
  return (
    <Box bg="#0050C8" py={5} textAlign="center" marginTop={5}>
      <Grid templateColumns="repeat(3, 1fr)" gap={1} justifyContent="center">
        <Box>
          <Text color="white" fontWeight="bold">
            Company
          </Text>
          <Text color="white">About us</Text>
          <Text color="white">News</Text>
          <Text color="white">FAQs</Text>
          <Text color="white">Support</Text>
          <Text color="white">Tutorial</Text>
        </Box>
        <Box>
          <Text color="white" fontWeight="bold">
            Help
          </Text>
          <Text color="white">Privacy Policy</Text>
          <Text color="white">Development</Text>
          <Text color="white">Terms and Services</Text>
        </Box>
        <Box>
          <Text color="white" fontWeight="bold">
            Legal
          </Text>
          <Text color="white">Privacy Policy</Text>
          <Text color="white">Development</Text>
          <Text color="white">Terms and Services</Text>
          <Text color="white">Cookies</Text>
          <Text color="white">Licenses</Text>
          <Text color="white">Contact</Text>
        </Box>
      </Grid>
      <Box>
      <Text color="white" fontWeight="semi-bold">
          © 2023 What Happens. All rights reserved.
        </Text>
     </Box>
     <Flex justifyContent="center" alignItems="center" >
        <Image
          src={what_happens_logo}
          boxSize="100px"
          alt="Logo"
        />
      </Flex>
    </Box>
  );
}

export default Footer;
