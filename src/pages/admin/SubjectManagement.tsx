
import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import MainLayout from '@/layouts/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/components/ui/use-toast';
import { PlusCircle, Edit, Trash } from 'lucide-react';

// In a real app, these would be defined in types/index.ts
interface Class {
  id: string;
  name: string;
}

interface Subject {
  id: string;
  name: string;
  classId: string;
  quizCount: number;
}

const SubjectManagement: React.FC = () => {
  const { toast } = useToast();
  const { classes: appClasses = [] } = useApp();
  
  // Use classes from AppContext instead of hardcoded ones
  const classes = appClasses.length ? appClasses : [
    { id: 'class-1', name: 'Class 1' },
    { id: 'class-2', name: 'Class 2' },
    { id: 'class-3', name: 'Class 3' },
    { id: 'class-4', name: 'Class 4' },
  ];
  
  // Dummy subject data
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: 'subject-1', name: 'Mathematics', classId: 'class-1', quizCount: 5 },
    { id: 'subject-2', name: 'Science', classId: 'class-1', quizCount: 4 },
    { id: 'subject-3', name: 'English', classId: 'class-1', quizCount: 3 },
    { id: 'subject-4', name: 'Social Studies', classId: 'class-1', quizCount: 2 },
    { id: 'subject-5', name: 'Mathematics', classId: 'class-2', quizCount: 6 },
    { id: 'subject-6', name: 'Science', classId: 'class-2', quizCount: 5 },
  ]);
  
  const [newSubjectName, setNewSubjectName] = useState('');
  const [selectedClassId, setSelectedClassId] = useState('');
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [filterClassId, setFilterClassId] = useState('all');
  
  // Filtered subjects based on selected class filter
  const filteredSubjects = filterClassId === 'all'
    ? subjects
    : subjects.filter(s => s.classId === filterClassId);
  
  const handleAddSubject = () => {
    if (!newSubjectName.trim() || !selectedClassId) {
      toast({
        title: "Error",
        description: "Please enter a subject name and select a class",
        variant: "destructive",
      });
      return;
    }
    
    const newSubject = {
      id: `subject-${Date.now()}`,
      name: newSubjectName,
      classId: selectedClassId,
      quizCount: 0,
    };
    
    setSubjects([...subjects, newSubject]);
    setNewSubjectName('');
    toast({
      title: "Success",
      description: `${newSubjectName} has been added`,
    });
  };
  
  const handleEditSubject = (subject: Subject) => {
    setEditingSubject(subject);
    setNewSubjectName(subject.name);
    setSelectedClassId(subject.classId);
  };
  
  const handleSaveEdit = () => {
    if (!editingSubject || !newSubjectName.trim() || !selectedClassId) return;
    
    setSubjects(subjects.map(s => 
      s.id === editingSubject.id 
        ? { ...s, name: newSubjectName, classId: selectedClassId } 
        : s
    ));
    
    setEditingSubject(null);
    setNewSubjectName('');
    setSelectedClassId('');
    toast({
      title: "Success",
      description: "Subject updated successfully",
    });
  };
  
  const handleDeleteSubject = (id: string) => {
    setSubjects(subjects.filter(s => s.id !== id));
    toast({
      title: "Success",
      description: "Subject deleted successfully",
    });
  };

  return (
    <MainLayout>
      <PageHeader
        title="Manage Subjects"
        description="Add, edit, or remove subjects"
      />
      
      <div className="space-y-6">
        {/* Add/Edit Subject Form */}
        <Card>
          <CardHeader>
            <CardTitle>
              {editingSubject ? 'Edit Subject' : 'Add New Subject'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                placeholder="Subject name"
                value={newSubjectName}
                onChange={(e) => setNewSubjectName(e.target.value)}
                className="sm:max-w-xs"
              />
              <Select
                value={selectedClassId}
                onValueChange={setSelectedClassId}
              >
                <SelectTrigger className="sm:max-w-xs">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Button onClick={editingSubject ? handleSaveEdit : handleAddSubject}>
                  {editingSubject ? 'Update' : 'Add Subject'}
                </Button>
                {editingSubject && (
                  <Button variant="outline" onClick={() => {
                    setEditingSubject(null);
                    setNewSubjectName('');
                    setSelectedClassId('');
                  }}>
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Subject List */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Subjects</CardTitle>
            <Select
              value={filterClassId}
              onValueChange={setFilterClassId}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {classes.map((cls) => (
                  <SelectItem key={cls.id} value={cls.id}>
                    {cls.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject Name</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Quizzes</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubjects.map((subject) => (
                  <TableRow key={subject.id}>
                    <TableCell>{subject.name}</TableCell>
                    <TableCell>
                      {classes.find(c => c.id === subject.classId)?.name || 'Unknown'}
                    </TableCell>
                    <TableCell>{subject.quizCount}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleEditSubject(subject)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteSubject(subject.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredSubjects.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4">
                      No subjects found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default SubjectManagement;
