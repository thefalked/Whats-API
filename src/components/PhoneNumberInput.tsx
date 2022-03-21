import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { MaskTypes } from "../pages";

type PhoneNumberInputProps = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  isInvalid: boolean;
  finalRef: MutableRefObject<null>;
  settings: MaskTypes;
};

export const PhoneNumberInput: NextPage<PhoneNumberInputProps> = ({
  value,
  setValue,
  isInvalid,
  finalRef,
  settings,
}: PhoneNumberInputProps) => {
  const { t } = useTranslation("common");

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

  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel htmlFor="phone">{t("phone_number")}</FormLabel>
      <Input
        id="phone"
        ref={finalRef}
        type="text"
        placeholder={t("phone_number")}
        inputMode="numeric"
        value={formatPhoneValue(value)}
        onChange={(e) => setValue(e.target.value.replace(/\D/g, ""))}
      />
    </FormControl>
  );
};
