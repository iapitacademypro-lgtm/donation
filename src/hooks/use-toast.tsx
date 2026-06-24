// hooks/use-toast.ts
"use client"

import { useCallback, useState } from "react"

export function useToast() {
  const [message, setMessage] = useState<string | null>(null)

  const showToast = useCallback((msg: string) => {
    setMessage(msg)
    setTimeout(() => setMessage(null), 3000) // 3s auto hide
  }, [])

  const Toast = () =>
    message ? (
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-yellow-500 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 z-50">
        {message}
      </div>
    ) : null

  return { showToast, Toast }
}
