import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset the error message on new submit

    try {
      const response = await fetch('http://localhost:8000/authentification/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.headers.get('content-type')?.includes('application/json')) {
        const data = await response.json();
        if (response.ok) {
          console.log('Login successful', data);
          // Store user information in cookies
          Cookies.set('user', JSON.stringify(data.user), { expires: 7 }); // Store user info for 7 days
          navigate('/home'); // Redirect to the home page
        } else {
          setErrorMessage(data.message || 'Unauthorized');
          console.error('Login failed:', data.message || 'Unauthorized');
        }
      } else {
        console.error('Received non-JSON response');
        setErrorMessage('Unexpected response from the server');
      }
    } catch (error) {
      console.error('Error occurred:', error);
      setErrorMessage('An error occurred during login. Please try again later.');
    }
  };

  return (
    <>
      <div className="font-[sans-serif] bg-white max-w-4xl flex items-center mx-auto md:h-screen p-4">
        <div className="grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">
          <div className="max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-r from-gray-900 to-gray-700 lg:px-8 px-4 py-4">
            <div>
              <h4 className="text-white text-lg font-semibold">Welcome Back</h4>
              <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">
                Log in to your account and continue where you left off.
              </p>
            </div>
            <div>
              <h4 className="text-white text-lg font-semibold">Secure Login</h4>
              <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">
                We ensure your information is safe with our secure login system.
              </p>
            </div>
          </div>

          <form className="md:col-span-2 w-full py-6 px-6 sm:px-16" onSubmit={handleSubmit}>
            <div className="mb-6">
              <h3 className="text-gray-800 text-2xl font-bold">Login to Your Account</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Email</label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    required
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-4 h-4 absolute right-4"
                    viewBox="0 0 682.667 682.667"
                  >
                    {/* SVG icon here */}
                  </svg>
                </div>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    required
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-4 h-4 absolute right-4 cursor-pointer"
                    viewBox="0 0 128 128"
                  >
                    {/* SVG icon here */}
                  </svg>
                </div>
              </div>
            </div>

            {errorMessage && (
              <p className="text-red-500 text-sm mt-4 text-center">{errorMessage}</p>
            )}

            <div className="!mt-12">
              <button
                type="submit"
                className="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none"
              >
                Login
              </button>
            </div>
            <p className="text-gray-800 text-sm mt-6 text-center">
              Don't have an account?{' '}
              <a href="javascript:void(0);" className="text-blue-600 font-semibold hover:underline ml-1">
                Sign up here
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
