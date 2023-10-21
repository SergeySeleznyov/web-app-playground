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

// TODO use jsdocs
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
    postInfos: PropTypes.object.isRequired,
    onOpen: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    addNew: PropTypes.func.isRequired,
    onSearchTextChanged: PropTypes.func.isRequired,
};

export default PostList;
