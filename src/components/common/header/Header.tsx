export default function WebHeader() {
  return (
    <header className="absolute w-full z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold text-white">Breakfast Club</h1>

        <nav className="hidden md:flex items-center text-white gap-6">
          <a href="/dashboard" className=" hover:text-gray-300">
            Home
          </a>
          <a href="/bookingList" className=" hover:text-gray-300">
            Booked Seats
          </a>
          <a href="/logout" className=" hover:text-gray-300">
            Log out
          </a>
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
