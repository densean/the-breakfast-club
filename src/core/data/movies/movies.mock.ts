export const mockMovies = [
  {
    id: "1",
    movieTitle: "The Godfather",
    movieDescription: "A mafia family's power struggles across generations.",
    movieImgSrc: "/src/assets/dashboard/movie-list/godfather.png",
    rating: 9.2,
    synopsis:
      "A powerful crime dynasty's aging patriarch transfers control of his empire to his reluctant son, navigating betrayal, loyalty, and the dark underworld of organized crime.",
    child: [
      {
        id: "show1",
        showTime: "6:30 PM",
        seats: [
          { seatId: "s1", available: true },
          { seatId: "s2", available: false },
        ],
      },
      {
        id: "show2",
        showTime: "9:30 PM",
        seats: [
          { seatId: "s3", available: true },
          { seatId: "s4", available: true },
        ],
      },
    ],
  },
  {
    id: "2",
    movieTitle: "The Breakfast Club",
    movieDescription: "Five students find unexpected friendship in detention.",
    movieImgSrc: "/src/assets/dashboard/movie-list/breakfast-club.png",
    rating: 7.8,
    synopsis:
      "A group of high school students from different cliques spend a Saturday in detention, learning that they have more in common than they ever imagined.",
    child: [
      {
        id: "show3",
        showTime: "4:00 PM",
        seats: [
          { seatId: "s5", available: true },
          { seatId: "s6", available: true },
        ],
      },
    ],
  },
  {
    id: "3",
    movieTitle: "Interstellar",
    movieDescription: "A team of explorers travel through a wormhole in space.",
    movieImgSrc: "/src/assets/dashboard/movie-list/interstellar.png",
    rating: 8.6,
    synopsis:
      "In a dystopian future where Earth is dying, a group of astronauts embarks on a journey through a wormhole to find a habitable planet, facing time dilation, love, and the unknown.",
    child: [
      {
        id: "show4",
        showTime: "5:00 PM",
        seats: [
          { seatId: "s7", available: true },
          { seatId: "s8", available: false },
        ],
      },
      {
        id: "show5",
        showTime: "8:30 PM",
        seats: [
          { seatId: "s9", available: true },
          { seatId: "s10", available: true },
        ],
      },
    ],
  },
  {
    id: "4",
    movieTitle: "Inception",
    movieDescription: "A thief with the ability to enter dreams.",
    movieImgSrc: "/src/assets/dashboard/movie-list/inception.png",
    rating: 8.8,
    synopsis:
      "A skilled thief is given a chance to have his criminal record erased if he can successfully plant an idea in someone's mind through the complex layers of dreams.",
    child: [
      {
        id: "show6",
        showTime: "6:15 PM",
        seats: [
          { seatId: "s11", available: false },
          { seatId: "s12", available: true },
        ],
      },
    ],
  },
  {
    id: "5",
    movieTitle: "The Truman Show",
    movieDescription:
      "A man explores different possible lives in a nonlinear timeline.",
    movieImgSrc: "/src/assets/dashboard/movie-list/truman-show.png",
    rating: 7.9,
    synopsis:
      "The last mortal on Earth at 118 years old, Nemo Nobody reflects on his past, exploring different versions of his life based on the choices he made—or didn't make.",
    child: [
      {
        id: "show7",
        showTime: "7:45 PM",
        seats: [
          { seatId: "s13", available: true },
          { seatId: "s14", available: false },
        ],
      },
    ],
  },
  {
    id: "6",
    movieTitle: "The Shawshank Redemption",
    movieDescription: "Two imprisoned men bond over decades.",
    movieImgSrc: "/src/assets/dashboard/movie-list/shawshank.png",
    rating: 9.3,
    synopsis:
      "Wrongfully convicted of murder, Andy Dufresne navigates decades of life in Shawshank Prison, finding friendship, hope, and a plan for redemption.",
    child: [
      {
        id: "show8",
        showTime: "6:00 PM",
        seats: [
          { seatId: "s15", available: true },
          { seatId: "s16", available: false },
        ],
      },
    ],
  },
  {
    id: "7",
    movieTitle: "Back to the Future",
    movieDescription: "A teenager is sent back in time by a mad scientist.",
    movieImgSrc: "/src/assets/dashboard/movie-list/back-to-the-future.png",
    rating: 8.5,
    synopsis:
      "Marty McFly accidentally travels back to 1955 in a time machine built by his eccentric friend, Doc Brown, and must ensure his parents fall in love to secure his future.",
    child: [
      {
        id: "show9",
        showTime: "5:45 PM",
        seats: [
          { seatId: "s17", available: true },
          { seatId: "s18", available: true },
        ],
      },
      {
        id: "show10",
        showTime: "9:00 PM",
        seats: [
          { seatId: "s19", available: false },
          { seatId: "s20", available: true },
        ],
      },
    ],
  },
  {
    id: "8",
    movieTitle: "The Emperor's New Groove",
    movieDescription:
      "An arrogant emperor turns into a llama and learns humility.",
    movieImgSrc: "/src/assets/dashboard/movie-list/emperors-new-groove.png",
    rating: 7.4,
    synopsis:
      "A selfish and spoiled emperor is transformed into a llama and must work with a kind-hearted peasant to reclaim his throne and learn the value of friendship.",
    child: [
      {
        id: "show11",
        showTime: "3:30 PM",
        seats: [
          { seatId: "s21", available: true },
          { seatId: "s22", available: false },
        ],
      },
    ],
  },
  {
    id: "9",
    movieTitle: "Lilo & Stitch",
    movieDescription: "An alien experiment finds family in Hawaii.",
    movieImgSrc: "/src/assets/dashboard/movie-list/lilo-and-stitch.png",
    rating: 7.6,
    synopsis:
      "A young Hawaiian girl adopts a mischievous alien experiment disguised as a dog, discovering that family means sticking together, no matter what.",
    child: [
      {
        id: "show12",
        showTime: "4:45 PM",
        seats: [
          { seatId: "s23", available: true },
          { seatId: "s24", available: false },
        ],
      },
      {
        id: "show13",
        showTime: "7:15 PM",
        seats: [
          { seatId: "s25", available: true },
          { seatId: "s26", available: true },
        ],
      },
    ],
  },
  {
    id: "10",
    movieTitle: "Kill Bill: Volume 1",
    movieDescription: "A former assassin seeks revenge against her ex-boss.",
    movieImgSrc: "/src/assets/dashboard/movie-list/kill-bill.png",
    rating: 8.1,
    synopsis:
      "After being left for dead on her wedding day, a highly skilled assassin embarks on a relentless path of vengeance against those who wronged her.",
    child: [
      {
        id: "show14",
        showTime: "8:00 PM",
        seats: [
          { seatId: "s1", available: true },
          { seatId: "s2", available: false },
          { seatId: "s3", available: true },
          { seatId: "s4", available: false },
          { seatId: "s5", available: true },
          { seatId: "s6", available: false },
        ],
      },
    ],
  },
  {
    id: "11",
    movieTitle: "Before Sunrise",
    movieDescription: "A chance meeting on a train leads to a night in Vienna.",
    movieImgSrc: "/src/assets/dashboard/movie-list/before-sunrise.png",
    rating: 8.1,
    synopsis:
      "Two strangers meet on a train and spend a magical evening in Vienna, sharing deep conversations and fleeting romance, knowing they may never meet again.",
    child: [
      {
        id: "show15",
        showTime: "6:45 PM",
        seats: [
          { seatId: "s29", available: true },
          { seatId: "s30", available: false },
        ],
      },
    ],
  },
];
