"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isSignedIn } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white shadow-sm",
        isScrolled ? "h-14" : "h-20"
      )}
    >
      <nav className="flex dark:bg-white bg-white dark:text-black text-black items-center justify-between px-4 md:px-10 h-full w-full">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <Link href="/">
            <img
              src="/FGRFLOGO.png"
              alt="Logo"
              className="mr-2 h-10 w-auto max-w-[110px] object-contain"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex flex-shrink-0 ml-8 gap-8 text-sm font-semibold text-cyan-800">
          <li>
            <Link href="/support" className="hover:text-cyan-600 transition">
              SUPPORT US
            </Link>
          </li>
          <li>
            <Link
              href="/donate-monthly"
              className="hover:text-cyan-600 transition"
            >
              DONATE MONTHLY
            </Link>
          </li>
          <li>
            <Link href="/aboutus" className="hover:text-cyan-600 transition">
              ABOUT US
            </Link>
          </li>
           <li>
            <Link href="/blog" className="hover:text-cyan-600 transition">
              BLOGS
            </Link>
          </li>
          <li>
            <Link href="/faqs" className="hover:text-cyan-600 transition">
              FAQS
            </Link>
          </li>
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-3 ml-auto">
          <div className="hidden md:flex items-center gap-2 mr-2">
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <SignInButton mode="modal">
                <span className="text-cyan-800 font-semibold text-base cursor-pointer hover:text-cyan-600">
                  SIGN IN
                </span>
              </SignInButton>
            )}
          </div>

          <button
            className="md:hidden p-2 ml-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
          >
            <FontAwesomeIcon icon={faBars} className="text-2xl text-cyan-800" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu with Animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 z-50 flex md:hidden"
            onClick={() => setMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-4/5 max-w-xs h-full shadow-lg flex flex-col justify-between ml-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex items-center px-6 py-6">
                  <img
                    src="/FGRFLOGO.png"
                    alt="Logo"
                    className="mr-2 h-10 w-auto max-w-[110px] object-contain"
                  />
                </div>

                <ul className="flex flex-col gap-6 text-lg font-semibold px-6 py-8 text-cyan-800">
                  <li>
                    <Link href="/support" className="hover:text-cyan-600 transition">
                      SUPPORT US
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/donate-monthly"
                      className="hover:text-cyan-600 transition"
                    >
                      DONATE MONTHLY
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/aboutus"
                      className="hover:text-cyan-600 transition"
                    >
                      ABOUT US
                    </Link>
                  </li>
                   <li>
                    <Link
                      href="/blog"
                      className="hover:text-cyan-600 transition"
                    >
                      BLOGS
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/faqs"
                      className="hover:text-cyan-600 transition"
                    >
                      FAQS
                    </Link>
                  </li>
                </ul>

                <div className="flex items-center gap-3 px-6 py-4 border-t">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-2xl text-cyan-800"
                  />
                  {isSignedIn ? (
                    <UserButton afterSignOutUrl="/" />
                  ) : (
                    <SignInButton mode="modal">
                      <span className="text-cyan-800 font-semibold text-base cursor-pointer hover:text-cyan-600">
                        SIGN IN
                      </span>
                    </SignInButton>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
