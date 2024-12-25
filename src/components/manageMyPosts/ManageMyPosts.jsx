import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; // For navigation
import { AuthContext } from '../../provider/AuthProvider';

const ManageMyPosts = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // To navigate to the update page

  useEffect(() => {
    if (user?.email) {
      axios
        .get('http://localhost:5000/my-volunteer-posts', { params: { email: user.email } })
        .then((response) => {
          setPosts(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.response?.data?.message || 'Failed to fetch posts');
          setLoading(false);
        });
    } else {
      setError('User email not available.');
      setLoading(false);
    }
  }, [user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/delete-volunteer-post/${id}`)
          .then(() => {
            toast.success('Post deleted successfully');
            setPosts(posts.filter((post) => post._id !== id));
          })
          .catch((err) => {
            toast.error(err.response?.data?.message || 'Failed to delete post');
          });
      }
    });
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`); // Navigate to the UpdatePost component
  };

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-center mb-6">Manage my post</h2>
      {posts.length === 0 ? (
        <p className="text-center text-gray-600">No volunteer posts found. Create one to get started.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{post.title}</td>
                  <td className="border border-gray-300 px-4 py-2">{post.category}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => handleUpdate(post._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 mr-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageMyPosts;
