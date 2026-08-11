"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { ArrowLeft, Plus, Minus, Calculator, ArrowRight } from "lucide-react"
import { Checkbox } from "@/app/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import type { OnApproveData, OnApproveActions } from "@paypal/paypal-js"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"

interface DonationFormData {
  donationType: string
  donationPurpose?: string

  amount: number
  totalAmount: number
  timestamp: string
  fullName?: string
  whatsappNumber?: string
  emailAddress?: string
  requiresVideo?: string
  acknowledgeLogistics?: boolean
  acknowledgeRemainingFunds?: boolean
  animalCounts?: Record<string, number>
  wealthAmount?: number
  calculatedZakah?: number
  wantsNameplate?: boolean
  nameplateText?: string
  mealCount?: number
  country?: string
  category?: string
  quantity?: number
  names?: string[]
  videoConsent?: string
  costConsent?: boolean
  fundConsent?: boolean
  donationAmount?: number
  currency?: string
  paypalTaxApplied?: boolean
  paypalTaxAmount?: number
  baseAmount?: number
}

interface AnimalOption {
  name: string
  price: number
}

interface BaseDonationType {
  title: string
  image?: string           
  images?: string[]         
  description: string
}

interface MealDonation extends BaseDonationType {
  type: "meal"
  pricePerUnit: number
  unit: string
}

interface MaizeFlourDonation extends BaseDonationType {
  type: "maizeflour"
  pricePerUnit: number
  unit: string
  target: number
}


interface SadqahDonation extends BaseDonationType {
  type: "sadqah"
  minAmount: number
}

interface ZakahDonation extends BaseDonationType {
  type: "zakah"
  percentage: number
}

interface SpecialEventDonation extends BaseDonationType {
  type: "specialevent"
  minAmount: number

}


interface FixedAmountDonation extends BaseDonationType {
  type: "water-handpump"
  fixedAmount: number
}

interface AnimalDonation extends BaseDonationType {
  type: "animals"
  options: AnimalOption[]
}

interface EmergencyDonation extends BaseDonationType {
  type: "emergency"
}
 

type DonationType =
  | MealDonation
  | MaizeFlourDonation
  | SadqahDonation
  | SpecialEventDonation
  | ZakahDonation
  | FixedAmountDonation
  | AnimalDonation
  | EmergencyDonation

