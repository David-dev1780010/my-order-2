
import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import MainLayout from '@/layouts/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Shield, CheckCircle, Filter } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AdminCurrentAffairs: React.FC = () => {
  const { currentAffairs, deleteCurrentAffair, updateCurrentAffair } = useApp();
  const isMobile = useIsMobile();
  const [filter, setFilter] = useState<'all' | 'premium' | 'free'>('all');

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteCurrentAffair(id);
      toast({
        title: "Current affair deleted",
        description: "The current affair was successfully deleted.",
      });
    }
  };
  
  const togglePremium = (affair: any) => {
    const updatedAffair = {
      ...affair,
      isPremium: !affair.isPremium
    };
    
    updateCurrentAffair(updatedAffair);
    toast({
      title: `${updatedAffair.isPremium ? 'Premium' : 'Free'} content`,
      description: `"${affair.title}" is now ${updatedAffair.isPremium ? 'premium' : 'free'} content.`
    });
  };

  const filteredAffairs = currentAffairs.filter(affair => {
    if (filter === 'all') return true;
    if (filter === 'premium') return affair.isPremium;
    if (filter === 'free') return !affair.isPremium;
    return true;
  });

  return (
    <MainLayout>
      <PageHeader 
        title="Manage Current Affairs"
        description={!isMobile ? "Create and manage current affairs for students" : ""}
      >
        <Button asChild size={isMobile ? "sm" : "default"} className="bg-gradient-to-r from-teal-500 to-emerald-600">
          <Link to="/admin/current-affairs/new">
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Link>
        </Button>
      </PageHeader>

      <Card className="border-t-4 border-t-teal-500">
        <CardHeader className="bg-gradient-to-r from-teal-50 to-emerald-50">
          <div className="flex justify-between items-center">
            <CardTitle className="text-base sm:text-lg text-teal-800">Current Affairs List</CardTitle>
            
            <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
              <SelectTrigger className="w-[160px] text-sm border-teal-200 bg-white">
                <div className="flex items-center">
                  <Filter className="h-3.5 w-3.5 mr-2 text-teal-600" />
                  <SelectValue placeholder="Filter articles" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Articles</SelectItem>
                <SelectItem value="premium">Premium Only</SelectItem>
                <SelectItem value="free">Free Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="px-2 sm:px-5">
          {filteredAffairs.length === 0 ? (
            <p className="text-center py-4 text-muted-foreground">No current affairs have been added yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-teal-50">
                  <TableRow>
                    <TableHead>Title</TableHead>
                    {!isMobile && <TableHead>Category</TableHead>}
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="w-[140px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAffairs.map((affair) => (
                    <TableRow key={affair.id} className="hover:bg-teal-50/30">
                      <TableCell className="font-medium">{affair.title}</TableCell>
                      {!isMobile && <TableCell>{affair.category}</TableCell>}
                      <TableCell>{new Date(affair.publishedDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {affair.isPremium ? (
                          <Badge variant="secondary" className="bg-amber-400 text-black">
                            <Shield className="h-3 w-3 mr-1" /> Premium
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="border-emerald-200 text-emerald-700 bg-emerald-50">
                            <CheckCircle className="h-3 w-3 mr-1" /> Free
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className={affair.isPremium ? 
                              "text-amber-600 border-amber-200 hover:bg-amber-50" : 
                              "text-emerald-600 border-emerald-200 hover:bg-emerald-50"}
                            onClick={() => togglePremium(affair)}
                          >
                            {affair.isPremium ? "Make Free" : "Make Premium"}
                          </Button>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link to={`/admin/current-affairs/${affair.id}`}>
                                  Edit Article
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-destructive focus:text-destructive"
                                onClick={() => handleDelete(affair.id, affair.title)}
                              >
                                Delete Article
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default AdminCurrentAffairs;
