"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const AfricaAidSection = () => {
  return (
    // <section className="bg-[#f4f7f8] py-16 px-4 sm:px-8 lg:px-20 overflow-hidden">
    //   <motion.div
    //     className="text-center mb-12"
    //     initial={{ opacity: 0, y: 30 }}
    //     whileInView={{ opacity: 1, y: 0 }}
    //     transition={{ duration: 0.6, ease: "easeOut" }}
    //     viewport={{ once: true }}
    //   >
    //     <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2b46]">
    //       Take action
    //     </h2>
    //     <p className="mt-2 text-lg text-[#546e7a] max-w-2xl mx-auto">
    //       Simply browse through our fundraising goals and donate to the causes that matter to you.
    //     </p>
    //   </motion.div>

    //   <motion.div
    //     className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch bg-white rounded-2xl shadow-xl overflow-hidden"
    //     initial={{ opacity: 0, y: 50 }}
    //     whileInView={{ opacity: 1, y: 0 }}
    //     transition={{ duration: 0.7, ease: "easeOut" }}
    //     viewport={{ once: true }}
    //   >
    //     {/* Left Side: Image */}
    //     <motion.div
    //       className="relative w-full h-72 sm:h-96 lg:h-full"
    //       whileHover={{ scale: 1.02 }}
    //       transition={{ type: "spring", stiffness: 200 }}
    //     >
    //       <Image
    //         src="/jamia.jpg"
    //         alt="Project - Jamia tul Madina Malawi"
    //         fill
    //         priority
    //         className="object-cover w-full h-full"
    //         sizes="(max-width: 1024px) 100vw, 50vw"
    //       />
    //       <motion.div
    //         className="absolute bottom-0 left-0 bg-green-600 text-white font-semibold px-6 py-2 rounded-tr-2xl text-sm sm:text-base shadow-md"
    //         initial={{ x: -30, opacity: 0 }}
    //         whileInView={{ x: 0, opacity: 1 }}
    //         transition={{ delay: 0.3, duration: 0.5 }}
    //         viewport={{ once: true }}
    //       >
    //         Project - Jamia tul Madina, Malawi.
    //       </motion.div>
    //     </motion.div>

    //     {/* Right Side: Text */}
    //     <motion.div
    //       className="flex flex-col justify-center p-6 sm:p-10"
    //       initial={{ opacity: 0, x: 30 }}
    //       whileInView={{ opacity: 1, x: 0 }}
    //       transition={{ duration: 0.7, ease: "easeOut" }}
    //       viewport={{ once: true }}
    //     >
    //       <h3 className="text-2xl sm:text-3xl font-bold text-[#0f2b46] mb-4">
    //        Support Jamia Tul Madina Malawi
    //       </h3>
    //       <p className="text-[#546e7a] text-base sm:text-lg mb-6 leading-relaxed">
    //         Help us build a state-of-the-art Islamic institute dedicated to producing scholars who will guide and serve their communities. Your donations will empower the next generation with knowledge and values that strengthen Islam in Malawi, Africa.
    //       </p>
    //       <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
    //         <Link
    //           href="/donate/specialevent"
    //           className="inline-block px-6 py-3 bg-green-700 text-white rounded-md font-semibold text-sm sm:text-base hover:bg-green-900 transition"
    //         >
    //           Donate Now
    //         </Link>
    //       </motion.div>
    //     </motion.div>
    //   </motion.div>
    // </section>
     <section className="bg-[#f4f7f8] py-16 px-4 sm:px-8 lg:px-20 overflow-hidden">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2b46]">
          Take action
        </h2>
        <p className="mt-2 text-lg text-[#546e7a] max-w-2xl mx-auto">
          Simply browse through our fundraising goals and donate to the causes that matter to you.
        </p>
      </motion.div>

      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch bg-white rounded-2xl shadow-xl overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {/* Left Side: Image */}
        <motion.div
          className="relative w-full h-72 sm:h-96 lg:h-full"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <Image
            src="/qurbani20263.png"
          alt="Qurbani Operation 2026 - Malawi"
            fill
            priority
            className="object-fit w-full h-full"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <motion.div
            className="absolute bottom-0 left-0 bg-green-600 text-white font-semibold px-6 py-2 rounded-tr-2xl text-sm sm:text-base shadow-md"
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          >
             Perform Your Qurbani with FGRF | 2026
          </motion.div>
        </motion.div>

        {/* Right Side: Text */}
        <motion.div
          className="flex flex-col justify-center p-6 sm:p-10"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-[#0f2b46] mb-4">
           Qurbani Operation 2026 - Malawi
          </h3>
          <p className="text-[#546e7a] text-base sm:text-lg mb-6 leading-relaxed">
             Perform your Qurbani with FGRF and share the blessings of Eid with families in Malawi. Each sacrifice is conducted under the supervision of qualified Ulama, ensuring it is carried out in accordance with Shariah. Your Qurbani delivers nourishment, compassion, and hope to those in need.  
             </p>
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
            <Link
              href="/donate/animals"
              className="inline-block px-6 py-3 bg-green-700 text-white rounded-md font-semibold text-sm sm:text-base hover:bg-green-900 transition"
            >
              Donate Now
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AfricaAidSection;
