
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CurrentAffair } from '@/types';
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowRight, Shield, Calendar, ChevronUp } from 'lucide-react';

interface CurrentAffairCardProps {
  article: CurrentAffair;
  onNext?: () => void;
  isPremium?: boolean;
  fullContent?: boolean;
}

const CurrentAffairCard: React.FC<CurrentAffairCardProps> = ({ article, onNext, isPremium = false, fullContent = false }) => {
  const isMobile = useIsMobile();
  
  // Format date
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(article.publishedDate);

  return (
    <Card className={`overflow-hidden ${fullContent ? 'h-full flex flex-col' : ''}`}>
      {article.imageUrl && (
        <div className={`relative ${fullContent ? 'h-56' : 'h-40'} w-full overflow-hidden`}>
          <img
            src={article.imageUrl}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {isPremium && (
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="bg-amber-400 text-black">
                <Shield className="h-3 w-3 mr-1" /> Premium
              </Badge>
            </div>
          )}
        </div>
      )}
      <CardHeader className={`py-3 ${fullContent ? 'flex-shrink-0' : ''}`}>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="line-clamp-2">{article.title}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <Calendar className="h-3.5 w-3.5 mr-1" /> {formattedDate}
            </CardDescription>
          </div>
          <Badge>{article.category}</Badge>
        </div>
      </CardHeader>
      
      <CardContent className={`py-2 ${fullContent ? 'flex-grow overflow-auto' : ''}`}>
        <p className={`text-sm ${fullContent ? '' : 'line-clamp-3'}`}>
          {article.content}
        </p>
        
        {fullContent && (
          <div className="mt-4 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-white">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        {!fullContent && article.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {article.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
            {article.tags.length > 3 && (
              <Badge variant="outline">+{article.tags.length - 3}</Badge>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className={`pt-2 pb-3 bg-white ${fullContent ? 'flex-shrink-0' : ''}`}>
        {!fullContent ? (
          <Button asChild className="w-full" variant="outline">
            <Link to={`/current-affairs/${article.id}`}>Read More</Link>
          </Button>
        ) : (
          <div className="w-full space-y-2">
            <Button asChild className="w-full" variant="default">
              <Link to={`/current-affairs/${article.id}`}>View Details</Link>
            </Button>
            {onNext && (
              <Button 
                onClick={onNext} 
                className="w-full flex justify-center items-center gap-2" 
                variant="outline"
                size="sm"
              >
                <span>Next Article</span>
                <ChevronUp className="h-4 w-4 rotate-180" />
              </Button>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default CurrentAffairCard;
