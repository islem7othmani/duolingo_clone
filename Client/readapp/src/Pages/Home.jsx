import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../Components/Hero';
import Navbar from '../Components/Navbar';
import './Home.css'; // Import the external CSS file

export default function Home() {
  const navigate = useNavigate();

  const redirecttosignup = () => {
    navigate('/signup'); // Redirect to signup page
  };

  const redirecttologin = () => {
    navigate('/login'); // Redirect to signup page
  };


  return (
    <>
      <div className="area">
        <div className="relative h-screen flex items-center justify-center gap-12">
          <div className="card z-50" onClick={redirecttosignup}>
            <img
              src="https://img.freepik.com/free-vector/sign-concept-illustration_114360-5267.jpg?t=st=1730032796~exp=1730036396~hmac=b5d156968589c6edafa11e35b1a76b50ef34791096db11840de07e68df05b29b&w=740"
              alt="New here"
              className="w-full h-32 object-cover rounded-md"
            />
            <a href='/signup' className="font-semibold mt-4">I'm new here</a>
          </div>





          <div className="card z-50" onClick={redirecttologin}>
            <img
              src="https://img.freepik.com/free-vector/tablet-login-concept-illustration_114360-7963.jpg?t=st=1730032823~exp=1730036423~hmac=37844b95f119288b959ce42ea78c984360fb165cd37585b4f41300a71420b6ec&w=740"
              alt="New here"
              className="w-full h-32 object-cover rounded-md"
            />
            <a href='/login' className="font-semibold mt-4">I have an account</a>
          </div>




        </div>
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </>
  );
}
