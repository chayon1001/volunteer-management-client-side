import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css';
import { AuthContext } from '../../provider/AuthProvider';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const UpdatePost = () => {

    const axiosSecure = useAxiosSecure()
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
 
  const [categories] = useState(['Healthcare', 'Education', 'Social Service', 'Animal Welfare']); 

  useEffect(() => {
   
    axios
      .get(`https://volunteer-management-sever-side.vercel.app/volunteer-post/${id}`)
      .then((response) => {
        setPost(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err)
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();

    axiosSecure
      .put(`/update-volunteer-post/${id}`, post)
      .then(() => {
        toast.success('Post updated successfully');
        navigate('/manageMyPosts'); 
      })
      .catch((err) => {
        toast.error('Failed to update post');
      });
  };

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  
  return (
    <div className="container mx-auto px-4 py-6">
        <Helmet>
                <title>Update-Post - Volunteer-management</title>
            </Helmet>
      <h2 className="text-2xl font-bold mb-4 text-center">Update Volunteer Post</h2>
      <form onSubmit={handleUpdate} className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-md">
      
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Thumbnail URL</label>
          <input
            type="text"
            value={post.thumbnail || ''}
            onChange={(e) => setPost({ ...post, thumbnail: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

       
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Post Title</label>
          <input
            type="text"
            value={post.title || ''}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

       
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea
            value={post.description || ''}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
            rows="4"
          ></textarea>
        </div>

      
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Category</label>
          <select
            value={post.category || ''}
            onChange={(e) => setPost({ ...post, category: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Location</label>
          <input
            type="text"
            value={post.location || ''}
            onChange={(e) => setPost({ ...post, location: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        {/* No. of Volunteers Needed */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">No. of Volunteers Needed</label>
          <input
            type="number"
            value={post.volunteers || ''}
            onChange={(e) => setPost({ ...post, volunteers: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        {/* Deadline */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Deadline</label>
          <DatePicker
            selected={post.deadline ? new Date(post.deadline) : null}
            onChange={(date) => setPost({ ...post, deadline: date })}
            className="w-full px-3 py-2 border rounded-md"
            dateFormat="yyyy-MM-dd"
          />
        </div>

        {/* Organizer Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Organizer Name</label>
          <input
            type="text"
            value={user?.name || 'user'}
            readOnly
            className="w-full px-3 py-2 border rounded-md bg-gray-100"
          />
        </div>

        {/* Organizer Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Organizer Email</label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="w-full px-3 py-2 border rounded-md bg-gray-100"
          />
        </div>

       
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default UpdatePost;
