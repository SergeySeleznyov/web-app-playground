import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Toolbar, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MainAppToolbar from './MainAppToolbar';

const PostList = ({ postInfos, onOpen, onEdit, onDelete, addNew }) => {
    return (
        <>
            <MainAppToolbar
                caption="Blog posts"
                showSearch={true}
                addNew={addNew}
            />
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        m: 1,
                        width: '100%',

                    },
                }}
            >
                {
                    postInfos.map(postInfo =>
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
                                                cursor: 'pointer'
                                            }
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
                        </Paper>
                    )
                }

            </Box >
        </>
    )
}

export default PostList
