"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LogIn, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

interface LoginProps {
  onLogin: (userData: any) => void
}

export default function Login({ onLogin }: LoginProps) {
  const handleTelegramLogin = () => {
    // In a real implementation, this would use the Telegram WebApp API
    // For demo purposes, we'll simulate a successful login
    onLogin({
      id: 123456789,
      first_name: "Student",
      tokens: 0,
    })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 120 }}
        className="w-full max-w-md"
      >
        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="flex justify-center mb-4"
            >
              <div className="w-20 h-20 maha-ai-gradient rounded-full flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
            </motion.div>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <CardTitle className="text-3xl font-bold maha-ai-text-gradient">MAHA-AI</CardTitle>
              <CardDescription className="text-lg mt-2">
                Practice tests in an engaging and structured way
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent className="flex flex-col items-center pt-6">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <Button onClick={handleTelegramLogin} className="w-full h-14 text-lg font-medium telegram-button">
                <LogIn className="mr-2 h-5 w-5" />
                Login with Telegram
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
