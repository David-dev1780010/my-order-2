
import React, { useEffect, useState } from 'react';
import { Award, PartyPopper, Star, Trophy, Smile, Sparkles, ThumbsUp, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingEmojiProps {
  show: boolean;
  isCorrect?: boolean;
}

const FloatingEmoji: React.FC<FloatingEmojiProps> = ({ show, isCorrect = true }) => {
  const [emojis, setEmojis] = useState<{ id: number; x: number; y: number; type: number; scale: number; delay: number; rotation: number }[]>([]);
  
  useEffect(() => {
    if (show && isCorrect) {
      // Enhanced Telegram style animations with more emojis and better distribution
      const newEmojis = Array.from({ length: 20 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 80 + 10, // Keep emojis more centered horizontally
        y: Math.random() * 80 + 10, // Better vertical distribution
        type: Math.floor(Math.random() * 7), // More variety of emoji types
        scale: Math.random() * 0.6 + 0.8, // Varied scale for dynamic effect
        delay: Math.random() * 700, // Faster animations for better effect
        rotation: (Math.random() * 60 - 30) // Some rotation for natural feel
      }));
      setEmojis(newEmojis);

      const timer = setTimeout(() => {
        setEmojis([]);
      }, 3000); // Slightly longer duration for better effect

      return () => clearTimeout(timer);
    } else {
      // For wrong answers, we don't show any emojis
      setEmojis([]);
    }
  }, [show, isCorrect]);

  if (!show || !isCorrect) return null;

  const getEmoji = (type: number) => {
    switch (type) {
      case 0:
        return <Star className="w-[60px] h-[60px] text-yellow-400 animate-bounce" />;
      case 1:
        return <Trophy className="w-[60px] h-[60px] text-yellow-500 animate-pulse" />;
      case 2:
        return <PartyPopper className="w-[60px] h-[60px] text-purple-500 animate-bounce" />;
      case 3:
        return <Smile className="w-[60px] h-[60px] text-blue-500 animate-pulse" />;
      case 4:
        return <Sparkles className="w-[60px] h-[60px] text-amber-400 animate-bounce" />;
      case 5:
        return <ThumbsUp className="w-[60px] h-[60px] text-green-500 animate-pulse" />;
      case 6:
        return <Heart className="w-[60px] h-[60px] text-red-500 animate-bounce" />;
      default:
        return <Award className="w-[60px] h-[60px] text-green-500 animate-bounce" />;
    }
  };

  return (
    <div className={cn(
      "fixed inset-0 pointer-events-none overflow-hidden z-50",
      "bg-black/20" // Less opacity for better visibility
    )}>
      {emojis.map((emoji) => (
        <div
          key={emoji.id}
          className="absolute animate-float"
          style={{ 
            left: `${emoji.x}%`,
            top: `${emoji.y}%`, 
            transform: `scale(${emoji.scale}) rotate(${emoji.rotation}deg)`,
            animationDelay: `${emoji.delay}ms`,
            animationDuration: '2.5s'
          }}
        >
          {getEmoji(emoji.type)}
        </div>
      ))}
    </div>
  );
};

export default FloatingEmoji;
