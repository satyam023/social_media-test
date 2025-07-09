import React, { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostList as PostListData } from "../store/post-list-store";
import WelcomeMsg from "./WelcomeMsg";
import LoaderSpinner from "./LoaderSpinner";
function PostList() {
  const { postList, addPosts } = useContext(PostListData);
  // const [datafetched, setDataFetched] = useState(false);
  // const { signal } = new AbortController();
  // // const controller = new AbortController();
  // // const signal = controller.signal;

  // useEffect(() => {
  //   fetch("https://dummyjson.com/posts", { signal })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data.posts);
  //       addPosts(data.posts);

  //       return () => {
  //         // controller.abort(); // Abort the fetch request if the component unmounts
  //         signal.aborted = true; // Cleanup function to abort fetch if component unmounts
  //       };
  //     }, []);
  // });

  // if (!datafetched) {
  //   fetch("https://dummyjson.com/posts")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // console.log(data.posts);
  //       addPosts(data.posts);
  //     });
  //   setDataFetched(true);
  // }
  // const handleGetPostClick = () => {
  // fetch("https://dummyjson.com/posts")
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log(data.posts);
  //     addPosts(data.posts);
  //   });
  // };

  const { fetched } = useContext(PostListData);
  return (
    <>
      {!fetched && <LoaderSpinner />}
      {postList.length === 0 && fetched && <WelcomeMsg />}
      {postList.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
}

export default PostList;
