import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Stack,
  Textarea,
  useClipboard,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import type { GetStaticProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import Head from "next/head";
import { FormEvent, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Header } from "../components/Header";
import { ModalProps } from "../components/LinkModal";
import { MaskType } from "../components/MaskType";
import { NumberInputMobile } from "../components/NumberInputMobile";
import { PhoneNumberInput } from "../components/PhoneNumberInput";

const DynamicLinkModal = dynamic<ModalProps>(
  () => import("../components/LinkModal").then((mod) => mod.LinkModal),
  { ssr: false }
);

export type MaskTypes = "pt-BR" | "en-US" | "none";

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

  const finalRef = useRef(null);

  const formatCountryValue = (country: number) => `+${country}`;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const phoneUnformatted = phone.replace(/\D/g, "");

    if (country === 0 || state === 0) {
      toast({
        title: t("toastCountryAndState.title"),
        description: t("toastCountryAndState.description"),
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

    if (phoneUnformatted === "" && message === "") {
      setNoPhoneOrMessage(true);

      toast({
        title: t("toastPhoneOrMessage.title"),
        description: t("toastPhoneOrMessage.description"),
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

        {/* Facebook Meta Tags */}
        <meta property="og:url" content="https://whats-api.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta name="og:title" content="WhatsApp Link Creator" />
        <meta name="og:description" content={t("meta.description")} />
        <meta
          name="og:image"
          content="https://whats-api.vercel.app/whatsapp.png"
        />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="whats-api.vercel.app" />
        <meta property="twitter:url" content="https://whats-api.vercel.app/" />
        <meta name="twitter:title" content="WhatsApp Link Creator" />
        <meta name="twitter:description" content={t("meta.description")} />
        <meta
          name="twitter:image"
          content="https://whats-api.vercel.app/whatsapp.png"
        />

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
          <Flex gap="4" direction={{ base: "column", md: "row" }}>
            <NumberInputMobile
              value={country}
              setValue={setCountry}
              formatValue={formatCountryValue}
              translation="country"
            />
            <NumberInputMobile
              value={state}
              setValue={setState}
              formatValue={(value) => String(value)}
              translation="state"
            />
          </Flex>
          <PhoneNumberInput
            value={phone}
            setValue={setPhone}
            finalRef={finalRef}
            isInvalid={noPhoneOrMessage}
            settings={settings}
          />
          <FormControl isInvalid={noPhoneOrMessage}>
            <FormLabel htmlFor="message">{t("message")}</FormLabel>
            <Textarea
              id="message"
              placeholder={t("message")}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </FormControl>
          <MaskType value={settings} setValue={setSettings} />
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

      <DynamicLinkModal
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
