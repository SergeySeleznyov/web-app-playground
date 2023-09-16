import Box from '@mui/material/Box';
import { LinearProgress, Typography } from '@mui/material';

const Loading = () => (
    <Box
        sx={{
            m: 4,
        }}
    >
        <Box
            sx={{
                display: 'flex',
                justifyContent: "center",
                alignItems: "center",
                width: '100%',
                m: 2,
            }}
        >
            <Typography
                color="textSecondary"
            >
                Loading...
            </Typography>

        </Box>
        <LinearProgress sx={{
            width: '100%',
            height: '4px',
            borderRadius: '2px'
        }}></LinearProgress>
    </Box>
)

export default Loading;
