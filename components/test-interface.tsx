"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Clock } from "lucide-react"
import TestResults from "@/components/test-results"
import AdDisplay from "@/components/ad-display"
import { motion, AnimatePresence } from "framer-motion"

interface TestInterfaceProps {
  user: any
  setUser: (user: any) => void
  classLevel: string
  subject: string
  onComplete: () => void
  onBack: () => void
}

// Mock questions data
const mockQuestions = [
  {
    id: 1,
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4",
  },
  {
    id: 2,
    question: "Which planet is closest to the sun?",
    options: ["Earth", "Venus", "Mercury", "Mars"],
    correctAnswer: "Mercury",
  },
  {
    id: 3,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Madrid", "Paris"],
    correctAnswer: "Paris",
  },
  {
    id: 4,
    question: "How many sides does a triangle have?",
    options: ["2", "3", "4", "5"],
    correctAnswer: "3",
  },
  {
    id: 5,
    question: "Which of these is not a primary color?",
    options: ["Red", "Blue", "Green", "Yellow"],
    correctAnswer: "Green",
  },
  {
    id: 6,
    question: "What is the chemical symbol for water?",
    options: ["Wa", "H2O", "O2H", "WO"],
    correctAnswer: "H2O",
  },
  {
    id: 7,
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: "William Shakespeare",
  },
  {
    id: 8,
    question: "What is the largest mammal?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: "Blue Whale",
  },
  {
    id: 9,
    question: "How many continents are there?",
    options: ["5", "6", "7", "8"],
    correctAnswer: "7",
  },
  {
    id: 10,
    question: "What is the square root of 64?",
    options: ["6", "8", "10", "12"],
    correctAnswer: "8",
  },
]

export default function TestInterface({ user, setUser, classLevel, subject, onComplete, onBack }: TestInterfaceProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [answers, setAnswers] = useState<(string | null)[]>(Array(user.tokens).fill(null))
  const [timeLeft, setTimeLeft] = useState(10)
  const [showAd, setShowAd] = useState(false)
  const [testComplete, setTestComplete] = useState(false)
  const [outOfTokens, setOutOfTokens] = useState(false)
  const [remainingTokens, setRemainingTokens] = useState(user.tokens)
  const [progress, setProgress] = useState(0)

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Получаем только нужное количество вопросов
  const availableQuestions = mockQuestions.slice(0, user.tokens)

  // Current question
  const currentQuestion = availableQuestions[currentQuestionIndex]

  // Setup timer
  useEffect(() => {
    if (showAd || testComplete || outOfTokens) return

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNextQuestion()
          return 10
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [currentQuestionIndex, showAd, testComplete, outOfTokens])

  // Update progress
  useEffect(() => {
    setProgress((currentQuestionIndex / availableQuestions.length) * 100)
  }, [currentQuestionIndex, availableQuestions.length])

  // Handle answer selection
  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)

    // Update answers array
    const newAnswers = [...answers]
    newAnswers[currentQuestionIndex] = answer
    setAnswers(newAnswers)
  }

  // Handle moving to next question
  const handleNextQuestion = () => {
    if (timerRef.current) clearInterval(timerRef.current)

    // Deduct 1 token per question (1 token = 1 question)
    const newTokens = remainingTokens - 1
    setRemainingTokens(newTokens)

    // Check if out of tokens
    if (newTokens < 0) {
      setOutOfTokens(true)
      return
    }

    // Check if test is complete
    if (currentQuestionIndex >= availableQuestions.length - 1) {
      setTestComplete(true)

      // Update user stats
      const correctAnswers = answers.filter((answer, index) => answer === availableQuestions[index]?.correctAnswer).length
      const score = Math.round((correctAnswers / availableQuestions.length) * 100)

      // Add user to leaderboard data
      const leaderboardData = JSON.parse(localStorage.getItem("leaderboard_data") || "[]")
      leaderboardData.push({
        id: user.id,
        name: user.name || user.first_name,
        class: user.class,
        score: score,
        subject: subject,
        date: new Date().toISOString(),
      })
      localStorage.setItem("leaderboard_data", JSON.stringify(leaderboardData))

      setUser({
        ...user,
        tokens: remainingTokens,
        testsCompleted: (user.testsCompleted || 0) + 1,
        averageScore: user.averageScore ? Math.round((user.averageScore + score) / 2) : score,
        bestSubject: !user.bestSubject ? subject : user.bestSubject,
      })

      return
    }

    // Show ad after every 5 questions
    if ((currentQuestionIndex + 1) % 5 === 0) {
      setShowAd(true)
      return
    }

    // Move to next question
    setCurrentQuestionIndex((prev) => prev + 1)
    setSelectedAnswer(null)
    setTimeLeft(10)
  }

  // Handle ad completion
  const handleAdComplete = () => {
    setShowAd(false)
    setCurrentQuestionIndex((prev) => prev + 1)
    setSelectedAnswer(null)
    setTimeLeft(10)
  }

  // Render ad
  if (showAd) {
    return <AdDisplay onComplete={handleAdComplete} />
  }

  // Render test results
  if (testComplete) {
    return <TestResults answers={answers} questions={availableQuestions} onBack={onComplete} />
  }

  // Render out of tokens message
  if (outOfTokens) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mt-8 border-0 shadow-2xl bg-white/80 backdrop-blur-sm maha-ai-card border border-white/50">
          <CardHeader>
            <CardTitle className="text-center text-2xl text-red-500">Out of Tokens</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-lg">
            <p className="mb-4">You've run out of tokens and cannot continue the test.</p>
            <p className="mb-6">Contact @Mrcoolxaj to purchase more tokens.</p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" onClick={onBack} className="h-12 text-lg rounded-xl">
                Back to Dashboard
              </Button>
              <Button onClick={onComplete} className="h-12 text-lg maha-ai-button rounded-xl">
                View Results
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" className="h-12 w-12 text-gray-800" onClick={onBack}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-800">
          {subject} - Question {currentQuestionIndex + 1}/{availableQuestions.length}
        </h1>
        <div className="rounded-full bg-white/60 backdrop-blur-sm px-4 py-2 text-lg font-medium text-gray-800 border border-white/30">
          {remainingTokens} Tokens
        </div>
      </div>

      <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm p-3 rounded-xl border border-white/30">
        <Clock className="h-6 w-6 text-gray-700" />
        <div className="w-full h-3 bg-white/30 rounded-full overflow-hidden">
          <div className="h-full maha-ai-progress-bar" style={{ width: `${(timeLeft / 10) * 100}%` }}></div>
        </div>
        <span className="text-lg font-medium min-w-[40px] text-gray-800">{timeLeft}s</span>
      </div>

      <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm maha-ai-card border border-white/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl">{currentQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <AnimatePresence mode="wait">
            {currentQuestion.options.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="quiz-option"
              >
                <Button
                  variant={selectedAnswer === option ? "default" : "outline"}
                  className={`w-full justify-start text-left h-14 text-lg rounded-xl ${
                    selectedAnswer === option ? "maha-ai-button" : "border-2"
                  } ${selectedAnswer === option ? "selected" : ""}`}
                  onClick={() => handleAnswerSelect(option)}
                >
                  {option}
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </CardContent>
        <CardFooter>
          <Button className="w-full h-14 text-lg font-medium maha-ai-button rounded-xl" onClick={handleNextQuestion}>
            Next Question
          </Button>
        </CardFooter>
      </Card>

      <div className="w-full bg-white/30 rounded-full h-3 overflow-hidden">
        <div className="maha-ai-progress-bar h-full" style={{ width: `${progress}%` }} />
      </div>
    </motion.div>
  )
}
