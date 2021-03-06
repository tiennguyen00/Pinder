import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

// COLOR
export const COLORS = {
  primaryLight: "#363568",
  primaryHeight: "#2B2B4C",
  
  white: "#ccc",
  black: "#000",
  red: "rgba(255,0,0,0.5)",

  purpleLight: "#AC89FF",
  purpleHeight: "#8057FF",
  blueLight: "#90D0FE",
  blueHeight: "#2AA1F4",
  pinkLight: "#FF91EF",
  pinkHeight: "#FF4AE0",
  orangeLight: "#FFBF97",
  orangeHeight: "#FF8D45",
  greenLight: "#7DF785",
  greenHeight: "#17C74A",
  blueLight2: "#7EA6FF",
  blueHeight2: "#4B75FF",
  gray: "#999",
  transparent: 'transparent',
  lighGray: '#ddd'
}

// SIZES
export const SIZES = {
  // font sizes
  logo: 40,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height
}

// FONTS
export const FONTS = {
  logo: { fontFamily: "HoustanderDemo", fontSize: SIZES.logo },
  h1_bold: { fontFamily: "Quicksand-Bold", fontSize: SIZES.h1, lineHeight: 32 },
  h3_bold: { fontFamily: "Quicksand-Bold", fontSize: (SIZES.h2+SIZES.h3)/2 },
  h3: { fontFamily: "Quicksand-Light", fontSize: SIZES.h3 },
  h4: { fontFamily: "Quicksand-Bold", fontSize: SIZES.h4, lineHeight: 20 },
  body4: { fontFamily: "Quicksand-Light", fontSize: SIZES.body4, lineHeight: 22 },
  body3: { fontFamily: "Quicksand-Light", fontSize: SIZES.body3, lineHeight: 22 },
  body5: { fontFamily: "Quicksand-Bold", fontSize: SIZES.body5, lineHeight: 22 }
}

const appTheme = { COLORS, SIZES, FONTS };
export default appTheme;