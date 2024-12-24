import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactUs = () => {
    const [contactDetails, setContactDetails] = useState({});
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [messageSent, setMessageSent] = useState(false);

    useEffect(() => {
       
        axios.get('http://localhost:5000/contact-details')
            .then((response) => {
                setContactDetails(response.data);
            })
            .catch((error) => {
                console.error('Error fetching contact details:', error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

   
        axios.post('http://localhost:5000/contact-form', formData)
            .then(() => {
                setMessageSent(true);
                setFormData({ name: '', email: '', message: '' }); 
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section className="bg-gray-100 py-10 px-6 rounded-lg shadow-md mb-12">
            <h2 className="text-3xl font-bold text-black text-center mb-6">Contact Us</h2>
            <p className="text-gray-600 text-lg text-center mb-6">
                Have any questions or want to get involved? Reach out to us!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-indigo-700">Contact Details</h3>
                    <p className="text-gray-600 mt-2"><strong>Email:</strong> {contactDetails.email || 'Loading...'}</p>
                    <p className="text-gray-600 mt-2"><strong>Phone:</strong> {contactDetails.phone || 'Loading...'}</p>
                    <p className="text-gray-600 mt-2"><strong>Address:</strong> {contactDetails.address || 'Loading...'}</p>
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
                        {messageSent && <p className="text-green-600 mt-2">Thank you! Your message has been sent.</p>}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
