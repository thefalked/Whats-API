import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  useBreakpointValue,
  useClipboard,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import type { GetStaticProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { FormEvent, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Header } from "../components/Header";
import { LinkModal } from "../components/LinkModal";

type MaskTypes = "pt-BR" | "en-US" | "none";

const Home: NextPage = () => {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [country, setCountry] = useState(55);
  const [state, setState] = useState(11);
  const [finalLink, setFinalLink] = useState("");
  const [settings, setSettings] = useState<MaskTypes>("pt-BR");
  const [noPhoneOrMessage, setNoPhoneOrMessage] = useState(false);

  const toast = useToast();
  const { t } = useTranslation("common");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { hasCopied, onCopy } = useClipboard(finalLink);
  const radioSize = useBreakpointValue({ base: "sm", md: "md" });

  const finalRef = useRef(null);

  const formatCountryValue = (country: number) => `+${country}`;

  const formatBrazilPhoneValue = (phoneNumber: string) => {
    if (phoneNumber.length <= 5) {
      return phoneNumber;
    }

    return `${phoneNumber.slice(0, 5)}-${phoneNumber.slice(5, 9)}`;
  };

  const formatUSAPhoneValue = (phoneNumber: string) => {
    if (phoneNumber.length <= 3) {
      return phoneNumber;
    }

    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}`;
  };

  const formatPhoneValue = (phone: string) => {
    if (settings === "none") {
      return phone;
    }

    if (settings === "pt-BR") {
      return formatBrazilPhoneValue(phone);
    }

    return formatUSAPhoneValue(phone);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const phoneUnformatted = phone.replace(/\D/g, "");

    if (phoneUnformatted === "" && message === "") {
      setNoPhoneOrMessage(true);

      toast({
        title: "Ops!",
        description: "Please fill at least one of the fields.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });

      return;
    } else {
      setNoPhoneOrMessage(false);
    }

    if (phone && message) {
      setFinalLink(
        `https://wa.me/${country}${state}${phone}?text=${encodeURI(message)}`
      );
    } else if (phone) {
      setFinalLink(`https://wa.me/${country}${state}${phone}`);
    } else {
      setFinalLink(`https://wa.me/?text=${encodeURI(message)}`);
    }

    onOpen();
  };

  return (
    <Flex minH="100vh" bg="gray.50" direction="column">
      <Head>
        <title>WhatsApp Link Creator</title>

        <meta name="description" content={t("meta.description")} />
        <meta name="og:title" content="WhatsApp Link Creator" />
        <meta name="og:description" content={t("meta.description")} />
        <meta name="og:image" content="/whatsapp.png" />

        <link rel="icon" href="/favicon.png" />
      </Head>

      <Header />

      <Flex justify="center" px="4">
        <Stack
          as="form"
          w="full"
          p="7"
          spacing="6"
          rounded="xl"
          boxShadow="lg"
          maxW="lg"
          bg="white"
          onSubmit={(e) => handleSubmit(e)}
        >
          <Flex gap="4">
            <FormControl isRequired>
              <FormLabel htmlFor="country">{t("country")}</FormLabel>
              <NumberInput
                id="country"
                inputMode="numeric"
                pattern="[0-9]*"
                defaultValue={1}
                min={1}
                value={formatCountryValue(country)}
                onChange={(_countryString, countryNumber) =>
                  setCountry(countryNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="ddd">{t("state")}</FormLabel>
              <NumberInput
                id="ddd"
                inputMode="numeric"
                pattern="[0-9]*"
                min={1}
                value={state}
                onChange={(_stateString, stateNumber) => setState(stateNumber)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </Flex>
          <FormControl isInvalid={noPhoneOrMessage}>
            <FormLabel htmlFor="phone">{t("phone_number")}</FormLabel>
            <Input
              id="phone"
              ref={finalRef}
              type="text"
              placeholder="Phone Number"
              inputMode="numeric"
              pattern="[0-9]*"
              value={formatPhoneValue(phone)}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            />
          </FormControl>
          <FormControl isInvalid={noPhoneOrMessage}>
            <FormLabel htmlFor="message">{t("message")}</FormLabel>
            <Textarea
              id="message"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="settings">{t("mask_type.label")}</FormLabel>
            <RadioGroup
              onChange={(radioValue: MaskTypes) => setSettings(radioValue)}
              value={settings}
              colorScheme="whatsapp"
              aria-describedby="settings"
              name="settings"
              size={radioSize}
            >
              <Stack direction="row">
                <Radio value="pt-BR">{t("mask_type.brazil")}</Radio>
                <Radio value="en-US">{t("mask_type.en_us")}</Radio>
                <Radio value="none">{t("mask_type.none")}</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          <Button
            type="submit"
            leftIcon={<FaWhatsapp />}
            colorScheme="whatsapp"
            variant="solid"
          >
            {t("submit_button")}
          </Button>
        </Stack>
      </Flex>

      <LinkModal
        finalRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        finalLink={finalLink}
        onCopy={onCopy}
        hasCopied={hasCopied}
      />
    </Flex>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async ({ locale = "en-US" }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
