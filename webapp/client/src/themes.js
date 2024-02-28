import { alpha, createTheme, getContrastRatio } from '@mui/material';

const violetBase = '#7F00FF';
const violetMain = alpha(violetBase, 0.7);
const violet = {
    main: violetMain,
    light: alpha(violetBase, 0.5),
    dark: alpha(violetBase, 0.9),
    contrastText: getContrastRatio(violetMain, '#fff') > 4.5 ? '#fff' : '#111',
};

const pallete = {
    primary: {
        ...violet,
    },
};

const lightTheme = createTheme({
    palette: { ...pallete },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        ...pallete,
    },
});

export {
    lightTheme,
    darkTheme,
};
