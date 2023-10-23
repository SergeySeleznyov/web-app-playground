// @ts-check
import React, {useEffect, useState} from 'react';
import Loading from './Loading';
import getPost from '../backend/getPost';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {TextField, Toolbar} from '@mui/material';
import sleep from '../utils/sleep';
import useAppBar from '../hooks/useAppBar';
import PropTypes from 'prop-types';
import Post from '../model/Post';

/** @typedef {import('../utils/types').VoidNotifyCallback} VoidNotifyCallback */
/** @typedef {import('../utils/types').TextCallback} TextCallback */
/** @typedef {import('../utils/types').PostSaveCallback} PostSaveCallback */

/**
 * View of post editing
 * @Component
 * @param {Object} params - params
 * @param {string} params.id The id of the {@link Post} to read
 * @param {VoidNotifyCallback} params.navigateBack The navigateBack
 * @param {PostSaveCallback} params.onSave The onSave
  * @return {React.ReactElement}
*/
const PostEdit = ({id, navigateBack, onSave}) => {
    /** @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]} */
    const [title, setTitle] = /** @type {?string} */ useState(/** @type {string} */(''));

    /** @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]} */
    const [content, setContent] = useState(/** @type {string} */(''));

    const isNewPost = id === '';
    const AppBarCaption = isNewPost ? 'New blog post' : `Edit blog post #${id}`;
    const {setCaption} = useAppBar(AppBarCaption, null, navigateBack, null, doSave);

    useEffect(() => {
        setCaption(AppBarCaption);
    }, [id]);

    useEffect(() => {
        (
            async () => {
                const post = isNewPost ?
                    new Post() :
                    await getPost(id);

                await sleep(1000);
                setTitle(post.title);
                setContent(post.content);
            }
        )();
    }, [id]);

    const doTitleChanged = (e) => {
        setTitle(e.target.value);
    };

    const doContentChanged = (e) => {
        setContent(e.target.value);
    };

    /** Delegate to save document.*/
    async function doSave() {
        await onSave(
            id,
            title,
            content,
        );
    }

    if (title === null && content === null) {
        return (<Loading />);
    };

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
                        <TextField
                            id="standard-basic"
                            variant="standard"
                            sx={{
                                width: '100%',
                            }}
                            value={title}
                            onChange={doTitleChanged}
                        />
                    </Box>
                </Toolbar>
                <Toolbar>
                    <TextField
                        id="standard-multiline-static"
                        label="Blog content"
                        multiline
                        rows={4}
                        variant="standard"
                        InputProps={{
                            disableUnderline: true,
                        }}
                        sx={{
                            width: '100%',
                        }}
                        value={content}
                        onChange={doContentChanged}
                    />
                </Toolbar>
            </Paper>
        </Box>
    );
};

PostEdit.propTypes = {
    id: PropTypes.string.isRequired,
    navigateBack: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default PostEdit;
