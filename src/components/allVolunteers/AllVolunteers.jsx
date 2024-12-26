import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const AllVolunteers = () => {
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    
    const navigate = useNavigate();

    useEffect(() => {
        fetchPosts();
    }, [searchQuery]);

    const fetchPosts = async () => {
        try {
          
            const response = await axios.get(`http://localhost:5000/volunteersAll?search=${searchQuery}`);
            setPosts(response.data);
         
        } catch (err) {
            console.log(err);
              
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleViewDetails = (id) => {
        navigate(`/volunteers/${id}`);
    };

    
    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md mt-10">
            <Helmet>
                <title>allVolunteer - Volunteer-management</title>
            </Helmet>
            <h1 className="text-3xl font-bold text-indigo-700 mb-6">All Volunteers Need Posts</h1>
            <input
                type="text"
                placeholder="Search by post title..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full p-2 border rounded mb-6"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <div
                        key={post._id}
                        className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
                    >
                        <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                        <p className="text-gray-600 mb-2">
                            <strong>Category:</strong> {post.category}
                        </p>
                        <p className="text-gray-600 mb-2">
                            <strong>Location:</strong> {post.location}
                        </p>
                        <button
                            onClick={() => handleViewDetails(post._id)}
                            className="px-4 py-2 bg-indigo-700 text-white rounded hover:bg-indigo-800"
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllVolunteers;
