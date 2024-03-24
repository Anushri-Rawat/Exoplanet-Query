import React from "react";

const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-medium text-sm py-2 px-3 rounded shadow focus:outline-none focus:shadow-outline flex gap-[8px] items-center"
    >
      {children}
    </button>
  );
};

export default Button;
