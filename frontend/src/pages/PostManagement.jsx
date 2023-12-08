import { useEffect, useState } from "react";
import axios from "axios";

const PostManagement = () => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState("");
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    username: "",
    category: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchPosts(storedToken);
    }
  }, []);

  const fetchPosts = (token) => {
    axios
      .get("http://localhost:8000/api/blogs/getAllBlogs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const responseData = response.data || {};
        setPosts(responseData.data || []);
      })
      .catch((error) => console.error(error));
  };

  const handleCreatePost = () => {
    axios
      .post("http://localhost:8000/api/blogs/createBlog", newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setNewPost({ title: "", content: "", username: "", category: "" });
        fetchPosts(token);
      })
      .catch((error) => console.error(error));
  };

  const handleUpdatePost = (postId, updatedPost) => {
    axios
      .put(
        `http://localhost:8000/api/blogs/updateBlog/${postId}`,
        updatedPost,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => fetchPosts(token))
      .catch((error) => console.error(error));
  };

  const handleDeletePost = (postId) => {
    axios
      .delete(`http://localhost:8000/api/blogs/deleteBlog/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => fetchPosts(token))
      .catch((error) => console.error(error));
  };

  const handleSearch = () => {
    console.log("Search term:", searchTerm);
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl mb-4 font-semibold">Post Management</h1>

      {/* Create Post Form */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Create New Post</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreatePost();
          }}
        >
          <label htmlFor="title" className="block">
            Title:
            <input
              type="text"
              id="title"
              value={newPost.title}
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
              required
              className="border p-2"
            />
          </label>
          <label htmlFor="content" className="block mt-2">
            Content:
            <textarea
              id="content"
              value={newPost.content}
              onChange={(e) =>
                setNewPost({ ...newPost, content: e.target.value })
              }
              required
              className="border p-2"
            />
          </label>
          <label htmlFor="username" className="block mt-2">
            Username:
            <input
              type="text"
              id="username"
              value={newPost.username}
              onChange={(e) =>
                setNewPost({ ...newPost, username: e.target.value })
              }
              required
              className="border p-2"
            />
          </label>
          <label htmlFor="category" className="block mt-2">
            Category:
            <input
              type="text"
              id="category"
              value={newPost.category}
              onChange={(e) =>
                setNewPost({ ...newPost, category: e.target.value })
              }
              required
              className="border p-2"
            />
          </label>
          <button type="submit" className="bg-blue-500 text-white p-2 mt-2">
            Create
          </button>
        </form>
      </div>

      {/* Search */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Search</h2>
        <div className="flex">
          <input
            type="text"
            placeholder="Search term"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mr-2 p-2 border"
          />
          <button onClick={handleSearch} className="bg-blue-500 text-white p-2">
            Search
          </button>
        </div>
      </div>

      {/* Display Posts */}
      <div className="flex flex-wrap -mx-4">
        {posts.map((post) => (
          <div key={post._id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.content}</p>
              <div className="flex items-center">
                <span className="text-gray-500">{post.username}</span>
                <span className="text-gray-500 ml-2">{post.date}</span>
              </div>
              <div className="mt-4">
                <strong>Likes:</strong> {post.likes}
              </div>
              <div className="mt-2">
                <strong>Comments:</strong>
                <ul>
                  {post.comments.map((comment) => (
                    <li key={comment._id}>
                      <strong>{comment.username}:</strong> {comment.content}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => {
                  const updatedPost = prompt(
                    "Enter updated content:",
                    post.content
                  );
                  if (updatedPost !== null) {
                    handleUpdatePost(post._id, { content: updatedPost });
                  }
                }}
                className="bg-yellow-500 text-white p-2"
              >
                Update
              </button>
              <button
                onClick={() => handleDeletePost(post._id)}
                className="bg-red-500 text-white p-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostManagement;
