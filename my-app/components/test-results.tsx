"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect } from "react"

interface TestResultsProps {
  answers: (string | null)[]
  questions: {
    id: number
    question: string
    options: string[]
    correctAnswer: string
  }[]
  onBack: () => void
}

export default function TestResults({ answers, questions, onBack }: TestResultsProps) {
  // Calculate score
  const correctAnswers = answers.filter((answer, index) => answer === questions[index]?.correctAnswer).length
  const score = Math.round((correctAnswers / questions.length) * 100)

  // Create confetti effect for good scores
  useEffect(() => {
    if (score >= 70) {
      createConfetti()
    }
  }, [score])

  const createConfetti = () => {
    const container = document.body
    const confettiCount = 100

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement("div")
      confetti.className = "confetti"

      // Random position, color, and delay
      confetti.style.left = `${Math.random() * 100}vw`
      confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`
      confetti.style.animationDelay = `${Math.random() * 3}s`

      container.appendChild(confetti)

      // Remove after animation
      setTimeout(() => {
        confetti.remove()
      }, 3000)
    }
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Test Results</h1>

      <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm maha-ai-card border border-white/50 overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-center text-3xl maha-ai-text-gradient">Your Score: {score}%</CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div
            className="mb-6 flex items-center justify-center space-x-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-5xl font-bold maha-ai-text-gradient">{correctAnswers}</div>
            <div className="text-xl text-muted-foreground">correct out of {questions.length}</div>
          </motion.div>

          <div className="space-y-4">
            {questions.map((question, index) => (
              <motion.div
                key={question.id}
                className={`rounded-xl p-5 shadow-sm ${
                  answers[index] === question.correctAnswer
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-start justify-between">
                  <div className="font-medium text-xl">
                    {index + 1}. {question.question}
                  </div>
                  {answers[index] === question.correctAnswer ? (
                    <CheckCircle className="h-7 w-7 text-green-500 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-7 w-7 text-red-500 flex-shrink-0" />
                  )}
                </div>
                <div className="mt-3 text-lg">
                  <div className="text-muted-foreground">Your answer: {answers[index] || "No answer"}</div>
                  <div className="font-medium text-green-600">Correct answer: {question.correctAnswer}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full h-14 text-xl font-medium maha-ai-button rounded-xl"
            onClick={onBack}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            as={motion.button}
          >
            Back to Dashboard
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
