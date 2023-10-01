import React from 'react';
import Box from '@mui/material/Box';
import {LinearProgress, Typography, css, styled} from '@mui/material';

const CenterBox = styled(Box)(({theme}) => css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    m: 4,
}));

const Loading = () => (
    <Box
        sx={{
            m: 4,
        }}
    >
        <CenterBox>
            <Typography
                color="textSecondary"
            >
                Loading...
            </Typography>
        </CenterBox>
        <LinearProgress sx={{
            width: '100%',
            height: '4px',
            borderRadius: '2px',
        }}></LinearProgress>
    </Box>
);

export default Loading;
