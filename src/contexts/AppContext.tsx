import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Quiz, CurrentAffair, Exam, QuizResult } from '../types';
import { 
  mockUsers, 
  mockQuizzes, 
  mockCurrentAffairs, 
  mockExams, 
  mockQuizResults 
} from '../data/mockData';
import { toast } from '@/hooks/use-toast';

// Define the Class interface
interface Class {
  id: string;
  name: string;
  subjects: number;
}

interface AppContextType {
  // Auth
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  
  // Data
  quizzes: Quiz[];
  currentAffairs: CurrentAffair[];
  exams: Exam[];
  results: QuizResult[];
  mockUsers: User[];
  classes: Class[]; // Add classes property
  
  // Admin functions
  createQuiz: (quiz: Omit<Quiz, 'id' | 'createdAt'>) => void;
  updateQuiz: (quiz: Quiz) => void;
  deleteQuiz: (id: string) => void;
  createCurrentAffair: (affair: Omit<CurrentAffair, 'id' | 'publishedDate'>) => void;
  updateCurrentAffair: (affair: CurrentAffair) => void;
  deleteCurrentAffair: (id: string) => void;
  createExam: (exam: Omit<Exam, 'id'>) => void;
  updateExam: (exam: Exam) => void;
  deleteExam: (id: string) => void;
  
  // Class management functions
  createClass: (className: string) => void;
  updateClass: (classItem: Class) => void;
  deleteClass: (id: string) => void;
  
  // Student functions
  submitQuizResult: (result: Omit<QuizResult, 'completedAt'>) => void;

  // Token functions
  addTokens: (amount: number) => void;
  consumeTokens: (amount: number) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [quizzes, setQuizzes] = useState<Quiz[]>(mockQuizzes);
  const [currentAffairs, setCurrentAffairs] = useState<CurrentAffair[]>(mockCurrentAffairs);
  const [exams, setExams] = useState<Exam[]>(mockExams);
  const [results, setResults] = useState<QuizResult[]>(mockQuizResults);
  
  // Initialize classes state with dummy data
  const [classes, setClasses] = useState<Class[]>([
    { id: 'class-1', name: 'Class 1', subjects: 4 },
    { id: 'class-2', name: 'Class 2', subjects: 5 },
    { id: 'class-3', name: 'Class 3', subjects: 6 },
    { id: 'class-4', name: 'Class 4', subjects: 5 },
    { id: 'class-5', name: 'Class 5', subjects: 7 },
  ]);
  
  // Auth functions
  const login = async (email: string, password: string): Promise<boolean> => {
    // For demo purposes, override with hardcoded valid credentials
    const validLogins = {
      "admin@example.com": { role: "admin", name: "Admin User", tokens: 50 },
      "student@example.com": { role: "student", name: "Student User", tokens: 10 }
    };
    
    if (email in validLogins) {
      // Create a user object for the valid login
      const userData = validLogins[email as keyof typeof validLogins];
      const user: User = {
        id: `student-${Date.now()}`, // Generate a student ID for new users
        email: email,
        name: userData.name,
        role: userData.role as "admin" | "student",
        tokens: userData.tokens
      };
      
      console.log("User found, logging in:", user);
      setCurrentUser(user);
      return true;
    }
    
    // Fallback to checking mock data if not one of our hardcoded logins
    const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (user) {
      console.log("User found in mock data, logging in:", user);
      setCurrentUser(user);
      return true;
    }
    
    console.log("Login failed, user not found:", email);
    return false;
  };
  
  const logout = () => {
    setCurrentUser(null);
  };
  
  // Token functions
  const addTokens = (amount: number) => {
    if (!currentUser) return;
    
    const updatedUser = {
      ...currentUser,
      tokens: currentUser.tokens + amount
    };
    
    setCurrentUser(updatedUser);
    toast({
      title: "Tokens Added",
      description: `${amount} token${amount !== 1 ? 's' : ''} have been added to your account.`
    });
    
    // If user is in mockUsers, update there too
    const userIndex = mockUsers.findIndex(u => u.id === currentUser.id);
    if (userIndex >= 0) {
      const updatedMockUsers = [...mockUsers];
      updatedMockUsers[userIndex] = {
        ...updatedMockUsers[userIndex],
        tokens: updatedMockUsers[userIndex].tokens + amount
      };
      // We would update the mockUsers state here in a real app
    }
  };
  
