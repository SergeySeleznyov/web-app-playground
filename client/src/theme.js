import {alpha, createTheme, getContrastRatio} from '@mui/material';
// import {lime, purple} from '@mui/material/colors';

const violetBase = '#7F00FF';
const violetMain = alpha(violetBase, 0.7);
const violet = {
    main: violetMain,
    light: alpha(violetBase, 0.5),
    dark: alpha(violetBase, 0.9),
    contrastText: getContrastRatio(violetMain, '#fff') > 4.5 ? '#fff' : '#111',
};

const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            // default: 'gray',
        },
        primary: {
            ...violet,
        },
        // secondary: {
        //     main: '#E0C2FF',
        //     light: '#F5EBFF',
        //     // dark: will be calculated from palette.secondary.main,
        //     contrastText: '#47008F',
        // },
        // violet,
        // salmon: theme.palette.augmentColor({
        //     color: {
        //         main: '#FF5733',
        //     },
        //     name: 'salmon',
        // }),
    },
    components: {
        // Name of the component
        MuiButtonBase: {
            defaultProps: {
                // The props to change the default for.
                disableRipple: true, // No more ripple, on the whole application 💣!
            },
        },
    },
});

export default theme;
