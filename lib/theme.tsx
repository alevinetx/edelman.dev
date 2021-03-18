import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const colors = {
  primary: {
    50: "#e5f3ff",
    100: "#c2d7f0",
    200: "#9ebde1",
    300: "#79a2d3",
    400: "#5488c5",
    500: "#3b6eac",
    600: "#2c5686",
    700: "#1d3d61",
    800: "#0e253d",
    900: "#000d1a",
  },
  gray: {
    50: "#f9f9fa",
    100: "#ededef",
    200: "#dfe1e3",
    300: "#d1d3d6",
    400: "#c1c4c8",
    500: "#afb3b8",
    600: "#9ba0a6",
    700: "#848a91",
    800: "#656d76",
    900: "#394049",
  },
};

const breakpoints = createBreakpoints({
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
});

const customTheme = extendTheme({ colors });

export default customTheme;
