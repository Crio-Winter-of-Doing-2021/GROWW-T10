import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

export function createTheme() {

    let theme = createMuiTheme({
        typography: {
            fontFamily: [
                'Roboto',
                'system-ui'
            ].join(','),
        },
        palette: {
            type: 'light',
            primary: {
                light: '#66e3c4',
                main: '#00d09c',
                contrastText: '#fff',
            },
            secondary: {
                light: '#98a4ff',
                main: '#5367ff',
                contrastText: '#000',
            },
            background: {
                paper: '#fff',
                default: '#fafafa'
            },
            text: {
                primary: '#44475b'
            }
        }
    });

    theme = responsiveFontSizes(theme);

    return theme;
}