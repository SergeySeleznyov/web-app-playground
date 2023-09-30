import { useEffect, useState } from "react";
import Loading from "./Loading";
import getPost from "../backend/getPost";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Toolbar, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import MainAppToolbar from "./MainAppToolbar";
import sleep from "../utils/sleep";
import useAppBar from "../hooks/useAppBar";

const PostView = ({ id, navigateBack, onEdit, onDelete }) => {
    const [post, setPost] = useState(null);

    const AppBarCaption = `Blog post #${id}`;
    useAppBar(AppBarCaption, false, navigateBack);

    useEffect(() => {
        (
            async () => {
                const post = await getPost(id);
                await sleep(1000);
                setPost(post);
            }
        )()
    }, []);

    const LocalAppToolba = () => (
        <MainAppToolbar
            caption={AppBarCaption}
            navigateBack={navigateBack}
        ></MainAppToolbar>
    )

    if (post === null)
        return (
            <>
                <LocalAppToolba />
                <Loading />
            </>
        )

    return (
        <>
            <LocalAppToolba />
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
                        {/* <IconButton aria-label="back" onClick={navigateBack}
                            sx={{
                                paddingLeft: 0,
                            }}
                        >
                            <ArrowBackIcon />
                        </IconButton> */}
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

                        <IconButton aria-label="delete" onClick={async () => await onDelete(post.id)}>
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
