"use client"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen flex flex-col md:flex-row bg-white overflow-hidden">
      {/* Mobile Image - Fixed positioning and spacing */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="block md:hidden w-full h-64 relative mb-0"
      >
        <Image src="/images12.png" alt="Mobile Hero" fill className="object-contain" priority />
      </motion.div>

      {/* Text Content - Aligned to the left side */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="relative z-10 flex-1 flex flex-col justify-center items-center md:items-start px-6 sm:px-10 md:pl-16 py-8 md:py-0 -mt-24 max-w-full md:max-w-2xl w-full md:w-1/2 text-center md:text-left"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
          Give Hope
          <br />
          <span className="text-blue-900">Give Sadaqah</span>
        </h1>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 mb-6 leading-tight">
          One act of kindness. Countless rewards.
        </h2>

        <p className="text-base sm:text-lg text-[#3a4a5d] mb-8 max-w-xl leading-relaxed">
          Transform lives through your Sadaqah. Every donation brings nourishment to the hungry, clean water to the
          thirsty, and hope to the forgotten. Give for the sake of Allah — and let your charity echo in both this life
          and the next.
        </p>

        <Link
          href="/support"
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold text-base sm:text-lg px-8 py-4 rounded-md shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 w-fit"
        >
          Donate Now
        </Link>
      </motion.div>

      {/* Desktop Image - Aligned to the right and covers 50% width */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        className="hidden md:block md:absolute right-0 top-0 w-1/2 h-full"
      >
        <Image
          src="/hero.png"
          alt="Desktop Hero"
          fill
          className="object-cover"
          priority
        />
      </motion.div>
    </section>
  )
}

export default HeroSection