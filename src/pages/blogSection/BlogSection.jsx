import React from 'react';
import { Helmet } from 'react-helmet-async';



const BlogSection = () => {
    const blogs = [
        {
            id: 1,
            image: 'https://i.ibb.co.com/z8hvxKh/premium-photo-1681140560580-28cdbc874e50-mark-https-images-unsplash-com-opengraph-logo-png-mark-w-64.jpg',
            title: 'The Impact of Volunteering on Mental Health',
            description: 'Discover how volunteering can positively affect mental well-being and reduce stress.',
        },
        {
            id: 2,
            image: 'https://i.ibb.co.com/w09Pmjy/male-and-female-volunteers-sort-donations-during-food-drive.jpg',
            title: 'Top 5 Volunteering Opportunities in 2024',
            description: 'Explore the best volunteering opportunities for the upcoming year.',
        },
        {
            id: 3,
            image: 'https://i.ibb.co.com/7y2B7M8/photo-1616680214084-22670de1bc82-mark-https-images-unsplash-com-opengraph-logo-png-mark-w-64-mark-al.jpg',
            title: 'How to Start Volunteering in Your Local Community',
            description: 'A step-by-step guide to getting involved in your neighborhood.',
        },
    ];

    return (
        <section className="bg-gray-50 max-w-7xl mx-auto dark:bg-gray-900 py-10 px-6 rounded-lg shadow-md ">
            <Helmet>
                <title>Blog - Volunteer-management</title>
            </Helmet>
            <h2 className="text-3xl font-bold text-black text-center mb-6">Latest Blogs</h2>
            <p className="text-gray-600 text-lg text-center mb-8">
                Stay informed and inspired with our latest blog posts on volunteering, its benefits, <br /> and how you can make a difference in your community.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                    <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img
                            src={blog.image}
                            alt={blog.title}
                            className="h-48 w-full object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold text-indigo-700">{blog.title}</h3>
                            <p className="text-gray-600 mt-2">{blog.description}</p>
                           
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BlogSection;
