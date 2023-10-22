// @ts-check
import React from 'react';
import Box from '@mui/material/Box';
import {LinearProgress, Typography} from '@mui/material';
import CenterBox from './CenterBox';

/**
 * The Loading component
 * @Component
 * @return {React.ReactElement}
 */
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
        }} />
    </Box>
);

export default Loading;
