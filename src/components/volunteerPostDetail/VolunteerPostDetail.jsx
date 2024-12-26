import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

const VolunteerPostDetail = () => {

  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://volunteer-management-sever-side.vercel.app/volunteers/${id}`)
      .then((response) => {
        setPost(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching post:', err);
        setError('Failed to load post');
        setLoading(false);
      });
  }, [id]);

  const handleButtonClick = () => {
    
    navigate(`/volunteer-request/${id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-10">
      <Helmet>
        <title>Volunteer Post Details - Volunteer Management</title>
      </Helmet>
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">{post.title}</h1>
      <img
        src={post.thumbnail}
        alt={post.title}
        className="w-full h-60 object-cover rounded-lg mb-6"
      />
      <p className="text-gray-600 mb-4">
        <strong>Category:</strong> {post.category}
      </p>
      <p className="text-gray-600 mb-4">
        <strong>Location:</strong> {post.location}
      </p>
      <p className="text-gray-600 mb-4">
        <strong>Volunteers Needed:</strong> {post.volunteersNeeded}
      </p>
      <p className="text-gray-600 mb-4">
        <strong>Deadline:</strong> {new Date(post.deadline).toLocaleDateString()}
      </p>
      <p className="text-gray-600 mb-4">
        <strong>Description:</strong> {post.description}
      </p>
      {post.volunteersNeeded > 0 ? (
        <button
          onClick={handleButtonClick}
          className="px-6 py-2 bg-indigo-700 text-white rounded-md hover:bg-indigo-800 mt-4"
        >
          Be a Volunteer
        </button>
      ) : (
        <p className="text-red-600 font-semibold mt-4">
          Volunteers are not needed for this post at the moment.
        </p>
      )}
    </div>
  );
};

export default VolunteerPostDetail;
