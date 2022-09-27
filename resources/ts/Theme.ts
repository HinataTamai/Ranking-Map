import { createTheme } from "@mui/material";


const theme = createTheme({
    palette: {
        primary: {
            main: '#f6ad49',
        },
        secondary: {
            main: '#f8f4e6',
        },
        background: {
            default: '#f5f5f5',
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 450,
            md: 834,
            lg: 1200,
            xl: 1536,
        },
    },
});

export default theme;