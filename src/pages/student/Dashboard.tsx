
import React, { useMemo, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import MainLayout from '@/layouts/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import DashboardStats from '@/components/common/DashboardStats';
import QuizCard from '@/components/common/QuizCard';
import ExamCard from '@/components/common/ExamCard';
import CurrentAffairCard from '@/components/common/CurrentAffairCard';
import Onboarding from '@/components/student/Onboarding';
import { Button } from '@/components/ui/button';
import { ChevronRight, BookOpen, Target, Award, Smile, Sparkles, Lightbulb } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';

const Dashboard: React.FC = () => {
  const { currentUser, quizzes, exams, currentAffairs, results } = useApp();
  const navigate = useNavigate();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const isMobile = useIsMobile();
  
  // Check for first-time users
  useEffect(() => {
    const onboardingCompleted = localStorage.getItem('onboardingCompleted');
    if (!onboardingCompleted) {
      setShowOnboarding(true);
    }
  }, []);
  
  // Calculate stats for dashboard
  const stats = useMemo(() => {
    // Filter results for current user
    const userResults = results.filter(result => result.userId === currentUser?.id);
    
    // Calculate average score
    const totalScore = userResults.reduce((acc, result) => acc + (result.score / result.totalQuestions) * 100, 0);
    const averageScore = userResults.length > 0 ? Math.round(totalScore / userResults.length) : 0;
    
    // Count upcoming exams (current date is before end date)
    const upcomingExams = exams.filter(exam => new Date() <= exam.endDate).length;
    
    return {
      quizzes: quizzes.length,
      completedQuizzes: userResults.length,
      averageScore,
      upcomingExams,
    };
  }, [currentUser, quizzes, exams, results]);

  // Calculate earned badges
  const badges = useMemo(() => {
    if (!currentUser) return { bronze: 0, silver: 0, gold: 0 };
    
    const userResults = results.filter(result => result.userId === currentUser.id);
    
    // Count badges based on score percentages
    const badgeCounts = userResults.reduce((acc, result) => {
      const percentage = (result.score / result.totalQuestions) * 100;
      if (percentage >= 90) acc.gold += 1;
      else if (percentage >= 75) acc.silver += 1;
      else if (percentage >= 50) acc.bronze += 1;
      return acc;
    }, { bronze: 0, silver: 0, gold: 0 });
    
    return badgeCounts;
  }, [currentUser, results]);

  // Get most recent quizzes, exams, and current affairs
  const recentQuizzes = [...quizzes].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, isMobile ? 2 : 4);
  const upcomingExams = exams.filter(exam => new Date() <= exam.endDate).slice(0, 2);
  const recentCurrentAffairs = [...currentAffairs].sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime()).slice(0, 2);

  if (showOnboarding) {
    return <Onboarding />;
  }

  return (
    <MainLayout>
      <div className="mb-6">
        <div className="bg-gradient-to-r from-quiz-purple/90 to-quiz-purple-dark rounded-lg p-6 shadow-lg">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{`Welcome, ${currentUser?.name}`}</h1>
          <p className="text-white/80 text-sm md:text-base">{!isMobile ? "Track your progress and explore your learning journey" : "Let's learn something new today!"}</p>
        </div>
      </div>
      
      <div className="space-y-6 pb-16 md:pb-0">
        {/* Stats */}
        <DashboardStats stats={stats} userType="student" />
        
        {/* Badges Section */}
        <div className="bg-gradient-to-r from-indigo-600/90 to-violet-500 rounded-lg p-5 mb-4 shadow-md text-white">
          <h3 className="font-bold text-lg mb-3 flex items-center">
            <Sparkles className="mr-2 h-6 w-6 text-yellow-300" />
            Your Achievements
          </h3>
          <div className="flex flex-wrap gap-3">
            {badges.bronze > 0 && (
              <div className="flex flex-col items-center">
                <Badge className="bg-amber-600 text-white px-3 py-1.5 shadow-sm">
                  <Award className="h-4 w-4 mr-1" /> {badges.bronze} Bronze
                </Badge>
              </div>
            )}
            {badges.silver > 0 && (
              <div className="flex flex-col items-center">
                <Badge className="bg-gray-300 text-gray-800 px-3 py-1.5 shadow-sm">
                  <Award className="h-4 w-4 mr-1" /> {badges.silver} Silver
                </Badge>
              </div>
            )}
            {badges.gold > 0 && (
              <div className="flex flex-col items-center">
                <Badge className="bg-yellow-500 text-white px-3 py-1.5 shadow-sm">
                  <Award className="h-4 w-4 mr-1" /> {badges.gold} Gold
                </Badge>
              </div>
            )}
            {badges.bronze === 0 && badges.silver === 0 && badges.gold === 0 && (
              <p className="text-sm text-white/90">Complete quizzes to earn your first badge!</p>
            )}
          </div>
        </div>
        
        {/* Learning Paths Section */}
        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg p-5 mb-4 shadow-md text-white">
          <h3 className="font-bold text-lg mb-2 flex items-center">
            <Target className="mr-2 h-6 w-6" />
            Learning Paths
          </h3>
          <p className="mb-4 text-sm text-white/90">Choose your path to academic excellence</p>
          <div className="grid grid-cols-2 gap-3">
            <Link 
              to="/classes"
              className="flex flex-col items-center p-4 bg-white/20 backdrop-blur-sm rounded-lg shadow-sm hover:bg-white/30 transition-all"
            >
              <BookOpen className="h-8 w-8 text-white mb-2" />
              <span className="text-sm font-medium">By Class</span>
            </Link>
            <Link 
              to="/quizzes"
              className="flex flex-col items-center p-4 bg-white/20 backdrop-blur-sm rounded-lg shadow-sm hover:bg-white/30 transition-all"
            >
              <Award className="h-8 w-8 text-white mb-2" />
              <span className="text-sm font-medium">All Quizzes</span>
            </Link>
          </div>
        </div>
        
        {/* Recent Quizzes */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-indigo-100">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Latest Quizzes
              </h2>
              <Button asChild variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white">
                <Link to="/quizzes" className="flex items-center">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recentQuizzes.map((quiz) => (
                <QuizCard 
                  key={quiz.id} 
                  quiz={quiz} 
                  linkTo={`/quizzes/${quiz.id}`} 
                />
              ))}
              {recentQuizzes.length === 0 && (
                <div className="col-span-2 text-center py-6 text-gray-500">
                  No quizzes available
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Upcoming Exams */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-orange-100">
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Upcoming Exams
              </h2>
              <Button asChild variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white">
                <Link to="/exams" className="flex items-center">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="p-4">
            <div className="grid gap-4">
              {upcomingExams.slice(0, 1).map((exam) => (
                <ExamCard key={exam.id} exam={exam} />
              ))}
              {upcomingExams.length === 0 && (
                <div className="text-center py-6 text-gray-500">
                  No upcoming exams scheduled
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Recent Current Affairs */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-green-100">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white flex items-center">
                <Lightbulb className="h-5 w-5 mr-2" />
                Latest News
              </h2>
              <Button asChild variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white">
                <Link to="/current-affairs" className="flex items-center">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="p-4">
            <div className="grid gap-4">
              {recentCurrentAffairs.slice(0, 1).map((article, index) => (
                <CurrentAffairCard 
                  key={article.id} 
                  article={article} 
                  onNext={index < recentCurrentAffairs.length - 1 ? () => {} : undefined}
                />
              ))}
              {recentCurrentAffairs.length === 0 && (
                <div className="text-center py-6 text-gray-500">
                  No current affairs available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
