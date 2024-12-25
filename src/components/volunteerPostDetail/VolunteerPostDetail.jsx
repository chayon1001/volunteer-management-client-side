import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const VolunteerPostDetail = () => {

    const navigate = useNavigate(); // Initialize navigate function

  const handleVolunteerClick = () => {
    navigate(`/volunteer-request/${post._id}`); // Navigate to the volunteer request form with the post ID
  };


  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
   
    axios.get(`http://localhost:5000/volunteers/${id}`)
      .then((response) => {
        setPost(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err)
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-10 mb-10">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">{post.title}</h1>
      <img
        src={post.thumbnail}
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
      <button  onClick={handleVolunteerClick}
        className="px-6 py-2 bg-indigo-700 text-white rounded-md hover:bg-indigo-800 mt-4"
      >
        Be a Volunteer
      </button>
    </div>
  );
};

export default VolunteerPostDetail;
