import React from "react";
import Cookies from 'js-cookie'; // Import js-cookie
import SideBar from "../Components/SideBar";
import NavClient from "../Components/NavClient";
import Cards from "../Components/Cards";
import RoadMap from "../Components/RoadMap";

export default function AccountHome() {
  // Retrieve user information from cookies
  const userCookie = Cookies.get('user'); 
  const user = userCookie ? JSON.parse(userCookie) : null; // Parse the user cookie if it exists

  // Extract the part of the email before the "@" symbol
  const username = user ? user.email.split('@')[0] : "Guest";

  return (
    <>
      <div>
        <div>
          <NavClient user={username} />
        </div>
        <div className="absolute right-10 top-28">
          <Cards />
        </div>
        <div>
          <RoadMap />
        </div>
        <div className="absolute left-0 top-12">
          <SideBar />
        </div>
      </div>
    </>
  );
}
