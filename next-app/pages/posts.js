import React from "react";
import PostCard from "../components/PostCard";
import "./globals.css";

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  // Pass data to the page via props
  return { props: { posts } };
}

const Posts = ({ posts }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Posts;