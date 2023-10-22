// @ts-check
import Box from '@mui/material/Box';
import {css, styled} from '@mui/material';

const CenterBox = styled(Box)(({theme}) => css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    m: 4,
}));

export default CenterBox;
