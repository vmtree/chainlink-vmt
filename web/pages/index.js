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
  Heading,
  Hide,
  Link,
  Divider,
  Center,
  Show,
  Grid,
  GridItem,
  AspectRatio,
  Stack,
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import VMTable from "../components/ManageVMTs";
import ManageVMTs from "../components/ManageVMTs";
import ExploreVMTs from "../components/ExploreVMTs";
import Footer from "../components/Footer";
import { Avatar, Badge, ConnectButton } from "web3uikit";
import LandingNavBar from "../components/LandingNavBar";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  DownloadIcon,
} from "@chakra-ui/icons";
import Card from "../components/Card";

export default function Home() {
  return (
    <Box w="100vw" maxW="100vw" mt="0" m="auto">
      <LandingNavBar as="header" position="fixed" w="100%" />

      <Flex flexDirection="column" h="full" alignItems="center" w="full">
        <Hide below="md">
          <Flex
            justifyContent="space-between"
            alignItems="center"
            pt="6vh"
            mb="5em"
            backgroundSize="contain"
            backgroundImage="url(/tree_skeleton_small.svg)"
            backgroundPosition="right"
            backgroundRepeat="no-repeat"
            w="full"
          >
            <Flex
              ml="15%"
              bgColor="#365AD2"
              borderBottomRadius="50%"
              p="1%"
              h="full"
            >
              <Image src="/vmt_logo_white.svg" boxSize="280px" alt="VMTree" />
            </Flex>
            <Flex mr="40%" flexDirection="column" h="full">
              <Heading
                letterSpacing="widest"
                fontSize="5xl"
                fontWeight="semibold"
              >
                VMTree
              </Heading>
              <Text letterSpacing="widest">Verifiable Merkle Trees</Text>
              <Link sx={{ textDecoration: "none" }}>
                <Button
                  variant="solid"
                  size="sm"
                  mt="2em"
                  pl="2em"
                  pr="1em"
                  borderRadius={155}
                  bg="#365AD2"
                  color="#fff"
                  rightIcon={<ChevronRightIcon />}
                  _hover={{ background: "#fff", color: "#365AD2" }}
                >
                  Try it!
                </Button>
              </Link>
            </Flex>
          </Flex>
        </Hide>

        <Show below="md">
          <Flex
            justifyContent="center"
            alignItems="center"
            pt="6vh"
            mb="5em"
            backgroundSize="contain"
            backgroundImage="url(/tree_skeleton_small.svg)"
            backgroundPosition="right"
            backgroundRepeat="no-repeat"
            w="full"
          >
            <Flex
              alignItems="center"
              alignContent="center"
              flexDirection="column"
              h="full"
            >
              <Heading
                letterSpacing="widest"
                fontSize="6xl"
                fontWeight="semibold"
              >
                VMTree
              </Heading>
              <Text letterSpacing="widest">Verifiable Merkle Trees</Text>
              <Link sx={{ textDecoration: "none" }}>
                <Button
                  variant="solid"
                  size="sm"
                  mt="2em"
                  pl="2em"
                  pr="1em"
                  borderRadius={155}
                  bg="#365AD2"
                  color="#fff"
                  rightIcon={<ChevronRightIcon />}
                  _hover={{ background: "#fff", color: "#365AD2" }}
                >
                  Try it!
                </Button>
              </Link>
            </Flex>
          </Flex>
        </Show>

        <Text color="gray.300" mb="2em" letterSpacing="widest" fontSize="sm">
          A Chainlink 2022 Hackathon Project
        </Text>

        <Flex
          justifyContent="space-around"
          alignItems="center"
          // mb="5em"
          pt="3em"
          pb="3em"
          pl="15%"
          pr="15%"
          backgroundSize="contain"
          backgroundImage="url(/tree_skeleton_small.svg)"
          backgroundPosition="right"
          backgroundRepeat="no-repeat"
          w="full"
          bg="#365AD2"
          zIndex="0"
        >
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Text fontSize="2xl" color="#fff">
              38
            </Text>
            <Text fontSize="sm" color="#fff">
              Merke Trees Deployed
            </Text>
          </Flex>
          <Center height="50px">
            <Divider orientation="vertical" />
          </Center>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Text fontSize="2xl" color="#fff">
              287
            </Text>
            <Text fontSize="sm" color="#fff">
              Transactions
            </Text>
          </Flex>
          <Center height="50px">
            <Divider orientation="vertical" />
          </Center>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Text fontSize="2xl" color="#fff">
              5982
            </Text>
            <Text fontSize="sm" color="#fff">
              Fee Generated
            </Text>
          </Flex>
        </Flex>

        <Flex align="center">
          <Link
            href="/dapp"
            _hover={{ textDecoration: "none", boxShadow: "dark-lg" }}
            mt="3%"
            borderRadius="50%"
            boxShadow="xl"
            pos="absolute"
          >
            <ChevronDownIcon
              boxSize="10"
              borderRadius="50%"
              color="#365AD2"
              zIndex="9999"
            />
          </Link>
        </Flex>

        <Flex align="center" w="50%" mt="8%">
          <Text textAlign="center" letterSpacing="wide">
            VMTree allows anyone to deploy a verifable merkle tree using the
            chainlink network. Lorem ipsum condimentum ornare ante, at maximus
            sapien porta sit amet. Morbi orci lectus, cursus ut ipsum convallis,
            tempor feugiat quam. In vel odio non velit blandit lobortis. Mauris
            quis quam fermentum, cursus quam at, dignissim ante.
          </Text>
        </Flex>
      </Flex>

      <Flex justifyContent="space-between" mt="5em" ml="0" alignItems="center">
        <Flex
          flexDirection="column"
          backgroundColor="#365AD2"
          color="#fff"
          p="5%"
          maxW="65%"
          ml={0}
          borderTopRightRadius="35em"
          borderBottomRightRadius="35em"
          // backgroundImage="url(/blue_curved_box.svg)"
          // backgroundPosition="center"
          // backgroundRepeat="no-repeat"
          // backgroundSize="contain"
        >
          <Text fontSize="5xl" fontWeight="bold">
            VMTs
          </Text>
          <Text mt="1em">
            This section will be for explaining what VMTs are, what they can be
            used for an all kinds of stuff like that... Placeholder Text
            <br />
            <br />
            Placeholder Text Placeholder Text This section will be for
            explaining what VMTs are, what they can be all kinds of stuff like
            that... Placeholder Text Placeholde
            <br />
            <br />
            This section will be for explaining what VMTs are, what they can be
            used for an all kinds of stuff like that... Placeholder Text
            Placeholde
          </Text>
        </Flex>
        <Flex flexDirection="column" mr="10%" alignItems="center">
          <Link
            href="/dapp"
            _hover={{ textDecoration: "none", boxShadow: "2xl" }}
            borderRadius="50%"
            boxShadow="xl"
            boxSize="80px"
            alignItems="center"
            alignContent="center"
          >
            <DownloadIcon
              boxSize="80px"
              color="#365AD2"
              zIndex="9999"
              p="20%"
            />
          </Link>
          <Text mt="1em" fontWeight="semibold">
            Download the Docs
          </Text>
        </Flex>
      </Flex>

      <Flex
        flexDirection="column"
        align="center"
        w="full"
        mt="8%"
        alignContent="center"
        alignItems="center"
      >
        <Flex w="50%" alignContent="center" alignItems="center">
          <Text textAlign="center" letterSpacing="wide">
            VMTree allows anyone to deploy a verifable merkle tree using the
            chainlink network. Lorem ipsum condimentum ornare ante, at maximus
            sapien porta sit amet. Morbi orci lectus, cursus ut ipsum convallis,
            tempor feugiat quam. In vel odio non velit blandit lobortis. Mauris
            quis quam fermentum, cursus quam at, dignissim ante.
          </Text>
        </Flex>
      </Flex>

      <Container justifyContent="center" mt="5%">
        <AspectRatio maxW="560px" ratio={16 / 9}>
          <iframe
            title="naruto"
            src="https://www.youtube.com/embed/ASFzsgIurMQ"
            allowFullScreen
          />
        </AspectRatio>
      </Container>

      <Flex
        flexDirection="column"
        align="center"
        w="full"
        mt="5%"
        alignContent="center"
        alignItems="center"
      >
        <Heading>The Team</Heading>
        <Flex
          flexDirection="row"
          align="center"
          w="35%"
          mt="4%"
          alignContent="center"
          alignItems="center"
        >
          <Card />
          <Card />
        </Flex>
        <Flex
          flexDirection="row"
          align="center"
          w="35%"
          mt="5%"
          alignContent="center"
          alignItems="center"
        >
          <Card />
          <Card />
        </Flex>
      </Flex>

      <Footer />
    </Box>
  );
}
