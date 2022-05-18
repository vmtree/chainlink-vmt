import {
  Box,
  Button,
  Text,
  Heading,
  Link,
  Center,
  Stack,
  Badge,
  Avatar,
  Image,
} from "@chakra-ui/react";

const Card = (props) => {
  return (
    <Box
      maxW={"320px"}
      w={"full"}
      rounded={"lg"}
      p={2}
      textAlign={"center"}
      alignItems="center"
      justifyContent="center"
    >
      <Avatar size={"xl"} src="/dummy_avatar.png" alt={"Avatar Alt"} />
      <Text fontWeight={600} color={"gray.500"} mb={1}>
        Person Name
      </Text>

      {/* TOOD: add personal profile links */}
      <Stack align={"center"} justify={"center"} direction={"row"}>
        <Link href="#">
          <Image src="/github.svg" alt="github" borderRadius="full" />
        </Link>
        <Link href="#">
          <Image src="/twitter.svg" alt="twitter" borderRadius="full" />
        </Link>
        <Link href="#">
          <Image src="/linkedin.svg" alt="linkedin" borderRadius="full" />
        </Link>
      </Stack>
    </Box>
  );
};

export default Card;
