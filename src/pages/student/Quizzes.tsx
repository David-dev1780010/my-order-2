
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import MainLayout from '@/layouts/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import QuizCard from '@/components/common/QuizCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ChevronRight, BookOpen, CheckCircle, Clock } from 'lucide-react';

const Quizzes: React.FC = () => {
  const { quizzes, results, currentUser } = useApp();
  const [search, setSearch] = useState('');
  
  // Filter quizzes based on search term
  const filteredQuizzes = quizzes.filter(quiz => 
    quiz.title.toLowerCase().includes(search.toLowerCase()) || 
    quiz.description.toLowerCase().includes(search.toLowerCase()) ||
    quiz.category.toLowerCase().includes(search.toLowerCase())
  );
  
  // Get completed quizzes
  const completedQuizIds = results
    .filter(result => result.userId === currentUser?.id)
    .map(result => result.quizId);
  
  const completedQuizzes = filteredQuizzes.filter(quiz => 
    completedQuizIds.includes(quiz.id)
  );
  
  const availableQuizzes = filteredQuizzes.filter(quiz => 
    !completedQuizIds.includes(quiz.id)
  );

  return (
    <MainLayout>
      <div className="mb-6">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-lg p-6 shadow-lg">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">All Quizzes</h1>
          <p className="text-white/80 text-sm md:text-base">Practice and test your knowledge with our collection of quizzes</p>
        </div>
      </div>

      {/* New Class Selection CTA */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-600 rounded-lg p-5 text-white mb-6 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-bold text-lg mb-2">Browse by Class & Subject</h3>
            <p className="mb-3 md:mb-0 text-sm text-white/90">Find quizzes organized by class and subject for better learning</p>
          </div>
          <Button asChild variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white">
            <Link to="/classes" className="flex items-center">
              Browse Classes <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="relative mb-6 max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search quizzes by title, description or category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-white border-purple-100 focus-visible:ring-purple-500 shadow-sm"
        />
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow-md">
        <Tabs defaultValue="all">
          <TabsList className="w-full grid grid-cols-3 mb-6 bg-purple-50">
            <TabsTrigger value="all" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <BookOpen className="h-4 w-4 mr-1 inline" /> All ({filteredQuizzes.length})
            </TabsTrigger>
            <TabsTrigger value="available" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Clock className="h-4 w-4 mr-1 inline" /> Available ({availableQuizzes.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <CheckCircle className="h-4 w-4 mr-1 inline" /> Completed ({completedQuizzes.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="pt-2">
            {filteredQuizzes.length === 0 ? (
              <div className="bg-slate-50 rounded-lg p-8 text-center">
                <BookOpen className="h-12 w-12 mx-auto text-slate-400 mb-3" />
                <p className="text-slate-500 font-medium">No quizzes found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredQuizzes.map((quiz) => (
                  <QuizCard 
                    key={quiz.id} 
                    quiz={quiz} 
                    linkTo={`/quizzes/${quiz.id}`}
                    isCompleted={completedQuizIds.includes(quiz.id)} 
                  />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="available" className="pt-2">
            {availableQuizzes.length === 0 ? (
              <div className="bg-slate-50 rounded-lg p-8 text-center">
                <Clock className="h-12 w-12 mx-auto text-slate-400 mb-3" />
                <p className="text-slate-500 font-medium">No available quizzes found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {availableQuizzes.map((quiz) => (
                  <QuizCard 
                    key={quiz.id} 
                    quiz={quiz} 
                    linkTo={`/quizzes/${quiz.id}`} 
                  />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="pt-2">
            {completedQuizzes.length === 0 ? (
              <div className="bg-slate-50 rounded-lg p-8 text-center">
                <CheckCircle className="h-12 w-12 mx-auto text-slate-400 mb-3" />
                <p className="text-slate-500 font-medium">No completed quizzes yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {completedQuizzes.map((quiz) => (
                  <QuizCard 
                    key={quiz.id} 
                    quiz={quiz} 
                    linkTo={`/quiz-results/${quiz.id}`} 
                    isCompleted={true}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Quizzes;
