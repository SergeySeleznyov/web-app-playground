import { useEffect, useState } from "react";
import Loading from "./Loading";
import getPost from "../backend/getPost";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Toolbar, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';

const PostView = ({ id, navigateBack, onEdit, onDelete }) => {
    const [post, setPost] = useState(null);
    useEffect(() => {
        (
            async () => {
                const post = await getPost(id);
                setPost(post);
            }
        )()
    }, []);

    if (post === null)
        return (<Loading />)

    return (
        <>
            <Typography variant="h4" align="left">Blog post #{id}:</Typography>
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
                <Paper elevation={3} >
                    <Toolbar >
                        <IconButton aria-label="edit" align="right" onClick={navigateBack}
                            sx={{
                                paddingLeft: 0,
                            }}
                        >
                            <ArrowBackIcon />
                        </IconButton>
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

                        <IconButton aria-label="edit" align="right" onClick={async () => await onEdit(post.id)}>
                            <EditIcon />
                        </IconButton>

                        <IconButton aria-label="delete" align="right" onClick={async () => await onDelete(post.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </Toolbar>
                    <Toolbar>
                        {post.content}
                    </Toolbar>
                </Paper>
            </Box>
        </>
    )
}

export default PostView
