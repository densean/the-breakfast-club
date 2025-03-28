import { useAuthContext } from "@/hooks/useAuthContext";
import { useNavigate } from "@tanstack/react-router";

export default function WebHeader() {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  return (
    <header className="absolute w-full z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold text-white">Breakfast Club</h1>

        <nav className="hidden md:flex items-center text-white gap-6">
          <a href="/dashboard" className=" hover:text-gray-300">
            Home
          </a>
          <a href="/bookingList" className=" hover:text-gray-300 hover:no-">
            Booked Seats
          </a>
          <p
            className="hover:text-gray-300 cursor-pointer"
            onClick={() => {
              logout();
              navigate({ to: "/logout" });
            }}
          >
            Log out
          </p>
        </nav>

        <button className="md:hidden text-white focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
