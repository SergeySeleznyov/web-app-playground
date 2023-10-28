// @ts-check
import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import {IconButton, Toolbar, Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useAppBar from '../hooks/useAppBar';
import PropTypes from 'prop-types';

const AppBarCaption = 'Blog posts';

/** @typedef {import('../model/PostInfo').default} PostInfo */
/** @typedef {import('../model/Post').default} Post */
/** @typedef {import('../utils/types').TextCallback} TextCallback */
/** @typedef {import('../utils/types').VoidNotifyCallback} VoidNotifyCallback */

// TODO rename addNew=> onAddNew

/**
 * View of post editing
 * @Component
 * @param {Object} params - params
 * @param {PostInfo[]} params.postInfos The array of the {@link PostInfo} to list.
 * @param {TextCallback} params.onOpen The onOpen callback to open a {@link Post} specified by the id argument.
 * @param {TextCallback} params.onEdit The onEdit callback to edit a {@link Post} specified by the id argument.
 * @param {TextCallback} params.onDelete The onDelete callback to delete a {@link Post} specified by the id argument.
 * @param {VoidNotifyCallback} params.addNew The addNew callback to open editing a new {@link Post}.
 * @param {TextCallback} params.onSearchTextChanged The onSearchTextChanged callback to search a {@link Post}.
  * @return {React.ReactElement}
*/
const PostList = ({postInfos, onOpen, onEdit, onDelete, addNew, onSearchTextChanged}) => {
    useAppBar(AppBarCaption, onSearchTextChanged, null, addNew);

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
            {
                postInfos.map((postInfo) =>
                    <Paper elevation={3} key={postInfo.id}>
                        <Toolbar>
                            <Box
                                display='flex'
                                flexGrow={1}
                            >
                                <Typography
                                    color="textSecondary"
                                    variant="h5"
                                    onClick={() => onOpen(postInfo.id)}
                                    sx={{
                                        '&:hover': {
                                            cursor: 'pointer',
                                        },
                                    }}
                                >
                                    {postInfo.title}
                                </Typography>
                            </Box>

                            <IconButton aria-label="edit" onClick={async () => await onEdit(postInfo.id)}>
                                <EditIcon />
                            </IconButton>

                            <IconButton aria-label="delete" onClick={async () => await onDelete(postInfo.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Toolbar>
                    </Paper>,
                )
            }

        </Box >
    );
};

PostList.propTypes = {
    postInfos: PropTypes.array.isRequired,
    onOpen: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    addNew: PropTypes.func.isRequired,
    onSearchTextChanged: PropTypes.func.isRequired,
};

export default PostList;
