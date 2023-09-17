import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import getPostIDs from '../backend/getPostIDs';
import PostList from './PostList';
import PostView from './PostView';
import deletePost from '../backend/deletePost';
import sleep from '../utils/sleep';
import PostEdit from './PostEdit';
import updatePost from '../backend/updatePost';

const PostUI = () => {
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
        setPostInfos(postInfos);
        await sleep(300);
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
    const doAddNew = async () => {
        closePost();
        setEditPostID("");
    }
    const doSavePost = async (postId, postTitle, postContent) => {
        closePost();
        await updatePost(postId, postTitle, postContent);
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
            <PostView id={readPostID}
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
                addNew={doAddNew}
            />)

    return (<>Error</>);
};

export default PostUI;
