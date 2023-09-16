import { useEffect, useState } from "react";
import Loading from "./Loading";
import getPost from "../backend/getPost";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { IconButton, TextField, Toolbar, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';

const PostEdit = ({ id, navigateBack, onSave }) => {
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
                                value={post.title}
                            />
                        </Box>

                        <IconButton aria-label="edit" align="right" onClick={() => onSave(post.id)}>
                            <SaveIcon />
                        </IconButton>

                    </Toolbar>
                    <Toolbar>
                        <TextField
                            id="standard-multiline-static"
                            label="Multiline"
                            multiline
                            rows={4}
                            defaultValue="Default Value"
                            variant="standard"
                            InputProps={{
                                disableUnderline: true,
                              }}
                            sx={{
                                width: '100%',
                            }}
                            value={post.content}
                        />
                    </Toolbar>
                </Paper>
            </Box>
        </>
    )
}

export default PostEdit
