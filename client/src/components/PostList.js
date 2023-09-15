const PostList = ({ postInfos, onPostClick }) => (
    <>
        <div className="caption">Blog posts:</div>
        <ul className="blog-post_list">
            {
                postInfos.map(postInfo =>
                    <li
                        key={postInfo.id}
                        onClick={() => onPostClick(postInfo.id)}
                    >
                        <a className="blog-post_link" href="javascript:void(0)">{postInfo.title}</a>
                    </li>
                )
            }
        </ul>
    </>
)

export default PostList
