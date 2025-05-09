"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Target, Newspaper, ShoppingBag, Trophy, User, Megaphone, Sparkles, Bell } from "lucide-react"
import TestSelection from "@/components/test-selection"
import CurrentEvents from "@/components/current-events"
import BuyTokens from "@/components/buy-tokens"
import Leaderboard from "@/components/leaderboard"
import Profile from "@/components/profile"
import Sponsors from "@/components/sponsors"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

interface DashboardProps {
  user: any
  setUser: (user: any) => void
}

type View = "main" | "test" | "events" | "tokens" | "leaderboard" | "profile" | "sponsors"

export default function Dashboard({ user, setUser }: DashboardProps) {
  const [currentView, setCurrentView] = useState<View>("main")
  const [showNotification, setShowNotification] = useState(true)

  // Set up Telegram back button
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      if (currentView !== "main") {
        window.Telegram.WebApp.BackButton.show()
        window.Telegram.WebApp.BackButton.onClick(() => {
          setCurrentView("main")
        })
      } else {
        window.Telegram.WebApp.BackButton.hide()
      }
    }

    return () => {
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.BackButton.hide()
      }
    }
  }, [currentView])

  const renderView = () => {
    switch (currentView) {
      case "test":
        return <TestSelection user={user} setUser={setUser} onBack={() => setCurrentView("main")} />
      case "events":
        return <CurrentEvents user={user} setUser={setUser} onBack={() => setCurrentView("main")} />
      case "tokens":
        return <BuyTokens user={user} setUser={setUser} onBack={() => setCurrentView("main")} />
      case "leaderboard":
        return <Leaderboard user={user} onBack={() => setCurrentView("main")} />
      case "profile":
        return <Profile user={user} onBack={() => setCurrentView("main")} />
      case "sponsors":
        return <Sponsors onBack={() => setCurrentView("main")} />
      default:
        return renderMainDashboard()
    }
  }

  const renderMainDashboard = () => {
    return (
      <motion.div
        className="space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-full flex justify-between items-center mb-4">
            <div className="flex items-center">
              <div className="w-12 h-12 maha-ai-gradient rounded-full flex items-center justify-center mr-3 shadow-lg">
                <Sparkles className="w-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold maha-ai-text-gradient">MAHA-AI</h1>
            </div>
            <div className="relative">
              <Button variant="ghost" size="icon" className="relative" onClick={() => setShowNotification(false)}>
                <Bell className="w-6 h-6" />
                {showNotification && <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>}
              </Button>
            </div>
          </div>

          <motion.h2
            className="text-3xl font-bold mb-2 text-gray-800"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Welcome, {user.name || user.first_name}
          </motion.h2>
          <motion.div
            className="rounded-full glass-effect px-6 py-2 text-lg font-medium text-gray-800 border border-white/30 shadow-lg"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            {user.tokens} Tokens
          </motion.div>
        </div>

        {/* Notification */}
        {showNotification && (
          <motion.div
            className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <Bell className="h-5 w-5 text-purple-600" />
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-sm font-medium text-purple-800">Daily reward available!</h3>
                <div className="mt-1 text-sm text-purple-700">
                  <p>Claim your daily tokens to take more quizzes.</p>
                </div>
                <div className="mt-2">
                  <Button
                    size="sm"
                    className="maha-ai-button"
                    onClick={() => {
                      setCurrentView("tokens")
                      setShowNotification(false)
                    }}
                  >
                    Claim Now
                  </Button>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="ml-2 -mt-1 -mr-1" onClick={() => setShowNotification(false)}>
                ×
              </Button>
            </div>
          </motion.div>
        )}

        {/* Featured Quiz */}
        <motion.div
          className="bg-white/80 rounded-xl shadow-lg overflow-hidden mb-8 maha-ai-card backdrop-blur-sm border border-white/50"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10"></div>
            <div className="p-6 relative z-10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold maha-ai-text-gradient">Featured Quiz</h3>
                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  New
                </span>
              </div>
              <h4 className="text-lg font-semibold mb-2">Mathematics Challenge</h4>
              <p className="text-gray-600 mb-4">
                Test your math skills with our latest quiz featuring algebra and geometry problems.
              </p>
              <Button className="w-full maha-ai-button" onClick={() => setCurrentView("test")}>
                Start Quiz
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Main Menu */}
        <div className="grid grid-cols-2 gap-4">
          <DashboardCard
            icon={<Target className="h-8 w-8" />}
            title="Start Test"
            onClick={() => setCurrentView("test")}
            delay={0.1}
            color="bg-purple-500"
          />

          <DashboardCard
            icon={<Newspaper className="h-8 w-8" />}
            title="Current Events"
            onClick={() => setCurrentView("events")}
            delay={0.2}
            color="bg-pink-500"
          />

          <DashboardCard
            icon={<ShoppingBag className="h-8 w-8" />}
            title="Buy Tokens"
            onClick={() => setCurrentView("tokens")}
            delay={0.3}
            color="bg-indigo-500"
          />

          <DashboardCard
            icon={<Trophy className="h-8 w-8" />}
            title="Leaderboard"
            onClick={() => setCurrentView("leaderboard")}
            delay={0.4}
            color="bg-rose-500"
          />

          <DashboardCard
            icon={<User className="h-8 w-8" />}
            title="My Profile"
            onClick={() => setCurrentView("profile")}
            delay={0.5}
            color="bg-amber-500"
          />

          <DashboardCard
            icon={<Megaphone className="h-8 w-8" />}
            title="Sponsors"
            onClick={() => setCurrentView("sponsors")}
            delay={0.6}
            color="bg-emerald-500"
          />
        </div>

        {/* Recent Activity */}
        <motion.div
          className="bg-white/80 rounded-xl shadow-lg overflow-hidden maha-ai-card backdrop-blur-sm border border-white/50"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.3 }}
        >
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Recent Activity</h3>
            {user.testsCompleted ? (
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-white/50 rounded-lg backdrop-blur-sm border border-white/30">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3 shadow-md">
                    <Target className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">Completed {user.bestSubject} Quiz</p>
                    <p className="text-sm text-gray-500">Score: {user.averageScore}%</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Trophy className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No activity yet. Start a quiz to see your progress!</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <div className="container mx-auto max-w-lg p-6 telegram-mini-app-content">
      <AnimatePresence mode="wait">{renderView()}</AnimatePresence>
    </div>
  )
}

function DashboardCard({ icon, title, onClick, delay, color }: DashboardCardProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <div className="bg-white/80 rounded-xl shadow-lg p-6 text-center h-full flex flex-col items-center justify-center maha-ai-card backdrop-blur-sm border border-white/50">
        <div className={`mb-3 text-white p-4 rounded-full ${color} shadow-lg`}>{icon}</div>
        <h3 className="text-xl font-medium">{title}</h3>
      </div>
    </motion.div>
  )
}

interface DashboardCardProps {
  icon: React.ReactNode
  title: string
  onClick: () => void
  delay: number
  color: string
}
