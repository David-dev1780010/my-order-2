
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdDisplayProps {
  onClose: () => void;
}

const AdDisplay: React.FC<AdDisplayProps> = ({ onClose }) => {
  const [timeLeft, setTimeLeft] = useState(5); // 5 second countdown

  useEffect(() => {
    if (timeLeft <= 0) return;
    
    const timer = setTimeout(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-xs w-full bg-white">
        <CardHeader className="text-center pb-2">
          <CardTitle className="flex items-center justify-center gap-2 text-base">
            <AlertCircle className="w-4 h-4" />
            Advertisement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="h-36 bg-gray-100 rounded-md flex items-center justify-center">
            <p className="text-gray-500 text-sm">Advertisement Content</p>
          </div>
          <div className="flex justify-center items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Continue in {timeLeft}s</span>
          </div>
          <Button 
            onClick={onClose} 
            className="w-full h-8 text-sm"
            disabled={timeLeft > 0}
            size="sm"
          >
            {timeLeft > 0 ? `Wait ${timeLeft}s` : 'Continue Quiz'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdDisplay;
