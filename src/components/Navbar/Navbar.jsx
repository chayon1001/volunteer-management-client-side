import React, { useContext, useEffect, useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import { FaPersonFalling } from 'react-icons/fa6';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logOut } = useContext(AuthContext);
    const [isHovered, setIsHovered] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsDropdownOpen(false); 
    }, [location]);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                console.log('Successfully signed out');
                navigate('/');
            })
            .catch((error) => {
                console.error('Failed to sign out:', error.message);
            });
    };

    const linkClasses = ({ isActive }) =>
        isActive
            ? 'text-indigo-700 font-semibold '
            : 'hover:text-indigo-600';

    return (
        <nav className="bg-white text-black shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">

                {/* Logo */}
                <div className="text-2xl text-indigo-700 font-semibold cursor-pointer flex items-center gap-1">
                    <FaPersonFalling />
                    <NavLink to="/">Volunteero</NavLink>
                </div>

                {/* Navigation Links */}
                <div className="flex items-center gap-6">
                    <NavLink to="/" className={linkClasses}>
                        Home
                    </NavLink>
                    <NavLink to="/allVolunteer" className={linkClasses}>
                        All Volunteer
                    </NavLink>

                  
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen((prev) => !prev)}
                            className="hover:text-indigo-700"
                        >
                            My Profile
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-10">
                                <NavLink
                                    to="/addVolunteer"
                                    className="block px-4 py-2 hover:text-indigo-500"
                                >
                                    Add Volunteer need Post
                                </NavLink>
                                <NavLink
                                    to="/manageMyPosts"
                                    className="block px-4 py-2 hover:text-indigo-500"
                                >
                                    Manage My Posts
                                </NavLink>
                            </div>
                        )}
                    </div>

                    {/* User Profile */}
                    <div className="relative">
                        {user ? (
                            <div className="relative flex items-center gap-3 cursor-pointer">
                              
                                <div
                                    className="relative"
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(true)}
                                >
                                    <img
                                        src={user.photoURL}
                                      
                                        className="w-10 h-10 rounded-full border-2 border-indigo-700"
                                    />
                                   
                                    {isHovered && (
                                        <div className="absolute top-12 left-0 z-10 bg-gray-400 text-white px-2 py-1 rounded-md shadow-lg">
                                            <div className="mb-2 px-2 w-[100px]">{user.displayName || 'User'}</div>
                                            <button
                                                onClick={handleLogOut}
                                                className="w-full px-2 py-2 bg-indigo-700 rounded-lg text-white font-semibold"
                                            >
                                                Log Out
                                            </button>
                                        </div>
                                    )}
                                </div>
                                
                                <button
                                    onClick={handleLogOut}
                                    className="px-4 py-2 bg-indigo-700 rounded-lg text-white font-semibold"
                                >
                                    Log Out
                                </button>
                            </div>
                        ) : (
                           
                            <Link
                                to="/auth/login"
                                className="px-4 py-2 bg-indigo-700 rounded-lg text-white font-semibold"
                            >
                                Login
                            </Link>
                        )}

                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
