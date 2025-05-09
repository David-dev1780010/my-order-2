"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Trophy, Medal, Award } from "lucide-react"
import { motion } from "framer-motion"

interface LeaderboardProps {
  user: any
  onBack: () => void
}

interface LeaderboardEntry {
  id: number
  name: string
  class: string
  score: number
  subject: string
  date: string
}

export default function Leaderboard({ user, onBack }: LeaderboardProps) {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  // User's class
  const userClass = user.class || "all"

  useEffect(() => {
    // Load leaderboard data from localStorage
    const data = JSON.parse(localStorage.getItem("leaderboard_data") || "[]") as LeaderboardEntry[]

    // Load all users from storage
    const allUsers = JSON.parse(localStorage.getItem("telegram_quiz_all_users") || "[]")

    // If we have leaderboard data, use it
    if (data.length > 0) {
      setLeaderboardData(data)
    } else {
      // Otherwise, create leaderboard entries only from real users who have completed tests
      const realUserData: LeaderboardEntry[] = []

      allUsers.forEach((u: any) => {
        if (u.testsCompleted && u.testsCompleted > 0) {
          realUserData.push({
            id: u.id,
            name: u.name || u.first_name,
            class: u.class || "10",
            score: u.averageScore || 80,
            subject: u.bestSubject || "Mathematics",
            date: new Date().toISOString(),
          })
        }
      })

      // Add the current user to the leaderboard if they've completed tests
      if (user.testsCompleted && user.testsCompleted > 0 && !realUserData.some((entry) => entry.id === user.id)) {
        realUserData.push({
          id: user.id,
          name: user.name || user.first_name,
          class: user.class || "10",
          score: user.averageScore || 80,
          subject: user.bestSubject || "Mathematics",
          date: new Date().toISOString(),
        })
      }

      setLeaderboardData(realUserData)

      // Save this real user data to localStorage for future use
      if (realUserData.length > 0) {
        localStorage.setItem("leaderboard_data", JSON.stringify(realUserData))
      }
    }

    setLoading(false)
  }, [user])

  // Filter and sort leaderboard data
  const getLeaderboardByClass = (classFilter: string) => {
    let filtered = [...leaderboardData]

    if (classFilter !== "all") {
      filtered = filtered.filter((entry) => entry.class === classFilter)
    }

    // Sort by score (highest first)
    filtered.sort((a, b) => b.score - a.score)

    // Add rank
    return filtered.map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }))
  }

  const allClassLeaderboard = getLeaderboardByClass("all")
  const myClassLeaderboard = getLeaderboardByClass(userClass)

  // Create a "friends" leaderboard with entries that have the same class as the user
  const friendsLeaderboard = leaderboardData
    .filter((entry) => entry.class === userClass)
    .sort((a, b) => b.score - a.score)
    .map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }))

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
        <h1 className="ml-3 text-3xl font-bold text-gray-800">Leaderboard</h1>
      </div>

      {/* Top 3 Winners Podium */}
      {allClassLeaderboard.length > 0 && (
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <div className="flex justify-center items-end h-48 relative">
            {/* Second Place */}
            {allClassLeaderboard.length > 1 && (
              <motion.div
                className="w-24 mx-2 z-10"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-white shadow-lg overflow-hidden mb-2 border-2 border-gray-200">
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <span className="text-xl font-bold text-gray-700">2</span>
                    </div>
                  </div>
                  <div className="w-full h-28 bg-gray-200 rounded-t-lg flex items-center justify-center">
                    <Medal className="w-8 h-8 text-gray-500 mb-2" />
                  </div>
                  <div className="text-center mt-2 w-full">
                    <p className="font-bold text-sm truncate">{allClassLeaderboard[1]?.name}</p>
                    <p className="text-xs text-gray-600">{allClassLeaderboard[1]?.score}%</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* First Place */}
            {allClassLeaderboard.length > 0 && (
              <motion.div
                className="w-28 mx-2 z-20"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-white shadow-lg overflow-hidden mb-2 border-2 border-yellow-400">
                    <div className="w-full h-full flex items-center justify-center bg-yellow-100">
                      <Trophy className="w-10 h-10 text-yellow-500" />
                    </div>
                  </div>
                  <div className="w-full h-36 maha-ai-gradient rounded-t-lg flex items-center justify-center">
                    <Trophy className="w-10 h-10 text-white mb-2" />
                  </div>
                  <div className="text-center mt-2 w-full">
                    <p className="font-bold truncate">{allClassLeaderboard[0]?.name}</p>
                    <p className="text-sm text-gray-600">{allClassLeaderboard[0]?.score}%</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Third Place */}
            {allClassLeaderboard.length > 2 && (
              <motion.div
                className="w-24 mx-2 z-10"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-white shadow-lg overflow-hidden mb-2 border-2 border-amber-700">
                    <div className="w-full h-full flex items-center justify-center bg-amber-100">
                      <span className="text-xl font-bold text-amber-700">3</span>
                    </div>
                  </div>
                  <div className="w-full h-20 bg-amber-700 rounded-t-lg flex items-center justify-center">
                    <Award className="w-8 h-8 text-white mb-2" />
                  </div>
                  <div className="text-center mt-2 w-full">
                    <p className="font-bold text-sm truncate">{allClassLeaderboard[2]?.name}</p>
                    <p className="text-xs text-gray-600">{allClassLeaderboard[2]?.score}%</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm maha-ai-card border border-white/50">
        <CardContent className="p-6">
          <Tabs defaultValue={userClass !== "all" ? `class-${userClass}` : "all"} className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-14 rounded-xl mb-6">
              <TabsTrigger value="all" className="text-lg rounded-lg maha-ai-tab">
                All Classes
              </TabsTrigger>
              <TabsTrigger value={`class-${userClass}`} className="text-lg rounded-lg maha-ai-tab">
                My Class
              </TabsTrigger>
              <TabsTrigger value="friends" className="text-lg rounded-lg maha-ai-tab">
                Friends
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              {allClassLeaderboard.length > 0 ? (
                <LeaderboardTable entries={allClassLeaderboard} />
              ) : (
                <EmptyLeaderboard title="All Classes" />
              )}
            </TabsContent>

            <TabsContent value={`class-${userClass}`}>
              {myClassLeaderboard.length > 0 ? (
                <LeaderboardTable entries={myClassLeaderboard} />
              ) : (
                <EmptyLeaderboard title={`Class ${userClass}`} />
              )}
            </TabsContent>

            <TabsContent value="friends">
              {friendsLeaderboard.length > 0 ? (
                <LeaderboardTable entries={friendsLeaderboard} />
              ) : (
                <EmptyLeaderboard title="Friends" />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  )
}

interface LeaderboardTableProps {
  entries: (LeaderboardEntry & { rank: number })[]
}

function LeaderboardTable({ entries }: LeaderboardTableProps) {
  return (
    <div className="space-y-4">
      {entries.map((entry, index) => (
        <motion.div
          key={`${entry.id}-${entry.date}`}
          className="flex items-center p-4 border-2 rounded-xl bg-white/70"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.2 }}
          whileHover={{ y: -5, borderColor: "rgba(124, 58, 237, 0.5)" }}
        >
          <div
            className={`flex items-center justify-center h-10 w-10 rounded-full text-white font-bold mr-4 ${
              entry.rank === 1
                ? "bg-yellow-500"
                : entry.rank === 2
                  ? "bg-gray-400"
                  : entry.rank === 3
                    ? "bg-amber-700"
                    : "maha-ai-gradient"
            }`}
          >
            {entry.rank}
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-lg">{entry.name}</h3>
            <p className="text-gray-600">
              {entry.subject} - Class {entry.class}
            </p>
          </div>
          <div className="text-2xl font-bold maha-ai-text-gradient">{entry.score}%</div>
        </motion.div>
      ))}
    </div>
  )
}

interface EmptyLeaderboardProps {
  title: string
}

function EmptyLeaderboard({ title }: EmptyLeaderboardProps) {
  return (
    <div className="text-center py-12">
      <Trophy className="h-16 w-16 text-purple-300 mx-auto mb-4" />
      <h3 className="text-2xl font-medium mb-2">No Data Yet</h3>
      <p className="text-gray-600 text-center text-lg max-w-md mx-auto">
        As more students complete tests, the {title} leaderboard will populate with rankings. Be the first to appear
        here by completing tests!
      </p>
    </div>
  )
}
