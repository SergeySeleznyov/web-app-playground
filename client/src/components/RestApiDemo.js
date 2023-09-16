import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import getPostIDs from '../backend/getPostIDs';
import PostList from './PostList';
import Post from './Post';
import deletePost from '../backend/deletePost';
import sleep from '../utils/sleep';
import PostEdit from './PostEdit';
import updatePost from '../backend/updatePost';

const RestApiDemo = () => {
    const [postInfos, setPostInfos] = useState(null);
    const [readPostID, setReadPostID] = useState(null);
    const [editPostID, setEditPostID] = useState(null);

    useEffect(() => {
        (
            async () => {
                await updatePosts();
            }
        )()
    }, []);

    const updatePosts = async () => {
        setPostInfos(null);
        const postInfos = await getPostIDs();
        await sleep(500);
        setPostInfos(postInfos);
    }

    const doOpenPost = (postId) => {
        closePost();
        setReadPostID(postId);
    }
    const doEditPost = (postId) => {
        closePost();
        setEditPostID(postId);
    }
    const doDeletePost = async (postId) => {
        closePost();
        await deletePost(postId);
        await updatePosts();
    }
    const doSavePost = async (postId, postTitle, postContent) => {
        closePost();
        updatePost(postId, postTitle, postContent)
        await updatePosts();
    }
    const closePost = () => {
        setReadPostID(null);
        setEditPostID(null);
    }

    const isModelLoading = () => postInfos === null;

    if (isModelLoading())
        return (<Loading />)

    if (editPostID !== null)
        return (
            <PostEdit
                id={editPostID}
                navigateBack={closePost}
                onSave={doSavePost}
            />
        )

    if (readPostID !== null)
        return (
            <Post id={readPostID}
                navigateBack={closePost}
                onEdit={doEditPost}
                onDelete={doDeletePost}
            />)

    if (postInfos)
        return (
            <PostList
                postInfos={postInfos}
                onOpen={doOpenPost}
                onEdit={doEditPost}
                onDelete={doDeletePost}
            />)

    return (<>Error</>);
};

export default RestApiDemo;
