import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';
import { AuthContext } from '../../provider/AuthProvider';
import { Helmet } from 'react-helmet-async';

const Register = () => {
    const navigate = useNavigate();
    const { createUser } = useContext(AuthContext);
    const [passwordError, setPasswordError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = new FormData(e.target);

        const name = form.get('name');
        const photo = form.get('photo');
        const email = form.get('email');
        const password = form.get('password');

        // Validate password
        if (!/[A-Z]/.test(password)) {
            setPasswordError("Password must contain at least one uppercase letter.");
            return;
        }
        if (!/[a-z]/.test(password)) {
            setPasswordError("Password must contain at least one lowercase letter.");
            return;
        }
        if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters long.");
            return;
        }

        setPasswordError("");

    
        createUser(email, password)
            .then((result) => {
                toast.success('Successfully registered! Please login to continue.');
                navigate('/auth/login'); 
            })
            .catch((error) => {
                console.error("Error during registration:", error.message);
                if (error.code === "auth/email-already-in-use") {
                    toast.error("This email is already registered.");
                } else {
                    toast.error("Registration failed. Please try again!");
                }
            });
    };

    return (
        <div className=" mt-5 rounded-lg bg-base-100 w-full max-w-lg mx-auto shrink-0 shadow-2xl">
            <Helmet>
                <title>Register - Volunteer-management</title>
            </Helmet>
            <h2 className='text-2xl font-semibold text-center pt-4'>Register your account</h2>
            <form onSubmit={handleSubmit} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Your Name</span>
                    </label>
                    <input
                        type="text"
                        name='name'
                        placeholder="your name"
                        className="input input-bordered"
                        required />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Photo Url</span>
                    </label>
                    <input
                        type="text"
                        name='photo'
                        placeholder="photo-url"
                        className="input input-bordered"
                        required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        name='email'
                        placeholder="email"
                        className="input input-bordered"
                        required />
                </div>
                <div className="form-control relative">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type='password'
                        name='password'
                        placeholder="password"
                        className="input input-bordered"
                        required />

                    {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                </div>

                <div className="form-control mt-6">
                    <button className="btn bg-indigo-700 text-white text-xl">Register</button>
                </div>
            </form>
            <p className='text-lg text-center pb-8'>Already have an account? <Link className='text-red-500' to='/auth/login'>Login</Link></p>
        </div>
    );
};

export default Register;
