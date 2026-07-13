interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <main
      className="
        min-h-screen
        flex
        flex-col
        items-center
        justify-center
        bg-white
        text-black
        dark:bg-gray-900
        dark:text-white
      "
    >
      <h1 className="text-5xl font-bold">
        Welcome to N∑V∑RBOARD
      </h1>

      <h3 className="text-2xl">
        Find your next board game
      </h3>

      <p>
        Answer a few questions and we'll recommend games that match your group.
      </p>

      <button
        onClick={onStart}
        className="
          mt-6
          px-6
          py-3
          rounded-lg
          bg-blue-500
          text-white
          dark:bg-blue-700
        "
      >
        Get Started
      </button>
    </main>
  );
}