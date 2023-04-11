import React from "react";

const Alert = ({ children }) => {
  return (
    <div
      class="p-4 mb-4 max-w-lg fixed top-2 left-[50vw] -translate-x-1/2 text-sm text-green-800 rounded-lg bg-green-200 dark:bg-gray-800 dark:text-green-400"
      role="alert"
    >
      {children}
    </div>
  );
};

export default Alert;
