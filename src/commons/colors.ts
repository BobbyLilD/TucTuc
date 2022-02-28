import { orange } from "@mui/material/colors";
import { createTheme } from "@mui/system";

export const dark = '#302C4F';
export const light = '#F3F4F7';

export const primary = '#a0e0fd';
// export const primaryLight = "#e6eef7";
export const primaryLight = '#F3F4F7';

export const delimeter = '#CBCAD4';

export const textPrimary = '#2E2A4D';

export const error = '#a10000';

export const success = '#94e687';

export const btnBorder = '#bb6e00';
export const inputBorder = '#ef930f';
export const navBorder = "#d15905";

export const AdminTheme = createTheme({
    palette: {
        primary: orange,
        secondary: {
            main: '#ff9e80'
        }
    }
})