import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [postData, setPostData] = useState({
    username: '',
    email: '',
    password: '',
    motherLanguage: '',
    languageToLearn: '',
    reason: '',
    age: null,
  });


  
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  // Update the form data state as the user types
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // If the field is age, convert the value to a number
    setPostData({ ...postData, [name]: name === 'age' ? parseInt(value) : value });
  };

  // Handle form submission and send the data using fetch
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch('http://localhost:8000/authentification/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(errorData.message || 'Registration failed.'); // Set error message
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Registration successful:', data);
      setMessage('Registration successful!'); // Set success message
      navigate("/login"); 
    } catch (error) {
      console.error('Error during registration:', error);
      setMessage('An error occurred. Please try again.'); // Set generic error message
    }
  };

  // Handle the link click to prevent default action
  const handleLoginClick = (e) => {
    e.preventDefault();
    // Add logic to navigate to login page or open login modal
    console.log('Navigate to login page');
  };

  return (
    <>
     <div className="font-[sans-serif] bg-white max-w-4xl flex items-center mx-auto md:h-[85vh] h-auto p-4">
  <div className="grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">
    <div className="max-md:order-1 flex flex-col justify-center space-y-12 max-md:mt-8 min-h-full bg-gradient-to-r from-black to-black lg:px-6 px-3 py-3">
      <div>
        <h4 className="text-white text-lg font-semibold">Create Your Account</h4>
        <p className="text-[13px] text-gray-300 mt-2 leading-relaxed">
          Welcome to our registration page! Get started by creating your account.
        </p>
      </div>
      <div>
        <h4 className="text-white text-lg font-semibold">Simple & Secure Registration</h4>
        <p className="text-[13px] text-gray-300 mt-2 leading-relaxed">
          Our registration process is designed to be straightforward and secure. We prioritize your privacy and data security.
        </p>
      </div>
    </div>

    <form className="md:col-span-2 w-full py-4 px-4 sm:px-12" onSubmit={handleSubmit}>
      <div className="mb-4">
        <h3 className="text-gray-800 text-2xl font-bold">Create an account</h3>
      </div>

      <div className="space-y-4">
        {/* Username */}
        <div>
          <label className="text-gray-800 text-sm mb-1 block">Username</label>
          <input
            name="username"
            type="text"
            value={postData.username}
            onChange={handleInputChange}
            required
            className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2 rounded-md outline-blue-500"
            placeholder="Enter username"
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-gray-800 text-sm mb-1 block">Email Id</label>
          <input
            name="email"
            type="email"
            value={postData.email}
            onChange={handleInputChange}
            required
            className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2 rounded-md outline-blue-500"
            placeholder="Enter email"
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-gray-800 text-sm mb-1 block">Password</label>
          <input
            name="password"
            type="password"
            value={postData.password}
            onChange={handleInputChange}
            required
            className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2 rounded-md outline-blue-500"
            placeholder="Enter password"
          />
        </div>

        {/* Mother Language */}
        <div>
          <label className="text-gray-800 text-sm mb-1 block">Mother Language</label>
          <input
            name="motherLanguage"
            type="text"
            value={postData.motherLanguage}
            onChange={handleInputChange}
            required
            className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2 rounded-md outline-blue-500"
            placeholder="Enter your mother language"
          />
        </div>

        {/* Language to Learn */}
        <div>
          <label className="text-gray-800 text-sm mb-1 block">Language to Learn</label>
          <input
            name="languageToLearn"
            type="text"
            value={postData.languageToLearn}
            onChange={handleInputChange}
            required
            className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2 rounded-md outline-blue-500"
            placeholder="Enter the language you want to learn"
          />
        </div>

        {/* Reason for Learning */}
        <div>
          <label className="text-gray-800 text-sm mb-1 block">Reason for Learning</label>
          <input
            name="reason"
            type="text"
            value={postData.reason}
            onChange={handleInputChange}
            required
            className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2 rounded-md outline-blue-500"
            placeholder="Why do you want to learn this language?"
          />
        </div>

        {/* Age */}
        <div>
          <label className="text-gray-800 text-sm mb-1 block">Age</label>
          <input
            name="age"
            type="number"
            value={postData.age || ''}
            onChange={handleInputChange}
            required
            className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2 rounded-md outline-blue-500"
            placeholder="Enter your age"
          />
        </div>
      </div>

      <div className="!mt-10">
        <button
          type="submit"
          className="w-full py-2.5 px-4 tracking-wider text-sm rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none"
        >
          Create an account
        </button>
      </div>

      {message && (
        <p className="text-gray-800 text-sm mt-4 text-center">{message}</p>
      )}
      <p className="text-gray-800 text-sm mt-4 text-center">
        Already have an account?
        <a
          href="#"
          onClick={handleLoginClick}
          className="text-blue-600 font-semibold hover:underline"
        >
          {' '}Log in
        </a>
      </p>
    </form>
  </div>
</div>

    </>
  );
}