  const consumeTokens = (amount: number): boolean => {
    if (!currentUser || currentUser.tokens < amount) return false;
    
    const updatedUser = {
      ...currentUser,
      tokens: currentUser.tokens - amount
    };
    
    setCurrentUser(updatedUser);
    return true;
  };
  
  // Admin functions
  const createQuiz = (quiz: Omit<Quiz, 'id' | 'createdAt'>) => {
    const newQuiz: Quiz = {
      ...quiz,
      id: `quiz-${Date.now()}`,
      createdAt: new Date(),
    };
    setQuizzes([...quizzes, newQuiz]);
  };
  
  const updateQuiz = (quiz: Quiz) => {
    setQuizzes(quizzes.map(q => q.id === quiz.id ? quiz : q));
  };
  
  const deleteQuiz = (id: string) => {
    setQuizzes(quizzes.filter(q => q.id !== id));
  };
  
  const createCurrentAffair = (affair: Omit<CurrentAffair, 'id' | 'publishedDate'>) => {
    const newAffair: CurrentAffair = {
      ...affair,
      id: `affair-${Date.now()}`,
      publishedDate: new Date(),
    };
    setCurrentAffairs([...currentAffairs, newAffair]);
  };
  
  const updateCurrentAffair = (affair: CurrentAffair) => {
    setCurrentAffairs(currentAffairs.map(a => a.id === affair.id ? affair : a));
  };
  
  const deleteCurrentAffair = (id: string) => {
    setCurrentAffairs(currentAffairs.filter(a => a.id !== id));
  };
  
  const createExam = (exam: Omit<Exam, 'id'>) => {
    const newExam: Exam = {
      ...exam,
      id: `exam-${Date.now()}`,
    };
    console.log("Creating new exam:", newExam);
    setExams([...exams, newExam]);
    
    // Show success notification
    toast({
      title: "Exam Scheduled",
      description: `${newExam.title} has been scheduled successfully.`
    });
  };
  
  const updateExam = (exam: Exam) => {
    console.log("Updating exam:", exam);
    setExams(exams.map(e => e.id === exam.id ? exam : e));
    
    // Show success notification
    toast({
      title: "Exam Updated",
      description: `${exam.title} has been updated successfully.`
    });
  };
  
  const deleteExam = (id: string) => {
    setExams(exams.filter(e => e.id !== id));
  };
  
  // Class management functions
  const createClass = (className: string) => {
    if (!className.trim()) return;
    
    const newClass: Class = {
      id: `class-${Date.now()}`,
      name: className,
      subjects: 0,
    };
    
    setClasses([...classes, newClass]);
    toast({
      title: "Class Created",
      description: `${className} has been added successfully.`
    });
  };
  
  const updateClass = (classItem: Class) => {
    setClasses(classes.map(c => c.id === classItem.id ? classItem : c));
    toast({
      title: "Class Updated",
      description: `${classItem.name} has been updated successfully.`
    });
  };
  
  const deleteClass = (id: string) => {
    setClasses(classes.filter(c => c.id !== id));
    toast({
      title: "Class Deleted",
      description: "Class has been deleted successfully."
    });
  };
  
  // Student functions
  const submitQuizResult = (result: Omit<QuizResult, 'completedAt'>) => {
    const newResult: QuizResult = {
      ...result,
      completedAt: new Date(),
    };
    setResults([...results, newResult]);
    
    // Award badges logic is handled in components
    // that display badges based on result scores
    
    // We would display a toast notification here for badges earned
    const percentage = (result.score / result.totalQuestions) * 100;
    if (percentage >= 90) {
      toast({
        title: "Gold Badge Earned!",
        description: "Congratulations! You earned a Gold Badge for this quiz."
      });
    } else if (percentage >= 75) {
      toast({
        title: "Silver Badge Earned!",
        description: "Good job! You earned a Silver Badge for this quiz."
      });
    } else if (percentage >= 50) {
      toast({
        title: "Bronze Badge Earned!",
        description: "Nice work! You earned a Bronze Badge for this quiz."
      });
    }
  };
  
  return (
    <AppContext.Provider
      value={{
        currentUser,
        login,
        logout,
        isAuthenticated: !!currentUser,
        quizzes,
        currentAffairs,
        exams,
        results,
        mockUsers,
        classes, // Add classes to the context value
        createQuiz,
        updateQuiz,
        deleteQuiz,
        createCurrentAffair,
        updateCurrentAffair,
        deleteCurrentAffair,
        createExam,
        updateExam,
        deleteExam,
        createClass,
        updateClass,
        deleteClass,
        submitQuizResult,
        addTokens,
        consumeTokens,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
