"use client";

import Image from "next/image";
// import DonationForm from "@/app/component/donation-form";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const currency = "ZAR";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function DonateMonthlyPage() {
  return (
    <div className="relative dark:bg-white">
      {/* HERO SECTION */}
      <div className="relative h-[280px] sm:h-[360px] md:h-[480px] w-full overflow-hidden">
        <Image
          src="/top2.png"
          alt="Mother with child receiving food aid"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 leading-tight">
              Become a Monthly Hero
            </h1>
            <p className="text-base sm:text-lg md:text-xl ">
              Join a community making a real difference — one meal at a time.
            </p>
          </motion.div>
        </div>
      </div>

      {/* WHY JOIN SECTION */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <motion.h2
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mb-10 text-center text-2xl sm:text-3xl font-bold text-cyan-900 dark:text-white"
        >
          Why Join Our Incredible Monthly Heroes
        </motion.h2>
        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 text-white"
        >
          {[
            {
              icon: "/icon1.jpg",
              title: "Have a lasting impact",
              text: "Even a small monthly donation can have a big impact and helps us plan for the future.",
            },
            {
              icon: "/icon2.png",
              title: "Get updates from the field",
              text: "Receive regular videos and impact stories in the ShareTheMeal app.",
            },
            {
              icon: "/icon3.png",
              title: "You're in control",
              text: "Upgrade, cancel, or change your monthly donation anytime.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="rounded-2xl border border-gray-200 dark:border-gray bg-white dark:bg-gray-900 p-6 text-center shadow-sm hover:shadow-md transition text-white"
            >
              <div className="mb-4 flex justify-center">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={60}
                  height={60}
                />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
              <p className="text-sm">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* VIDEO & EXPLANATION SECTION */}
      <section className="bg-gray-50 dark:bg-gray-50 py-12 md:py-16">
        <div className="mx-auto max-w-6xl grid gap-10 md:grid-cols-2 items-center px-4 sm:px-6">
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="relative aspect-video md:h-full w-full rounded-xl overflow-hidden"
          >
            <Image
              src="/sadqah.jpg"
              alt="Video placeholder"
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-2xl sm:text-3xl font-bold text-cyan-900 dark:text-white">
              Learn More About Our Work
            </h2>
            <p className="mb-6 text-gray-700 dark:text-gray-700 text-base leading-relaxed">
              We are part of the UN World Food Programme — the worlds largest
              humanitarian organization fighting hunger. Monthly donations
              enable us to act fast when emergencies strike and invest in
              long-term solutions.
            </p>
            <ul className="space-y-3">
              {[
                "Provide immediate relief in emergency situations",
                "Support sustainable farming and food security programs",
                "Help communities build resilience against future crises",
              ].map((point, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <CheckCircle2 className="mt-1 text-green-500 shrink-0" />
                  <span className="text-gray-700 dark:text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIAL SECTION */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <motion.h2
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mb-10 text-center text-2xl sm:text-3xl font-bold text-cyan-800 dark:text-cyan-800"
        >
          Meet the Community Behind the Meals
        </motion.h2>
        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 text-black"
        >
          {[
            {
              name: "Fayaz Ali",
              quote:
                "It made it easy to set up monthly payments. It feels so rewarding to see the positive change a donation can make. I'm not a rich person, but I feel rich in spirit thanks to this app.",
              note: "on FGRF monthly payments",
              color: "bg-cyan-100 dark:bg-cyan-100",
            },
            {
              name: "Ahmed Shaikh",
              quote:
                "What a simple idea. You can donate as little as one meal or monthly. You choose where the meal goes or let them decide where it’s needed most.",
              note: "on how easy FGRF is to use",
              color: "bg-orange-100 dark:bg-orange-100",
            },
            {
              name: "Shabbir Shah",
              quote:
                "I love the charity work I do monthly and the app never has bugs. That makes me feel confident that the meals are reaching the people.",
              note: "on FGRF's user experience",
              color: "bg-yellow-100 dark:bg-yellow-100",
            },
          ].map((person, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="rounded-2xl border border-gray-200 dark:border-gray-200 bg-white dark:bg-white p-6 shadow-sm text-black"
            >
              <div className="mb-4 flex justify-center">
                <div className={`rounded-full ${person.color} p-2`}>
                  <Image
                    src="/bowl1.jpg"
                    alt="Bowlicon"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
              </div>
              <p className="mb-4 text-sm">{person.quote}</p>
              <p className="text-right text-sm font-semibold">{`— ${person.name}`}</p>
              <p className="text-right text-xs text-gray-500 dark:text-gray-400">{person.note}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
