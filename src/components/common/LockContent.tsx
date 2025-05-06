
import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TokenService } from '@/services/TokenService';

interface LockContentProps {
  tokenCost?: number;
  children: React.ReactNode;
  title?: string;
  description?: string;
  isPremium?: boolean; // Added isPremium prop
}

const LockContent: React.FC<LockContentProps> = ({ 
  tokenCost = 1, 
  children,
  title = "Locked Content", 
  description = "You need tokens to access this content",
  isPremium = false // Default value
}) => {
  const { currentUser, consumeTokens } = useApp();
  const [unlocked, setUnlocked] = useState(false);
  
  // If content is not premium, show it directly
  if (!isPremium) {
    return <>{children}</>;
  }
  
  const handleUnlock = () => {
    if (consumeTokens(tokenCost)) {
      setUnlocked(true);
    }
  };
  
  if (unlocked) {
    return <>{children}</>;
  }
  
  return (
    <Card className="flex flex-col items-center justify-center p-6 text-center space-y-4">
      <Lock className="h-12 w-12 text-muted-foreground" />
      
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">
        {description}<br />
        <span className="font-semibold">Cost: {tokenCost} token{tokenCost !== 1 ? 's' : ''}</span>
      </p>
      
      <div className="flex flex-col gap-2">
        <Button 
          onClick={handleUnlock}
          disabled={!TokenService.hasEnoughTokens(currentUser, tokenCost)}
        >
          Unlock with {tokenCost} Token{tokenCost !== 1 ? 's' : ''}
        </Button>
        
        <p className="text-sm text-muted-foreground">
          {TokenService.getTokenMessage(currentUser)}
        </p>
      </div>
    </Card>
  );
};

export default LockContent;
