
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronRight, Book, GraduationCap, Layers } from 'lucide-react';

// Dummy class data - in a real app, this would come from API/context
const classes = [
  { id: 'class-1', name: 'Class 1', subjects: 4 },
  { id: 'class-2', name: 'Class 2', subjects: 5 },
  { id: 'class-3', name: 'Class 3', subjects: 6 },
  { id: 'class-4', name: 'Class 4', subjects: 5 },
  { id: 'class-5', name: 'Class 5', subjects: 7 },
  { id: 'class-6', name: 'Class 6', subjects: 8 },
  { id: 'class-7', name: 'Class 7', subjects: 9 },
  { id: 'class-8', name: 'Class 8', subjects: 10 },
];

// Array of gradient classes for cards
const cardGradients = [
  'from-indigo-500 to-purple-500',
  'from-blue-500 to-cyan-500',
  'from-green-500 to-teal-500',
  'from-amber-500 to-orange-500',
  'from-rose-500 to-pink-500',
  'from-violet-500 to-indigo-500',
  'from-cyan-500 to-blue-500',
  'from-fuchsia-500 to-purple-500',
];

const ClassList: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <MainLayout>
      <div className="mb-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-6 shadow-lg">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Choose Your Class</h1>
          <p className="text-white/80 text-sm md:text-base">Select a class to explore subjects and learning materials</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {classes.map((classItem, index) => {
          const gradientClass = cardGradients[index % cardGradients.length];
          
          return (
            <Card key={classItem.id} className="overflow-hidden h-full transform hover:scale-102 transition-all duration-300 border-0 shadow-md">
              <CardHeader className={`bg-gradient-to-r ${gradientClass} p-4 text-white`}>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{classItem.name}</CardTitle>
                  <div className="bg-white/20 p-2 rounded-full">
                    {index % 3 === 0 ? (
                      <Book className="h-6 w-6" />
                    ) : index % 3 === 1 ? (
                      <GraduationCap className="h-6 w-6" />
                    ) : (
                      <Layers className="h-6 w-6" />
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4 pb-2">
                <div className="flex items-center space-x-1 text-sm">
                  <span className="font-medium text-gray-800">Subjects:</span>
                  <span className="font-bold text-indigo-700">{classItem.subjects}</span>
                </div>
                <div className="mt-2 text-xs text-gray-600">
                  Explore detailed lessons and interactive quizzes
                </div>
              </CardContent>
              <CardFooter className="bg-white pt-2 pb-4">
                <Button 
                  asChild 
                  className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white"
                  size="sm"
                >
                  <Link to={`/subjects/${classItem.id}`} className="flex justify-between items-center w-full">
                    <span>View Subjects</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </MainLayout>
  );
};

export default ClassList;
