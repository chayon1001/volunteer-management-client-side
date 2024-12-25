import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../provider/AuthProvider';
import toast from 'react-hot-toast';

const VolunteerRequestForm = () => {
    const { id } = useParams(); 
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [suggestion, setSuggestion] = useState('');

    const { user } = useContext(AuthContext); 

    useEffect(() => {
    
        axios
            .get(`http://localhost:5000/volunteers/${id}`)
            .then((response) => {
                setPost(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching post:', err);
                setError(err.response?.data?.message || 'Failed to load post');
                setLoading(false);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!suggestion.trim()) {
            toast.error('Please enter a suggestion.');
            return;
        }

        const volunteersNeeded = parseInt(post.volunteersNeeded, 10);

        if (isNaN(volunteersNeeded)) {
            toast.error('Invalid volunteersNeeded value. It should be a number.');
            return;
        }

        const requestData = {
            volunteerPostId: id,
            volunteerName: user.displayName || 'user', 
            volunteerEmail: user.email,
            suggestion: suggestion.trim(),
            thumbnail: post.thumbnail,
            title: post.title,
            description: post.description,
            category: post.category,
            location: post.location,
            volunteersNeeded: volunteersNeeded,
            deadline: post.deadline,
            organizerName: post.organizerName,
            organizerEmail: post.organizerEmail,
        };

        console.log('Request Data:', requestData);

    
        fetch('http://localhost:5000/request-volunteer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('Server Response:', data);  

                if (data && data.insertedId) {
                    toast.success('Request post successfully added');
                } else {
                    
                    toast.error('Failed to submit request. Please try again.');
                    
                }
            })
            .catch((err) => {
                console.error( err);
               
            });

    }



    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-10">
            <h1 className="text-2xl font-bold text-indigo-700 mb-4">Volunteer Request</h1>

            

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label><strong>Thumbnail:</strong></label>
                    <img src={post.thumbnail} alt={post.title} className="w-full h-40 object-cover rounded-md mb-4" />
                </div>

                <div className="mb-4">
                    <label><strong>Post Title:</strong></label>
                    <input type="text" value={post.title} readOnly className="w-full p-2 border rounded mt-1" />
                </div>

                <div className="mb-4">
                    <label><strong>Description:</strong></label>
                    <textarea value={post.description} readOnly className="w-full p-2 border rounded mt-1" />
                </div>

                <div className="mb-4">
                    <label><strong>Category:</strong></label>
                    <input type="text" value={post.category} readOnly className="w-full p-2 border rounded mt-1" />
                </div>

                <div className="mb-4">
                    <label><strong>Location:</strong></label>
                    <input type="text" value={post.location} readOnly className="w-full p-2 border rounded mt-1" />
                </div>

                <div className="mb-4">
                    <label><strong>No. of Volunteers Needed:</strong></label>
                    <input type="number" value={post.volunteersNeeded} readOnly className="w-full p-2 border rounded mt-1" />
                </div>

                <div className="mb-4">
                    <label><strong>Deadline:</strong></label>
                    <input type="text" value={new Date(post.deadline).toLocaleDateString()} readOnly className="w-full p-2 border rounded mt-1" />
                </div>

                <div className="mb-4">
                    <label><strong>Organizer Name:</strong></label>
                    <input type="text" value={post.organizerName} readOnly className="w-full p-2 border rounded mt-1" />
                </div>

                <div className="mb-4">
                    <label><strong>Organizer Email:</strong></label>
                    <input type="email" value={post.organizerEmail} readOnly className="w-full p-2 border rounded mt-1" />
                </div>

               
                <div className="mb-4">
                    <label><strong>Volunteer Name:</strong></label>
                    <input type="text" value={user.displayName || 'user'} readOnly className="w-full p-2 border rounded mt-1" />
                </div>

                <div className="mb-4">
                    <label><strong>Volunteer Email:</strong></label>
                    <input type="email" value={user.email} readOnly className="w-full p-2 border rounded mt-1" />
                </div>

                <div className="mb-4">
                    <label><strong>Your Suggestion:</strong></label>
                    <textarea
                        className="w-full p-2 border rounded mt-1"
                        placeholder="Your suggestion"
                        value={suggestion}
                        onChange={(e) => setSuggestion(e.target.value)}
                    />
                </div>

             
                <button
                    className="mt-4 px-6 py-2 bg-indigo-700 text-white rounded-md hover:bg-indigo-800"

                >
                    Request
                </button>

            </form>
        </div>
    );
};

export default VolunteerRequestForm;
