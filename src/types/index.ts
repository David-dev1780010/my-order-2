
export type UserRole = 'admin' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  tokens: number; // Added tokens property
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctOptionIndex: number;
  explanation?: string;
  image?: string;  // Added image property
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  timeLimit: number; // in minutes
  createdAt: Date;
  category: string;
  isPremium?: boolean; // Added isPremium property
}

export interface CurrentAffair {
  id: string;
  title: string;
  content: string;
  category: string;
  publishedDate: Date;
  tags: string[];
  imageUrl?: string;
  isPremium?: boolean; // Added isPremium property
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  quizzes: string[]; // Quiz IDs
  startDate: Date;
  endDate: Date;
  duration: number; // in minutes
  subject?: string; // Added subject field as optional
}

export interface QuizResult {
  quizId: string;
  userId: string;
  score: number;
  totalQuestions: number;
  completedAt: Date;
  timeSpent: number; // in seconds
  answers: number[]; // index of selected options
}

export interface QuizAttempt {
  quizId: string;
  userId: string;
  startedAt: Date;
  completed: boolean;
  currentQuestionIndex: number;
}
