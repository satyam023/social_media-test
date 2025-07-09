import React, { useContext, useRef } from "react";
import { PostList } from "../store/post-list-store";
import { Form, redirect, useNavigate } from "react-router-dom";

function CreatePost() {
  // const { addPost } = useContext(PostList);
  // const navigate = useNavigate();

  // const userIdElement = useRef();
  // const postTitleElement = useRef();
  // const postBodyElement = useRef();
  // const postTagsElement = useRef();
  // const likesElement = useRef();
  // const dislikesElement = useRef();

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   const userId = userIdElement.current.value;
  //   const postTitle = postTitleElement.current.value;
  //   const postBody = postBodyElement.current.value;
  //   const tags = postTagsElement.current.value
  //     .split(/[\s,]+/)
  //     .map((tag) => tag.trim())
  //     .filter((tag) => tag !== "");

  //   const likes = Number(likesElement.current.value) || 0;
  //   const dislikes = Number(dislikesElement.current.value) || 0;

  // const post = {
  //   id: Math.random().toString(36).substring(2, 9),
  //   userId,
  //   title: postTitle,
  //   body: postBody,
  //   tags,
  //   reactions: {
  //     likes,
  //     dislikes,
  //   },
  // };

  //   // Add post locally and navigate immediately
  //   addPost(post);
  //   navigate("/");

  //   // Optional: send to backend
  //   fetch("https://dummyjson.com/posts/add", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(post),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log("Posted to backend:", data))
  //     .catch((err) => console.error("Post failed:", err));

  //   // Reset form
  //   userIdElement.current.value = "";
  //   postTitleElement.current.value = "";
  //   postBodyElement.current.value = "";
  //   postTagsElement.current.value = "";
  //   likesElement.current.value = "";
  //   dislikesElement.current.value = "";
  //   userIdElement.current.focus();
  // };

  return (
    <div>
      <Form method="post" className="createPost">
        <div className="mb-3">
          <label htmlFor="userId" className="form-label">
            User ID
          </label>
          <input
            name="userId"
            type="text"
            className="form-control"
            id="userId"
            placeholder="Enter your user ID"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Post Title
          </label>
          <input
            name="title"
            type="text"
            className="form-control"
            id="title"
            placeholder="Post Title"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="body" className="form-label">
            Post Content
          </label>
          <textarea
            name="body"
            rows="5"
            className="form-control"
            id="body"
            placeholder="Write your post content here..."
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="tags" className="form-label">
            Tags
          </label>
          <input
            type="text"
            name="tags"
            className="form-control"
            id="tags"
            placeholder="e.g. happy, life, motivation"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="likes" className="form-label">
            Likes
          </label>
          <input
            type="number"
            name="likes"
            className="form-control"
            id="likes"
            defaultValue={0}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="dislikes" className="form-label">
            Dislikes
          </label>
          <input
            type="number"
            name="dislikes"
            className="form-control"
            id="dislikes"
            defaultValue={0}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Post
        </button>
      </Form>
    </div>
  );
}

export async function createPostAction({ request }) {
  const formData = await request.formData();
  const postData = Object.fromEntries(formData);

  postData.tags = postData.tags.split(/[\s,]+/).filter(Boolean);
  postData.reactions = {
    likes: Number(postData.likes) || 0,
    dislikes: Number(postData.dislikes) || 0,
  };

  console.log("Post Data:", postData);

  await fetch("https://dummyjson.com/posts/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });

  return redirect("/");
}

export default CreatePost;
