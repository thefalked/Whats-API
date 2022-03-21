import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { Dispatch, SetStateAction } from "react";
import { MaskTypes } from "../pages";

type MaskTypeProps = {
  value: MaskTypes;
  setValue: Dispatch<SetStateAction<MaskTypes>>;
};

export const MaskType: NextPage<MaskTypeProps> = ({
  value,
  setValue,
}: MaskTypeProps) => {
  const radioSize = useBreakpointValue({ base: "sm", md: "md" });
  const { t } = useTranslation("common");

  return (
    <FormControl isRequired>
      <FormLabel htmlFor="settings">{t("mask_type.label")}</FormLabel>
      <RadioGroup
        onChange={(radioValue: MaskTypes) => setValue(radioValue)}
        value={value}
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
  );
};
