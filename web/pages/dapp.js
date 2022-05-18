import { useMoralis } from "react-moralis";
import { Head } from "next/head";
import {
  Box,
  Flex,
  Button,
  Text,
  Image,
  Container,
  Code,
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import VMTable from "../components/ManageVMTs";
import ManageVMTs from "../components/ManageVMTs";
import ExploreVMTs from "../components/ExploreVMTs";
import Footer from "../components/Footer";
import { ConnectButton } from "web3uikit";

export default function Dapp() {
  const { isAuthenticated, authenticate, user, logout, isLoggingOut } =
    useMoralis();

  if (!isAuthenticated) {
    return (
      <Box w="100vw" h="100vh" maxW="100vw" mt="0" m="auto">
        {/* <Head>
          <title>VMTree</title>
        </Head> */}

        <NavBar as="header" position="fixed" w="100%" />
        {/* <Flex
            justifyContent="space-between"
            bgColor="#365AD2"
            backgroundColor="#365AD2"
            align="center"
            pos="relative"
            justify="center"
            boxSize="full"
            position="static"
          >
            <Flex alignItems="center" ml={10}>
              <Image src="/vmtree_logo.svg" alt="VMTree" />
              <Text
                color="whiteAlpha.900"
                pl="1em"
                fontWeight="bold"
                textAlign="center"
                fontSize={36}
                letterSpacing="wider"
              >
                VMTree
              </Text>
            </Flex>
            <Flex mr={10} alignItems="center" justifyContent="center">
              <Button
                variant="solid"
                size="sm"
                mr="1em"
                borderRadius={155}
                bg="#fff"
                _hover={{ background: "#2c4cb6", color: "#fff" }}
              >
                Docs
              </Button>
              <ConnectButton moralisAuth={false} radius={156} size="small" />
              <Button
                variant="solid"
                size="sm"
                ml="1em"
                borderRadius={155}
                bg="#fff"
                _hover={{ background: "#2c4cb6", color: "#fff" }}
                onClick={() => {
                  authenticate({
                    signingMessage: "Sign to login to VMTree",
                  });
                  // navigator.clipboard.writeText('address')
                }}
              >
                Connect Wallet
              </Button>
            </Flex>
          </Flex> */}
        <Hero w="full" />
        <ManageVMTs />
        <ExploreVMTs />
        <Footer />
      </Box>
    );
  }

  return (
    <div>
      <Text>{user.getUsername()}</Text>
      <Text>{user.get("ethAddress")}</Text>
      <Button onClick={logout} disable={isLoggingOut}>
        {" "}
        Logout
      </Button>
    </div>
  );
}
