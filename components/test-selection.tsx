"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, BookOpen } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import TestInterface from "@/components/test-interface"
import { motion } from "framer-motion"

interface TestSelectionProps {
  user: any
  setUser: (user: any) => void
  onBack: () => void
}

// Complete subjects data
const subjects = {
  "1": ["Math", "Reading", "Writing", "Science", "Art"],
  "2": ["Math", "Science", "Reading", "Writing", "Art", "Music"],
  "3": ["Math", "Science", "History", "Reading", "Writing", "Geography", "Art"],
  "4": ["Math", "Science", "History", "Geography", "Reading", "Writing", "Art", "Music"],
  "5": ["Math", "Science", "History", "Geography", "Reading", "Writing", "Foreign Language", "Art"],
  "6": ["Math", "Science", "History", "Geography", "Reading", "Writing", "Foreign Language", "Art", "Music"],
  "7": ["Math", "Science", "History", "Geography", "Reading", "Writing", "Foreign Language", "Computer Science"],
  "8": ["Math", "Science", "History", "Geography", "Reading", "Writing", "Foreign Language", "Computer Science"],
  "9": [
    "Math",
    "Physics",
    "Chemistry",
    "Biology",
    "History",
    "Geography",
    "Literature",
    "Foreign Language",
    "Computer Science",
  ],
  "10": [
    "Math",
    "Physics",
    "Chemistry",
    "Biology",
    "History",
    "Geography",
    "Literature",
    "Foreign Language",
    "Computer Science",
    "Economics",
  ],
  "11": [
    "Math",
    "Physics",
    "Chemistry",
    "Biology",
    "History",
    "Geography",
    "Literature",
    "Foreign Language",
    "Computer Science",
    "Economics",
    "Philosophy",
  ],
}

export default function TestSelection({ user, setUser, onBack }: TestSelectionProps) {
  const [classLevel, setClassLevel] = useState(user.class || "")
  const [subject, setSubject] = useState("")
  const [startTest, setStartTest] = useState(false)
  const [showTestInfo, setShowTestInfo] = useState(false)

  // Get available subjects based on selected class
  const availableSubjects = classLevel ? subjects[classLevel as keyof typeof subjects] || [] : []

  // Test details
  const testQuestions = 10
  const requiredTokens = testQuestions // 1 token = 1 question

  const handleStartTest = () => {
    // Check if user has enough tokens
    if (user.tokens < requiredTokens) {
      alert("You don't have enough tokens to start this test.")
      return
    }

    setStartTest(true)
  }

  if (startTest) {
    return (
      <TestInterface
        user={user}
        setUser={setUser}
        classLevel={classLevel}
        subject={subject}
        onComplete={() => setStartTest(false)}
        onBack={() => setStartTest(false)}
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
        <Button variant="ghost" size="icon" className="h-12 w-12" onClick={onBack}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="ml-3 text-3xl font-bold maha-ai-text-gradient">Start Test</h1>
      </div>

      <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm maha-ai-card border border-white/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl flex items-center">
            <BookOpen className="mr-2 h-6 w-6 text-indigo-500" />
            Select Test
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
          <motion.div
            className="space-y-3"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.2 }}
          >
            <label className="text-lg font-medium">Class</label>
            <Select
              value={classLevel}
              onValueChange={(value) => {
                setClassLevel(value)
                setSubject("")
                setShowTestInfo(false)
              }}
            >
              <SelectTrigger className="h-12 text-lg rounded-xl maha-ai-select">
                <SelectValue placeholder="Select your class" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(subjects).map((num) => (
                  <SelectItem key={num} value={num} className="text-lg">
                    Class {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>

          <motion.div
            className="space-y-3"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.2 }}
          >
            <label className="text-lg font-medium">Subject</label>
            <Select
              value={subject}
              onValueChange={(value) => {
                setSubject(value)
                setShowTestInfo(true)
              }}
              disabled={!classLevel || availableSubjects.length === 0}
            >
              <SelectTrigger className="h-12 text-lg rounded-xl maha-ai-select">
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                {availableSubjects.map((sub) => (
                  <SelectItem key={sub} value={sub} className="text-lg">
                    {sub}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>

          {showTestInfo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.2 }}
            >
              <Alert className="mt-6 bg-indigo-50/80 border-indigo-200 maha-ai-alert backdrop-blur-sm">
                <AlertTitle className="text-xl mb-2 text-indigo-700">Test Information</AlertTitle>
                <AlertDescription className="space-y-3 text-base">
                  <p>
                    <strong>Test:</strong> Class {classLevel} - {subject}
                  </p>
                  <p>
                    <strong>Available Tokens:</strong> {user.tokens}
                  </p>
                  <p>
                    <strong>Questions:</strong> {testQuestions}
                  </p>
                  <p>
                    <strong>Required Tokens:</strong> {requiredTokens} (1 token per question)
                  </p>
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.97 }} className="pt-4">
            <Button
              className="w-full h-14 text-xl font-medium maha-ai-button rounded-xl"
              disabled={!classLevel || !subject || user.tokens < requiredTokens}
              onClick={handleStartTest}
            >
              Start Test
            </Button>
          </motion.div>

          {user.tokens < requiredTokens && classLevel && subject && (
            <motion.p
              className="text-center text-lg text-red-500 font-medium mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.2 }}
            >
              You don't have enough tokens. Please contact @Mrcoolxaj to purchase more tokens.
            </motion.p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
