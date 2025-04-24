import { useNavigate } from "@tanstack/react-router";
import React from "react";

const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate({ to: "/" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-6xl font-bold text-red-600">403</h1>
        <p className="text-xl text-gray-700 mt-4">Access Denied</p>
        <p className="text-gray-500 mt-2">
          You do not have permission to view this page. Please contact your
          administrator if you believe this is an error.
        </p>
        <button
          onClick={handleRedirect}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Go to Home Page
        </button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
