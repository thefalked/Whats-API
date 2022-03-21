import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

type NumberInputMobileProps = {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  formatValue: (value: number) => string;
  translation: string;
};

export const NumberInputMobile: NextPage<NumberInputMobileProps> = ({
  value,
  setValue,
  formatValue,
  translation,
}: NumberInputMobileProps) => {
  const { t } = useTranslation("common");

  const decreaseValue = () => {
    if (value <= 1) {
      return;
    }

    setValue(value - 1);
  };

  const handleUserChange = (event: ChangeEvent<HTMLInputElement>) => {
    const isPlus = event.target.value === "+";
    const value = Number(event.target.value);

    if (!value || isPlus) {
      setValue(0);

      return;
    }

    if (value < 1) {
      setValue(1);
    } else {
      setValue(value);
    }
  };

  return (
    <FormControl isRequired isInvalid={value === 0}>
      <FormLabel htmlFor={translation}>{t(translation)}</FormLabel>
      <HStack maxW="320px">
        <Button onClick={() => setValue((oldValue) => oldValue + 1)}>+</Button>
        <Input
          id={translation}
          value={formatValue(value)}
          onChange={(e) => handleUserChange(e)}
          textAlign="center"
          inputMode="numeric"
        />
        <Button onClick={decreaseValue}>-</Button>
      </HStack>
    </FormControl>
  );
};
