import { useState, useEffect } from "react";
import useScroll from "../hooks/useScroll";
import ThemeToggle from "./ThemeToggle";
import { FaBell, FaSearch } from "react-icons/fa";

export default function Navbar() {
  const isScrolled = useScroll();

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? "bg-background-dark/95 shadow-lg" : "bg-transparent"
        }`}
    >
      <div className="px-4 md:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="text-red-600 text-2xl md:text-3xl font-bold font-mono tracking-widest cursor-pointer">
            CineFlix
          </h1>
        </div>

        {/* <div className="flex items-center gap-6 text-white">
          <ThemeToggle />
        </div> */}
      </div>
    </nav>
  );
}
