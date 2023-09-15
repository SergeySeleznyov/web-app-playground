import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import requestPostIDs from '../model/requestPostIDs';

const RestApiDemo = () => {
    const [modelInited, setModelInited] = useState(false);
    const [postIDs, setPostIDs] = useState(null);

    useEffect(() => {
        (
            async () => {
                const postIDs = await requestPostIDs();
                setPostIDs(postIDs);

                setModelInited(true);
            }
        )()

    }, []);


    if (!modelInited)
        return (<Loading />);
    return (
        <span>
            {postIDs}
        </span>
    )

};

export default RestApiDemo;
