import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { Helmet } from "react-helmet-async";

const ContactUs = () => {
    const formRef = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                "service_6ym4fwn", // Replace with your EmailJS service ID
                "template_7tzmaii", // Replace with your EmailJS template ID
                formRef.current,
                "HSq4GqSVe303lSbrW" // Replace with your EmailJS public key
            )
            .then(
                (result) => {
                    console.log("Email sent successfully:", result.text);
                    alert("Message sent successfully!");
                },
                (error) => {
                    console.error("Error sending email:", error.text);
                    alert("Failed to send message. Please try again.");
                }
            );

        e.target.reset(); // Reset the form after submission
    };

    return (
        <div className="max-w-7xl mx-auto p-4 flex flex-col lg:flex-row justify-between items-start mt-10 rounded-xl mb-10 bg-gray-100">
            {/* Contact Info Section */}

            <Helmet>
                <title>Contact  - Volunteer-management</title>
            </Helmet>
            <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
                <h2 className="text-2xl font-bold mb-4">Contact us</h2>
                <p className="text-gray-600 mb-6">
                    Odio ultrices ut. Etiam ac erat ut enim maximus accumsan vel ac nisl.
                    Duis feugiat bibendum orci, non elementum urna. Cras sit amet sapien
                    aliquam.
                </p>
                <div className="space-y-4">
                    <div>
                        <h3 className="text-indigo-500 font-semibold">Address</h3>
                        <p className="text-gray-600">
                            1481 Dhaka
                            <br />
                            Bangladesh, CA 931
                        </p>
                    </div>
                    <div>
                        <h3 className="text-indigo-500 font-semibold">Phone</h3>
                        <p className="text-gray-600">+53 345 7953 32453</p>
                    </div>
                    <div>
                        <h3 className="text-indigo-500 font-semibold">E-mail</h3>
                        <p className="text-gray-600">yourmail@gmail.com</p>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Leave a Reply</h2>
                <form ref={formRef} onSubmit={sendEmail}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                        <input
                            type="text"
                            name="user_name"
                            placeholder="Name"
                            className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            required
                        />
                        <input
                            type="email"
                            name="user_email"
                            placeholder="Email"
                            className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            required
                        />
                    </div>
                    <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        required
                    />
                    <textarea
                        name="message"
                        placeholder="Message"
                        rows="4"
                        className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        required
                    ></textarea>
                    <button
                        type="submit"
                        className="bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;