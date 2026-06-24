"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function FAQsPage() {
  const [showAll, setShowAll] = useState(false)

  const faqs = [
    {
      question: "How do you use my donations?",
      answer:
        "FGRF uses all donations for welfare, religious, spiritual or charitable purposes — including drilling water wells and food provision — and any leftover funds are directed toward other permissible humanitarian projects.",
    },
    {
      question: "Are donations tax‑deductible?",
      answer:
        "Yes. UK donors can opt into Gift Aid, allowing FGRF to reclaim 25p for every £1 donated at no extra cost, provided the donor pays sufficient UK income or capital gains tax.",
    },
    {
      question: "Can I request a report of my donation?",
      answer:
        "Yes, you'll receive an official receipt via email after donating. For a detailed usage report or further clarification, you may contact FGRF’s support team—they’re available to assist with personalized queries.",
    },    
    {
      question: "Where are the Qurbanis carried out?",
      answer:
        "We conduct Qurbanis in designated rural and urban locations across Malawi, Tanzania, South Africa, Kenya, etc., in accordance with Islamic guidelines and local conditions.",
    },
    {
      question: "Can I choose which country my Qurbani is performed in?",
      answer:
        "Yes, you can select your preferred country such as Malawi, Tanzania, South Africa, etc., based on the options available during booking.",
    },
    {
      question: "Will I receive a video of my Qurbani?",
      answer:
        "Yes, videos are provided by default for transparency. If you prefer, you may request photos instead.",
    },
    {
      question: "Who performs the slaughter?",
      answer:
        "Qualified Islamic brothers trained in Islamic slaughtering methods (Zabiha) carry out the Qurbani under strict supervision.",
    },
    {
      question: "When is the Qurbani carried out?",
      answer:
        "Qurbani is performed after Eid Salah during the first three days of Eid al-Adha — from the 10th to the 12th of Dhul Hijjah — in accordance with the Islamic calendar.",
    },
    {
      question: "If my Eid is on a different day than the country where the Qurbani is being done, how is it managed?",
      answer:
        "In such cases, we ensure your Qurbani is done within the 10th to 12th of Dhul Hijjah, taking both your local Islamic date and our operational date into account.",
    },
    {
      question: "Can I do Qurbani on behalf of someone else?",
      answer:
        "Yes, you may perform Qurbani on behalf of parents, relatives, deceased loved ones, or others. You will be asked to specify names and intentions during booking.",
    },
    {
      question: "What are the minimum ages for Qurbani animals?",
      answer: "\n• Goat: 1 year\n• Cow: 2 years\n• Camel: 5 years",
    },
    {
      question: "How many shares are there in a Qurbani animal?",
      answer: "\n• Goat: 1 share (only one person)\n• Cow: 7 shares\n• Camel: 7 shares",
    },
    {
      question: "Can I do more than one Qurbani?",
      answer:
        "Yes, you may offer multiple Qurbanis for yourself and others, as individual goats or shares in larger animals.",
    },
    {
      question: "Is Qurbani obligatory on everyone?",
      answer:
        "Qurbani is wajib (compulsory) upon every adult Muslim who is sane, not a traveler (Muqeem), and who possesses wealth equal to or above the Nisab threshold during the days of Eid.",
    },
    {
      question: "Will I receive confirmation once my Qurbani is done?",
      answer:
        "Yes, once your Qurbani is performed, you will receive confirmation along with video or photo proof, depending on your selection.",
    },
    {
      question: "Do you offer installment payments for Qurbani?",
      answer:
        "No, installment payments are not accepted. Full payment must be made at the time of booking.",
    },
    {
      question: "Can I cancel my Qurbani order?",
      answer:
        "Cancellations are only possible before the animal is purchased. Once the animal has been secured on your behalf, cancellation or refund is not guaranteed.",
    },
    {
      question: "Will I receive a payment receipt?",
      answer:
        "Yes, an official receipt and confirmation will be sent to you via email or message once the booking is complete.",
    },
    {
      question: "Is this service run by an Islamic organization?",
      answer:
        "Yes, the initiative is managed by Faizan Global Relief Foundation (FGRF) and operated under qualified Islamic guidance.",
    },
    {
      question: "Where does the meat go after Qurbani?",
      answer:
        "The meat is distributed to underprivileged families, madrasa students, and communities in need across various rural and urban areas.",
    },
    {
      question: "Are female animals allowed for Qurbani?",
      answer:
        "Yes, both male and female animals are permissible for Qurbani as long as they meet the age and health conditions.",
    },
    {
      question: "Can I give Qurbani as a gift for someone else?",
      answer:
        "Yes, you may dedicate the Qurbani as a gift or sadaqah for someone else. You will have the option to mention their name and intention during booking.",
    },
    {
      question: "Do I need to mention my intention during booking?",
      answer:
        "Yes, you will be asked to specify your intention during booking — whether it’s for yourself, a family member, or someone deceased.",
    },
    {
      question: "Will I be informed before the Qurbani is done?",
      answer:
        "You may not be informed prior to the exact moment of slaughter due to field logistics, but you will be updated once your sacrifice is done.",
    },
    {
      question: "Is the Qurbani done on time according to Shariah?",
      answer:
        "Yes, every Qurbani is strictly carried out within the Islamic timeframe — between the 10th and 12th of Dhul Hijjah — after Eid Salah.",
    },
    {
      question: "If the animal dies before slaughter, what happens?",
      answer:
        "We purchase animals in bulk with a margin that considers possible mortalities. Your Qurbani animal is only specified with your name minutes before slaughter, which carries very minimum chance of dying.",
    },
    {
      question: "Where does any extra amount go if my animal cost is less than what I paid?",
      answer:
        "Any surplus amount is used to support the welfare and educational projects of Dawat-e-Islami and Faizan Global Relief Foundation.",
    },
    {
      question: "Can I name the animal or request that it be slaughtered in my name?",
      answer:
        "Yes, the animal is slaughtered with your name or the name you specify, and the intention is made minutes before the act of Qurbani.",
    },
    {
      question: "What if I book late or miss the slot?",
      answer:
        "Qurbani bookings are closed once operational capacity is reached. Booking early ensures your Qurbani is performed on time. Late bookings may not be accommodated.",
    },
  ]

  const visibleFaqs = showAll ? faqs : faqs.slice(0, 8)

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 px-4 py-10 md:px-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-cyan-800 mb-4">know better About Faizan Organization</h1>
          <p className="text-lg text-cyan-600">
            Find answers to common questions about Sadaqah,Zakaat and Qurbani  with FGRF.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {visibleFaqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200 bg-white shadow-md transition-all hover:shadow-lg"
            >
              <Accordion type="single" collapsible>
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="p-5 text-left text-lg font-semibold text-gray-900">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="p-5 pt-0 text-gray-700 text-base whitespace-pre-line">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        {faqs.length > 8 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 bg-cyan-600 text-white px-5 py-2 rounded-md text-sm font-medium shadow hover:bg-cyan-700 transition"
            >
              {showAll ? "Show Less" : "Show More"}
              {showAll ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Still have questions?</h2>
          <p className="text-gray-600 mb-5 max-w-md mx-auto">
            Can not find what you are looking for? Our team is ready to help.
          </p>
          <a
            href="/#Newsletter"
            className="inline-block bg-cyan-600 text-white px-6 py-2 rounded-md text-sm font-medium shadow hover:bg-cyan-700 transition"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  )
}
