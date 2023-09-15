import { useEffect, useState } from "react";
import Loading from "./Loading";
import requestPost from "../backend/requestPost";

const Post = ({ id, navigateBack }) => {
    const [post, setPost] = useState(null);
    useEffect(() => {
        (
            async () => {
                const post = await requestPost(id);
                setPost(post);
            }
        )()
    }, []);

    if (post === null)
        return (<Loading />)

    return (
        <div className="blog-post">
            <div className="caption">{post.title}</div>
            <pre className="post-content">{post.content}</pre>
            <a href="javascript:void(0)" onClick={navigateBack}>Back</a>
        </div>
    )
}

export default Post
