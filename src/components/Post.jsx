import React, { useContext } from "react";
import { AiFillDelete } from "react-icons/ai";
import { PostList } from "../store/post-list-store";

function Post({ post }) {
  const { deletePost } = useContext(PostList);
  return (
    <div
      className="card post-Card position-relative "
      style={{ width: "30rem" }}
    >
      <span
        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
        style={{ zIndex: 1 }}
        onClick={() => deletePost(post.id)}
      >
        <AiFillDelete />
      </span>
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.body}</p>
        {post.tags.map((tag) => (
          <span className="badge text-bg-primary mx-2" key={tag}>
            {" "}
            {tag}
          </span>
        ))}
      </div>
      <div className="alert alert-success m-2" role="alert">
        <strong>This post </strong> {post.reactions?.likes}
        <strong> likes </strong>
        {post.reactions?.dislikes}
        <strong> dislikes: </strong>
      </div>
    </div>
  );
}

export default Post;
