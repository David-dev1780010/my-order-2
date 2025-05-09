"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Newspaper } from "lucide-react"
import TestInterface from "@/components/test-interface"
import { motion } from "framer-motion"

interface CurrentEventsProps {
  user: any
  setUser: (user: any) => void
  onBack: () => void
}

export default function CurrentEvents({ user, setUser, onBack }: CurrentEventsProps) {
  const [readingComplete, setReadingComplete] = useState(false)
  const [startQuiz, setStartQuiz] = useState(false)

  // No current events yet
  const hasEvents = false

  if (startQuiz) {
    return (
      <TestInterface
        user={user}
        setUser={setUser}
        classLevel="Current Events"
        subject="Current Events Quiz"
        onComplete={() => {
          setStartQuiz(false)
          setReadingComplete(false)
        }}
        onBack={() => {
          setStartQuiz(false)
          setReadingComplete(false)
        }}
      />
    )
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
        <h1 className="ml-3 text-3xl font-bold text-gray-800">Current Events</h1>
      </div>

      {!hasEvents ? (
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm maha-ai-card border border-white/50">
          <CardContent className="p-12 text-center">
            <Newspaper className="mx-auto h-16 w-16 text-indigo-300 mb-4" />
            <h3 className="text-2xl font-medium mb-3">No Current Events</h3>
            <p className="text-lg text-muted-foreground mb-6">
              Check back soon for the latest current events and quizzes.
            </p>
            <Button variant="outline" onClick={onBack} className="h-12 text-lg rounded-xl">
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm maha-ai-card border border-white/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">New Scientific Discovery in Space Exploration</CardTitle>
              <p className="text-lg text-muted-foreground">May 8, 2023</p>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="prose max-w-none text-lg">
                <p>
                  Scientists have made a groundbreaking discovery that could revolutionize space exploration. The recent
                  findings from the International Space Station suggest that certain microorganisms can survive in the
                  vacuum of space for extended periods.
                </p>
                <p>
                  This discovery has significant implications for our understanding of how life might spread throughout
                  the universe, a concept known as panspermia. It also raises new questions about the potential for
                  contamination during space missions.
                </p>
                <p>
                  The research team, led by Dr. Elena Rodriguez, conducted experiments over a six-month period, exposing
                  various microorganisms to the harsh conditions of space. Surprisingly, several bacterial strains
                  showed remarkable resilience.
                </p>
                <p>
                  "We were astonished by the results," said Dr. Rodriguez. "These findings could change how we approach
                  planetary protection protocols and might even influence our search for extraterrestrial life."
                </p>
                <p>
                  The next phase of research will focus on understanding the mechanisms that allow these organisms to
                  survive and whether they undergo genetic changes during their exposure to space.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={onBack} className="h-12 text-lg rounded-xl">
                Back
              </Button>
              <Button
                onClick={() => setReadingComplete(true)}
                disabled={readingComplete}
                className="h-12 text-lg maha-ai-button rounded-xl"
              >
                {readingComplete ? "Read Complete" : "Mark as Read"}
              </Button>
            </CardFooter>
          </Card>

          {readingComplete && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm maha-ai-card border border-white/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl">Test Your Knowledge</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-lg mb-4">
                    Take a short quiz about the article you just read. Each question will cost 1 token.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="rounded-xl border-2 p-4 bg-white/70">
                      <p className="text-muted-foreground">Available Tokens</p>
                      <p className="text-2xl font-bold maha-ai-text-gradient">{user.tokens}</p>
                    </div>
                    <div className="rounded-xl border-2 p-4 bg-white/70">
                      <p className="text-muted-foreground">Required Tokens</p>
                      <p className="text-2xl font-bold maha-ai-text-gradient">3</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full h-12 text-lg maha-ai-button rounded-xl"
                    onClick={() => setStartQuiz(true)}
                    disabled={user.tokens < 3}
                  >
                    Start Quiz
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  )
}
