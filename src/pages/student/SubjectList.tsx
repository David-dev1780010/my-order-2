
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronRight } from 'lucide-react';

// Dummy subject data mapping - in a real app, this would come from API/context
const subjectsByClass: Record<string, Array<{ id: string, name: string, quizCount: number }>> = {
  'class-1': [
    { id: 'subject-1', name: 'Mathematics', quizCount: 5 },
    { id: 'subject-2', name: 'Science', quizCount: 4 },
    { id: 'subject-3', name: 'English', quizCount: 3 },
    { id: 'subject-4', name: 'Social Studies', quizCount: 2 },
  ],
  'class-2': [
    { id: 'subject-5', name: 'Mathematics', quizCount: 6 },
    { id: 'subject-6', name: 'Science', quizCount: 5 },
    { id: 'subject-7', name: 'English', quizCount: 4 },
    { id: 'subject-8', name: 'Social Studies', quizCount: 3 },
    { id: 'subject-9', name: 'Hindi', quizCount: 2 },
  ],
  // Add more class subject mappings as needed
};

const SubjectList: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const isMobile = useIsMobile();
  
  // Get subjects for the selected class
  const subjects = classId ? (subjectsByClass[classId] || []) : [];
  
  // Get class name for display
  const className = classId?.split('-')[1] || '';

  return (
    <MainLayout>
      <PageHeader
        title={`Class ${className} Subjects`}
        description="Select a subject to view available quizzes"
      />
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {subjects.map((subject) => (
          <Card key={subject.id} className="overflow-hidden h-full">
            <CardHeader className="bg-slate-50 py-3">
              <CardTitle className="text-base">{subject.name}</CardTitle>
            </CardHeader>
            <CardContent className="pt-2 pb-0 text-xs">
              <div className="mt-2 text-xs text-muted-foreground">
                <strong>Quizzes:</strong> {subject.quizCount}
              </div>
            </CardContent>
            <CardFooter className="bg-white pt-2 pb-3">
              <Button asChild className="w-full text-sm py-1 h-8" size="sm">
                <Link to={`/quizzes/subject/${subject.id}`} className="flex justify-between items-center w-full">
                  <span>View Quizzes</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
};

export default SubjectList;
