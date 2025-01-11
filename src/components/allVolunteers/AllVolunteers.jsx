import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaTh, FaTable } from 'react-icons/fa'; 

const AllVolunteers = () => {
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isTableLayout, setIsTableLayout] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchPosts();
    }, [searchQuery]);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(`https://volunteer-management-sever-side.vercel.app/volunteersAll?search=${searchQuery}`);
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

    const toggleLayoutToCard = () => {
        setIsTableLayout(false);
    };

    const toggleLayoutToTable = () => {
        setIsTableLayout(true);
    };

    return (
        <div className="max-w-7xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-10 mb-10">
            <Helmet>
                <title>All Volunteers - Volunteer Management</title>
            </Helmet>
            <h1 className="text-3xl font-bold text-indigo-700 mb-6">All Volunteer Need Posts</h1>
            <div className="flex justify-between items-center mb-6">
                <input
                    type="text"
                    placeholder="Search by post title..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full max-w-md p-2 border rounded"
                />
                <div className="ml-4 flex space-x-4">
                    <FaTh
                        onClick={toggleLayoutToCard}
                        className={`cursor-pointer text-2xl ${
                            !isTableLayout ? 'text-indigo-700' : 'text-gray-400'
                        } hover:text-indigo-700`}
                        title="Card View"
                    />
                    <FaTable
                        onClick={toggleLayoutToTable}
                        className={`cursor-pointer text-2xl ${
                            isTableLayout ? 'text-indigo-700' : 'text-gray-400'
                        } hover:text-indigo-700`}
                        title="Table View"
                    />
                </div>
            </div>

            {isTableLayout ? (
                // Table Layout
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg shadow">
                        <thead>
                            <tr className="bg-indigo-700 text-white">
                                <th className="px-4 py-2 text-left">Title</th>
                                <th className="px-4 py-2 text-left">Category</th>
                                <th className="px-4 py-2 text-left">Location</th>
                                <th className="px-4 py-2 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => (
                                <tr key={post._id} className="hover:bg-gray-100">
                                    <td className="px-4 py-2">{post.title}</td>
                                    <td className="px-4 py-2">{post.category}</td>
                                    <td className="px-4 py-2">{post.location}</td>
                                    <td className="px-4 py-2 text-center">
                                        <button
                                            onClick={() => handleViewDetails(post._id)}
                                            className="px-4 py-2 bg-indigo-700 text-white rounded hover:bg-indigo-800"
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                // Card Layout
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                                See More
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllVolunteers;
