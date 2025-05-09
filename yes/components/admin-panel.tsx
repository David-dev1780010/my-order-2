"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Users, BarChart, FileText, ImageIcon, Search, Trash2, Edit, Save } from "lucide-react"
import { motion } from "framer-motion"

interface AdminPanelProps {
  user: any
}

export default function AdminPanel({ user }: AdminPanelProps) {
  const [allUsers, setAllUsers] = useState<any[]>([])
  const [filteredUsers, setFilteredUsers] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [classFilter, setClassFilter] = useState("")
  const [stats, setStats] = useState({
    totalStudents: 0,
    testsCompleted: 0,
    tokensPurchased: 0,
  })

  // Load all users from storage
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("telegram_quiz_all_users") || "[]")
    setAllUsers(storedUsers)
    setFilteredUsers(storedUsers)

    // Calculate stats
    const totalStudents = storedUsers.length
    let testsCompleted = 0
    let tokensPurchased = 0

    storedUsers.forEach((user: any) => {
      testsCompleted += user.testsCompleted || 0
      // Assuming initial tokens are 5, any additional tokens were purchased
      if (user.tokens > 5) {
        tokensPurchased += user.tokens - 5
      }
    })

    setStats({
      totalStudents,
      testsCompleted,
      tokensPurchased,
    })
  }, [])

  // Filter users based on search term and class filter
  useEffect(() => {
    let filtered = [...allUsers]

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (user) =>
          user.name?.toLowerCase().includes(term) ||
          user.first_name?.toLowerCase().includes(term) ||
          user.username?.toLowerCase().includes(term),
      )
    }

    if (classFilter && classFilter !== "all") {
      filtered = filtered.filter((user) => user.class === classFilter)
    }

    setFilteredUsers(filtered)
  }, [searchTerm, classFilter, allUsers])

  // Handle adding tokens to users
  const handleAddTokens = (userId: number, tokensToAdd: number) => {
    const updatedUsers = allUsers.map((user) => {
      if (user.id === userId) {
        return {
          ...user,
          tokens: (user.tokens || 0) + tokensToAdd,
        }
      }
      return user
    })

    setAllUsers(updatedUsers)
    setFilteredUsers(
      updatedUsers.filter(
        (user) =>
          (searchTerm ? user.name?.toLowerCase().includes(searchTerm.toLowerCase()) : true) &&
          (classFilter && classFilter !== "all" ? user.class === classFilter : true),
      ),
    )

    // Update in localStorage
    localStorage.setItem("telegram_quiz_all_users", JSON.stringify(updatedUsers))

    // If this is the current user, update their data in the user-specific storage too
    const currentUserData = localStorage.getItem("telegram_quiz_user_data")
    if (currentUserData) {
      const currentUser = JSON.parse(currentUserData)
      if (currentUser.id === userId) {
        currentUser.tokens = (currentUser.tokens || 0) + tokensToAdd
        localStorage.setItem("telegram_quiz_user_data", JSON.stringify(currentUser))
      }
    }
  }

  // Handle bulk token addition
  const handleBulkTokens = (classLevel: string, tokensToAdd: number) => {
    if (!tokensToAdd || tokensToAdd <= 0) return

    const updatedUsers = allUsers.map((user) => {
      if (classLevel === "all" || user.class === classLevel) {
        return {
          ...user,
          tokens: (user.tokens || 0) + tokensToAdd,
        }
      }
      return user
    })

    setAllUsers(updatedUsers)
    setFilteredUsers(
      updatedUsers.filter(
        (user) =>
          (searchTerm ? user.name?.toLowerCase().includes(searchTerm.toLowerCase()) : true) &&
          (classFilter && classFilter !== "all" ? user.class === classFilter : true),
      ),
    )

    // Update in localStorage
    localStorage.setItem("telegram_quiz_all_users", JSON.stringify(updatedUsers))

    // Update current user if affected
    const currentUserData = localStorage.getItem("telegram_quiz_user_data")
    if (currentUserData) {
      const currentUser = JSON.parse(currentUserData)
      if (classLevel === "all" || currentUser.class === classLevel) {
        currentUser.tokens = (currentUser.tokens || 0) + tokensToAdd
        localStorage.setItem("telegram_quiz_user_data", JSON.stringify(currentUser))
      }
    }

    alert(`Added ${tokensToAdd} tokens to ${classLevel === "all" ? "all students" : `students in class ${classLevel}`}`)
  }

  return (
    <div className="container mx-auto max-w-5xl p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
          <p className="text-muted-foreground text-lg">
            Welcome, {user.name || user.first_name}. Manage your student quiz application here.
          </p>
        </div>

        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className="grid grid-cols-4 h-14">
            <TabsTrigger value="questions" className="text-lg">
              Questions
            </TabsTrigger>
            <TabsTrigger value="events" className="text-lg">
              Current Events
            </TabsTrigger>
            <TabsTrigger value="students" className="text-lg">
              Students
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-lg">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="questions" className="space-y-6">
            <QuestionManager />
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <EventsManager />
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <StudentsManager
              users={filteredUsers}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              classFilter={classFilter}
              setClassFilter={setClassFilter}
              onAddTokens={handleAddTokens}
              onBulkTokens={handleBulkTokens}
            />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsManager stats={stats} />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

function QuestionManager() {
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [questions, setQuestions] = useState<any[]>([])
  const [question, setQuestion] = useState("")
  const [options, setOptions] = useState(["", "", "", ""])
  const [correctOption, setCorrectOption] = useState<number | null>(null)

  // Load questions from storage
  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem("quiz_questions") || "[]")
    setQuestions(storedQuestions)
  }, [])

  // Handle adding a new question
  const handleAddQuestion = () => {
    if (!selectedClass || !selectedSubject || !question || options.some((opt) => !opt) || correctOption === null) {
      alert("Please fill in all fields")
      return
    }

    const newQuestion = {
      id: Date.now(),
      class: selectedClass,
      subject: selectedSubject,
      question,
      options,
      correctAnswer: options[correctOption],
    }

    const updatedQuestions = [...questions, newQuestion]
    setQuestions(updatedQuestions)
    localStorage.setItem("quiz_questions", JSON.stringify(updatedQuestions))

    // Reset form
    setQuestion("")
    setOptions(["", "", "", ""])
    setCorrectOption(null)

    alert("Question added successfully!")
  }

  // Handle option change
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  return (
    <>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl">Add New Question</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="class" className="text-base">
                Class
              </Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger id="class" className="h-12 text-lg">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num) => (
                    <SelectItem key={num} value={num.toString()} className="text-base">
                      Class {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="subject" className="text-base">
                Subject
              </Label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger id="subject" className="h-12 text-lg">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="math">Mathematics</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                  <SelectItem value="geography">Geography</SelectItem>
                  <SelectItem value="literature">Literature</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="question" className="text-base">
              Question
            </Label>
            <Textarea
              id="question"
              placeholder="Enter your question here"
              className="min-h-[100px] text-lg"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <Label className="text-base">Options</Label>
            <div className="space-y-3">
              {options.map((opt, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Input
                    placeholder={`Option ${index + 1}`}
                    className="h-12 text-lg"
                    value={opt}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                  />
                  <Button
                    variant={correctOption === index ? "default" : "outline"}
                    size="sm"
                    className="shrink-0"
                    onClick={() => setCorrectOption(index)}
                  >
                    Correct
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <Button className="w-full h-12 text-lg" onClick={handleAddQuestion}>
            <PlusCircle className="mr-2 h-5 w-5" />
            Add Question
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl">Manage Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <Select>
              <SelectTrigger className="h-12 text-lg">
                <SelectValue placeholder="Filter by class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num) => (
                  <SelectItem key={num} value={num.toString()} className="text-base">
                    Class {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="h-12 text-lg">
                <SelectValue placeholder="Filter by subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="math">Mathematics</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="history">History</SelectItem>
                <SelectItem value="geography">Geography</SelectItem>
                <SelectItem value="literature">Literature</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {questions.length > 0 ? (
              questions.map((q) => (
                <div key={q.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">{q.question}</h3>
                      <p className="text-sm text-gray-500">
                        Class {q.class} - {q.subject}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-lg text-muted-foreground py-12">
                No questions added yet. Add your first question above.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  )
}

function EventsManager() {
  return (
    <>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl">Add Current Event</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="title" className="text-base">
              Title
            </Label>
            <Input id="title" placeholder="Event title" className="h-12 text-lg" />
          </div>

          <div className="space-y-3">
            <Label htmlFor="content" className="text-base">
              Content
            </Label>
            <Textarea id="content" placeholder="Event content" className="min-h-[200px] text-lg" />
          </div>

          <div className="space-y-3">
            <Label className="text-base">Quiz Questions</Label>
            <div className="space-y-4 border rounded-lg p-4">
              <div className="space-y-3">
                <Input placeholder="Question 1" className="h-12 text-lg" />
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="Option 1" className="h-10" />
                  <Input placeholder="Option 2" className="h-10" />
                  <Input placeholder="Option 3" className="h-10" />
                  <Input placeholder="Option 4" className="h-10" />
                </div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Correct answer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Option 1</SelectItem>
                    <SelectItem value="2">Option 2</SelectItem>
                    <SelectItem value="3">Option 3</SelectItem>
                    <SelectItem value="4">Option 4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" className="w-full">
                <PlusCircle className="mr-2 h-5 w-5" />
                Add Another Question
              </Button>
            </div>
          </div>

          <Button className="w-full h-12 text-lg">
            <FileText className="mr-2 h-5 w-5" />
            Publish Current Event
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl">Manage Current Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-center text-lg text-muted-foreground py-12">
              No current events published yet. Create your first event above.
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

interface StudentsManagerProps {
  users: any[]
  searchTerm: string
  setSearchTerm: (term: string) => void
  classFilter: string
  setClassFilter: (filter: string) => void
  onAddTokens: (userId: number, tokens: number) => void
  onBulkTokens: (classLevel: string, tokens: number) => void
}

function StudentsManager({
  users,
  searchTerm,
  setSearchTerm,
  classFilter,
  setClassFilter,
  onAddTokens,
  onBulkTokens,
}: StudentsManagerProps) {
  const [bulkClass, setBulkClass] = useState("all")
  const [bulkTokens, setBulkTokens] = useState(0)
  const [editingUser, setEditingUser] = useState<number | null>(null)
  const [tokensToAdd, setTokensToAdd] = useState<Record<number, number>>({})

  return (
    <>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl">Manage Students</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-6">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search students..."
                className="pl-10 max-w-sm h-12 text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger className="w-[180px] h-12">
                <SelectValue placeholder="Filter by class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    Class {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {users.length > 0 ? (
            <div className="space-y-4">
              {users.map((student) => (
                <div key={student.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-lg">{student.name || student.first_name}</h3>
                      <p className="text-sm text-gray-500">
                        {student.class ? `Class ${student.class}` : "No class"} •
                        {student.testsCompleted ? ` ${student.testsCompleted} tests completed` : " No tests completed"}{" "}
                        •{` ${student.tokens || 0} tokens`}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {editingUser === student.id ? (
                        <>
                          <Input
                            type="number"
                            min="1"
                            className="w-20 h-10"
                            value={tokensToAdd[student.id] || ""}
                            onChange={(e) =>
                              setTokensToAdd({
                                ...tokensToAdd,
                                [student.id]: Number.parseInt(e.target.value) || 0,
                              })
                            }
                          />
                          <Button
                            size="sm"
                            onClick={() => {
                              onAddTokens(student.id, tokensToAdd[student.id] || 0)
                              setEditingUser(null)
                            }}
                          >
                            <Save className="h-4 w-4 mr-1" /> Save
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingUser(student.id)
                            setTokensToAdd({
                              ...tokensToAdd,
                              [student.id]: 0,
                            })
                          }}
                        >
                          Add Tokens
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border p-8 text-center">
              <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-2xl font-medium mb-2">No Students Found</h3>
              <p className="text-muted-foreground text-lg">
                {searchTerm || classFilter
                  ? "No students match your search criteria. Try adjusting your filters."
                  : "Students will appear here once they register and start using the app."}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl">Bulk Token Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="class" className="text-base">
                Class
              </Label>
              <Select value={bulkClass} onValueChange={setBulkClass}>
                <SelectTrigger id="class" className="h-12 text-lg">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      Class {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="tokens" className="text-base">
                Tokens to Add
              </Label>
              <Input
                id="tokens"
                type="number"
                min="1"
                className="h-12 text-lg"
                value={bulkTokens || ""}
                onChange={(e) => setBulkTokens(Number.parseInt(e.target.value) || 0)}
              />
            </div>
          </div>

          <Button
            className="w-full h-12 text-lg"
            onClick={() => onBulkTokens(bulkClass, bulkTokens)}
            disabled={!bulkTokens || bulkTokens <= 0}
          >
            Add Tokens to Selected Students
          </Button>
        </CardContent>
      </Card>
    </>
  )
}

interface AnalyticsManagerProps {
  stats: {
    totalStudents: number
    testsCompleted: number
    tokensPurchased: number
  }
}

function AnalyticsManager({ stats }: AnalyticsManagerProps) {
  return (
    <>
      <div className="grid grid-cols-3 gap-6 mb-6">
        <Card className="shadow-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-muted-foreground">Total Students</h3>
              <p className="text-4xl font-bold mt-2">{stats.totalStudents}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-muted-foreground">Tests Completed</h3>
              <p className="text-4xl font-bold mt-2">{stats.testsCompleted}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-muted-foreground">Tokens Purchased</h3>
              <p className="text-4xl font-bold mt-2">{stats.tokensPurchased}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl">Performance Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border p-8 text-center">
            <BarChart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-2xl font-medium mb-2">No Data Available</h3>
            <p className="text-muted-foreground text-lg">
              Analytics will be displayed here once students start taking tests.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md mt-6">
        <CardHeader>
          <CardTitle className="text-2xl">Manage Advertisements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="ad-title" className="text-base">
              Advertisement Title
            </Label>
            <Input id="ad-title" placeholder="Enter title" className="h-12 text-lg" />
          </div>

          <div className="space-y-3">
            <Label htmlFor="ad-description" className="text-base">
              Description
            </Label>
            <Textarea id="ad-description" placeholder="Enter description" className="min-h-[100px] text-lg" />
          </div>

          <div className="space-y-3">
            <Label htmlFor="ad-link" className="text-base">
              Link URL
            </Label>
            <Input id="ad-link" placeholder="https://" className="h-12 text-lg" />
          </div>

          <div className="space-y-3">
            <Label className="text-base">Upload Image</Label>
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Upload Advertisement Image</h3>
              <p className="text-muted-foreground mb-4">Drag and drop or click to upload (Recommended: 600x300px)</p>
              <Button variant="outline" className="h-12 text-lg">
                Select Image
              </Button>
            </div>
          </div>

          <Button className="w-full h-12 text-lg">Add Advertisement</Button>
        </CardContent>
      </Card>
    </>
  )
}
