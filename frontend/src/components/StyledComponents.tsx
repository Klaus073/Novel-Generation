import {
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import boostIcon from "../assets/boost_icon.svg";

interface StyledInputGroupProps<T> {
  label?: string;
  placeholder?: string;
  value?: T;
  onChange?: (value: T) => void;
}

export const StyledInputGroup = <T,>({
  label,
  placeholder,
  value,
  onChange,
}: StyledInputGroupProps<T>) => {
  return (
    <>
      {label && <Text fontSize={"xl"}>{label}</Text>}
      <InputGroup my={4}>
        <Input
          py={{ base: 6, md: 8 }}
          size={{ base: "sm", md: "lg" }}
          placeholder={placeholder}
          variant={"primary"}
          value={value as unknown as string}
          onChange={(e) => onChange && onChange(e.target.value as unknown as T)}
        />
        <InputRightElement
          borderRightRadius={"8px"}
          width={{ base: 8, sm: 12, md: 12 }}
          height={"full"}
          cursor={"pointer"}
          bg={"brand.darkGray"}>
          <Image
            src={boostIcon}
            alt="boostIcon"
            width={{ base: "40%", sm: "30%", md: "40%" }}
          />
        </InputRightElement>
      </InputGroup>
    </>
  );
};
