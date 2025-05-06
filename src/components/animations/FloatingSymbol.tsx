
import React, { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingSymbolProps {
  isCorrect: boolean;
  show: boolean;
}

const FloatingSymbol: React.FC<FloatingSymbolProps> = ({ isCorrect, show }) => {
  const [symbols, setSymbols] = useState<{ id: number; x: number }[]>([]);

  useEffect(() => {
    if (show) {
      const newSymbols = Array.from({ length: 5 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 80 + 10, // Random X position between 10% and 90%
      }));
      setSymbols(newSymbols);

      const timer = setTimeout(() => {
        setSymbols([]);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {symbols.map((symbol) => (
        <div
          key={symbol.id}
          className={cn(
            "absolute bottom-0 animate-[float_2s_ease-in-out]",
            isCorrect ? "text-green-500" : "text-red-500"
          )}
          style={{ left: `${symbol.x}%` }}
        >
          {isCorrect ? (
            <Check className="w-6 h-6" />
          ) : (
            <X className="w-6 h-6" />
          )}
        </div>
      ))}
    </div>
  );
};

export default FloatingSymbol;
