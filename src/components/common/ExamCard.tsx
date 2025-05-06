
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Exam } from '@/types';
import { Calendar, Clock } from 'lucide-react';

interface ExamCardProps {
  exam: Exam;
  isUpcoming?: boolean;
}

const ExamCard: React.FC<ExamCardProps> = ({ exam, isUpcoming = true }) => {
  // Format dates
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  // Check if exam is active (current date is between start and end dates)
  const isActive = new Date() >= new Date(exam.startDate) && new Date() <= new Date(exam.endDate);

  // Calculate status
  const getStatus = () => {
    if (!isUpcoming) return "Completed";
    if (isActive) return "Active";
    if (new Date() < new Date(exam.startDate)) return "Upcoming";
    return "Ended";
  };

  const status = getStatus();
  
  // Get appropriate variant based on status
  const getBadgeVariant = () => {
    switch (status) {
      case "Active": return "default";
      case "Upcoming": return "secondary";
      case "Ended": return "outline";
      case "Completed": return "outline";
      default: return "outline";
    }
  };

  // Display subject if available
  const subjectInfo = exam.subject ? (
    <div className="flex items-center gap-2 text-xs">
      <span className="font-medium">Subject:</span> {exam.subject}
    </div>
  ) : null;

  return (
    <Card className="h-full">
      <CardHeader className="py-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">{exam.title}</CardTitle>
          <Badge variant={getBadgeVariant()} className="text-xs">{status}</Badge>
        </div>
        <CardDescription className="text-xs mt-1">{exam.description}</CardDescription>
      </CardHeader>
      <CardContent className="py-0">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs">
            <Calendar className="h-3 w-3 text-quiz-purple" />
            <span>Start: {formatDate(exam.startDate)}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Calendar className="h-3 w-3 text-quiz-purple" />
            <span>End: {formatDate(exam.endDate)}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Clock className="h-3 w-3 text-quiz-purple" />
            <span>Duration: {exam.duration} minutes</span>
          </div>
          {subjectInfo}
        </div>
      </CardContent>
      <CardFooter className="pt-2 pb-3">
        <Button 
          asChild 
          className="w-full text-sm py-1 h-8"
          variant={isActive ? "default" : "outline"}
          disabled={!isUpcoming || (!isActive && new Date() < new Date(exam.startDate))}
          size="sm"
        >
          <Link to={`/exams/${exam.id}`}>
            {isActive ? "Take Exam" : isUpcoming ? "View Details" : "View Results"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExamCard;
