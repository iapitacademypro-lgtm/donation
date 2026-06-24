"use client"

import { motion } from "framer-motion"
import { ArrowRight, ArrowLeft, Calendar, Clock } from "lucide-react"
import { Button } from "../components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getAllPosts } from "@/sanity/lib/sanity.queires"

function getRandomReadingTime() {
  return Math.floor(Math.random() * (10 - 4 + 1)) + 4
}

export default function BlogsPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    getAllPosts().then(setPosts)
  }, [])

  return (
    <section
      id="blogs"
      className="pt-6 sm:pt-10 md:pt-12 pb-10 sm:pb-20 md:pb-24 bg-white/5 relative overflow-hidden"
      aria-labelledby="blog-heading"
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Back */}
        <div className="mb-4 sm:mb-6">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="flex items-center gap-2 text-black hover:text-cyan-800 w-fit p-2"
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-sm sm:text-base">Back</span>
          </Button>
        </div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12"
        >
          <div>
            <h2
              id="blog-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3  text-black"
            >
              All Blog Articles
            </h2>
            <p className="text-base sm:text-l max-w-2xl   text-black">
              Know where your donations go with FGRF — see how your support brings
              change to lives across Malawi and Africa.
            </p>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden h-full flex flex-col hover:border-white/20 transition-all">
                <div className="relative h-44 sm:h-48 overflow-hidden">
                  {article.image && (
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>

                <div className="p-4 sm:p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-black/60 text-xs sm:text-sm mb-2 sm:mb-3 flex-wrap">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      <span>
                        {new Date(article._createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      <span>{getRandomReadingTime()} min read</span>
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-black/70 text-sm sm:text-base mb-4 flex-1 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <Link href={`/blog/${article.slug}`} passHref>
                    <Button
                      variant="link"
                      className="p-0 text-cyan-950 hover:text-blue-950 justify-start text-sm sm:text-base"
                    >
                      Read More
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
