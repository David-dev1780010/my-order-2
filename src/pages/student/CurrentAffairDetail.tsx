
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Calendar, Tag, BookOpen } from 'lucide-react';
import LockContent from '@/components/common/LockContent';
import TokenDisplay from '@/components/common/TokenDisplay';

const CurrentAffairDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { currentAffairs } = useApp();
  const navigate = useNavigate();
  
  // Find current article and its index
  const currentIndex = currentAffairs.findIndex(a => a.id === id);
  const article = currentAffairs[currentIndex];

  // Determine next and previous articles
  const nextArticle = currentIndex < currentAffairs.length - 1 ? currentAffairs[currentIndex + 1] : null;
  const prevArticle = currentIndex > 0 ? currentAffairs[currentIndex - 1] : null;
  
  if (!article) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-xl font-bold">Article not found</h2>
          <p className="mt-2 text-muted-foreground">The requested article does not exist.</p>
          <Button onClick={() => navigate('/current-affairs')} className="mt-6">
            Back to Current Affairs
          </Button>
        </div>
      </MainLayout>
    );
  }

  // Format date
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(article.publishedDate);

  // Navigate to next or previous article
  const goToArticle = (articleId: string) => {
    navigate(`/current-affairs/${articleId}`);
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-4">
        <Button 
          variant="outline" 
          onClick={() => navigate('/current-affairs')}
          className="border-teal-200 text-teal-700 hover:bg-teal-50"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Current Affairs
        </Button>
        
        <TokenDisplay />
      </div>

      <article className="prose prose-slate max-w-none">
        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-6 rounded-lg mb-6">
          {article.imageUrl && (
            <div className="relative mb-6 h-64 w-full overflow-hidden rounded-lg sm:h-96">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}
          
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <Badge className="bg-teal-600">{article.category}</Badge>
            <div className="flex items-center text-sm text-teal-700">
              <Calendar className="h-3.5 w-3.5 mr-1" /> {formattedDate}
            </div>
            {article.isPremium && (
              <Badge variant="outline" className="border-amber-400 bg-amber-50 text-amber-700">
                Premium Content
              </Badge>
            )}
          </div>
          
          <h1 className="text-3xl font-bold text-teal-900 mb-4">{article.title}</h1>
        </div>
        
        <LockContent
          title="Premium Content"
          description="You need a token to view this current affair article."
          isPremium={article.isPremium}
        >
          <div className="mt-6 space-y-4 bg-white p-6 rounded-lg shadow-sm">
            {article.content.split('\n').map((paragraph, index) => (
              <p key={index} className="leading-relaxed">{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-2 bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center text-sm text-gray-600 mr-2">
              <Tag className="h-4 w-4 mr-1" /> Tags:
            </div>
            {article.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-white">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex justify-between mt-8 bg-gray-50 p-4 rounded-lg">
            {prevArticle ? (
              <Button 
                variant="outline" 
                onClick={() => goToArticle(prevArticle.id)}
                className="flex items-center border-teal-200 text-teal-700 hover:bg-teal-50"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
            ) : <div></div>}
            
            <Button 
              variant="default" 
              onClick={() => navigate('/current-affairs')}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              View All Articles
            </Button>
            
            {nextArticle && (
              <Button 
                variant="outline" 
                onClick={() => goToArticle(nextArticle.id)}
                className="flex items-center border-teal-200 text-teal-700 hover:bg-teal-50"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </LockContent>
      </article>
    </MainLayout>
  );
};

export default CurrentAffairDetail;
