"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import Image from "next/image"

interface AdDisplayProps {
  onComplete: () => void
}

// Mock ad data
const mockAd = {
  title: "NeuroClass Bot",
  description: "Get homework help, study materials, and AI-powered assistance for all your educational needs!",
  image: "/placeholder.svg?height=300&width=600",
  cta: "Try Now",
  link: "https://t.me/neuroclassbot",
}

export default function AdDisplay({ onComplete }: AdDisplayProps) {
  const [progress, setProgress] = useState(0)
  const [canSkip, setCanSkip] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setCanSkip(true)
          return 100
        }
        return prev + 2.5
      })
    }, 100)

    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      className="flex min-h-[80vh] flex-col items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5, type: "spring" }}>
        <Card className="w-full max-w-lg border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-center text-2xl">Sponsored Message</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-6 pt-4">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
              <Image
                src={mockAd.image || "/placeholder.svg"}
                alt={mockAd.title}
                width={600}
                height={300}
                className="rounded-xl"
              />
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold gradient-text">{mockAd.title}</h3>
              <p className="mt-3 text-lg text-muted-foreground">{mockAd.description}</p>
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="h-12 text-lg gradient-bg rounded-xl" asChild>
                <a href={mockAd.link} target="_blank" rel="noopener noreferrer">
                  {mockAd.cta}
                </a>
              </Button>
            </motion.div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-3">
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="progress-bar h-full" style={{ width: `${progress}%` }} />
            </div>
            <Button
              variant="outline"
              className="w-full h-12 text-lg rounded-xl"
              disabled={!canSkip}
              onClick={onComplete}
            >
              {canSkip ? "Continue to Quiz" : `Wait ${Math.ceil(((100 - progress) / 2.5) * 0.1)} seconds...`}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  )
}
