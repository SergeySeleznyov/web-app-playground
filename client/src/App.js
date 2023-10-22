import React from 'react';
import './App.css';
import PostUI from './components/PostUI';
import {CssBaseline, ThemeProvider} from '@mui/material';
import theme from './themeA';

/** Main App component.
* @return {Component} Render asd asd
*/
function App() {
    return (
        <div className="App">
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <PostUI />
            </ThemeProvider>
        </div>
    );
}

export default App;
