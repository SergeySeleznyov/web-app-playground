import React from 'react';
import './App.css';
import PostUI from './components/PostUI';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {ColorModeContext} from './components/ThemeSwitcher';
import {darkTheme, lightTheme} from './themes';

/** Main App component.
* @return {Component} Render
*/
function App() {
    const [mode, setMode] = React.useState('light');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const currentTheme = React.useMemo(
        () =>
            mode === 'light' ? lightTheme: darkTheme,
        [mode],
    );

    return (
        <div className="App">
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={currentTheme}>
                    <CssBaseline />
                    <PostUI />
                </ThemeProvider>
            </ColorModeContext.Provider>
        </div>
    );
}

export default App;
