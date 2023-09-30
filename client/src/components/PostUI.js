import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import getPostIDs from '../backend/getPostIDs';
import PostList from './PostList';
import PostView from './PostView';
import deletePost from '../backend/deletePost';
import sleep from '../utils/sleep';
import PostEdit from './PostEdit';
import updatePost from '../backend/updatePost';
import SearchResults from './SearchResults';
import MainAppToolbar2 from './MainAppToolbar2';

const PostUI = () => (
    <>
        <MainAppToolbar2 />
        <PostViewSwither />
    </>
)

const PostViewSwither = () => {

    const [postInfos, setPostInfos] = useState(null);
    const [readPostID, setReadPostID] = useState(null);
    const [editPostID, setEditPostID] = useState(null);
    const [searchText, setSearchText] = useState("");

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
        setSearchText("");
    }

    const onSearchTextChanged = (value) => {
        setSearchText(value);
    }

    const navigateBack = () => closePost();

    const isModelLoading = () => postInfos === null;

    if (isModelLoading())
        return (<Loading />)

    if (editPostID !== null)
        return (
            <PostEdit
                id={editPostID}
                navigateBack={navigateBack}
                onSave={doSavePost}
            />
        )

    if (readPostID !== null)
        return (
            <PostView id={readPostID}
                navigateBack={navigateBack}
                onEdit={doEditPost}
                onDelete={doDeletePost}
            />)
    if (searchText)
        return (
            <SearchResults
                postInfos={postInfos}
                onOpen={doOpenPost}
                searchText={searchText}
                onSearchTextChanged={onSearchTextChanged}
                navigateBack={navigateBack}
            />
        )

    if (postInfos)
        return (
            <PostList
                postInfos={postInfos}
                onOpen={doOpenPost}
                onEdit={doEditPost}
                onDelete={doDeletePost}
                addNew={doAddNew}
                onSearchTextChanged={onSearchTextChanged}
            />)

    return (<>Error</>);
};

export default PostUI;
