const Post = ({ spots }) => {
    return (
        <article>
            <h2>{spots.name}</h2>
            <img>{spots.previewImage}</img>
            <p>{spots.body}</p>
        </article>
    )
}

export default Post
