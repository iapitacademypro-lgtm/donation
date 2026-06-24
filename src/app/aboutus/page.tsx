"use client"

import Image from "next/image"
import { Card, CardContent } from "@/app/components/ui/card"
import { motion, Variants } from "framer-motion"

// ✅ Add type annotation + cast "easeOut" properly
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" as const } 
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 px-4 py-10 sm:px-6 text-cyan-900">
      {/* Our Purpose Section */}
      <section className="py-12 sm:py-16 px-2 sm:px-4">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-5xl mx-auto text-center"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-cyan-800">Our Mission</h1>
          <p className="text-lg sm:text-xl mb-8 text-cyan-600">
            Bringing hope and relief to communities worldwide
          </p>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white rounded-xl p-6 sm:p-8 shadow-sm mb-10 text-left sm:text-center text-black"
          >
            <p className="mb-6 text-base sm:text-lg">
              Faizan Global Relief Foundation (FGRF) is a humanitarian organization dedicated to
              providing essential aid and support to vulnerable communities across the globe. Since
              our establishment, we have been committed to alleviating suffering and creating
              sustainable solutions for those in need.
            </p>

            <div className="my-8">
              <Image
                src="/about.jpeg"
                alt="FGRF humanitarian aid workers helping communities"
                width={1200}
                height={800}
                className="w-full h-auto rounded-lg object-cover max-h-[500px] mx-auto"
              />
            </div>

            <p className="italic mb-4 text-sm text-cyan-600">
              Our commitment extends beyond borders and boundaries.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold mb-6">
              Together, we can build a world where no one suffers alone.
            </h2>

            <p className="text-base sm:text-lg">
              Operating in over 13 countries, FGRF has established 100 medical camps, treated over
              5,400 patients, planted 683,400 trees, and collected 10,692 blood bags. Our work spans
              emergency relief, medical assistance, environmental conservation, and sustainable
              development. Every project we undertake is driven by our core belief that every life
              matters and deserves dignity, care, and hope.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Islamic Values Section */}
      <section className="py-12 sm:py-16 px-2 sm:px-4 bg-white">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center text-cyan-900"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-cyan-700">
            Guided by Faith, Driven by Compassion
          </h2>
          <p className="text-base sm:text-lg mb-8 text-cyan-600">
            Our work is rooted in Islamic principles of charity, justice, and service to humanity.
          </p>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-yellow-500 rounded-xl p-6 sm:p-8 shadow-sm text-left sm:text-center text-blue-900"
          >
            <p className="text-lg sm:text-xl italic mb-6">
              "Whoever saves a life, it is as if he has saved all of mankind." - Quran 5:32
            </p>
            <p className="text-base sm:text-lg mb-6">
              At FGRF, we believe that serving humanity is one of the highest forms of worship. Our
              humanitarian efforts are inspired by the teachings of Islam, which emphasize
              compassion, justice, and the responsibility to care for those less fortunate.
            </p>
            <p className="text-base sm:text-lg">
              From providing emergency relief in Gaza to establishing medical camps in remote areas,
              from environmental conservation through tree planting to blood donation drives, we
              strive to embody the Islamic values of mercy, generosity, and social responsibility in
              everything we do.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Our Impact Areas Section */}
      <section className="py-12 sm:py-16 px-2 sm:px-4 bg-blue-50">
        <div className="max-w-6xl mx-auto text-blue-900">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Our Impact Areas</h2>
            <p className="text-base sm:text-lg">Key areas where we make a difference</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card className="bg-white">
                  <CardContent className="p-6 sm:p-8">
                    <div
                      className={`w-12 h-12 ${
                        i === 0 ? "bg-yellow-100" : i === 1 ? "bg-blue-100" : "bg-green-100"
                      } rounded-full flex items-center justify-center mb-4`}
                    >
                      <span className="text-2xl">{["🏥", "🌍", "🤲"][i]}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">
                      {
                        ["Healthcare & Medical Aid", "Emergency Relief", "Community Development"][i]
                      }
                    </h3>
                    <p className="text-sm sm:text-base">
                      {
                        [
                          "Establishing medical camps, treating patients, and providing essential healthcare services to underserved communities worldwide.",
                          "Rapid response to natural disasters and conflicts, providing immediate relief including food, shelter, and emergency supplies.",
                          "Long-term sustainable projects including education, clean water access, environmental conservation, and economic empowerment programs.",
                        ][i]
                      }
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
