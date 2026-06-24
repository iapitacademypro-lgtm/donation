"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"

export default function SupportPage() {
  const [jamiaIndex, setJamiaIndex] = useState(0)

  const jamiaImages = [
    "/jamia.jpg",
    "/web3/img1.jpg",
    "/web3/img2.jpg",
    "/web3/img3.jpg",
    "/web3/img4.jpg",
    "/web3/img5.jpg",
    "/web3/img3.jpg",
  ]
  const jamiaImages2 = [
    "/qurbani20262.png",
    "/qurbani26/qurbani5.jpg",
    "/qurbani26/Qurbani3.jpg",
    "/qurbani26/qurbani6.jpg",
     "/qurbani26/qurbani2.jpg",
    "/qurbani26/qurbani4.jpg",
   "/qurbani26/Qurbani23.png",
     
     
  
    
     
  ]

  // Auto-slide every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setJamiaIndex((prev) => (prev + 1) % jamiaImages.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  const donationCards = [
    {
      id: "animals",
      title: "Qurabni Operation 2026 | Malawi",
      description: " Perform Your Qurbani with FGRF |  A Sunnah of Sacrifice, A Gift of Mercy.",
      images: jamiaImages2,
      alt: "Qurbani Operation 2026 image",
    },
    {
      id: "specialevent",
      title: "Project - Jamia tul Madina Malawi",
      description: "JAMIA TUL MADINA MALAWI, State of the Art facility for producing Islamic Scholars.",
      images: jamiaImages,
      alt: "Project Jamia tul Madina Malawi image",
    },
     {
      id: "maizeflour",
      title: "Maize Flour Distribution",
      description: "In Rural Areas of Malawi to support families in need.",
      image: "/Maize.png",
      alt: "Meal donation image",
    },

    {
      id: "animals",
      title: "CATTLE SADAQAH",
      description: "Donate livestock to support families",
      image: "/qurbani.jpeg",
      alt: "Animal donation image",
    },
    {
      id: "sadqah",
      title: "SADAQAH / LILLAH",
      description: "Give voluntary charity to help those in need",
      image: "/sadaqah.jpeg",
      alt: "Sadaqah donation image",
    },
    {
      id: "zakah",
      title: "ZAKAAT / FITRA",
      description: "Fulfill your obligation of Zakah",
      image: "/zakat.jpeg",
      alt: "Zakah donation image",
    },
    {
      id: "water-handpump",
      title: "BOREHOLE/HANDPUMP",
      description: "Provide clean water access through handpumps",
      image: "/water.jpeg",
      alt: "Water handpump image",
    },
    {
      id: "meal",
      title: "SERVE A MEAL",
      description: "Help provide nutritious meals to those in need",
      image: "/meal.jpeg",
      alt: "Meal donation image",
    },
    {
      id: "emergency",
      title: "EMERGENCY RELIEF",
      description: "Support those affected by natural disasters",
      image: "/emergency.jpeg",
      alt: "Emergency relief image",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-16 bg-white">
      {/* Heading */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-cyan-800 mb-4">
          Support & Donation
        </h1>
        <p className="text-lg sm:text-xl text-cyan-600 max-w-3xl mx-auto italic">
          "The likeness of those who spend their wealth in the way of Allah is as the likeness of a grain that grows
          seven ears, in every ear a hundred grains. And Allah multiplies for whom He wills." – Quran 2:261
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {donationCards.map((card) => (
          <Card
            key={card.id}
            className="overflow-hidden flex flex-col border border-blue-100 rounded-2xl shadow-sm hover:shadow-lg transition-shadow bg-white"
          >
            {/* Image Section */}
            <div className="relative aspect-[4/3] w-full bg-white">
              {card.images ? (
                // Auto-sliding image for Jamia project
                <Image
                  key={jamiaIndex}
                  src={card.images[jamiaIndex]}
                  alt={card.alt}
                  fill
                  className="object-contain p-4 transition-opacity duration-700"
                />
              ) : (
                <Image
                  src={card.image || "/placeholder.svg"}
                  alt={card.alt}
                  fill
                  className="object-contain p-4"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-100/10 to-blue-200/20 pointer-events-none" />
            </div>

            {/* Title */}
            <CardHeader className="bg-blue-50 px-5 py-4">
              <CardTitle className="text-xl font-semibold text-cyan-800">{card.title}</CardTitle>
            </CardHeader>

            {/* Description */}
            <CardContent className="flex-grow px-5 py-4">
              <p className="text-black text-sm sm:text-base">{card.description}</p>
            </CardContent>

            {/* CTA */}
            <CardFooter className="px-5 py-4 bg-blue-50 mt-auto">
              <Link href={`/donate/${card.id}`} className="w-full">
                <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white text-sm sm:text-base font-medium rounded-xl shadow-md transition-colors">
                  Donate Now
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
