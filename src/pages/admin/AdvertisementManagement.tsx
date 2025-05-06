
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Image, Trash2, Plus } from 'lucide-react';

interface Advertisement {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  link?: string;
  placement: 'quiz' | 'dashboard' | 'results';
  isActive: boolean;
}

const AdvertisementManagement: React.FC = () => {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([
    {
      id: '1',
      title: 'Premium Quiz Package',
      description: 'Unlock all premium quizzes with our special offer!',
      imageUrl: 'https://placehold.co/600x400/indigo/white?text=Premium+Quizzes',
      link: '#',
      placement: 'quiz',
      isActive: true
    },
    {
      id: '2',
      title: 'Study Materials',
      description: 'Get access to our comprehensive study materials',
      imageUrl: 'https://placehold.co/600x400/indigo/white?text=Study+Materials',
      link: '#',
      placement: 'dashboard',
      isActive: true
    }
  ]);

  const [newAd, setNewAd] = useState<Omit<Advertisement, 'id'>>({
    title: '',
    description: '',
    imageUrl: '',
    link: '',
    placement: 'quiz',
    isActive: true
  });

  const [isAdding, setIsAdding] = useState(false);

  const handleAddNewAd = () => {
    if (!newAd.title || !newAd.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const newAdWithId: Advertisement = {
      ...newAd,
      id: Date.now().toString()
    };

    setAdvertisements([...advertisements, newAdWithId]);
    setNewAd({
      title: '',
      description: '',
      imageUrl: '',
      link: '',
      placement: 'quiz',
      isActive: true
    });
    setIsAdding(false);

    toast({
      title: "Advertisement Added",
      description: "The advertisement has been successfully added."
    });
  };

  const toggleAdStatus = (id: string) => {
    setAdvertisements(advertisements.map(ad => 
      ad.id === id ? { ...ad, isActive: !ad.isActive } : ad
    ));

    const ad = advertisements.find(ad => ad.id === id);
    toast({
      title: ad?.isActive ? "Advertisement Disabled" : "Advertisement Enabled",
      description: `"${ad?.title}" has been ${ad?.isActive ? "disabled" : "enabled"}.`
    });
  };

  const deleteAd = (id: string) => {
    const ad = advertisements.find(ad => ad.id === id);
    setAdvertisements(advertisements.filter(ad => ad.id !== id));
    toast({
      title: "Advertisement Deleted",
      description: `"${ad?.title}" has been deleted.`,
      variant: "destructive"
    });
  };

  return (
    <MainLayout>
      <PageHeader
        title="Advertisement Management"
        description="Manage advertisements displayed across the platform"
      />

      <div className="space-y-6 mb-20">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium">Current Advertisements</h2>
          {!isAdding && (
            <Button onClick={() => setIsAdding(true)} size="sm" className="bg-indigo-600">
              <Plus className="h-4 w-4 mr-1" /> New Ad
            </Button>
          )}
        </div>

        {isAdding && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">New Advertisement</CardTitle>
              <CardDescription>Create a new advertisement to display on the platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input 
                  id="title" 
                  value={newAd.title}
                  onChange={(e) => setNewAd({...newAd, title: e.target.value})}
                  placeholder="Enter advertisement title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea 
                  id="description"
                  value={newAd.description}
                  onChange={(e) => setNewAd({...newAd, description: e.target.value})}
                  placeholder="Enter advertisement description"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input 
                  id="imageUrl"
                  value={newAd.imageUrl}
                  onChange={(e) => setNewAd({...newAd, imageUrl: e.target.value})}
                  placeholder="Enter image URL (optional)"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="link">Link URL</Label>
                <Input 
                  id="link"
                  value={newAd.link}
                  onChange={(e) => setNewAd({...newAd, link: e.target.value})}
                  placeholder="Enter link URL (optional)"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="placement">Placement *</Label>
                <Select 
                  value={newAd.placement}
                  onValueChange={(value: 'quiz' | 'dashboard' | 'results') => setNewAd({...newAd, placement: value})}
                >
                  <SelectTrigger id="placement">
                    <SelectValue placeholder="Select placement" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quiz">Quiz Screen</SelectItem>
                    <SelectItem value="dashboard">Dashboard</SelectItem>
                    <SelectItem value="results">Results Screen</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Switch 
                  id="isActive" 
                  checked={newAd.isActive}
                  onCheckedChange={(checked) => setNewAd({...newAd, isActive: checked})}
                />
                <Label htmlFor="isActive">Active</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
              <Button onClick={handleAddNewAd} className="bg-indigo-600">Add Advertisement</Button>
            </CardFooter>
          </Card>
        )}
        
        <div className="grid gap-4 grid-cols-1">
          {advertisements.map((ad) => (
            <Card key={ad.id} className={`${!ad.isActive ? 'opacity-70' : ''}`}>
              <CardHeader className="py-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-sm">{ad.title}</CardTitle>
                    <CardDescription className="line-clamp-2 text-xs mt-1">{ad.description}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id={`active-${ad.id}`} 
                      checked={ad.isActive}
                      onCheckedChange={() => toggleAdStatus(ad.id)}
                    />
                    <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => deleteAd(ad.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="py-2">
                <div className="flex items-center text-xs text-muted-foreground space-x-4">
                  <div className="flex items-center space-x-1">
                    <Image className="h-3 w-3" />
                    <span>{ad.imageUrl ? 'Has image' : 'No image'}</span>
                  </div>
                  <div>
                    Placement: <span className="font-medium capitalize">{ad.placement}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {advertisements.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No advertisements added yet
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default AdvertisementManagement;
