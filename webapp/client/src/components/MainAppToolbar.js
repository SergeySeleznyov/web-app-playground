// @ts-check
import React, {useState} from 'react';
import {AppBar, Box, Divider, IconButton, Toolbar, Typography} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import {styled, alpha} from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SaveIcon from '@mui/icons-material/Save';
import useAppBar from '../hooks/useAppBar';
import {ThemeSwitcher} from './ThemeSwitcher';

// TODO Apply theme
const Search = styled(Box, {
    name: 'search-box',
})(({theme}) => ({
    'position': 'relative',
    'borderRadius': theme.shape.borderRadius,
    'backgroundColor': alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    'marginRight': theme.spacing(2),
    'marginLeft': 0,
    'width': '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled(Box, {
    name: 'search-box-wrapper',
})(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase, {
    name: 'search-box-InputBase',
})(({theme}) => ({
    'color': 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

/**
 * The MainAppToolbar component
 * @Component
 * @return {React.ReactElement}
 */
const MainAppToolbar = () => {
    const [searchText, setSearchText] = useState('');
    const {caption, searchTextChanged, navigateBack, addNew, onSave, saveVisible} = useAppBar();

    const handleNavigateBackClick = () => {
        navigateBack?.();
        onSearchTextValueChanged('');
    };
    const handleSearchTextChanged = (e) => {
        const value = e.target.value;
        onSearchTextValueChanged(value);
    };
    const handleAddNewClick = () => addNew?.();
    const handleSaveClick = () => onSave?.();

    const onSearchTextValueChanged = (value) => {
        setSearchText(value);
        if (searchTextChanged) {
            searchTextChanged(value);
        }
    };

    return (
        <AppBar position="static">
            <Toolbar>
                {navigateBack ?
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="back"
                        onClick={handleNavigateBackClick}
                    >
                        <ArrowBackIcon />
                    </IconButton> : null}

                <Typography variant="h6" sx={{my: 2}}>
                    {caption}
                </Typography>

                <Divider />

                {searchTextChanged ? <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{'aria-label': 'search'}}
                        value={searchText}
                        onChange={handleSearchTextChanged}
                    />
                </Search> : null}

                <Box sx={{flexGrow: 1}} />

                <Box sx={{display: 'flex'}}>

                    {addNew ? <IconButton
                        size="large"
                        aria-label="Add new blog post"
                        sx={{
                            color: 'white',
                        }}
                        onClick={handleAddNewClick}
                    >
                        <AddCircleOutlineIcon />
                    </IconButton> : null}

                    {saveVisible ? <IconButton
                        aria-label="save"
                        sx={{
                            color: 'white',
                        }}
                        onClick={handleSaveClick}>
                        <SaveIcon />
                    </IconButton> : null}

                    <ThemeSwitcher />

                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default MainAppToolbar;
