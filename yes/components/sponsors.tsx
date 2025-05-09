"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

interface SponsorsProps {
  onBack: () => void
}

export default function Sponsors({ onBack }: SponsorsProps) {
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
        <h1 className="ml-3 text-3xl font-bold text-gray-800">Sponsors</h1>
      </div>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.02 }}
      >
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm maha-ai-card border border-white/50">
          <CardHeader className="flex flex-row items-center space-x-5 pb-2">
            <Image
              src="/placeholder.svg?height=120&width=120"
              alt="NeuroClass Bot"
              width={80}
              height={80}
              className="rounded-xl"
            />
            <CardTitle className="text-2xl">NeuroClass Bot</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-lg text-muted-foreground">
              AI-powered educational assistant for students. Get homework help, study materials, and more.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full h-12 text-lg rounded-xl"
              onClick={() => window.open("https://t.me/neuroclassbot", "_blank")}
            >
              <ExternalLink className="mr-3 h-5 w-5" />
              Open Bot
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}>
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm maha-ai-card border border-white/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">Become a Sponsor</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-lg">
              Interested in promoting your educational services to our students? Contact us to learn about our
              sponsorship opportunities.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full h-12 text-lg maha-ai-button rounded-xl"
              onClick={() => window.open("https://t.me/Mrcoolxaj", "_blank")}
            >
              Contact for Sponsorship
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  )
}
