import {
  Button,
  Flex,
  Text,
  Image,
  Box,
  Divider,
  Link,
} from "@chakra-ui/react";

const Hero = (props) => {
  return (
    <Box
      padding="2em"
      align="center"
      // pos="fixed"
      justify="center"
      boxSize="full"
      maxH="5vh"
      minW="100hw"
      as="header"
      w="full"
      mb="20em"
    >
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
      >
        <Link>
          <Image src="/add_new_vmt_icon.svg" alt="VMTree" mt="5em" />
        </Link>
        <Link isExternal="true">
          <Text mt="0.5em" mb="3em">
            Deploy a new VMT
          </Text>
        </Link>
        <Divider borderColor="blackAlpha.300" width="50%" mb="5em" />
      </Flex>
    </Box>
  );
};

export default Hero;
