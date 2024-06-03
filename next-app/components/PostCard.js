import React from "react";

const PostCard = ({ post, handleDelete }) => {
    const onDelete = async (postId) => {
        if (confirm("Are you sure?")) {
          try {
            const res = await fetch(`http://localhost:4000/post/${postId}`, {
              method: "DELETE",
            });
      
            if (res.ok) {
              // Post deleted successfully
              // Perform any necessary actions (e.g., remove the post from state)
              alert("successfully deleted ")
            } else {
              // An error occurred while deleting the post
              // Handle the error as needed
              alert("error to delete ")
            }
          } catch (error) {
            // An error occurred while making the delete request
            // Handle the error as needed
            console.error("Error deleting post:", error);
          }
        } else {
          alert("Abort");
        }
      };

  return (
    <div className="p-6 border rounded-lg shadow-md bg-white relative">
      <h3 className="text-blue-600 font-semibold text-xl mb-2 font-roboto capitalize">
        {post.title}
      </h3>
      <p className="text-gray-800 text-base mb-4 font-roboto">{post.body}</p>
      <p className="text-gray-500 text-sm font-roboto">
        User ID: {post.userId}
      </p>
      <button
        className="absolute bottom-4 right-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-2 rounded-full"
        onClick={onDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default PostCard;
