
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import MainLayout from '@/layouts/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import QuizCard from '@/components/common/QuizCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

// Map subjects to quiz categories (for demo purposes)
const subjectCategoryMap: Record<string, string> = {
  'subject-1': 'Mathematics',
  'subject-2': 'Science',
  'subject-3': 'English',
  'subject-4': 'Social Studies',
  'subject-5': 'Mathematics',
  'subject-6': 'Science',
  'subject-7': 'English',
  'subject-8': 'Social Studies',
  'subject-9': 'Hindi',
};

const SubjectQuizzes: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const { quizzes, results, currentUser } = useApp();
  const [search, setSearch] = useState('');
  
  // Get the category name for the subject
  const categoryName = subjectId ? subjectCategoryMap[subjectId] : '';
  
  // Filter quizzes based on subject and search term
  const subjectQuizzes = quizzes.filter(quiz => 
    quiz.category === categoryName && 
    (search === '' || quiz.title.toLowerCase().includes(search.toLowerCase()) || 
     quiz.description.toLowerCase().includes(search.toLowerCase()))
  );
  
  // Get completed quizzes
  const completedQuizIds = results
    .filter(result => result.userId === currentUser?.id)
    .map(result => result.quizId);
  
  const completedQuizzes = subjectQuizzes.filter(quiz => 
    completedQuizIds.includes(quiz.id)
  );
  
  const availableQuizzes = subjectQuizzes.filter(quiz => 
    !completedQuizIds.includes(quiz.id)
  );

  return (
    <MainLayout>
      <PageHeader
        title={`${categoryName} Quizzes`}
        description="Practice and test your knowledge with our collection of quizzes."
      />

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search quizzes by title or description"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Quizzes ({subjectQuizzes.length})</TabsTrigger>
          <TabsTrigger value="available">Available ({availableQuizzes.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedQuizzes.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="pt-6">
          {subjectQuizzes.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">No quizzes found for this subject.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {subjectQuizzes.map((quiz) => (
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
        <TabsContent value="available" className="pt-6">
          {availableQuizzes.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">No available quizzes found.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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
        <TabsContent value="completed" className="pt-6">
          {completedQuizzes.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">No completed quizzes yet.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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
    </MainLayout>
  );
};

export default SubjectQuizzes;
