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
          sizes="(max-width: 640px) 100vw, 1200px"
          priority
          className="object-contain object-center"
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
          sizes="(max-width: 640px) 100vw, 1200px"
          priority
          className="object-contain object-center"
        />
      </motion.div>

      {/* Overlay Content (same for all screens) */}
      <div className="absolute inset-0 flex items-end justify-center pb-12 text-center p-4 sm:p-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          style={{ backgroundColor: "rgba(0,0,0,0.15)" }}
          className="max-w-3xl rounded-xl border border-white/20 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.18)] "
        >
          <p className="text-lg font-semibold italic leading-relaxed text-white sm:text-xl md:text-2xl">
            "The example of those who spend their wealth in the way of Allah is
            like a seed which grows seven spikes; in each spike is a hundred
            grains. Allah multiplies for whom He wills."
          </p>
          <p className="mt-4 text-sm font-bold text-white sm:text-base">
            — Qur'an 2:261
          </p>
        </motion.div>
      </div>
    </section>
  );
}