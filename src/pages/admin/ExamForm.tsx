
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';

const ExamForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { exams, createExam, updateExam, quizzes } = useApp();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    quizzes: [] as string[],
    startDate: '',
    endDate: '',
    duration: 60,
  });
  
  const isEditMode = Boolean(id);
  
  // Load exam data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const examToEdit = exams.find(exam => exam.id === id);
      if (examToEdit) {
        setFormData({
          title: examToEdit.title,
          description: examToEdit.description,
          subject: examToEdit.subject || '',
          quizzes: examToEdit.quizzes,
          startDate: format(new Date(examToEdit.startDate), "yyyy-MM-dd'T'HH:mm"),
          endDate: format(new Date(examToEdit.endDate), "yyyy-MM-dd'T'HH:mm"),
          duration: examToEdit.duration,
        });
      }
    }
  }, [id, exams, isEditMode]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate form inputs
      if (!formData.title.trim()) {
        toast({
          title: "Missing Information",
          description: "Please enter a title for the exam",
          variant: "destructive"
        });
        return;
      }
      
      if (!formData.startDate || !formData.endDate) {
        toast({
          title: "Missing Date",
          description: "Please set both start and end dates",
          variant: "destructive"
        });
        return;
      }
      
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      
      if (endDate <= startDate) {
        toast({
          title: "Invalid Date Range",
          description: "End date must be after start date",
          variant: "destructive"
        });
        return;
      }
      
      const examData = {
        title: formData.title,
        description: formData.description,
        subject: formData.subject || undefined,
        quizzes: formData.quizzes,
        startDate: startDate,
        endDate: endDate,
        duration: Number(formData.duration),
      };
      
      if (isEditMode && id) {
        updateExam({ ...examData, id });
        toast({
          title: "Exam Updated",
          description: "The exam has been successfully updated."
        });
      } else {
        createExam(examData);
        toast({
          title: "Exam Created",
          description: "The exam has been successfully scheduled."
        });
      }
      
      navigate('/admin/exams');
    } catch (error) {
      console.error("Error saving exam:", error);
      toast({
        title: "Error",
        description: "There was an error saving the exam. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <MainLayout>
      <PageHeader
        title={isEditMode ? "Edit Exam" : "Schedule New Exam"}
        description={isEditMode 
          ? "Update the details for this exam" 
          : "Create a new exam for students"
        }
      />
      
      <Card>
        <CardHeader>
          <CardTitle>{isEditMode ? "Edit Exam Details" : "New Exam Details"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Exam Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter exam title"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter exam description"
                  rows={3}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="subject">Subject (Optional)</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Enter subject"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="startDate">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      Start Date & Time
                    </div>
                  </Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="datetime-local"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="endDate">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      End Date & Time
                    </div>
                  </Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="datetime-local"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  value={formData.duration}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/admin/exams')}
              >
                Cancel
              </Button>
              <Button type="submit">
                {isEditMode ? "Update Exam" : "Schedule Exam"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default ExamForm;
