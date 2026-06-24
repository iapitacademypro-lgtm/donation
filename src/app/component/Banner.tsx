"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function BannerPage() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
      {/* Desktop Image (hidden on mobile) */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="hidden md:block absolute inset-0 w-full h-full"
      >
        <Image
          src="/banner.jpeg"
          alt="Banner"
          fill
          priority
          className="object-cover object-center"
        />
      </motion.div>

      {/* Mobile Image (only visible below md) */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="block md:hidden absolute inset-0 w-full h-full"
      >
        <Image
          src="/banner1.jpg"
          alt="Mobile Banner"
          fill
          priority
          className="object-cover object-center"
        />
      </motion.div>

      {/* Overlay Content (same for all screens) */}
      <div className="absolute inset-0 flex items-center justify-center text-center p-4 sm:p-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="bg-yellow-400 bg-opacity-60 text-blue-950 p-6 rounded-xl max-w-3xl shadow-lg"
        >
          <p className="text-lg sm:text-xl md:text-2xl font-light italic leading-relaxed">
            "The example of those who spend their wealth in the way of Allah is
            like a seed which grows seven spikes; in each spike is a hundred
            grains. Allah multiplies for whom He wills."
          </p>
          <p className="mt-4 text-sm sm:text-base font-semibold">
            — Qur’an 2:261
          </p>
        </motion.div>
      </div>
    </section>
  );
}
