import { AppBar, Box, Divider, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
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

const MainAppToolbar = ({ caption, showNavigateBack, navigateBack }) => (
    <AppBar position="static">
        <Toolbar>
            {showNavigateBack ?
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={navigateBack}
                >
                    <IconButton aria-label="edit" align="right"
                        sx={{
                            paddingLeft: 0,
                            color: 'white',
                        }}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                </IconButton> : null}

            <Typography variant="h6" sx={{ my: 2 }}>
                {caption}
            </Typography>

            <Divider />

            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                />
            </Search>

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ display: 'flex' }}>

                <IconButton
                    size="large"
                    aria-label="Add new blog post"
                // sx={{ }}
                >
                    <IconButton aria-label="edit" align="right"
                        sx={{
                            color: "white",
                        }}
                    >
                        <AddCircleOutlineIcon />
                    </IconButton>
                </IconButton>

            </Box>
        </Toolbar>
    </AppBar>
)

export default MainAppToolbar;
