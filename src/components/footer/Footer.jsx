import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
               
                <div className="flex flex-wrap justify-between items-center mb-8">
                   
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h2 className="text-xl text-indigo-700 font-bold mb-2">VolunteerHub</h2>
                        <p className="text-sm">
                            Connecting passionate individuals with meaningful opportunities to make a difference in communities around the world.
                        </p>
                    </div>

                    
                    <div className="w-full md:w-1/3 mb-6 md:mb-0 pl-8">
                        <h3 className="text-lg font-semibold mb-1">Quick Links</h3>
                        <ul className="text-sm space-y-2">
                            <li><a href="/about" className="hover:text-indigo-400">About Us</a></li>
                            <li><a href="/volunteer-opportunities" className="hover:text-indigo-400">Volunteer Opportunities</a></li>
                            <li><a href="/contact" className="hover:text-indigo-400">Contact</a></li>
                           
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div className="w-full md:w-1/3">
                        <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
                        <p className="text-sm">Email: support@volunteerhub.com</p>
                        <p className="text-sm">Phone: +1 456-7890</p>
                        <p className="text-sm">Address: 123 Volunteer Lane, Rangpur City, BD</p>
                    </div>
                </div>

                
                <div className="border-t border-gray-600 pt-4 flex flex-wrap justify-between items-center">
                    <p className="text-sm">@ 2024 VolunteerHub. All rights reserved.</p>
                    <div className="space-x-4">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            className="hover:text-indigo-400">
                            Facebook
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            className="hover:text-indigo-400" >
                            Twitter
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            className="hover:text-indigo-400">
                            LinkedIn
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
