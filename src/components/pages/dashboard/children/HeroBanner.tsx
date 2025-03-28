import { useRef } from "react";
import { WebButton } from "@/components/common/button/Button";

export default function HeroBanner() {
  const nextSectionRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    if (nextSectionRef.current) {
      window.scrollTo({
        top: nextSectionRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="relative z-10 w-full h-dvh flex items-center justify-center bg-black">
        <div className="absolute inset-0 -mt-16">
          <img
            src="/src/assets/dashboard/hero/image.png"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-80"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/20"></div>

        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-5xl font-bold mb-4">
            Experience Cinema Like Never Before
          </h1>
          <p className="text-lg mt-4 max-w-3xl mx-auto mb-8">
            Relive the golden era of film with timeless classics and cult
            favorites, all on the big screen. From unforgettable dramas to
            mind-bending sci-fi, book your tickets and rediscover the magic of
            storytelling.
          </p>

          <WebButton
            size="3"
            variant="solid"
            color="red"
            label="Browse Showtimes & Book Now"
            onClick={handleScroll}
            radius="large"
          ></WebButton>
        </div>
      </div>

      <div
        ref={nextSectionRef}
        className="bg-gradient-to-b from-[black]  to-neutral-900 text-white py-16 px-6 md:px-16"
      >
        <div className="container md:mx-24">
          <h2 className="text-3xl font-bold mb-8 md:w-1/2">Trending Now</h2>

          <div className="w-full flex flex-col md:flex-row gap-8 ">
            <div className="md:w-1/2">
              <img
                src="https://nofilmschool.com/media-library/characters-of-pulp-fiction.jpg?id=34055259&itok=NDLNEVFs"
                alt="Trending Movie"
                className="w-full h-auto shadow-lg"
              />
            </div>

            <div className="md:w-1/2 flex flex-col ">
              <h3 className="text-4xl font-bold">Pulp Fiction</h3>
              <p className="text-gray-400 mt-2">
                A 1994 cult classic crime film
              </p>
              <p className="text-gray-300 mt-4">
                <span className="font-semibold">Director:</span> Quentin
                Tarantino
              </p>
              <p className="text-gray-300">
                <span className="font-semibold">Rating:</span> 8.9/10
              </p>
              <p className="text-gray-300 mt-4">
                <span className="font-semibold">Synopsis:</span> The lives of
                two mob hitmen, a boxer, a gangster's wife, and a pair of diner
                bandits intertwine in four tales of violence and redemption.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
