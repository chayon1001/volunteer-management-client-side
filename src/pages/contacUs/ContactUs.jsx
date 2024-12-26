import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

const ContactUs = () => {

    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
   



    const handleSubmit = (e) => {
        e.preventDefault();


        axios.post('http://localhost:5000/contact-form', formData)
            .then(() => {
                setMessageSent(true);
                setFormData({ name: '', email: '', message: '' });
                toast.success('message received successfully')
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900 py-10 px-6 rounded-lg shadow-md">
            <Helmet>
                <title>Contact us - Volunteer-management</title>
            </Helmet>
            <h2 className="text-3xl font-bold text-black text-center mb-6">Contact Us</h2>
            <p className="text-gray-600 text-lg text-center mb-6">
                Have any questions or want to get involved? Reach out to us!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">

                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-indigo-700">Contact Details</h3>
                    <p className="text-gray-600 mt-2"><strong>Email:</strong> support@volunteer.org</p>
                    <p className="text-gray-600 mt-2"><strong>Phone:</strong> +123-456-7890</p>
                    <p className="text-gray-600 mt-2"><strong>Address:</strong> 123 Volunteer, Bangladesh</p>
                </div>


                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-indigo-700">Get in Touch</h3>
                    <form className="mt-4" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            className="w-full mb-3 px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your Email"
                            className="w-full mb-3 px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Your Message"
                            rows="4"
                            className="w-full mb-3 px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-indigo-700 text-white rounded-md hover:bg-indigo-800"
                        >
                            Send Message
                        </button>
                       
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
