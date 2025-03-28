import { Link } from "@tanstack/react-router";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold text-red-500">
        Oops! Something went wrong.
      </h1>
      <p className="text-gray-500 mt-2">
        The page you're looking for doesn't exist or an error occurred.
      </p>
      <Link
        to="/"
        className="mt-4 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Go to Home
      </Link>
    </div>
  );
}
