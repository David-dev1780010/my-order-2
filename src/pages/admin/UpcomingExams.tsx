import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import MainLayout from '@/layouts/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Plus, Edit, Trash2, Clock } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { format, isAfter, isBefore } from 'date-fns';

const AdminUpcomingExams: React.FC = () => {
  const { exams, deleteExam } = useApp();
  const [displayMode, setDisplayMode] = useState<'all' | 'upcoming' | 'past'>('upcoming');
  
  const filteredExams = exams.filter(exam => {
    if (displayMode === 'all') return true;
    if (displayMode === 'upcoming') return isAfter(new Date(exam.startDate), new Date()) || 
                                         isAfter(new Date(exam.endDate), new Date());
    if (displayMode === 'past') return isBefore(new Date(exam.endDate), new Date());
    return true;
  });
  
  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteExam(id);
      toast({
        title: "Exam deleted",
        description: "The exam was successfully deleted."
      });
    }
  };

  const getStatusBadge = (exam: any) => {
    const now = new Date();
    
    if (isBefore(now, new Date(exam.startDate))) {
      return <Badge className="bg-blue-500">Upcoming</Badge>;
    } else if (isBefore(now, new Date(exam.endDate))) {
      return <Badge className="bg-green-500">Active</Badge>;
    } else {
      return <Badge variant="outline">Past</Badge>;
    }
  };

  return (
    <MainLayout>
      <PageHeader
        title="Upcoming Exams"
        description="Schedule and manage upcoming examinations"
      >
        <Button asChild>
          <Link to="/admin/exams/new">
            <Plus className="mr-2 h-4 w-4" />
            Schedule Exam
          </Link>
        </Button>
      </PageHeader>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base sm:text-lg">Exam Schedule</CardTitle>
          <div className="flex gap-2">
            <Button 
              variant={displayMode === 'upcoming' ? "default" : "outline"} 
              size="sm" 
              onClick={() => setDisplayMode('upcoming')}
            >
              Upcoming
            </Button>
            <Button 
              variant={displayMode === 'past' ? "default" : "outline"} 
              size="sm" 
              onClick={() => setDisplayMode('past')}
            >
              Past
            </Button>
            <Button 
              variant={displayMode === 'all' ? "default" : "outline"} 
              size="sm" 
              onClick={() => setDisplayMode('all')}
            >
              All
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-2 sm:px-5">
          {filteredExams.length === 0 ? (
            <div className="py-8 text-center">
              <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
              <h3 className="mt-2 text-lg font-medium">No exams found</h3>
              <p className="text-muted-foreground mt-1">
                {displayMode === 'upcoming' 
                  ? "There are no upcoming exams scheduled." 
                  : displayMode === 'past' 
                    ? "No past exams found." 
                    : "No exams have been added yet."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Exam Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExams.map((exam) => (
                    <TableRow key={exam.id}>
                      <TableCell className="font-medium">{exam.title}</TableCell>
                      <TableCell>{exam.description.substring(0, 30)}...</TableCell>
                      <TableCell>{format(new Date(exam.startDate), 'MMM dd, yyyy')}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                          {exam.duration} mins
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(exam)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="icon" asChild>
                            <Link to={`/admin/exams/${exam.id}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                            onClick={() => handleDelete(exam.id, exam.title)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
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

export default AdminUpcomingExams;
