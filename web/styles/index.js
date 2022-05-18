import { extendTheme } from "@chakra-ui/react";
import { styles } from "./global";
import { textStyles } from "./text-styles";

export const theme = extendTheme({
  textStyles,
  styles,
  colors: {
    brand: {
      50: "#eaeaea",
      100: "#fafafa",
      200: "#0070f3",
      900: "#1a202c",
    },
  },
});
