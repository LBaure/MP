import { Sun, SunMoon } from "lucide-react";
import { useEffect, useState } from "react";

const ButtonTheme = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    } else {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
  });

  useEffect(() => {
    console.log("entro al useEffect de ButtonTheme");

    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <div>
      <button
        onClick={toggleDarkMode}
        className="text-gray-600 hover:bg-slate-100 hover:cursor-pointer rounded-full text-sm p-2.5 text-center inline-flex items-center  dark:text-slate-300 dark:hover:bg-slate-700"
      >
        {darkMode ? <Sun /> : <SunMoon />}
      </button>
    </div>
  );
};

export default ButtonTheme;
