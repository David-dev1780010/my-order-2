
import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { Check, X } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface QuizResultProps {
  quizId: string;
  userId: string;
}

const QuizResult: React.FC<QuizResultProps> = ({ quizId, userId }) => {
  const { results, quizzes } = useApp();
  
  // Find the result
  const result = results.find(r => r.quizId === quizId && r.userId === userId);
  
  // Find the quiz
  const quiz = quizzes.find(q => q.id === quizId);
  
  if (!result || !quiz) {
    return <div>No result found</div>;
  }
  
  const scorePercentage = Math.round((result.score / result.totalQuestions) * 100);
  
  // Format time spent
  const formatTimeSpent = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quiz Result: {quiz.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Score: {result.score}/{result.totalQuestions}</span>
              <span className="text-sm font-medium">{scorePercentage}%</span>
            </div>
            <Progress value={scorePercentage} className="h-2" />
          </div>
          
          <div className="flex justify-between text-sm">
            <div>
              <p className="text-muted-foreground">Time spent</p>
              <p className="font-medium">{formatTimeSpent(result.timeSpent)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Completed on</p>
              <p className="font-medium">{result.completedAt.toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Status</p>
              <p className={`font-medium ${scorePercentage >= 60 ? 'text-green-600' : 'text-red-600'}`}>
                {scorePercentage >= 60 ? 'Passed' : 'Failed'}
              </p>
            </div>
          </div>
          
          <div className="space-y-4 pt-4">
            <h3 className="font-semibold">Question Review</h3>
            
            {quiz.questions.map((question, index) => {
              const selectedAnswer = result.answers[index];
              const isCorrect = selectedAnswer === question.correctOptionIndex;
              
              return (
                <div key={question.id} className="border rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <div className={`mt-1 rounded-full p-1 ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                      {isCorrect ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <X className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{question.text}</p>
                      
                      <div className="mt-2 space-y-1">
                        {question.options.map((option, optIndex) => (
                          <div
                            key={optIndex}
                            className={`p-2 rounded text-sm ${
                              optIndex === question.correctOptionIndex
                                ? 'bg-green-100 text-green-800'
                                : optIndex === selectedAnswer && optIndex !== question.correctOptionIndex
                                ? 'bg-red-100 text-red-800'
                                : 'bg-gray-50'
                            }`}
                          >
                            {option} {optIndex === question.correctOptionIndex && '✓'}
                          </div>
                        ))}
                      </div>
                      
                      {question.explanation && (
                        <p className="mt-2 text-sm text-muted-foreground">{question.explanation}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizResult;
