import { Link } from "@tanstack/react-router";

export default function Logout() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white text-center p-6">
      <h1 className="text-3xl font-bold">You have successfully logged out</h1>
      <p className="text-lg mt-2 text-gray-300">
        Thank you for using Breakfast Club! We hope to see you again soon.
      </p>
      <p className="text-gray-400 mt-1">
        Your bookings will be saved for your next visit.
      </p>
      <Link
        to="/login"
        className="mt-3 px-3 py-3 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold rounded-lg shadow-md"
      >
        Log in Again
      </Link>
    </div>
  );
}
