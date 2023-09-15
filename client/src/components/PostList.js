const PostList = ({ postInfos, onPostClick }) => (
    <>
        <h1>Blog posts:</h1>
        <ul>
            {
                postInfos.map(postInfo =>
                    <li
                        key={postInfo.id}
                        onClick={() => onPostClick(postInfo.id)}
                    >
                        Blog post #{postInfo.id} - <b>{postInfo.title}</b>
                    </li>
                )
            }
        </ul>
    </>
)

export default PostList
