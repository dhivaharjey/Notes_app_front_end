import React, { useEffect, useState } from "react";
import { MdBrightnessHigh, MdBrightnessMedium } from "react-icons/md";
const Theme = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <>
      <button
        onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
        // className="p-2 rounded-full bg-slate-200 "
      >
        {theme === "dark" ? (
          <MdBrightnessHigh size={30} className="text-white" />
        ) : (
          // {/* <MdBrightness4 size={25} /> */}
          <MdBrightnessMedium size={30} />
        )}
      </button>
    </>
  );
};

export default Theme;
