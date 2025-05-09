"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { motion } from "framer-motion"
import { Loader2, UserPlus } from "lucide-react"

interface RegistrationProps {
  user: any
  onComplete: (userData: any) => void
}

const interests = [
  { id: "science", label: "Science" },
  { id: "math", label: "Mathematics" },
  { id: "literature", label: "Literature" },
  { id: "history", label: "History" },
  { id: "geography", label: "Geography" },
  { id: "arts", label: "Arts" },
  { id: "computer_science", label: "Computer Science" },
  { id: "physics", label: "Physics" },
  { id: "chemistry", label: "Chemistry" },
  { id: "biology", label: "Biology" },
  { id: "economics", label: "Economics" },
  { id: "foreign_language", label: "Foreign Language" },
]

export default function Registration({ user, onComplete }: RegistrationProps) {
  const [name, setName] = useState(user.first_name || "")
  const [classLevel, setClassLevel] = useState("")
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Auto-increment class level on September 1st
  useEffect(() => {
    const today = new Date()
    if (today.getMonth() === 8 && today.getDate() === 1) {
      // September is month 8 (0-indexed)
      // If we had a database, we would increment all users' class levels here
      console.log("September 1st - Class levels would be incremented")
    }
  }, [])

  const handleInterestChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedInterests([...selectedInterests, id])
    } else {
      setSelectedInterests(selectedInterests.filter((item) => item !== id))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      onComplete({
        name,
        class: classLevel,
        interests: selectedInterests,
      })
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="space-y-2 pb-2">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 maha-ai-gradient rounded-full flex items-center justify-center">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center maha-ai-text-gradient">Create an account</CardTitle>
            <CardDescription className="text-center text-base">
              Enter your details to create a new account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6 pt-4">
              <motion.div
                className="space-y-3"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <Label htmlFor="name" className="text-base">
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-12 text-lg rounded-xl maha-ai-input"
                  placeholder="John Doe"
                />
              </motion.div>

              <motion.div
                className="space-y-3"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <Label htmlFor="class" className="text-base">
                  Class
                </Label>
                <Select value={classLevel} onValueChange={setClassLevel} required>
                  <SelectTrigger id="class" className="h-12 text-lg rounded-xl maha-ai-select">
                    <SelectValue placeholder="Select your class" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num) => (
                      <SelectItem key={num} value={num.toString()} className="text-base">
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
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <Label className="text-base">Interests (Optional)</Label>
                <div className="grid grid-cols-2 gap-3">
                  {interests.map((interest, index) => (
                    <motion.div
                      key={interest.id}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.05, duration: 0.2 }}
                    >
                      <Checkbox
                        id={interest.id}
                        checked={selectedInterests.includes(interest.id)}
                        onCheckedChange={(checked) => handleInterestChange(interest.id, checked as boolean)}
                        className="h-5 w-5 rounded-md data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600 maha-ai-checkbox"
                      />
                      <Label htmlFor={interest.id} className="text-base">
                        {interest.label}
                      </Label>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </CardContent>
            <CardFooter>
              <motion.div className="w-full" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  type="submit"
                  className="w-full h-12 text-lg font-medium maha-ai-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Create account"
                  )}
                </Button>
              </motion.div>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  )
}
