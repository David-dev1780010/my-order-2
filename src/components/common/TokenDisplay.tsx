
import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface TokenDisplayProps {
  showAddButton?: boolean;
}

const TokenDisplay: React.FC<TokenDisplayProps> = ({ showAddButton = true }) => {
  const { currentUser, addTokens } = useApp();
  
  const handleAddTokens = () => {
    // In a real app, this would be connected to a payment system
    // For demo purposes, we'll just add 5 tokens
    addTokens(5);
  };
  
  if (!currentUser) {
    return null;
  }
  
  return (
    <div className="flex items-center gap-2">
      <Badge variant="outline" className="px-3 py-1">
        <span className="font-semibold">{currentUser.tokens}</span> Token{currentUser.tokens !== 1 ? 's' : ''}
      </Badge>
      
      {showAddButton && (
        <Button variant="outline" size="sm" onClick={handleAddTokens}>
          Add Tokens
        </Button>
      )}
    </div>
  );
};

export default TokenDisplay;
