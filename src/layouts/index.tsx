import {Outlet} from 'umi';
import React from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Container, CssBaseline} from "@mui/material";

export default function Layout() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container maxWidth="xl">
                <br/>
                <Outlet/>
            </Container>
        </ThemeProvider>
    );
}
