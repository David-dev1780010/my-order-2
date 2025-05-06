
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/types';
import { Calendar, Lock, Clock, ChevronRight } from 'lucide-react';

interface QuizCardProps {
  quiz: Quiz;
  linkTo: string;
  isCompleted?: boolean;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, linkTo, isCompleted }) => {
  return (
    <Card className="overflow-hidden h-full hover:shadow-md transition-all border-t-4 border-t-indigo-500">
      <CardHeader className="bg-white py-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-sm">{quiz.title}</CardTitle>
          <div className="flex gap-1">
            {quiz.isPremium && (
              <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200 flex items-center gap-1">
                <Lock className="h-3 w-3" />
                <span>Premium</span>
              </Badge>
            )}
            {isCompleted && (
              <Badge variant="secondary" className="text-xs">
                Completed
              </Badge>
            )}
          </div>
        </div>
        <CardDescription className="flex items-center gap-1 mt-1 text-xs">
          <Clock className="h-3 w-3" />
          <span>{quiz.timeLimit} min</span>
          <span className="mx-1">•</span>
          <span>{quiz.questions.length} Q</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-1 pb-0 text-xs">
        <div className="text-xs text-muted-foreground line-clamp-2 h-8">
          {quiz.description || `${quiz.category} quiz with ${quiz.questions.length} questions`}
        </div>
      </CardContent>
      <CardFooter className="bg-white pt-2 pb-3">
        <Button 
          asChild 
          className="w-full text-xs py-1 h-8 bg-indigo-600 hover:bg-indigo-700" 
          size="sm"
          variant={isCompleted ? "outline" : "default"}
        >
          <Link to={linkTo} className="flex items-center justify-center">
            {isCompleted ? "View Results" : "Start Quiz"}
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizCard;
