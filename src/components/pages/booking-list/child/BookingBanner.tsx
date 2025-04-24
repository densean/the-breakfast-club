import { useAuthContext } from "@/core/hooks/useAuthContext";

export default function BookingBanner() {
  const { user } = useAuthContext();
  return (
    <section className="w-full bg-gradient-to-b from-gray-900 to-black ">
      <div className="h-20"></div>

      <div className="h-80 flex flex-col items-center text-center px-6 text-white">
        <div className="mt-24">
          <h1 className="text-9xl font-bold">{user.username}</h1>
          <p className="text-white text-sm font-mono mt-1">ID: {user.id}</p>
        </div>
      </div>
    </section>
  );
}
