import { createContext, useReducer, useEffect, useState } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  addPosts: () => {},
  deletePost: () => {},
  fetched: false,
});

const postListReducer = (state, action) => {
  switch (action.type) {
    case "ADD_POST":
      return [action.payload.post, ...state];
    case "ADD_INTIAL_POSTS":
      return [...action.payload.posts];
    case "DELETE_POST":
      return state.filter((post) => post.id !== action.payload.postId);
    default:
      return state;
  }
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);

  // Add a single post
  const addPost = (post) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: { post },
    });
  };

  // Add initial array of posts
  const addPosts = (posts) => {
    dispatchPostList({
      type: "ADD_INTIAL_POSTS",
      payload: { posts },
    });
  };

  // Delete a post
  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: { postId },
    });
  };

  // ✅ Moved useEffect inside the component and below the function definitions

  const [fetched, setFetched] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch("https://dummyjson.com/posts", { signal })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched posts from API:", data.posts);
        addPosts(data.posts);
        setFetched(true); // ✅ set only after fetch success
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("Fetch error:", err);
          setFetched(true); // ✅ also mark as complete if fetch fails
        }
      });

    return () => controller.abort();
  }, []);

  return (
    <PostList.Provider
      value={{ postList, addPost, addPosts, deletePost, fetched }}
    >
      {children}
    </PostList.Provider>
  );
};

export default PostListProvider;
