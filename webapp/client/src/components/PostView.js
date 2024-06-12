// @ts-check
import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import getPost from '../backend/getPost';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Toolbar, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import sleep from '../utils/sleep';
import useAppBar from '../hooks/useAppBar';
import PropTypes from 'prop-types';
import { loadingAdditionalDelay } from '../config';
// import Post from '../model/Post';
/** @typedef {import('../model/Post').default} Post */
/** @typedef {import('../utils/types').VoidNotifyCallback} VoidNotifyCallback */
/** @typedef {import('../utils/types').TextCallback} TextCallback */

/**
 * View of post reading
 * @Component
 * @param {Object} params - params
 * @param {string} params.id The id of the {@link Post} to read
 * @param {VoidNotifyCallback} params.navigateBack The navigateBack
 * @param {TextCallback} params.onEdit The onEdit
 * @param {TextCallback} params.onDelete TonDelete
 * @return {React.ReactElement}
*/
const PostView = ({ id, navigateBack, onEdit, onDelete }) => {
    /** @type {[?Post, import('react').Dispatch<import('react').SetStateAction<?Post>>]} */
    const [post, setPost] = useState(/** @type {?Post} */(null));

    const AppBarCaption = `Blog post #${id}`;
    useAppBar(AppBarCaption, null, navigateBack);

    useEffect(() => {
        (
            async () => {
                const post = await getPost(id);
                await sleep(loadingAdditionalDelay);
                setPost(post);
            }
        )();
    }, []);

    if (post === null) {
        return (<Loading />);
    }

    return (
        <Box
            sx={{
                'display': 'flex',
                'flexWrap': 'wrap',
                '& > :not(style)': {
                    m: 1,
                    width: '100%',
                },
            }}
        >
            <Paper elevation={3} >
                <Toolbar >
                    <Box
                        display='flex'
                        flexGrow={1}
                    >
                        <Typography
                            color="textSecondary"
                            variant="h5"
                        >
                            {post.title}
                        </Typography>
                    </Box>

                    <IconButton aria-label="edit" onClick={async () => await onEdit(post.id)}>
                        <EditIcon />
                    </IconButton>

                    <IconButton aria-label="delete" onClick={async () => await onDelete(post?.id)}>
                        <DeleteIcon />
                    </IconButton>
                </Toolbar>
                <Toolbar>
                    {post.content}
                </Toolbar>
            </Paper>
        </Box>
    );
};

PostView.propTypes = {
    id: PropTypes.string.isRequired,
    navigateBack: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default PostView;
