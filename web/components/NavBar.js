import { Button, Flex, Text, Image, Box, Link } from "@chakra-ui/react";
import { ConnectButton } from "web3uikit";

const NavBar = (props) => {
  return (
    <Flex
      justifyContent="space-between"
      bgColor="#365AD2"
      backgroundColor="#365AD2"
      align="center"
      pos="relative"
      justify="center"
      boxSize="full"
      maxH="6vh"
      minH="6vh"
      minW="100hw"
      as="header"
      position="fixed"
      w="full"
      p="2%"
      zIndex="100"
    >
      <Flex alignItems="center" ml={10}>
        <Link href="/">
          <Image src="/vmtree_logo.svg" alt="VMTree" boxSize="90%" />
        </Link>
        <Link href="/" _hover={{ textDecoration: "none" }}>
          <Text
            color="whiteAlpha.900"
            // pl="1em"
            fontWeight="bold"
            textAlign="center"
            fontSize={36}
            letterSpacing="wider"
          >
            VMTree
          </Text>
        </Link>
      </Flex>
      <Flex mr={10} alignItems="center" justifyContent="center">
        {/* TODO: add doc's link here */}
        <Link href="/" _hover={{ textDecoration: "none" }}>
          <Button
            variant="solid"
            size="md"
            mr="1em"
            borderRadius={18}
            bg="#fff"
            color="#2E7DAF"
            _hover={{ background: "#2E7DAF", color: "#fff" }}
          >
            <Text color="#2E7DAF">Docs</Text>
          </Button>
        </Link>
        <ConnectButton
          moralisAuth={false}
          signingMessage="Sign to login to VMTree"
        />
      </Flex>
    </Flex>
  );
};

export default NavBar;
