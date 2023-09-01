import React, { useEffect, useState } from 'react';

function RestApiDemo() {
    const [response, setResponse] = useState(null);

    useEffect(() => {
        request();
    }, []);

    const request = async () => {
        const url = `http://localhost:5000/api`;
        const res = await fetch(url);
        const resBodyJson = await res.json();
        if (res.status === 200)
            setResponse(resBodyJson.result);
    };

    return response ? (
        <span>
            {response}
        </span>
    ) : null;
};

export default RestApiDemo;
