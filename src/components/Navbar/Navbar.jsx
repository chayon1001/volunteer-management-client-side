import React, { useContext, useEffect, useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import { FaPersonFalling } from 'react-icons/fa6';
import { FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';
import { ThemeContext } from '../../provider/themeContext/ThemeProvider';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logOut } = useContext(AuthContext);
    const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);
    const [isHovered, setIsHovered] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu toggle
    const location = useLocation();

    const handleThemeToggle = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    useEffect(() => {
        setIsDropdownOpen(false);
        setIsMenuOpen(false); // Close mobile menu on navigation
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
        <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 text-black dark:text-white shadow-md py-4">
            <div className="max-w-7xl mx-auto flex   items-center justify-around md:justify-between gap-6 pb-72 md:pb-0">

                {/* Logo */}
                <div className="text-2xl text-indigo-700 font-semibold cursor-pointer flex  items-center gap-1">
                    <FaPersonFalling />
                    <NavLink to="/">Volunteero</NavLink>
                </div>

                {/* Mobile Hamburger Menu Button */}
                <div className="md:hidden ">
                    <button
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                        className="text-2xl focus:outline-none"
                    >
                        {isMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                {/* Navigation Links */}
                <div
                    className={`absolute md:static top-20 left-0 px-14 md:px-0 w-full md:w-auto bg-white dark:bg-gray-800 z-10 md:flex md:items-center md:gap-4 md:opacity-100 transition-all ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible md:visible'
                        }`}
                >
                    <NavLink to="/" className={({ isActive }) => `${isActive ? 'text-indigo-700 font-semibold' : 'hover:text-indigo-600'} block md:py-0`}>
                        Home
                    </NavLink>
                    {
                        user && <>
                            <NavLink to="/allVolunteer" className={({ isActive }) => `${isActive ? 'text-indigo-700 font-semibold' : 'hover:text-indigo-600'} block md:py-0`}>
                                All Volunteer
                            </NavLink>
                            <NavLink to="/myVolunteerRequestPost" className={({ isActive }) => `${isActive ? 'text-indigo-700 font-semibold' : 'hover:text-indigo-600'} block`}>
                                My Volunteer Request Post
                            </NavLink>
                        </>
                    }
                    <NavLink to="/blogSection" className={({ isActive }) => `${isActive ? 'text-indigo-700 font-semibold' : 'hover:text-indigo-600'} block`}>
                        Blog
                    </NavLink>
                    <NavLink to="/contactUs" className={({ isActive }) => `${isActive ? 'text-indigo-700 font-semibold' : 'hover:text-indigo-600'} block`}>
                        Contact Us
                    </NavLink>

                    {/* My Profile Dropdown */}
                    {
                        user && <>

                            <div className="relative">
                                <button
                                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                                    className="block   hover:text-indigo-700"
                                >
                                    My Profile
                                </button>
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-20">
                                        <NavLink
                                            to="/addVolunteer"
                                            className="block px-2 py-2 hover:text-indigo-500"
                                        >
                                            Add Volunteer need Post
                                        </NavLink>
                                        <NavLink
                                            to="/manageMyPosts"
                                            className="block px-2 py-2 hover:text-indigo-500"
                                        >
                                            Manage My Posts
                                        </NavLink>
                                    </div>
                                )}
                            </div>
                        </>
                    }

                    {/* User Profile */}
                    <div className="block px-2 py-2 md:py-0">
                        {user ? (
                            <div className="flex items-center gap-3">
                                <div
                                    className="relative"
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)} // Fixed this line for hover
                                >
                                    <img
                                        src={user.photoURL}
                                        alt=""
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
                                    className="px-3 py-2 bg-indigo-700 rounded-lg text-white font-semibold"
                                >
                                    Log Out
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/auth/login"
                                className="px-3 py-2 bg-indigo-700 rounded-lg text-white font-semibold"
                            >
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Theme Toggle */}
                    <div className="block px-2 py-2 md:py-0">
                        <button onClick={handleThemeToggle} className="text-xl">
                            {isDarkMode ? <FaSun /> : <FaMoon />}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
