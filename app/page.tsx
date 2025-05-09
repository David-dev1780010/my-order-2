"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import Login from "@/components/login"
import Registration from "@/components/registration"
import Dashboard from "@/components/dashboard"
import AdminPanel from "@/components/admin-panel"
import LandingPage from "@/components/landing-page"
import { motion, AnimatePresence } from "framer-motion"

// Telegram WebApp types
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        initData: string
        initDataUnsafe: {
          user?: {
            id: number
            first_name: string
            last_name?: string
            username?: string
            photo_url?: string
          }
        }
        ready: () => void
        expand: () => void
        MainButton: {
          text: string
          show: () => void
          hide: () => void
          onClick: (callback: () => void) => void
        }
        BackButton: {
          show: () => void
          hide: () => void
          onClick: (callback: () => void) => void
        }
      }
    }
  }
}

type UserState = {
  id: number
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
  registered?: boolean
  class?: string
  interests?: string[]
  tokens: number
  testsCompleted?: number
  averageScore?: number
  bestSubject?: string
  lastDailyReward?: string
}

// Admin user IDs - these are the only users who should have access to the admin panel
const ADMIN_IDS = [5036849349, 406039857]

// Mock database for user persistence
const LOCAL_STORAGE_KEY = "telegram_quiz_user_data"
const USERS_STORAGE_KEY = "telegram_quiz_all_users"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<UserState | null>(null)
  const [showRegistration, setShowRegistration] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [showLanding, setShowLanding] = useState(true)

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (user && user.registered) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user))

      // Also update the user in the all users list
      const allUsers = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || "[]")
      const existingUserIndex = allUsers.findIndex((u: UserState) => u.id === user.id)

      if (existingUserIndex >= 0) {
        allUsers[existingUserIndex] = user
      } else {
        allUsers.push(user)
      }

      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(allUsers))
    }
  }, [user])

  useEffect(() => {
    // Initialize Telegram WebApp
    if (window.Telegram) {
      window.Telegram.WebApp.ready()
      window.Telegram.WebApp.expand()

      // Check if user data is available from Telegram
      if (window.Telegram.WebApp.initDataUnsafe.user) {
        const telegramUser = window.Telegram.WebApp.initDataUnsafe.user

        // Check if user is an admin - strictly check against the ADMIN_IDS array
        if (ADMIN_IDS.includes(telegramUser.id)) {
          console.log("Admin user detected:", telegramUser.id)
          setIsAdmin(true)
        }

        // Check if user is already registered in localStorage
        const savedUserData = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (savedUserData) {
          try {
            const parsedUser = JSON.parse(savedUserData)
            // Verify it's the same user
            if (parsedUser.id === telegramUser.id) {
              // Update with latest Telegram data
              setUser({
                ...parsedUser,
                first_name: telegramUser.first_name,
                last_name: telegramUser.last_name,
                username: telegramUser.username,
                photo_url: telegramUser.photo_url,
              })
              setShowLanding(false)
              setLoading(false)
              return
            }
          } catch (e) {
            console.error("Error parsing saved user data", e)
          }
        }

        // If no saved data or different user, create new user
        setUser({
          id: telegramUser.id,
          first_name: telegramUser.first_name,
          last_name: telegramUser.last_name,
          username: telegramUser.username,
          photo_url: telegramUser.photo_url,
          tokens: 5, // Give new users 5 free tokens
        })
        setLoading(false)
      } else {
        // If running outside Telegram, create a regular user by default
        const mockUserId = 123456789 // Regular user ID (not in admin list)
        setIsAdmin(ADMIN_IDS.includes(mockUserId))

        setUser({
          id: mockUserId,
          first_name: "Test User",
          tokens: 5,
        })
        setLoading(false)
      }
    } else {
      // If Telegram WebApp is not available (e.g., in development)
      const mockUserId = 123456789 // Regular user ID (not in admin list)
      setIsAdmin(ADMIN_IDS.includes(mockUserId))

      setUser({
        id: mockUserId,
        first_name: "Test User",
        tokens: 5,
      })
      setLoading(false)
    }
  }, [])

  const handleRegistrationComplete = (userData: any) => {
    const updatedUser = {
      ...user!,
      ...userData,
      registered: true,
    }

    setUser(updatedUser)
    setShowRegistration(false)
    setShowLanding(false)

    // Add user to all users list
    const allUsers = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || "[]")
    const existingUserIndex = allUsers.findIndex((u: UserState) => u.id === updatedUser.id)

    if (existingUserIndex >= 0) {
      allUsers[existingUserIndex] = updatedUser
    } else {
      allUsers.push(updatedUser)
    }

    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(allUsers))
  }

  const handleStartQuiz = () => {
    setShowLanding(false)
    if (!user?.registered) {
      setShowRegistration(true)
    }
  }

  if (loading) {
    return (
      <motion.div
        className="flex h-screen items-center justify-center maha-ai-gradient telegram-mini-app"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center">
          <Loader2 className="mx-auto h-16 w-16 animate-spin text-white" />
          <p className="mt-4 text-xl font-medium text-white">Loading your profile...</p>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden telegram-mini-app telegram-mini-app-safe-area">
      {/* Enhanced background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"></div>
        <div className="absolute top-0 left-0 w-full h-full hero-pattern opacity-30"></div>
        <div className="blob w-[600px] h-[600px] bg-purple-300/20 top-[-100px] right-[-100px]"></div>
        <div className="blob w-[500px] h-[500px] bg-pink-300/20 bottom-[-100px] left-[-100px]"></div>
        <div className="blob w-[400px] h-[400px] bg-indigo-300/20 top-1/2 left-1/4 -translate-y-1/2"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-white/5 backdrop-blur-[2px]"></div>

        {/* Animated floating shapes */}
        <div
          className="absolute top-[10%] left-[10%] w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 floating"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-[30%] right-[15%] w-8 h-8 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400 opacity-20 floating"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-[20%] left-[20%] w-10 h-10 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 opacity-20 floating"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-[60%] right-[25%] w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 opacity-20 floating"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute bottom-[30%] right-[10%] w-14 h-14 rounded-full bg-gradient-to-r from-violet-400 to-purple-400 opacity-20 floating"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <AnimatePresence mode="wait">
        {showLanding ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            <LandingPage onStart={handleStartQuiz} />
          </motion.div>
        ) : !user ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            <Login onLogin={(userData) => setUser(userData)} />
          </motion.div>
        ) : showRegistration ? (
          <motion.div
            key="registration"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            <Registration user={user} onComplete={handleRegistrationComplete} />
          </motion.div>
        ) : isAdmin ? (
          <motion.div
            key="admin"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            <AdminPanel user={user} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            <Dashboard user={user} setUser={setUser} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