function isFixedAmountDonation(donation: DonationType): donation is FixedAmountDonation {
  return donation.type === "water-handpump"
}
function ImageCarousel({
  images,
  alt,
  auto = true,
  interval = 5000,
}: { images: string[]; alt: string; auto?: boolean; interval?: number }) {
  const [[index, direction], setIndex] = useState<[number, number]>([0, 0])
  const [paused, setPaused] = useState(false)

  const next = () => setIndex(([i]) => [(i + 1) % images.length, 1])
  const prev = () => setIndex(([i]) => [(i - 1 + images.length) % images.length, -1])

  useEffect(() => {
    if (!auto || paused || images.length <= 1) return
    const id = setInterval(next, interval)
    return () => clearInterval(id)
  }, [auto, paused, images.length, interval])

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  }

  return (
    <div
      className="relative mx-auto overflow-hidden rounded-lg border-4 border-yellow-300 dark:border-yellow-600"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative w-full h-[260px] sm:h-[360px] md:h-[420px]">
        <AnimatePresence custom={direction} initial={false} mode="popLayout">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30, opacity: { duration: 0.2 } }}
            className="absolute inset-0"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) next()
              else if (info.offset.x > 80) prev()
            }}
          >
            <Image
              src={images[index]}
              alt={alt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Prev/Next buttons */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 dark:bg-black/50 px-3 py-2 shadow"
            aria-label="Previous image"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 dark:bg-black/50 px-3 py-2 shadow"
            aria-label="Next image"
          >
            <ArrowLeft className="rotate-180" size={20} />
          </button>
        </>
      )}

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(([_, d]) => [i, d])}
              className={`h-2 w-2 rounded-full ${i === index ? "bg-white" : "bg-white/50"} outline-none ring-0`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function DonatePage() {
  const [donationPurpose, setDonationPurpose] = useState("")
  const params = useParams()
  const [donationComment, setDonationComment] = useState("");
  const router = useRouter()
  const form = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null)
  const [amount, setAmount] = useState<number>(0)
  const [count, setCount] = useState<number>(1)
  const [calculatedAmount, setCalculatedAmount] = useState<number>(0)
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const [wealthAmount, setWealthAmount] = useState<number>(0)
  const [animalCounts, setAnimalCounts] = useState<Record<string, number>>({})
  const [paypalOrderId, setPaypalOrderId] = useState<string>("")
  const [paypalTax, setPaypalTax] = useState<boolean>(true) // Pre-checked
  const [selectedCountry, setSelectedCountry] = useState<{ code: string; name: string; flag: string }>({
    code: "+1",
    name: "United States",
    flag: "US",
  })

  // Water project fields
  const [wantsNameplate, setWantsNameplate] = useState<boolean>(false)
  const [nameplateText, setNameplateText] = useState<string>("")

  // Common form fields
  const [fullName, setFullName] = useState<string>("")
  const [whatsappNumber, setWhatsappNumber] = useState<string>("")
  const [emailAddress, setEmailAddress] = useState<string>("")

  // Qurbani specific fields
  const [requiresVideo, setRequiresVideo] = useState<string>("")
  const [acknowledgeLogistics, setAcknowledgeLogistics] = useState<boolean>(false)
  const [acknowledgeRemainingFunds, setAcknowledgeRemainingFunds] = useState<boolean>(false)

  const donationType = typeof params.type === "string" ? params.type : Array.isArray(params.type) ? params.type[0] : ""

  const donationTypes: Record<string, DonationType> = {
    meal: {
      type: "meal",
      title: "Serve a Meal",
      image: "/meal.jpeg",
      description: "Provide nutritious meals to those in need",
      pricePerUnit: 1,
      unit: "person",
    },


    "maizeflour": {
    type: "maizeflour",
   title: "Maize Flour Distribution",
  image: "/Maize.png", 
  description: "Provide maize flour to families in rural areas of Malawi. 1 bag = $2.5",
  pricePerUnit: 2.5,
  unit: "bag",
  target: 1500,
},

    specialevent: {
      type: "specialevent",
      title: "Project - Jamia tul Madina Malawi",
      image: "jamia1.jpg",
      images: ["/jamia.jpg" , "/web3/img1.jpg", "/web3/img2.jpg", "/web3/img3.jpg", "/web3/img4.jpg", "/web3/img5.jpg"],
      description: "State of the Art facility for producing Islamic Scholars. ",
      minAmount: 1,  
      
},


 sadqah1: {
      type: "sadqah",
      title: "Sadaqah / lillah ",
      image: "/sadqa3.png",
      description: "Give voluntary charity to help those in need",
      minAmount: 1,
    },

    sadqah: {
      type: "sadqah",
      title: "Sadaqah / lillah ",
      image: "/sadaqah.jpeg",
      description: "Give voluntary charity to help those in need",
      minAmount: 1,
    },
    zakah: {
      type: "zakah",
      title: "Zakat / Fitra",
      image: "/zakat.jpeg",
      description: "Fulfill your obligation of Zakah",
      percentage: 2.5,
    },
    "water-handpump": {
      type: "water-handpump",
      title: "Handpump",
      image: "/water.jpeg",
      description: "Provide clean water access through handpumps",
      fixedAmount: 2200,
    },
    animals: {
      type: "animals",
      image: "/qurbani20262.png",
      title: "Perform Your Qurbani with FGRF",
      description: "Perform your Qurbani with FGRF and share the blessings of Eid with families in Malawi. Each sacrifice is conducted under the supervision of qualified Ulama, ensuring it is carried out in accordance with Shariah. Your Qurbani delivers nourishment, compassion, and hope to those in need.",
      options: [
        { name: "Goat", price: 55 },
        { name: "Share In Cow", price: 65 },
        { name: "Full Cow", price: 455 },
      ],
    },
    emergency: {
      type: "emergency",
      title: "Emergency Relief",
      image: "/emergency.jpeg",
      description: "No emergency situations in Africa for now",
    },
  }

  const countries = [
    { code: "+1", name: "United States", flag: "US" },
    { code: "+1", name: "Canada", flag: "CA" },
    { code: "+52", name: "Mexico", flag: "MX" },
    { code: "+55", name: "Brazil", flag: "🇧🇷" },
    { code: "+54", name: "Argentina", flag: "🇦🇷" },
    { code: "+56", name: "Chile", flag: "🇨🇱" },
    { code: "+57", name: "Colombia", flag: "🇨🇴" },
    { code: "+51", name: "Peru", flag: "🇵🇪" },
    { code: "+58", name: "Venezuela", flag: "🇻🇪" },
    { code: "+44", name: "United Kingdom", flag: "🇬🇧" },
    { code: "+49", name: "Germany", flag: "🇩🇪" },
    { code: "+33", name: "France", flag: "🇫🇷" },
    { code: "+39", name: "Italy", flag: "🇮🇹" },
    { code: "+34", name: "Spain", flag: "🇪🇸" },
    { code: "+31", name: "Netherlands", flag: "🇳🇱" },
    { code: "+46", name: "Sweden", flag: "🇸🇪" },
    { code: "+47", name: "Norway", flag: "🇳🇴" },
    { code: "+45", name: "Denmark", flag: "🇩🇰" },
    { code: "+41", name: "Switzerland", flag: "🇨🇭" },
    { code: "+43", name: "Austria", flag: "🇦🇹" },
    { code: "+32", name: "Belgium", flag: "🇧🇪" },
    { code: "+420", name: "Czech Republic", flag: "🇨🇿" },
    { code: "+48", name: "Poland", flag: "🇵🇱" },
    { code: "+36", name: "Hungary", flag: "🇭🇺" },
    { code: "+353", name: "Ireland", flag: "🇮🇪" },
    { code: "+370", name: "Lithuania", flag: "🇱🇹" },
    { code: "+371", name: "Latvia", flag: "🇱🇻" },
    { code: "+372", name: "Estonia", flag: "🇪🇪" },
    { code: "+357", name: "Cyprus", flag: "🇨🇾" },
    { code: "+358", name: "Finland", flag: "🇫🇮" },
    { code: "+91", name: "India", flag: "🇮🇳" },
    { code: "+92", name: "Pakistan", flag: "🇵🇰" },
    { code: "+880", name: "Bangladesh", flag: "🇧🇩" },
    { code: "+977", name: "Nepal", flag: "🇳🇵" },
    { code: "+94", name: "Sri Lanka", flag: "🇱🇰" },
    { code: "+960", name: "Maldives", flag: "🇲🇻" },
    { code: "+84", name: "Vietnam", flag: "🇻🇳" },
    { code: "+66", name: "Thailand", flag: "🇹🇭" },
    { code: "+855", name: "Cambodia", flag: "🇰🇭" },
    { code: "+856", name: "Laos", flag: "🇱🇦" },
    { code: "+82", name: "South Korea", flag: "🇰🇷" },
    { code: "+81", name: "Japan", flag: "🇯🇵" },
    { code: "+86", name: "China", flag: "🇨🇳" },
    { code: "+63", name: "Philippines", flag: "🇵🇭" },
    { code: "+62", name: "Indonesia", flag: "🇮🇩" },
    { code: "+60", name: "Malaysia", flag: "🇲🇾" },
    { code: "+65", name: "Singapore", flag: "🇸🇬" },
    { code: "+966", name: "Saudi Arabia", flag: "🇸🇦" },
    { code: "+971", name: "UAE", flag: "🇦🇪" },
    { code: "+965", name: "Kuwait", flag: "🇰🇼" },
    { code: "+968", name: "Oman", flag: "🇴🇲" },
    { code: "+973", name: "Bahrain", flag: "🇧🇭" },
    { code: "+974", name: "Qatar", flag: "🇶🇦" },
    { code: "+964", name: "Iraq", flag: "🇮🇶" },
    { code: "+98", name: "Iran", flag: "🇮🇷" },
    { code: "+963", name: "Syria", flag: "🇸🇾" },
    { code: "+962", name: "Jordan", flag: "🇯🇴" },
    { code: "+961", name: "Lebanon", flag: "🇱🇧" },
    { code: "+970", name: "Palestine", flag: "🇵🇸" },
    { code: "+20", name: "Egypt", flag: "🇪🇬" },
    { code: "+27", name: "South Africa", flag: "🇿🇦" },
    { code: "+234", name: "Nigeria", flag: "🇳🇬" },
    { code: "+254", name: "Kenya", flag: "🇰🇪" },
    { code: "+212", name: "Morocco", flag: "🇲🇦" },
    { code: "+213", name: "Algeria", flag: "🇩🇿" },
    { code: "+216", name: "Tunisia", flag: "🇹🇳" },
    { code: "+218", name: "Libya", flag: "🇱🇾" },
    { code: "+249", name: "Sudan", flag: "🇸🇩" },
    { code: "+251", name: "Ethiopia", flag: "🇪🇹" },
    { code: "+256", name: "Uganda", flag: "🇺🇬" },
    { code: "+255", name: "Tanzania", flag: "🇹🇿" },
    { code: "+250", name: "Rwanda", flag: "🇷🇼" },
    { code: "+257", name: "Burundi", flag: "🇧🇮" },
    { code: "+260", name: "Zambia", flag: "🇿🇲" },
    { code: "+263", name: "Zimbabwe", flag: "🇿🇼" },
    { code: "+265", name: "Malawi", flag: "🇲🇼" },
    { code: "+267", name: "Botswana", flag: "🇧🇼" },
    { code: "+268", name: "Eswatini", flag: "🇸🇿" },
    { code: "+266", name: "Lesotho", flag: "🇱🇸" },
    { code: "+61", name: "Australia", flag: "🇦🇺" },
    { code: "+64", name: "New Zealand", flag: "🇳🇿" },
    { code: "+679", name: "Fiji", flag: "🇫🇯" },
    { code: "+675", name: "Papua New Guinea", flag: "🇵🇬" },
    { code: "+90", name: "Turkey", flag: "🇹🇷" },
  ]

  const currentDonation = donationTypes[donationType]

  // Helper function to calculate PayPal fee (2.5% of amount)
  const calculatePayPalFee = (baseAmount: number): number => {
    return baseAmount * 0.025 // 2.5% fee
  }

  // Helper function to get base amount for different donation types
  const getBaseAmount = (): number => {
    if (!currentDonation) return 0

    switch (currentDonation.type) {
      case "meal":
        return count * (currentDonation as MealDonation).pricePerUnit
      case "maizeflour":
  return count * (currentDonation as MaizeFlourDonation).pricePerUnit

      case "zakah":
        return calculatedAmount
      case "water-handpump":
        return (currentDonation as FixedAmountDonation).fixedAmount
      case "animals":
        const animalDonation = currentDonation as AnimalDonation
        return animalDonation.options.reduce((sum, animal) => {
          return sum + animal.price * (animalCounts[animal.name] || 0)
        }, 0)
      case "sadqah":
        return Math.max(amount, (currentDonation as SadqahDonation).minAmount)
      case "specialevent":
      return Math.max(amount, (currentDonation as SpecialEventDonation).minAmount)
  
      default:
        return 0
    }
  }

  useEffect(() => {
    const baseAmount = getBaseAmount()
    const paypalFee = paypalTax ? calculatePayPalFee(baseAmount) : 0
    const finalAmount = baseAmount + paypalFee

    setTotalAmount(finalAmount)
    setAmount(baseAmount) // Update amount state for consistency
  }, [count, calculatedAmount, animalCounts, donationType, currentDonation, paypalTax, wealthAmount])

  if (!donationType) {
    return <div className="container mx-auto px-4 py-12 text-center">Invalid donation type</div>
  }

  const generateAdminReport = (): DonationFormData => {
    const namesArray = Object.entries(animalCounts)
      .filter(([_, count]) => count > 0)
      .map(([name]) => name)

    const baseAmount = getBaseAmount()
    const paypalFee = paypalTax ? calculatePayPalFee(baseAmount) : 0

    return {
      donationType,
      donationPurpose,
      amount: baseAmount,
      totalAmount,
      timestamp: new Date().toISOString(),
      fullName: fullName || "Anonymous",
      whatsappNumber: `${selectedCountry.code} ${whatsappNumber}` || "N/A",
      emailAddress: emailAddress || "N/A",
      requiresVideo,
      acknowledgeLogistics,
      acknowledgeRemainingFunds,
      animalCounts,
      wealthAmount,
      calculatedZakah: calculatedAmount,
      wantsNameplate,
      nameplateText,
      mealCount: count,
      country: selectedCountry.name,
      category: currentDonation?.type || "Unknown",
      quantity: currentDonation?.type === "meal" ? count : 1,
      names: namesArray.length > 0 ? namesArray : ["N/A"],
      videoConsent: requiresVideo || "no",
      costConsent: acknowledgeLogistics || false,
      fundConsent: acknowledgeRemainingFunds || false,
      donationAmount: totalAmount,
      currency: "USD",
      paypalTaxApplied: paypalTax,
      paypalTaxAmount: paypalFee,
      baseAmount,
    }
  }

  const createOrder = async () => {
    try {
      if (!totalAmount || totalAmount <= 0) {
        throw new Error("Invalid donation amount")
      }

      const response = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalAmount,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create order")
      }

      if (!data.id) {
        throw new Error("No order ID received from PayPal")
      }

      return data.id
    } catch (error) {
      console.error("Error creating PayPal order:", error)
      setSubmitStatus("error")
      throw error
    }
  }

  const onApprove = async (data: any) => {
    setPaypalOrderId(data.orderID)
    setIsSubmitting(true)

    try {
      const formData = generateAdminReport()
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          paypalOrderId: data.orderID,
          isPaid: true,
          paymentStatus: "completed",
          paymentDate: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        setSubmitStatus("success")
        form.current?.reset()
        toast.success("Payment successful!")
        router.push(`/success?orderId=${data.orderID}`)
      } else {
        setSubmitStatus("error")
        toast.error("Failed to process payment")
      }
    } catch (error) {
      console.error("Error processing payment:", error)
      setSubmitStatus("error")
      toast.error("Payment processing error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const incrementAnimal = (name: string) => {
    setAnimalCounts((prev) => ({ ...prev, [name]: (prev[name] || 0) + 1 }))
  }

  const decrementAnimal = (name: string) => {
    setAnimalCounts((prev) => ({ ...prev, [name]: Math.max(0, (prev[name] || 0) - 1) }))
  }

  const calculateZakah = () => {
    const wealth = Number.parseFloat(wealthAmount.toString())
    if (!isNaN(wealth) && wealth > 0) {
      const zakah = wealth * 0.025 // 2.5% of total wealth
      setCalculatedAmount(zakah)
    }
  }

  const isFormValid = () => {
    const commonFieldsValid = fullName && whatsappNumber && emailAddress

    if (currentDonation?.type === "animals") {
      return commonFieldsValid && requiresVideo && acknowledgeLogistics && acknowledgeRemainingFunds && totalAmount > 0
    }

    if (currentDonation?.type === "zakah") {
      return commonFieldsValid && calculatedAmount > 0
    }

    return commonFieldsValid && totalAmount > 0
  }

  const renderCommonFields = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 bg-blue-50 dark:bg-blue-50 p-6 rounded-xl border border-blue-200 dark:border-blue-200 mb-6"
    >
      <h3 className="text-lg font-semibold text-cyan-600 mb-4">Contact Information</h3>

      <div>
        <Label htmlFor="fullName" className="text-cyan-600 font-semibold text-base">
          Full Name *
        </Label>
        <Input
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="mt-1 border-blue-300 dark:border-blue-700 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
          placeholder="Enter your full name"
          required
        />
      </div>

      <div>
        <Label htmlFor="whatsapp" className="text-cyan-600 text-base">
          WhatsApp Number *
        </Label>
        <div className="flex flex-col sm:flex-row mt-2 gap-2 sm:gap-0">
          <Select
            value={selectedCountry.code}
            onValueChange={(value) => {
              const country = countries.find((c) => c.code === value)
              if (country) setSelectedCountry(country)
            }}
          >
            <SelectTrigger className="sm:w-32 w-full rounded-md sm:rounded-r-none border border-blue-300 dark:border-blue-700 bg-background">
              <SelectValue>
                <span className="flex items-center gap-1">
                  <span>{selectedCountry.flag}</span>
                  <span className="text-sm">{selectedCountry.code}</span>
                </span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="max-h-60 overflow-y-auto border border-blue-200 dark:border-blue-200 bg-background z-50">
              {countries.map((country, index) => (
                <SelectItem
                  key={`${country.code}-${country.name}-${index}`}
                  value={country.code}
                  className="hover:bg-cyan-100 dark:hover:bg-cyan-100 cursor-pointer transition"
                >
                  <span className="flex items-center gap-2">
                    <span>{country.flag}</span>
                    <span className="text-sm">{country.name}</span>
                    <span className="text-xs text-muted-foreground">{country.code}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            id="whatsapp"
            type="tel"
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
            className="flex-1 rounded-md sm:rounded-l-none border border-blue-300 dark:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
            placeholder="Enter phone number"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="email" className="text-cyan-600 font-semibold text-base">
          Email Address *
        </Label>
        <Input
          id="email"
          type="email"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
          className="mt-1 border-blue-300 dark:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
          placeholder="Enter your email address"
          required
        />
      </div>

      <div>
  <Label 
    htmlFor="donationComment" 
    className="text-cyan-600 font-semibold text-base"
  >
    Comments (Optional)
  </Label>

  <textarea
    id="donationComment"
    value={donationComment}
    onChange={(e) => setDonationComment(e.target.value)}
    className="mt-2 w-full h-28 p-3 rounded-md border border-blue-300 dark:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 text-black resize-none"
    placeholder="Write any message regarding your donation..."
  ></textarea>
</div>


      <div className="bg-yellow-100 dark:bg-yellow-50 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 text-black">
        <div className="flex items-center space-x-2  text-cyan-600">
          <Checkbox
            id="paypal-tax"
            checked={paypalTax}
            onCheckedChange={(checked) => setPaypalTax(checked as boolean)}
          />
          <Label htmlFor="paypal-tax" className="text-foreground font-semibold text-base">
            Add 2.5% PayPal processing fee
          </Label>
        </div>
        <p className="text-sm text-muted-foreground mt-2 ml-6">
          This covers PayPal transaction costs to ensure your full donation reaches those in need.
        </p>
      </div>

    </motion.div>
  )

  const renderQurbaniFields = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 bg-yellow-50 dark:bg-yellow-50 p-6 rounded-xl border border-yellow-200 dark:border-yellow-600 mb-6"
    >
      <h3 className="text-lg font-semibold text-cyan-700 dark:text-cyan-300 mb-4">Qurbani Details</h3>

      <div>
        <Label className="text-cyan-600 font-medium mb-3 block">Do you require a video? *</Label>
        <RadioGroup value={requiresVideo} onValueChange={setRequiresVideo}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="video-yes" />
            <Label htmlFor="video-yes" className="text-foreground">
              Yes
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="video-no" />
            <Label htmlFor="video-no" className="text-foreground">
              No
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="logistics"
          checked={acknowledgeLogistics}
          onCheckedChange={(checked) => setAcknowledgeLogistics(checked as boolean)}
        />
        <Label htmlFor="logistics" className="text-cyan-600 font-medium">
          The cost includes logistics. Do you acknowledge?
        </Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="remaining"
          checked={acknowledgeRemainingFunds}
          onCheckedChange={(checked) => setAcknowledgeRemainingFunds(checked as boolean)}
        />
        <Label htmlFor="remaining" className="text-cyan-600 font-medium">
          Remaining funds support other initiatives. Do you acknowledge? *
        </Label>
      </div>
    </motion.div>
  )

  const renderAmountSummary = () => {
    const baseAmount = getBaseAmount()
    const paypalFee = paypalTax ? calculatePayPalFee(baseAmount) : 0

    return (
      <motion.div
        key={`${baseAmount}-${paypalFee}`}
        initial={{ scale: 1.1, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center mb-6 bg-blue-50 dark:bg-blue-50 p-4 rounded-lg border border-blue-200 dark:border-blue-200"
      >
        <div className="text-lg font-semibold text-blue-700 dark:text-blue-700">
          <div className="flex justify-between items-center mb-2">
            <span>Donation Amount:</span>
            <span>${baseAmount.toFixed(2)}</span>
          </div>
          {paypalTax && (
            <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
              <span>PayPal fee (2.5%):</span>
              <span>${paypalFee.toFixed(2)}</span>
            </div>
          )}
          <div className="text-xl font-bold text-blue-800 dark:text-blue-800 border-t border-blue-300 dark:border-blue-700 pt-2 mt-2 flex justify-between items-center">
            <span>Total:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </motion.div>
    )
  }

  const renderDonationContent = () => {
    switch (currentDonation?.type) {
      case "meal":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2 text-cyan-700 dark:text-cyan-300">Feed the Hungry</h2>
              <p className="text-blue-600 dark:text-blue-400">1 person to feed = $1</p>
            </div>
            <div className="flex items-center justify-center gap-4 mb-6">
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    const newCount = Math.max(1, count - 1)
                    setCount(newCount)
                    setAmount(newCount)
                  }}
                  disabled={count <= 1}
                  className="h-12 w-12 rounded-full border-2 border-blue-300 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950"
                >
                  <Minus className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                </Button>
              </motion.div>
              <motion.span
                key={count}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-2xl font-bold w-16 text-center py-2 px-4 rounded-lg text-cyan-700 dark:text-cyan-800"
              >
                <input
                  type="number"
                  min={1}
                  value={count}
                  onChange={e => {
                    const val = Math.max(1, Number(e.target.value))
                    setCount(val)
                    setAmount(val)
                  }}
                  className="w-auto text-center bg-white/70 border-none outline-none font-bold text-2xl rounded-lg shadow-sm"
                    style={{ width: `${Math.max(String(count).length, 2) + 1}ch` }}
                    autoFocus
                />
              </motion.span>
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    const newCount = count + 1
                    setCount(newCount)
                    setAmount(newCount)
                  }}
                  className="h-12 w-12 rounded-full border-2 border-blue-300 dark:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950"
                >
                  <Plus className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                </Button>
              </motion.div>
            </div>
            {renderAmountSummary()}
            {renderCommonFields()}
          </motion.div>
        )
        case "maizeflour":
  const maizeDonation = currentDonation as MaizeFlourDonation
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2 text-cyan-600 dark:text-cyan-400">
          Maize Flour Distribution
        </h2>
        <p className="text-cyan-600 dark:text-cyan-400">
          1 Bag = ${maizeDonation.pricePerUnit} | Target: {maizeDonation.target} Bags
        </p>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <motion.div whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCount(Math.max(1, count - 1))}
            disabled={count <= 1}
            className="h-12 w-12 rounded-full border-2 border-yellow-400 dark:border-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-950"
          >
            <Minus className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          </Button>
        </motion.div>

        <motion.span
          key={count}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="text-2xl font-bold w-16 text-center py-2 px-4 rounded-lg text-cyan-700 dark:text-cyan-800"
        >
          <input
            type="number"
            min={1}
            value={count}
            onChange={(e) => setCount(Math.max(1, Number(e.target.value)))}
            className="w-auto text-center bg-white/70 border-none outline-none font-bold text-2xl rounded-lg shadow-sm"
            style={{ width: `${Math.max(String(count).length, 2) + 1}ch` }}
          />
        </motion.span>

        <motion.div whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCount(count + 1)}
            className="h-12 w-12 rounded-full border-2 border-yellow-400 dark:border-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-950"
          >
            <Plus className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          </Button>
        </motion.div>
      </div>

      {/* Donation Purpose Checkboxes */}
      <div className="flex justify-center gap-8 mb-6">
        <label className="flex items-center gap-2 text-black dark:text-gray-900 text-lg cursor-pointer">
          <input
            type="checkbox"
            checked={donationPurpose === "Zakaat"}
            onChange={(e) =>
              setDonationPurpose(e.target.checked ? "Zakaat" : "")
            }
            className="accent-yellow-500 cursor-pointer w-5 h-5"
          />
          Zakaat
        </label>

        <label className="flex items-center gap-2 text-black dark:text-gray-900 text-lg cursor-pointer">
          <input
            type="checkbox"
            checked={donationPurpose === "Sadaqah/Lillah"}
            onChange={(e) =>
              setDonationPurpose(e.target.checked ? "Sadaqah/Lillah" : "")
            }
            className="accent-yellow-500 cursor-pointer w-5 h-5"
          />
          Sadaqah / Lillah
        </label>
      </div>

      {renderAmountSummary()}
      {renderCommonFields()}
    </motion.div>
  )


      case "animals":
        const animalDonation = currentDonation as AnimalDonation
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2 text-blue-900 dark:text-blue-900">Qurbani Operation 2026 - Malawi</h2>
              <p className="text-blue-900 dark:text-blue-900">Select quantity for each animal</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
              {animalDonation.options.map((option, index) => (
                <motion.div
                  key={option.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="flex flex-col items-center p-6 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 border border-blue-200 dark:border-blue-800">
                    <CardTitle className="text-xl font-semibold mb-2 text-blue-900">{option.name}</CardTitle>
                    <p className="text-2xl font-bold text-yellow-500 dark:text-yellow-400 mb-4">${option.price}</p>
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <motion.div whileTap={{ scale: 0.95 }}>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => decrementAnimal(option.name)}
                          className="h-10 w-10 rounded-full border-2 border-yellow-400 dark:border-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-950"
                        >
                          <Minus className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                        </Button>
                      </motion.div>
                      <motion.span
                        key={animalCounts[option.name] || 0}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="text-xl font-bold w-12 text-center bg-background py-2 px-3 rounded-lg border border-yellow-300 dark:border-yellow-700 text-blue-800 dark:text-blue-300"
                      >
                        {animalCounts[option.name] || 0}
                      </motion.span>
                      <motion.div whileTap={{ scale: 0.95 }}>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => incrementAnimal(option.name)}
                          className="h-10 w-10 rounded-full border-2 border-yellow-400 dark:border-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-950"
                        >
                          <Plus className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                        </Button>
                      </motion.div>
                    </div>
                    <motion.div
                      key={(animalCounts[option.name] || 0) * option.price}
                      initial={{ scale: 1.1, color: "#eab308" }}
                      animate={{ scale: 1, color: "#1e40af" }}
                      className="text-sm font-medium text-foreground"
                    >
                      Subtotal: ${(animalCounts[option.name] || 0) * option.price}
                    </motion.div>
                  </Card>
                </motion.div>
              ))}
            </div>
            {renderAmountSummary()}
            {renderCommonFields()}
            {renderQurbaniFields()}
          </motion.div>
        )

      case "sadqah":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2 text-cyan-600 dark:text-cyan-400">Sadaqah</h2>
              <p className="text-cyan-600 dark:text-cyan-400">Minimum Sadaqah: $1</p>
            </div>
            <div className="mb-6">
              <Label htmlFor="amount" className="text-lg font-medium text-blue-700 dark:text-blue-300">
                Sadaqah Amount ($)
              </Label>
              <div className="flex mt-2">
                <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-yellow-400 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-950/50 text-yellow-600 dark:text-yellow-400 font-medium">
                  $
                </span>
                <Input
                  id="amount"
                  type="number"
                  min="1"
                  value={amount || ""}
                  onChange={(e) => {
                    const value = Math.max(1, Number(e.target.value))
                    setAmount(value)
                  }}
                  className="rounded-l-none border-yellow-400 dark:border-yellow-600 focus:border-yellow-500 text-lg"
                  placeholder="Enter amount"
                />
              </div>
            </div>
            {renderAmountSummary()}
            {renderCommonFields()}
          </motion.div>
        )

 case "specialevent":
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2 text-cyan-600 dark:text-cyan-400">
          Project - Jamia Tul Madina Malawi
        </h2>
        <p className="text-cyan-600 dark:text-cyan-400">
          Choose donation type and enter amount for Jamia Tul Madina
        </p>
      </div>

      {/* Radio Buttons for Donation Purpose */}
      <div className="mb-6">
        <Label className="text-lg font-medium text-blue-900 dark:text-blue-300 mb-2 block text-center">
          Select Donation Type:
        </Label>
        <div className="flex justify-center gap-6 mt-3 flex-wrap">
          <label className="flex items-center gap-2 text-black dark:text-gray-900 text-lg cursor-pointer">
            <input
              type="radio"
              name="donationPurpose"
              value="Sadaqah/Lillah"
              checked={donationPurpose === "Sadaqah/Lillah"}
              onChange={(e) => setDonationPurpose(e.target.value)}
              className="accent-yellow-500 cursor-pointer w-5 h-5"
            />
            Sadaqah / Lillah
          </label>

          <label className="flex items-center gap-2 text-black dark:text-gray-900 text-lg cursor-pointer">
            <input
              type="radio"
              name="donationPurpose"
              value="Zakaat"
              checked={donationPurpose === "Zakaat"}
              onChange={(e) => setDonationPurpose(e.target.value)}
              className="accent-yellow-500 cursor-pointer w-5 h-5"
            />
            Zakaat
          </label>
        </div>
      </div>

      {/* Donation Amount Field */}
      <div className="mb-6 text-center">
        <Label htmlFor="amount" className="text-lg font-medium text-blue-700 dark:text-blue-300 block mb-2">
          Donation Amount ($)
        </Label>

        <div className="flex justify-center items-center w-full">
          <span className="inline-flex items-center px-5 py-2 rounded-l-lg border border-r-0 border-yellow-400 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-950/50 text-yellow-600 dark:text-yellow-400 font-medium">
            $
          </span>

           <Input
                  id="amount"
                  type="number"
                  min="1"
                  value={amount || ""}
                  onChange={(e) => {
                    const value = Math.max(1, Number(e.target.value))
                    setAmount(value)
                  }}
                  className="rounded-l-none border-yellow-400 dark:border-yellow-600 focus:border-yellow-500 text-lg"
                  placeholder="Enter amount"
                />
        </div>
      </div>

      {renderAmountSummary()}
      {renderCommonFields()}
    </motion.div>
  )



      case "zakah":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2 text-cyan-600 dark:text-cyan-400">Zakah Calculator</h2>
              <p className="text-cyan-600 dark:text-cyan-400">Calculate 2.5% of your wealth</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-100 p-6 rounded-xl border border-blue-200 dark:border-blue-200">
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                <h3 className="font-medium text-blue-700 dark:text-blue-300">Zakah Calculator (2.5%)</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="wealth" className="text-lg font-medium text-foreground">
                    Total Wealth Value ($)
                  </Label>
                  <div className="flex mt-2">
                    <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-yellow-400 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-950/50 text-yellow-600 dark:text-yellow-400 font-medium">
                      $
                    </span>
                    <Input
                      id="wealth"
                      type="number"
                      placeholder="Enter your total wealth"
                      value={wealthAmount || ""}
                      onChange={(e) => setWealthAmount(Number(e.target.value))}
                      className="rounded-l-none border-yellow-400 dark:border-yellow-600 focus:border-yellow-500 text-lg"
                    />
                  </div>
                </div>

                <motion.div whileTap={{ scale: 0.98 }}>
                  <Button onClick={calculateZakah} className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">
                    Calculate Zakah (2.5%)
                  </Button>
                </motion.div>

                <AnimatePresence>
                  {calculatedAmount > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="mt-4 p-4 bg-background rounded-lg border border-blue-300 dark:border-blue-700 shadow-sm"
                    >
                      <p className="text-sm text-muted-foreground">Your Zakah Amount (2.5% of ${wealthAmount}):</p>
                      <p className="text-2xl font-bold text-yellow-500 dark:text-yellow-400">
                        ${calculatedAmount.toFixed(2)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            {calculatedAmount > 0 && renderAmountSummary()}
            {renderCommonFields()}
          </motion.div>
        )

      case "water-handpump": {
        const fixedDonation = currentDonation as FixedAmountDonation

        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2 text-cyan-600 dark:text-cyan-400">{fixedDonation.title}</h2>
              <p className="text-xl font-semibold text-yellow-500 dark:text-yellow-400">
                Cost: ${fixedDonation.fixedAmount}
              </p>
              <p className="mt-4 text-cyan-600 dark:text-cyan-400">
                Your donation will help provide clean water to communities in need.
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-50 p-6 rounded-xl border border-blue-200 dark:border-blue-200 mb-6">
              <label className="text-lg font-medium text-foreground mb-3 block">
                Do you want a nameplate installed?
              </label>
              <div className="flex gap-4 mb-4">
                <Button
                  variant={wantsNameplate ? "default" : "outline"}
                  onClick={() => setWantsNameplate(true)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white"
                >
                  Yes
                </Button>
                <Button
                  variant={!wantsNameplate ? "default" : "outline"}
                  onClick={() => {
                    setWantsNameplate(false)
                    setNameplateText("")
                  }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white"
                >
                  No
                </Button>
              </div>

              {wantsNameplate && (
                <Input
                  type="text"
                  placeholder="Enter Name to Display on Plate"
                  value={nameplateText}
                  onChange={(e) => setNameplateText(e.target.value)}
                  className="border-blue-300 dark:border-blue-700 focus:border-blue-500"
                />
              )}
            </div>
            {renderAmountSummary()}
            {renderCommonFields()}
          </motion.div>
        )
      }

      case "emergency":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6"
          >
            <h2 className="text-2xl font-bold mb-2 text-cyan-700 dark:text-cyan-300">Emergency Relief</h2>
            <p className="text-blue-600 dark:text-blue-400 mb-4">No emergency situations in Africa for now.</p>
            <Button
              variant="outline"
              onClick={() => router.push("/support")}
              className="mt-4 border-blue-300 dark:border-blue-700 text-cyan-700 dark:text-cyan-300 hover:bg-blue-50 dark:hover:bg-blue-950"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Support Page
            </Button>
          </motion.div>
        )

      default:
        return null
    }
  }

  if (!currentDonation) {
    return <div className="container mx-auto px-4 py-12 text-center">Donation type not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Card className="max-w-4xl mx-auto shadow-xl border-blue-200 dark:border-blue-800">
          <CardHeader className="text-center pb-6 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 rounded-t-lg">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CardTitle className="text-3xl font-bold text-blue-700 dark:text-blue-700">
                {currentDonation.title}
              </CardTitle>
            </motion.div>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center mb-8"
            >
            {Array.isArray(currentDonation.images) && currentDonation.images.length > 0 ? (
  <ImageCarousel images={currentDonation.images} alt={currentDonation.title} />
) : (
  <Image
    src={currentDonation.image || "/placeholder.svg"}
    alt={currentDonation.title}
    width={600}
    height={400}
    className="rounded-lg object-cover mx-auto border-4 border-yellow-300 dark:border-yellow-600"
    priority
  />
)}
              <p className="mt-4 text-lg text-blue-600 dark:text-blue-400">{currentDonation.description}</p>
            </motion.div>

            {renderDonationContent()}
          </CardContent>

          {donationType !== "emergency" && (
            <CardFooter className="pt-6 pb-8 px-8 space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="w-full space-y-4 mx-auto"
              >
                <PayPalScriptProvider
                  options={{
                    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
                    currency: "USD",
                    intent: "capture",
                    components: "buttons",
                    debug: false,
                  }}
                >
                  <form ref={form} onSubmit={(e) => e.preventDefault()}>
                    <PayPalButtons
                      style={{ layout: "vertical" }}
                      disabled={!isFormValid()}
                      forceReRender={[totalAmount, calculatedAmount]}
                      createOrder={createOrder}
                      onApprove={async (data: OnApproveData, actions: OnApproveActions) => {
                        try {
                          if (!actions.order) {
                            throw new Error("PayPal order actions not available")
                          }
                          const capture = await actions.order.capture()
                          await onApprove(data)
                          console.log("Payment captured:", capture)
                        } catch (error) {
                          console.error("Error processing payment:", error)
                          setSubmitStatus("error")
                        }
                      }}
                      onError={(err) => {
                        console.error("PayPal error:", err)
                        setSubmitStatus("error")
                      }}
                    />
                  </form>
                </PayPalScriptProvider>
                {submitStatus === "success" && (
                  <p className="text-green-600 dark:text-green-400 text-center mt-4">
                    Donation submitted successfully!
                  </p>
                )}
                {submitStatus === "error" && (
                  <p className="text-red-600 dark:text-red-400 text-center mt-4">
                    Failed to submit donation. Please try again.
                  </p>
                )}
              </motion.div>
            </CardFooter>
          )}
        </Card>
      </motion.div>
    </div>
  )
}
