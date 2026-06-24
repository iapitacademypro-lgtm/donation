"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white dark:bg-white text-cyan-600 dark:text-gray-600 py-8 px-4 sm:py-10 lg:px-8 border-t border-gray-200 dark:border-gray-200">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo and Name */}
          <div className="flex items-center gap-4 text-sm sm:text-base text-cyan-700 dark:text-cyan-700">
            <div className="text-left leading-tight">
              Faizan Global
              <br />
              Relief Foundation
            </div>
            <div className="relative w-16 h-10 sm:w-20 sm:h-12">
              <Image
                src="/FGRFLOGO.png"
                alt="FGRF Logo"
                width={400}
                height={400}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-200"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-cyan-600 dark:text-cyan-400">
          {/* Footer Links */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/faqs" className="hover:underline">
              FAQs
            </Link>
            <Link href="/termsofuse" className="hover:underline">
              Terms of Use
            </Link>
            <Link href="/policy" className="hover:underline">
              Privacy Policy
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-center sm:text-right">
            FGRF © {currentYear}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
