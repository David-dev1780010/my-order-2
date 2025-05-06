
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy } from 'lucide-react';

interface ScoreBoardProps {
  score: number;
  totalQuestions: number;
  timeSpent: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, totalQuestions, timeSpent }) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  return (
    <Card className="max-w-md mx-auto bg-white shadow-xl">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
          <Trophy className="w-8 h-8 text-yellow-500" />
          Quiz Complete!
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center space-y-2">
          <div className="text-4xl font-bold text-quiz-purple">
            {score}/{totalQuestions}
          </div>
          <div className="text-lg text-gray-600">
            Score: {percentage}%
          </div>
        </div>
        
        <div className="text-center text-gray-600">
          Time taken: {Math.floor(timeSpent / 60)}m {timeSpent % 60}s
        </div>
        
        <div className={`text-center text-lg font-semibold ${percentage >= 70 ? 'text-green-600' : 'text-quiz-purple'}`}>
          {percentage >= 70 ? 'Great job! 🎉' : 'Keep practicing! 💪'}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScoreBoard;
