"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Award, Trophy, User } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

interface ProfileProps {
  user: any
  onBack: () => void
}

export default function Profile({ user, onBack }: ProfileProps) {
  // Only show stats if user has completed tests
  const hasCompletedTests = user.testsCompleted && user.testsCompleted > 0

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
        <h1 className="ml-3 text-3xl font-bold text-gray-800">My Profile</h1>
      </div>

      <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm maha-ai-card border border-white/50">
        <CardHeader className="pb-2">
          <div className="flex items-center space-x-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-full maha-ai-gradient text-white overflow-hidden shadow-lg">
              {user.photo_url ? (
                <Image
                  src={user.photo_url || "/placeholder.svg"}
                  alt={user.name || user.first_name}
                  width={64}
                  height={64}
                />
              ) : (
                <User className="h-8 w-8" />
              )}
            </div>
            <div>
              <CardTitle className="text-2xl">{user.name || user.first_name}</CardTitle>
              <p className="text-lg text-muted-foreground">
                {user.class ? `Class ${user.class}` : "No class selected"}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              className="rounded-xl border-2 p-4 bg-white/70"
              whileHover={{ scale: 1.03, borderColor: "rgba(99, 102, 241, 0.5)" }}
            >
              <div className="text-base text-muted-foreground">Available Tokens</div>
              <div className="text-3xl font-bold maha-ai-text-gradient">{user.tokens}</div>
            </motion.div>

            <motion.div
              className="rounded-xl border-2 p-4 bg-white/70"
              whileHover={{ scale: 1.03, borderColor: "rgba(99, 102, 241, 0.5)" }}
            >
              <div className="text-base text-muted-foreground">Tests Completed</div>
              <div className="text-3xl font-bold maha-ai-text-gradient">{user.testsCompleted || 0}</div>
            </motion.div>

            {hasCompletedTests && (
              <>
                <motion.div
                  className="rounded-xl border-2 p-4 bg-white/70"
                  whileHover={{ scale: 1.03, borderColor: "rgba(99, 102, 241, 0.5)" }}
                >
                  <div className="text-base text-muted-foreground">Average Score</div>
                  <div className="text-3xl font-bold maha-ai-text-gradient">{user.averageScore || 0}%</div>
                </motion.div>

                {user.bestSubject && (
                  <motion.div
                    className="rounded-xl border-2 p-4 bg-white/70"
                    whileHover={{ scale: 1.03, borderColor: "rgba(99, 102, 241, 0.5)" }}
                  >
                    <div className="text-base text-muted-foreground">Best Subject</div>
                    <div className="text-3xl font-bold maha-ai-text-gradient">{user.bestSubject}</div>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {!hasCompletedTests && (
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm maha-ai-card border border-white/50">
          <CardContent className="p-8 text-center">
            <Trophy className="mx-auto h-16 w-16 text-indigo-300 mb-4" />
            <h3 className="text-2xl font-medium mb-2">No Tests Completed Yet</h3>
            <p className="text-muted-foreground text-lg">
              Complete tests to see your statistics and achievements here.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full h-12 text-lg rounded-xl"
              onClick={onBack}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              as={motion.button}
            >
              Back to Dashboard
            </Button>
          </CardFooter>
        </Card>
      )}

      {hasCompletedTests && (
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm maha-ai-card border border-white/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-2xl">
              <Award className="mr-3 h-6 w-6 text-indigo-500" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-3">
              <motion.div
                className="flex items-center justify-between rounded-xl maha-ai-gradient p-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div>
                  <div className="font-medium text-lg text-white">First Test</div>
                  <div className="text-base text-white/80">Complete your first test</div>
                </div>
                <Trophy className="h-6 w-6 text-white" />
              </motion.div>

              <motion.div
                className="flex items-center justify-between rounded-xl border-2 p-4 bg-white/70"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.02, borderColor: "rgba(99, 102, 241, 0.5)" }}
              >
                <div>
                  <div className="font-medium text-lg">Perfect Score</div>
                  <div className="text-base text-muted-foreground">Get 100% on any test</div>
                </div>
                <div className="rounded-full bg-muted px-3 py-1 text-base">Locked</div>
              </motion.div>

              <motion.div
                className="flex items-center justify-between rounded-xl border-2 p-4 bg-white/70"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02, borderColor: "rgba(99, 102, 241, 0.5)" }}
              >
                <div>
                  <div className="font-medium text-lg">Test Master</div>
                  <div className="text-base text-muted-foreground">Complete 50 tests</div>
                </div>
                <div className="rounded-full bg-muted px-3 py-1 text-base">Locked</div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  )
}
