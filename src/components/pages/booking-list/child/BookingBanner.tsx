const userDetails = {
  username: "Sean The Ra Thing",
  id: "550e8400-e29b-41d4-a716-446655440000",
};

export default function BookingBanner() {
  return (
    <section className="w-full bg-gradient-to-b from-gray-900 to-black ">
      <div className="h-20"></div>

      <div className="h-80 flex flex-col items-center text-center px-6 text-white">
        <div className="mt-24">
          <h1 className="text-9xl font-bold">{userDetails.username}</h1>
          <p className="text-white text-sm font-mono mt-1">
            ID: {userDetails.id}
          </p>
        </div>
        <div className="mt-24">
          <h1 className="text-white">Your Bookings</h1>
        </div>
      </div>
    </section>
  );
}
