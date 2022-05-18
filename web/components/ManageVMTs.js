import { SettingsIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Text,
  Image,
  Box,
  Link,
  Grid,
  GridItem,
} from "@chakra-ui/react";

const ManageVMTs = (props) => {
  return (
    <Box paddingLeft="8em" paddingRight="8em">
      <Flex>
        <Text fontSize="xl" ml="2em" fontWeight="bold">
          Manage VMTs
        </Text>
      </Flex>

      <Box>
        {/* Header row */}
        <Flex
          //   justifyContent="center"
          pl="5em"
          pr="5em"
          fontSize="xx-small"
          minWidth="max-content"
          alignItems="center"
          gap="2"
        >
          <Flex>
            <Box w="100%" h="10" bg="blue.500" />
            <GridItem w="100%" h="10" bg="blue.500" />
          </Flex>
          <Flex>
            <GridItem w="100%" h="10" bg="blue.500" />
            <GridItem w="100%" h="10" bg="blue.500" />
            <GridItem w="100%" h="10" bg="blue.500" />
          </Flex>
        </Flex>
        <Grid
          templateColumns="repeat(25, 1fr)"
          ml="6.5em"
          gap={10}
          fontSize="x-small"
          color="gray.400"
        >
          <GridItem colSpan={5}>
            <Text>STATUS</Text>
          </GridItem>
          <GridItem colSpan={6}>
            <Text>ADDRESS</Text>
          </GridItem>
          <GridItem colSpan={4}>
            <Text>NAME</Text>
          </GridItem>
          <GridItem colSpan={3}>
            <Text>BALANCE</Text>
          </GridItem>
          <GridItem colSpan={1}>
            <Text>TRANSACTIONS</Text>
          </GridItem>
          <GridItem colSpan={5}>
            <Text>ACTIVATED</Text>
          </GridItem>
        </Grid>

        <Box>
          <Flex
            justifyContent="space-between"
            backgroundColor="#fff"
            borderRadius={155}
            boxShadow="md"
            padding="1em"
            pl="5em"
            pr="5em"
            fontSize="smaller"
            color="gray.600"
            margin="1em"
          >
            <Text>
              <Image src="enabled_vmt.svg" alt="enabled" />
            </Text>
            <Text>0xdAC17F958D2ee523a2206206994597C13D831ec7</Text>
            <Text>Test Merkle Tree #1</Text>
            <Text>28.7502 LINK</Text>
            <Text isNumeric>72</Text>
            <Text>10.05.2022</Text>
            <Text>
              <Link href="#">
                <SettingsIcon />
              </Link>
            </Text>
          </Flex>
          <Flex
            justifyContent="space-between"
            backgroundColor="#fff"
            borderRadius={155}
            boxShadow="md"
            padding="1em"
            pl="5em"
            pr="5em"
            fontSize="smaller"
            color="gray.600"
            margin="1em"
          >
            <Image src="disabled_vmt.svg" alt="disabled" />
            <Text>0xdAC17F958D2ee523a2206206994597C13D831ec7</Text>
            <Text>Test Merkle Tree #1</Text>
            <Text>28.7502 LINK</Text>
            <Text isNumeric>72</Text>
            <Text>10.05.2022</Text>
            <Text>
              <Link href="#">
                <SettingsIcon />
              </Link>
            </Text>
          </Flex>
          <Flex
            justifyContent="space-between"
            backgroundColor="#fff"
            borderRadius={155}
            boxShadow="md"
            padding="1em"
            pl="5em"
            pr="5em"
            fontSize="smaller"
            color="gray.600"
            margin="1em"
          >
            <Text>
              <Image src="enabled_vmt.svg" alt="enabled" />
            </Text>
            <Text>0xdAC17F958D2ee523a2206206994597C13D831ec7</Text>
            <Text>Test Merkle Tree #1</Text>
            <Text>28.7502 LINK</Text>
            <Text isNumeric>72</Text>
            <Text>10.05.2022</Text>
            <Text>
              <Link href="#">
                <SettingsIcon />
              </Link>
            </Text>
          </Flex>
        </Box>

        <Flex
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
          mt="3em"
        >
          <Link isExternal="true">
            <Text
              mt="0.5em"
              mb="3em"
              color="gray.400"
              as="u"
              fontSize="x-small"
            >
              MISSING SOMETHING ?
            </Text>
          </Link>
        </Flex>
      </Box>
    </Box>
  );
};

export default ManageVMTs;
