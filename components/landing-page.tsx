"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { BookOpen, Brain, Award, Clock, CheckCircle, Lightbulb, Trophy, Sparkles } from "lucide-react"

interface LandingPageProps {
  onStart: () => void
}

export default function LandingPage({ onStart }: LandingPageProps) {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden maha-ai-gradient py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full hero-pattern"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <motion.div
              className="lg:w-1/2 text-center lg:text-left"
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
            >
              <motion.div variants={fadeInUp} className="mb-2">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-4">
                  <Sparkles className="w-4 h-4 mr-2" /> AI-Powered Quiz Platform
                </div>
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              >
                Welcome to <span className="text-yellow-300 shine">MAHA-AI</span>
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-xl text-white/90 mb-8 max-w-xl mx-auto lg:mx-0">
                An interactive platform for students to test their knowledge, stay updated with current affairs, and
                prepare for exams.
              </motion.p>
              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Button
                  onClick={onStart}
                  size="lg"
                  className="bg-white hover:bg-white/90 text-purple-700 text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 active:translate-y-0 active:scale-95"
                >
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 rounded-full transition-all duration-200 transform hover:-translate-y-1 active:translate-y-0 active:scale-95"
                >
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
            <motion.div
              className="lg:w-1/2 flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative w-full max-w-xl mx-auto">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-[48px] blur opacity-30 animate-pulse"></div>
                <div className="relative bg-white p-8 rounded-[48px] shadow-2xl w-full">
                  <div className="w-full h-64 bg-purple-100 rounded-[32px] mb-6 overflow-hidden flex items-center justify-center">
                    <Brain className="w-32 h-32 text-purple-500 floating" />
                  </div>
                  <div className="space-y-4">
                    <div className="h-6 bg-purple-100 rounded-full w-3/4"></div>
                    <div className="h-4 bg-purple-100 rounded-full"></div>
                    <div className="h-4 bg-purple-100 rounded-full w-5/6"></div>
                    <div className="h-10 bg-purple-500 rounded-full mt-6"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold maha-ai-text-gradient mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started with MAHA-AI in just a few simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: "Register an Account",
                description: "Create your free account to get started with MAHA-AI.",
                icon: <BookOpen className="w-8 h-8 text-white" />,
                color: "bg-purple-500",
              },
              {
                step: 2,
                title: "Choose Your Subjects",
                description: "Select from various subjects based on your class and interests.",
                icon: <Lightbulb className="w-8 h-8 text-white" />,
                color: "bg-pink-500",
              },
              {
                step: 3,
                title: "Take Quizzes & Exams",
                description: "Test your knowledge with interactive quizzes and timed exams.",
                icon: <Clock className="w-8 h-8 text-white" />,
                color: "bg-indigo-500",
              },
              {
                step: 4,
                title: "Track Progress & Earn Rewards",
                description: "Monitor your improvement and earn badges as you advance.",
                icon: <Trophy className="w-8 h-8 text-white" />,
                color: "bg-rose-500",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="step-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 15px 30px -10px rgba(124, 58, 237, 0.2)" }}
              >
                <div className={`step-number ${item.color}`}>{item.step}</div>
                <div className={`feature-icon ${item.color} mx-auto`}>{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">{item.title}</h3>
                <p className="text-gray-600 text-center">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold maha-ai-text-gradient mb-4">Key Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Everything you need to excel in your studies</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Interactive Quizzes",
                description:
                  "Test your knowledge with our diverse collection of interactive quizzes across various subjects.",
                icon: <BookOpen className="w-12 h-12 text-purple-500" />,
              },
              {
                title: "Current Affairs",
                description:
                  "Stay updated with the latest events and test your knowledge with current affairs quizzes.",
                icon: <Lightbulb className="w-12 h-12 text-pink-500" />,
              },
              {
                title: "Scheduled Exams",
                description: "Prepare for upcoming exams with our scheduled test series and practice papers.",
                icon: <Clock className="w-12 h-12 text-indigo-500" />,
              },
              {
                title: "Earn Rewards",
                description:
                  "Earn tokens, badges, and achievements as you progress through quizzes and improve your scores.",
                icon: <Award className="w-12 h-12 text-rose-500" />,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 15px 30px -10px rgba(124, 58, 237, 0.2)" }}
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Quizzes Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold maha-ai-text-gradient mb-4">Featured Quizzes</h2>
              <p className="text-xl text-gray-600">Explore our most popular quizzes</p>
            </div>
            <Button className="mt-4 md:mt-0 maha-ai-gradient text-white rounded-full px-6" onClick={onStart}>
              View All Quizzes
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Mathematics Fundamentals",
                description: "Test your knowledge of basic mathematical concepts and problem-solving skills.",
                image: "bg-purple-200",
                letter: "M",
                tags: ["Mathematics", "Algebra", "Geometry"],
              },
              {
                title: "Science Quiz Challenge",
                description: "Explore the wonders of science with questions on physics, chemistry, and biology.",
                image: "bg-blue-200",
                letter: "S",
                tags: ["Science", "Physics", "Chemistry"],
              },
              {
                title: "History Through the Ages",
                description: "Journey through time with questions about major historical events and figures.",
                image: "bg-amber-200",
                letter: "H",
                tags: ["History", "World Events", "Famous People"],
              },
            ].map((quiz, index) => (
              <motion.div
                key={index}
                className="quiz-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 15px 30px -10px rgba(124, 58, 237, 0.2)" }}
              >
                <div className={`quiz-card-image ${quiz.image} flex items-center justify-center`}>
                  <span className="text-6xl font-bold text-gray-700/50">{quiz.letter}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{quiz.title}</h3>
                  <p className="text-gray-600 mb-4">{quiz.description}</p>
                  <div className="mb-4">
                    {quiz.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button className="w-full maha-ai-gradient text-white" onClick={onStart}>
                    Start Quiz
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 maha-ai-gradient">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start Learning?</h2>
            <div className="flex justify-center gap-8 mb-10">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-2">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <span className="text-white text-lg">Interactive</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-2">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <span className="text-white text-lg">Rewarding</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-2">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <span className="text-white text-lg">Educational</span>
              </div>
            </div>
            <Button
              onClick={onStart}
              size="lg"
              className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 text-xl px-10 py-7 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 active:translate-y-0 active:scale-95"
            >
              Join MAHA-AI Now
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-gray-400">© 2025 MAHA-AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
