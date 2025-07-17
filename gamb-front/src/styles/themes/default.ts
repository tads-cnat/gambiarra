export const defaultTheme = {
  cores: {
    white: "#FFFFFF",
    black: "#000000",

    light_white: "#F8F9FA",
    gray_light: "#DEE2E6",

    green_sucess_primary: "#28A745",
    green_sucess_hover: "#218838",
    green_sucess_secondary: "#EAFFEF",

    purple_info_primary: "#4338CA",
    purple_info_hover: "#3730A3",
    purple_info_secondary: "#ECE9FF",

    danger: "#DC3545",
    danger_hover: "#BD2130", 
    danger_secondary: "#FFF0F2",

    warning: "#FFC107",
    warning_hover: "#E0A800",
    warning_secondary: "#FFFCF1",

    background: "#F8F8F8",

    blue_info: "#61B3FF",         // azul principal
    blue_info_hover: "#4290DA",   // hover
    blue_info_light: "#ddefff",

    // Cinzas do mais claro ao mais escuro
    gray_100: "#E1E1E6",
    gray_300: "#C4C4CC",
    gray_400: "#8D8D99",
    gray_500: "#5F5F5F",
    gray_text: "#363636",
    gray_600: "#323238",
    gray_700: "#29292E",
    gray_800: "#202024",
    gray_900: "#121214",
  },

  fontWeights: {
    ligth: 300,
    regular: 400,
    medium: 500,
    semi_bold: 600,
    bold: 700,
    extra_bold: 800,
  },

  fontSize: {
    font_scale_up_00: 0.5,    // rem 8px
    font_scale_up_01: 0.625,  // rem 10px
    font_scale_up_02: 0.75,   // rem 12px
    font_scale_up_03: 0.875,  // rem 14px
    font_scale_up_default: 1, // rem 16px
    font_scale_up_04: 1.5,    // rem 24px h4
    font_scale_up_05: 2,      // rem 32px h3
    font_scale_up_06: 2.5,    // rem 40px h2
    font_scale_up_07: 3,      // rem 48px h1
  },

  space: {
    spacing_scale_default: 0,       // rem - 0px
    spacing_scale_up_01: 0.3125,     // rem - 5px
    spacing_scale_up_02: 0.625,      // rem - 10px
    spacing_scale_up_03: 0.75,       // rem - 12px
    spacing_scale_up_04: 1,          // rem - 16px
    spacing_scale_up_05: 1.25,       // rem - 20px
    spacing_scale_up_06: 1.5,        // rem - 24px
    spacing_scale_up_07: 2,          // rem - 32px
    spacing_scale_up_08: 2.5,        // rem - 40px
    spacing_scale_up_09: 3,          // rem - 48px
    spacing_scale_up_10: 3.5,        // rem - 56px
    spacing_scale_up_11: 4,          // rem - 64px
    spacing_scale_up_12: 4.5,        // rem - 72px
  },

  teste: "flex flex-col w-1/2 bg-red-500 p-4",
} as const;
