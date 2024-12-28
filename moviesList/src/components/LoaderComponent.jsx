import React from 'react';

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="loader border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin" />
    </div>
  );
};

export default Loader;