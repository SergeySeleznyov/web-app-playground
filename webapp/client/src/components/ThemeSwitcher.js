import React from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {IconButton, useTheme} from '@mui/material';

const ColorModeContext = React.createContext({toggleColorMode: () => { }});

/** Main ThemeSwitcher component.
* @return {Component} Render asd asd
*/
function ThemeSwitcher() {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    return (
        <IconButton sx={{ml: 1}} onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
    );
};

export {
    ThemeSwitcher,
    ColorModeContext,
};
