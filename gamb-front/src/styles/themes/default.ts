export const defaultTheme = {
	cores: {
		white: "#FFFFFF",
		black: "#000000",
	
		light_white: "#F8F9FA",
	
		green_sucess_primary: "#28A745",
		green_sucess_secondary: "#68C17C",
	
		purple_info_primary: "#4338CA",
		purple_info_secondary: "#7563D7",
	
		danger: "#DC3545",
		danger_second: '#EA868F',
		danger_hover: '#D95F6B',

		warning: "#FFC107",
		warning_second: '#FBD870',

		background: '#F8F8F8',

		blue_info_light: '#C9E5FF',
		blue_info: '#61B3FF',
	
		// No mais claro para o mais escuro
		gray_100: "#E1E1E6",
		gray_300: "#C4C4CC",
		gray_400: "#8D8D99",
		gray_500: "#7C7C8A",
		gray_text: "#363636",
		gray_600: "#323238",
		gray_700: "#29292E",
		gray_800: "#202024",
		gray_900: "#121214",
	}
	,
	fontWeights:{

		ligth: 300,
		regular: 400,
		medium: 500,
		semi_bold: 600,
		bold: 700,
		extra_bold: 800,
	},

	fontSize:{
		
		font_scale_up_01: 0.5, // rem 8px
		font_scale_up_02: 0.75, // rem 12px
		font_scale_up_03: 0.875, // rem 14px
		font_scale_up_default: 1, // rem 16px
		font_scale_up_04: 1.5, // rem 24px h4
		font_scale_up_05: 2, // rem 32px h3
		font_scale_up_06: 2.5, // rem 40px h2
		font_scale_up_07: 3, // rem 48px h1

	}
	
} as const;
