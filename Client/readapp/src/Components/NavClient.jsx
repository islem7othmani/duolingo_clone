import React from 'react';

export default function NavClient({ user }) {
  return (
    <>
      <div className='absolute right-10 top-4'>
        <div className="flex gap-4">
          <h3 className='relative top-2'>{user}</h3>
          <img
            className="w-10 h-10 rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSngDLxVdX-4fhpWyG8hDPxUWyGV1B9uOXJ3Q&s"
            alt=""
          />
          <span className="right-0 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
        </div>
      </div>
    </>
  );
}
