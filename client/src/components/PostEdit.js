import { useEffect, useState } from "react";
import Loading from "./Loading";
import getPost from "../backend/getPost";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { IconButton, TextField, Toolbar, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import sleep from "../utils/sleep";
import useAppBar from "../hooks/useAppBar";

const PostEdit = ({ id, navigateBack, onSave }) => {
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);

    const isNewPost = id === '';
    const AppBarCaption = isNewPost ? 'New blog post' : `Edit blog post #${id}`;
    const { setCaption } = useAppBar(AppBarCaption, null, navigateBack, null, doSave);

    useEffect(() => {
        setCaption(AppBarCaption);
    }, [id])

    useEffect(() => {
        (
            async () => {
                const post = isNewPost ?
                    {
                        id: '',
                        title: '',
                        content: '',
                    }
                    :
                    await getPost(id);

                await sleep(1000);
                setTitle(post.title);
                setContent(post.content);
            }
        )()
    }, [id]);

    const doTitleChanged = (e) => {
        setTitle(e.target.value);
    }

    const doContentChanged = (e) => {
        setContent(e.target.value);
    }

    async function doSave() {
        await onSave(
            id,
            title,
            content
        );
    }

    if (title === null && content === null)
        return (<Loading />)

    return (
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

                    {/* <IconButton aria-label="save" onClick={doSave}>
                            <SaveIcon />
                        </IconButton> */}

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
    )
}

export default PostEdit
