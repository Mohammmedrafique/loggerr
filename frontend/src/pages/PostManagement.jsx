import { useEffect, useState } from "react";
import axios from "axios";

const PostManagement = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editedPost, setEditedPost] = useState({
    id: null,
    username: "",
    title: "",
    content: "",
    category: "",
    date: "",
    likes: 0,
    comments: [],
  });

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/blogs/getAllBlogs")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleEdit = (id) => {
    const postToEdit = posts.find((post) => post.id === id);

    setEditedPost({
      id: postToEdit.id,
      username: postToEdit.username,
      title: postToEdit.title,
      content: postToEdit.content,
      category: postToEdit.category,
      date: postToEdit.date,
      likes: postToEdit.likes,
      comments: postToEdit.comments,
    });
  };

  const handleUpdate = () => {
    axios
      .put(
        `http://localhost:8000/api/blogs/updateBlog/${editedPost.id}`,
        editedPost
      )
      .then((response) => {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === response.data.id ? response.data : post
          )
        );
        setEditedPost({
          _id: null,
          username: "",
          title: "",
          content: "",
          category: "",
          date: "",
          likes: 0,
          comments: [],
        });
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/api/blogs/deleteBlog/${id}`)
      .then(() => {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      })
      .catch((error) => console.error(error));
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      axios
        .get("http://localhost:8000/api/blogs")
        .then((response) => setPosts(response.data))
        .catch((error) => console.error(error));
    } else {
      axios
        .get(`http://localhost:8000/api/blogs/searchBlogs/${searchTerm}`)
        .then((response) => setPosts(response.data))
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl mb-4 font-semibold">Post Management</h1>
      <div className="mb-4 flex items-center">
        <label className="mr-4">
          Search by Title:
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-2 py-1 ml-2"
          />
        </label>
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td className="py-2 px-4 border-b">{post.username}</td>
              <td className="py-2 px-4 border-b">{post.title}</td>
              <td className="py-2 px-4 border-b">{post.category}</td>
              <td className="py-2 px-4 border-b">{post.date}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleEdit(post.id)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editedPost.id && (
        <div className="mt-4">
          <h2 className="text-xl mb-2 font-semibold">Edit Post</h2>
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default PostManagement;
