"use client"
import { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { CheckCircle, Copy, ArrowLeft } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { toast } from "sonner"

function SuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")

  const copyOrderId = () => {
    if (orderId) {
      navigator.clipboard.writeText(orderId)
      toast.success("Order ID copied to clipboard!")
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg"
      >
        <Card className="shadow-xl border-green-200">
          <CardHeader className="text-center pb-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex justify-center mb-4"
            >
              <CheckCircle className="w-20 h-20 text-green-500" />
            </motion.div>

            <CardTitle className="text-3xl font-bold text-gray-900 mb-2">Thank You for Your Donation!</CardTitle>
          </CardHeader>

          <CardContent className="pt-6 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <p className="text-gray-600 text-center text-lg leading-relaxed">
                Your payment has been processed successfully and your donation has been recorded. We appreciate your
                generosity and support in making a difference.
              </p>
            </motion.div>

            {orderId && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gray-50 rounded-lg p-6 border border-gray-200"
              >
                <p className="text-sm text-gray-500 mb-3 text-center font-medium">Payment Reference:</p>
                <div className="flex items-center justify-center gap-3">
                  <code className="bg-white px-4 py-3 rounded-md border text-sm font-mono text-gray-800 flex-1 text-center">
                    {orderId}
                  </code>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={copyOrderId}
                    className="hover:bg-gray-100 shrink-0"
                    title="Copy Order ID"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 pt-4"
            >
              <Button
                onClick={() => router.push("/")}
                variant="default"
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Return Home
              </Button>
              <Button
                onClick={() => router.push("/support")}
                variant="outline"
                className="flex-1 border-blue-300 text-blue-700 hover:bg-blue-50"
              >
                Make Another Donation
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center pt-4 border-t border-gray-200"
            >
              <p className="text-sm text-gray-500">
                You will receive a confirmation email shortly with your donation details.
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg">
        <Card className="shadow-xl border-gray-200">
          <CardHeader className="text-center pb-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 mx-auto"></div>
            <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
            <div className="flex gap-3">
              <div className="h-10 bg-gray-200 rounded animate-pulse flex-1"></div>
              <div className="h-10 bg-gray-200 rounded animate-pulse flex-1"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SuccessContent />
    </Suspense>
  )
}
