import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const MyVolunteerRequestPost = () => {
    const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/volunteer-requests')
      .then((response) => {
        setRequests(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err)
        setLoading(false);
      });
  }, []);

  const handleCancel = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will cancel the volunteer request!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/volunteer-requests/${id}`)
          .then(() => {
            toast.success('Request canceled successfully');
            setRequests(requests.filter((request) => request._id !== id));
          })
          .catch((err) => {
           console.log(err)
          });
      }
    });
  };

  if (loading) return <div className="text-center text-lg">Loading...</div>;
 
  return (
    <div className="container mx-auto px-4 py-6">
        <Helmet>
                <title>MyVolunteerRequestPost - Volunteer-management</title>
            </Helmet>
      <h2 className="text-2xl font-bold text-center mb-6">Volunteer Requests</h2>
      {requests.length === 0 ? (
        <p className="text-center text-gray-600">No volunteer requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Post Title</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Location</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{request.title}</td>
                  <td className="border border-gray-300 px-4 py-2">{request.category}</td>
                  <td className="border border-gray-300 px-4 py-2">{request.location}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => handleCancel(request._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyVolunteerRequestPost;







