import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-active border border-active rounded-full px-4 py-1"
      : "text-white hover:text-active transition";

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300
    ${scrolled ? "bg-brandblue shadow-md" : "bg-transparent"}
  `}
    >
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="https://routeweather.netlify.app/images/logo@2x.png"
              className="h-8"
              alt="Logo"
            />
            <div className="flex flex-col leading-none">
              <span className="text-white font-semibold text-sm">Weather</span>
              <span className="text-gray-400 text-xs">tagline goes here</span>
            </div>
          </Link>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8 items-center">
            <li>
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={navLinkClass}>
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-out
    ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
  `}
      >
        <ul className="flex flex-col gap-3 bg-brandblue px-4 pb-4">
          <li onClick={() => setIsOpen(false)}>
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
          </li>
          
          <li onClick={() => setIsOpen(false)}>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
