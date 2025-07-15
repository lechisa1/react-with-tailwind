import React from 'react';

const Home = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to Modern Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6,7,8,9,10,11,12].map((item) => (
          <div key={item} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-3">Card {item}</h2>
            <p className="text-gray-600">
              This is a sample card with some content. You can replace it with your actual data.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;