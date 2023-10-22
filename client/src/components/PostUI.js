// @ts-check
import React, {useEffect, useState} from 'react';
import Loading from './Loading';
import getPostInfos from '../backend/getPostInfos';
import PostList from './PostList';
import PostView from './PostView';
import deletePost from '../backend/deletePost';
import sleep from '../utils/sleep';
import PostEdit from './PostEdit';
import updatePost from '../backend/updatePost';
import SearchResults from './SearchResults';
import MainAppToolbar from './MainAppToolbar';

/** @typedef {import('../model/PostInfo').default} PostInfo */

/**
 * The general post UI component
 * @Component
 * @return {React.ReactElement}
*/
const PostUI = () => (
    <>
        <MainAppToolbar />
        <PostViewSwither />
    </>
);

/**
 * The special component implements switch views
 * @Component
 * @return {React.ReactElement}
*/
const PostViewSwither = () => {
    /** @type {[?PostInfo[], import('react').Dispatch<import('react').SetStateAction<?PostInfo[]>>]} */
    const [postInfos, setPostInfos] = useState(/** @type {?PostInfo[]} */(null));
    /** @type {[?string, import('react').Dispatch<import('react').SetStateAction<?string>>]} */
    const [readPostID, setReadPostID] = useState(/** @type {?string} */(null));
    /** @type {[?string, import('react').Dispatch<import('react').SetStateAction<?string>>]} */
    const [editPostID, setEditPostID] = useState(/** @type {?string} */(null));
    /** @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]} */
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        (
            async () => {
                await updatePosts();
            }
        )();
    }, []);

    const updatePosts = async () => {
        setPostInfos(null);
        const postInfos = await getPostInfos();
        setPostInfos(postInfos);
        await sleep(300);
    };

    const doOpenPost = (postId) => {
        closePost();
        setReadPostID(postId);
    };
    const doEditPost = (postId) => {
        closePost();
        setEditPostID(postId);
    };
    const doDeletePost = async (postId) => {
        closePost();
        await deletePost(postId);
        await updatePosts();
    };
    const doAddNew = async () => {
        closePost();
        setEditPostID('');
    };
    const doSavePost = async (postId, postTitle, postContent) => {
        closePost();
        await updatePost(postId, postTitle, postContent);
        await updatePosts();
    };
    const closePost = () => {
        setReadPostID(null);
        setEditPostID(null);
        setSearchText('');
    };

    const onSearchTextChanged = (value) => {
        setSearchText(value);
    };

    const navigateBack = () => closePost();

    const isModelLoading = () => postInfos === null;

    if (isModelLoading()) {
        return (<Loading />);
    }

    if (editPostID !== null) {
        return (
            <PostEdit
                id={editPostID}
                navigateBack={navigateBack}
                onSave={doSavePost}
            />
        );
    }

    if (readPostID !== null) {
        return (
            <PostView id={readPostID}
                navigateBack={navigateBack}
                onEdit={doEditPost}
                onDelete={doDeletePost}
            />);
    }
    if (searchText) {
        return (
            <SearchResults
                searchText={searchText}
                onSearchTextChanged={onSearchTextChanged}
                navigateBack={navigateBack}
            />
        );
    }

    if (postInfos) {
        return (
            <PostList
                postInfos={postInfos}
                onOpen={doOpenPost}
                onEdit={doEditPost}
                onDelete={doDeletePost}
                addNew={doAddNew}
                onSearchTextChanged={onSearchTextChanged}
            />);
    }

    return (<>Error</>);
};

export default PostUI;
