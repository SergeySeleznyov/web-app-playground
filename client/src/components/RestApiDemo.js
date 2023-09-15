import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import requestPostIDs from '../backend/requestPostIDs';
import PostList from './PostList';
import Post from './Post';

const RestApiDemo = () => {
    const [postInfos, setPostInfos] = useState(null);
    const [selectedPostID, setSelectedPostID] = useState(null);

    useEffect(() => {
        (
            async () => {
                const postInfos = await requestPostIDs();
                setPostInfos(postInfos);
            }
        )()
    }, []);

    const onPostClick = (postId) => setSelectedPostID(postId);
    const closePost = () => setSelectedPostID(null);

    const isModelLoading = () => postInfos !== null;

    if (!isModelLoading())
        return (<Loading />)

    if (selectedPostID !== null)
        return (<Post id={selectedPostID} navigateBack={closePost} />)

    if (postInfos)
        return (<PostList postInfos={postInfos} onPostClick={onPostClick} />)

    // return (<div>{postIDs?.length}</div>)
    return null;
};

export default RestApiDemo;
