import { useNavigate } from "@tanstack/react-router";
import { WebButton } from "@/components/common/button/Button";
import { useState } from "react";
import WebLoader from "@/components/common/loader/Loader";

export default function EmptyBooking() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-96 text-center text-white bg-gray-900 rounded-lg shadow-lg my-10">
      <h2 className="text-3xl font-bold">No Bookings Yet</h2>
      <p className="text-gray-400 mt-2">
        Start booking your favorite movies now!
      </p>
      {isLoading && <WebLoader />}

      <WebButton
        variant="solid"
        color="red"
        className="mt-6"
        size="4"
        label="Book Now"
        radius="full"
        onClick={() => {
          setIsLoading(true);
          setTimeout(() => {
            navigate({ to: "/" });
          }, 1500);
        }}
      />
    </div>
  );
}
