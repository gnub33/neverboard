import { useState } from "react";


export default function Navbar() {
  const [dark, setDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark";

    if (isDark) {
      document.documentElement.classList.add("dark");
    }

    return isDark;
  });

  function toggleTheme() {
    const newTheme = !dark;

    setDark(newTheme);

    console.log("dark mode:", newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }

  return (
    <nav className="fixed top-0 right-0 p-4">
      <button
        onClick={toggleTheme}
        className="
          rounded-lg
          px-4 py-2
          bg-gray-200
          dark:bg-gray-800
          dark:text-white
        "
      >
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>
    </nav>
  );
}