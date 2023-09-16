import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import getPostIDs from '../backend/getPostIDs';
import PostList from './PostList';
import Post from './Post';

const RestApiDemo = () => {
    const [postInfos, setPostInfos] = useState(null);
    const [readPostID, setEditPostID] = useState(null);

    useEffect(() => {
        (
            async () => {
                const postInfos = await getPostIDs();
                setPostInfos(postInfos);
            }
        )()
    }, []);

    const onPostClick = (postId) => setEditPostID(postId);
    const closePost = () => setEditPostID(null);

    const isModelLoading = () => postInfos !== null;

    if (!isModelLoading())
        return (<Loading />)

    if (readPostID !== null)
        return (<Post id={readPostID} navigateBack={closePost} />)

    if (postInfos)
        return (<PostList postInfos={postInfos} onPostClick={onPostClick} />)

    // return (<div>{postIDs?.length}</div>)
    return null;
};

export default RestApiDemo;
