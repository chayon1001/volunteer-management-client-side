import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VolunteerNeedsNow = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Loader state
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://volunteer-management-sever-side.vercel.app/volunteers")
      .then((response) => {
        setPosts(response.data);
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); // Stop loading even on error
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-black mb-8">
        Volunteer Needs Now
      </h2>

      {/* Loader - Spinner */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-700"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-gray-200 shadow-md rounded-lg transition-transform transform hover:scale-105"
              >
                <img
                  src={post.thumbnail}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-indigo-700">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Category: {post.category}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Deadline: {new Date(post.deadline).toLocaleDateString()}
                  </p>
                  <button
                    className="mt-4 px-4 py-2 bg-indigo-700 text-white rounded-md hover:bg-indigo-800"
                    onClick={() => navigate(`/volunteers/${post._id}`)}
                  >
                    See More
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              className="px-6 py-2 border-2 border-black text-black rounded-md"
              onClick={() => navigate("/allVolunteer")}
            >
              See All
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default VolunteerNeedsNow;
