'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const NewsletterSection = () => {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <motion.section
      id="Newsletter"
      className="w-full dark:bg-[#f1f5f9]  border-t bg-[#f1f5f9] py-16 px-4 lg:px-8 flex justify-center items-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      <motion.div
        className="w-full max-w-4xl shadow-2xl dark:bg-white  bg-white rounded-xl py-12 px-4 sm:px-8 flex flex-col lg:flex-row items-center gap-8"
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Image Area */}
        <motion.div
          className="w-full lg:w-1/2 flex justify-center"
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <div className="relative w-64 h-64 sm:w-72 sm:h-72">
            <Image
              src="/sadaq1.png"
              alt="Qurbani Illustration"
              width={400}
              height={400}
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* Content Area */}
        <motion.div
          className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left"
          initial={{ x: 40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold dark:text-[#001a26] text-[#001a26] mb-4">
            Got a taste for fighting hunger?
          </h2>
          <p className="dark:text-cyan-900 text-[#3a4a5d] mb-8">
            Connect with your impact by signing up for our newsletter.
          </p>

          {!submitted ? (
            <form
              onSubmit={e => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="w-full max-w-md flex flex-col sm:flex-row gap-2 sm:gap-0"
            >
              <input
                type="email"
                name="user_email"
                placeholder="Enter your email"
                required
                className="w-full p-3 border border-gray-300 rounded-lg sm:rounded-r-none bg-gray-100 text-cyan-900 focus:outline-none focus:ring-2 focus:ring-[#6ec1e4]"
              />

              <motion.button
                type="submit"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                className="w-full sm:w-auto bg-[#ffc107] text-cyan-800 px-6 py-3 rounded-lg sm:rounded-l-none font-semibold flex items-center justify-center hover:bg-[#ffb300] transition-colors duration-200"
              >
                <span className=" sm:inline mr-2">Subscribe</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </motion.button>
            </form>
          ) : (
            <motion.p
              className="text-blue-500 mt-2 text-lg font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Thanks! Your email is registered.
            </motion.p>
          )}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default NewsletterSection;
