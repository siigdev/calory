import { DefaultTheme } from "react-native-paper";

const blueTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#607d8b'
    }
}

const greenTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#8bc34a'
    }
}


const colors = {
    accent: "#ed5353",
    primary: "#64baff",
    secondary: "#8cd5ff",
    tertiary: "#fff394",
    black: "#273445",
    white: "#FFFFFF",
    gray: "#d4d4d4",
    gray2: "#abacae",
    gray3: "#F7F8FA",
  };
  
  const sizes = {
    // global sizes
    base: 16,
    font: 14,
    radius: 6,
    padding: 25,
  
    // font sizes
    h1: 26,
    h2: 20,
    h3: 18,
    title: 18,
    header: 16,
    body: 14,
    caption: 12,
  };
  
  const fonts = {
    h1: {
      fontSize: sizes.h1
    },
    h2: {
      fontSize: sizes.h2
    },
    h3: {
      fontSize: sizes.h3
    },
    header: {
      fontSize: sizes.header
    },
    title: {
      fontSize: sizes.title
    },
    body: {
      fontSize: sizes.body
    },
    caption: {
      fontSize: sizes.caption
    },
  };
  
  export { blueTheme, greenTheme, colors, sizes, fonts };