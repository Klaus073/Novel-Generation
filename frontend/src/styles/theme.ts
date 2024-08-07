import {
  extendTheme,
  defineStyle,
  defineStyleConfig,
  createMultiStyleConfigHelpers,
} from "@chakra-ui/react";
import { inputAnatomy } from "@chakra-ui/anatomy";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

//default styles for components
const primaryInput = definePartsStyle({
  field: {
    border: "2px solid",
    borderColor: "#464646",
    color: "white",
    bg: "#252528",
    focusBorderColor: "white",
  },
});

const primaryBtn = defineStyle({
  background: "#212221",
  color: "white",
  fontWeight: "semibold",
  fontSize: "md",
  borderRadius: "2xl",
  minW: "120px",
  boxShadow: "inset 0px 6px 20px  1px rgba(68, 67, 67, 0.753)",
  borderTop: "2px solid rgba(94, 92, 92, 0.753)",
  py: "25px",
});

const primaryField = defineStyle({
  border: "none",
  color: "white",
  bg: "#252528",
  focusBorderColor: "white",
});

//themes to apply to components
const buttonTheme = defineStyleConfig({
  variants: { primary: primaryBtn },
});

const textAreaTheme = defineStyleConfig({
  variants: { primary: primaryField },
});

const inputTheme = defineMultiStyleConfig({
  variants: { primary: primaryInput },
});

//custom theme to extend the default
const customTheme = extendTheme({
  fonts: {
    body: "Inter, sans-serif",
    heading: "Inter, sans-serif",
  },
  colors: {
    brand: {
      main: "white",
      secondary: "#9699A0 ",
      darkGray: "#464646",
    },
  },
  components: {
    Button: buttonTheme,
    Textarea: textAreaTheme,
    Input: inputTheme,
  },
});

export default customTheme;
