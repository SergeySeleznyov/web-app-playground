import { useEffect, useState } from "react";
import Loading from "./Loading";
import requestPost from "../model/requestPost";

const Post = ({ id, backClick }) => {
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
        <>
            <h1>Blog post #{post.id} - {post.title}</h1>
            <pre>{post.content}</pre>
            <a onClick={backClick}>Back</a>
        </>
    )
}

export default Post
