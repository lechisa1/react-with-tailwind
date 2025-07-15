import React from 'react';
import UserRegisteration from '../components/users/UserRegisteration';
const Report = () => {
  return (
    <div className="p-6">
      <div className="bg-white rounded-lg  p-6 max-w-4xl mx-auto">
        <h3 className="text-2xl text-green-400 text-center mb-4">User Registration</h3>
        <hr className="border-1 border-green-400 mb-4" />
        <UserRegisteration />
      </div>
    </div>
  );
};

export default Report;