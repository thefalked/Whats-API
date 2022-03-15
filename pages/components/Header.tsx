import { Container, Flex, Heading, Icon } from "@chakra-ui/react";
import type { NextPage } from "next";
import { FaWhatsapp } from "react-icons/fa";

export const Header: NextPage = () => {
  return (
    <Container maxWidth="xl" p="6">
      <Flex
        as="nav"
        bg="whatsapp.500"
        color="white"
        px="6"
        py="3"
        rounded="lg"
        justify="center"
      >
        <Heading as="h1" fontSize="3xl">
          <Icon as={FaWhatsapp} name="Whatsapp icon" mr="2" />
          WhatsApp API
        </Heading>
      </Flex>
    </Container>
  );
};
