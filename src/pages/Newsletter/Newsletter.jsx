import React, { useState } from "react";
import { toast } from "react-toastify";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();

    // Simple email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email.");
      return;
    }

    // Simulate API call (you can replace this with actual API)
    setTimeout(() => {
      setIsSubscribed(true);
      toast.success("Successfully Subscribed!");
      setEmail("");
    }, 1000);
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-800 py-12 px-6">
      <Helmet>
        <title>Newsletter - Volunteer-management</title>
      </Helmet>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Stay Updated with Volunteer Opportunities
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Subscribe to our newsletter and never miss a chance to make a
          difference.
        </p>

        {!isSubscribed ? (
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <input
              type="email"
              className="px-4 py-3 rounded-md w-full sm:w-72 border dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-700 text-white rounded-md hover:bg-indigo-800 transition"
            >
              Subscribe
            </button>
          </form>
        ) : (
          <p className="text-lg font-semibold text-green-600 dark:text-green-400">
            🎉 Thank you for subscribing!
          </p>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
