
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Student Pages
import Dashboard from "./pages/student/Dashboard";
import ClassList from "./pages/student/ClassList";
import SubjectList from "./pages/student/SubjectList";
import SubjectQuizzes from "./pages/student/SubjectQuizzes";
import Quizzes from "./pages/student/Quizzes";
import QuizAttempt from "./pages/student/QuizAttempt";
import CurrentAffairs from "./pages/student/CurrentAffairs";
import CurrentAffairDetail from "./pages/student/CurrentAffairDetail";
import Exams from "./pages/student/Exams";
import Profile from "./pages/student/Profile";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminCurrentAffairs from "./pages/admin/CurrentAffairs";
import AdminCurrentAffairForm from "./pages/admin/CurrentAffairForm";
import AdminUpcomingExams from "./pages/admin/UpcomingExams";
import ExamForm from "./pages/admin/ExamForm"; // Added import for ExamForm
import ClassManagement from "./pages/admin/ClassManagement";
import SubjectManagement from "./pages/admin/SubjectManagement";
import TokenRecharge from "./pages/admin/TokenRecharge";
import AdvertisementManagement from "./pages/admin/AdvertisementManagement";
import StudentManagement from "./pages/admin/StudentManagement";

// Other Pages
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import Onboarding from "./components/student/Onboarding";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/onboarding" element={<Onboarding />} />

            {/* Student Routes */}
            <Route element={<ProtectedRoute allowedRoles={['student']} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* New Quiz Flow */}
              <Route path="/classes" element={<ClassList />} />
              <Route path="/subjects/:classId" element={<SubjectList />} />
              <Route path="/quizzes/subject/:subjectId" element={<SubjectQuizzes />} />
              
              {/* Original Quiz Routes */}
              <Route path="/quizzes" element={<Quizzes />} />
              <Route path="/quizzes/:id" element={<QuizAttempt />} />
              <Route path="/current-affairs" element={<CurrentAffairs />} />
              <Route path="/current-affairs/:id" element={<CurrentAffairDetail />} />
              <Route path="/exams" element={<Exams />} />
              
              {/* Student Profile */}
              <Route path="/profile" element={<Profile />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              
              {/* Class & Subject Management */}
              <Route path="/admin/classes" element={<ClassManagement />} />
              <Route path="/admin/subjects" element={<SubjectManagement />} />
              
              {/* Token Management */}
              <Route path="/admin/tokens" element={<TokenRecharge />} />
              
              {/* Advertisement Management */}
              <Route path="/admin/advertisements" element={<AdvertisementManagement />} />
              
              {/* Current Affairs Routes */}
              <Route path="/admin/current-affairs" element={<AdminCurrentAffairs />} />
              <Route path="/admin/current-affairs/new" element={<AdminCurrentAffairForm />} />
              <Route path="/admin/current-affairs/:id" element={<AdminCurrentAffairForm />} />
              
              {/* Exam Management */}
              <Route path="/admin/exams" element={<AdminUpcomingExams />} />
              <Route path="/admin/exams/new" element={<ExamForm />} />
              <Route path="/admin/exams/:id" element={<ExamForm />} />
              
              {/* Student Management */}
              <Route path="/admin/students" element={<StudentManagement />} />
              
              {/* Other Admin Routes */}
              <Route path="/admin/quizzes" element={<AdminDashboard />} />
              <Route path="/admin/quizzes/new" element={<AdminDashboard />} />
              <Route path="/admin/profile" element={<AdminDashboard />} />
            </Route>

            {/* Redirect root admin path to admin dashboard */}
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            
            {/* Fallback Routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <Sonner />
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
