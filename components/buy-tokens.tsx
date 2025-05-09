"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Gift, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"

interface BuyTokensProps {
  user: any
  setUser: (user: any) => void
  onBack: () => void
}

export default function BuyTokens({ user, setUser, onBack }: BuyTokensProps) {
  const handleDailyReward = () => {
    // Check if user has already claimed today
    const today = new Date().toISOString().split("T")[0]

    if (user.lastDailyReward === today) {
      alert("You've already claimed your daily reward today. Come back tomorrow!")
      return
    }

    // Update user with new tokens and timestamp
    const updatedUser = {
      ...user,
      tokens: user.tokens + 3,
      lastDailyReward: today,
    }
    setUser(updatedUser)
    localStorage.setItem("telegram_quiz_user_data", JSON.stringify(updatedUser))

    alert("You've claimed 3 free tokens as your daily reward!")
  }

  const canClaimDaily = () => {
    const today = new Date().toISOString().split("T")[0]
    return user.lastDailyReward !== today
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" className="h-12 w-12 text-gray-800" onClick={onBack}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="ml-3 text-3xl font-bold text-gray-800">Buy Tokens</h1>
      </div>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl bg-white/60 backdrop-blur-sm p-6 border border-white/30 shadow-lg"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-medium text-gray-800">Current Balance</h3>
            <p className="text-lg text-gray-600">Your available tokens</p>
          </div>
          <div className="text-4xl font-bold maha-ai-text-gradient">{user.tokens}</div>
        </div>
      </motion.div>

      <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm maha-ai-card border border-white/50">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-2xl">
            <Gift className="mr-3 h-6 w-6 text-indigo-500" />
            Free Tokens
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <motion.div
            className="flex items-center justify-between p-4 border-2 rounded-xl bg-white/70"
            whileHover={{ scale: 1.02, borderColor: "rgba(99, 102, 241, 0.5)" }}
            whileTap={{ scale: 0.98 }}
          >
            <div>
              <h3 className="text-xl font-medium">Daily Reward</h3>
              <p className="text-muted-foreground">Claim 3 free tokens daily</p>
            </div>
            <Button
              onClick={handleDailyReward}
              disabled={!canClaimDaily()}
              className={`maha-ai-button ${!canClaimDaily() ? "opacity-50" : ""}`}
            >
              {canClaimDaily() ? "Claim" : "Claimed"}
            </Button>
          </motion.div>

          <motion.div
            className="flex items-center justify-between p-4 border-2 rounded-xl bg-white/70"
            whileHover={{ scale: 1.02, borderColor: "rgba(99, 102, 241, 0.5)" }}
            whileTap={{ scale: 0.98 }}
          >
            <div>
              <h3 className="text-xl font-medium">Invite Friends</h3>
              <p className="text-muted-foreground">Get 5 tokens per friend</p>
            </div>
            <Button variant="outline" className="rounded-xl">
              Share
            </Button>
          </motion.div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm maha-ai-card border border-white/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl flex items-center">
            <MessageCircle className="mr-3 h-6 w-6 text-indigo-500" />
            Contact Administrator
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-lg">To purchase tokens, please contact our administrator directly:</p>
          <motion.div
            className="mt-4 p-4 bg-indigo-50 rounded-xl border border-indigo-200"
            whileHover={{ scale: 1.02 }}
          >
            <p className="font-medium text-lg">@Mrcoolxaj</p>
            <p className="text-muted-foreground">Official token administrator</p>
          </motion.div>
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            className="w-full h-12 text-lg rounded-xl"
            onClick={() => window.open("https://t.me/Mrcoolxaj", "_blank")}
          >
            Contact Admin
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
