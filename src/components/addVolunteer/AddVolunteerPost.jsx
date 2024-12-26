import React, { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

const AddVolunteerPost = () => {
    const { user } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const postData = {
            thumbnail: formData.get('thumbnail'),
            title: formData.get('title'),
            description: formData.get('description'),
            category: formData.get('category'),
            location: formData.get('location'),
            volunteersNeeded: formData.get('volunteersNeeded'),
            deadline: formData.get('deadline'),
            organizerName: user?.displayName || 'user',
            organizerEmail: user?.email || 'user@gmail.com',
        };

        console.log('Form Data:', postData);


        // API submission logic here

        fetch('http://localhost:5000/volunteers',{
            method: 'POST',
            headers: {
                'content-type' : 'application/json',
            },
            body : JSON.stringify(postData)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.insertedId) {
                toast.success('volunteer post successfully added');
            }
        });
    };

    return (
        <div className="max-w-4xl mx-auto bg-gray-200 p-6 rounded-lg shadow-md mt-20">
            <Helmet>
                <title>AddVolunteerPost - Volunteer-management</title>
            </Helmet>
            <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">Add Volunteer Need Post</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Thumbnail URL */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Thumbnail URL</label>
                    <input
                        type="text"
                        name="thumbnail"
                        className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter thumbnail URL"
                    />
                </div>

                {/* Post Title */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Post Title</label>
                    <input
                        type="text"
                        name="title"
                        className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter post title"
                    />
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Description</label>
                    <textarea
                        name="description"
                        className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter post description"
                        rows="4"
                    ></textarea>
                </div>

                {/* Category */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Category</label>
                    <select
                        defaultValue="Healthcare"
                        name="category"
                        className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="healthcare">Healthcare</option>
                        <option value="education">Education</option>
                        <option value="social_service">Social Service</option>
                        <option value="animal_welfare">Animal Welfare</option>
                    </select>
                </div>

                {/* Location */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Location</label>
                    <input
                        type="text"
                        name="location"
                        className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter location"
                    />
                </div>

                {/* Volunteers Needed */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">No. of Volunteers Needed</label>
                    <input
                        type="number"
                        name="volunteersNeeded"
                        className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter number of volunteers"
                    />
                </div>

                {/* Deadline */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Deadline</label>
                    <input
                        type="date"
                        name="deadline"
                        className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                {/* Organizer Name */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Organizer Name</label>
                    <input
                        type="text"
                        value={user?.displayName || 'user'}
                        className="w-full px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
                        readOnly
                    />
                </div>

                {/* Organizer Email */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Organizer Email</label>
                    <input
                        type="email"
                        value={user?.email || 'user@gmail.com'}
                        className="w-full px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
                        readOnly
                    />
                </div>

             
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-indigo-700 text-white font-semibold rounded-md hover:bg-indigo-800"
                >
                    Add Post
                </button>
            </form>
        </div>
    );
};

export default AddVolunteerPost;
