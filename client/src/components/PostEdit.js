import { useEffect, useState } from "react";
import Loading from "./Loading";
import getPost from "../backend/getPost";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { IconButton, TextField, Toolbar, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';

const PostEdit = ({ id, navigateBack, onSave }) => {
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);

    useEffect(() => {
        (
            async () => {
                const post = await getPost(id);
                setTitle(post.title);
                setContent(post.content);
            }
        )()
    }, []);

    if (title === null && content === null)
        return (<Loading />)

    const doTitleChanged = (e) => {
        setTitle(e.target.value);
    }

    const doContentChanged = (e) => {
        setContent(e.target.value);
    }

    const doSave = async () => {
        await onSave(
            id,
            title,
            content
        );
    }

    return (
        <>
            <Typography variant="h4" align="left">Edit blog post #{id}:</Typography>
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

                        <IconButton aria-label="edit" align="right" onClick={doSave}>
                            <SaveIcon />
                        </IconButton>

                    </Toolbar>
                    <Toolbar>
                        <TextField
                            id="standard-multiline-static"
                            label="Multiline"
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
        </>
    )
}

export default PostEdit
