import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { MutableRefObject, useRef } from "react";

export type ModalProps = {
  finalRef: MutableRefObject<null>;
  isOpen: boolean;
  onClose: () => void;
  finalLink: string;
  onCopy: () => void;
  hasCopied: boolean;
};

export const LinkModal: NextPage<ModalProps> = ({
  finalRef,
  isOpen,
  onClose,
  finalLink,
  onCopy,
  hasCopied,
}: ModalProps) => {
  const { t } = useTranslation("common");

  const initialRef = useRef(null);

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t("modal.title")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{finalLink}</ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            {t("modal.close")}
          </Button>
          <Button
            ref={initialRef}
            variant="solid"
            colorScheme="whatsapp"
            onClick={onCopy}
          >
            {hasCopied ? t("modal.copied") : t("modal.copy")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
