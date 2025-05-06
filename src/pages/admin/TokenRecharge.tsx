
import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import MainLayout from '@/layouts/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from '@/components/ui/use-toast';
import { Search, PlusCircle, Ban, Wallet } from 'lucide-react';

const TokenRecharge: React.FC = () => {
  const { toast } = useToast();
  const { mockUsers } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [tokenAmount, setTokenAmount] = useState('');
  
  // Filter students (only show students)
  const students = mockUsers.filter(user => 
    user.role === 'student' && 
    (searchTerm === '' || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.id.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  // Get the selected student
  const selectedStudent = mockUsers.find(user => user.id === selectedStudentId);
  
  const handleRechargeTokens = () => {
    if (!selectedStudentId) {
      toast({
        title: "Error",
        description: "Please select a student",
        variant: "destructive",
      });
      return;
    }
    
    if (!tokenAmount || parseInt(tokenAmount) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid token amount",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would call an API to add tokens to the student's account
    toast({
      title: "Success",
      description: `Added ${tokenAmount} tokens to ${selectedStudent?.name}'s account`,
    });
    
    // Reset the form
    setTokenAmount('');
  };

  return (
    <MainLayout>
      <PageHeader
        title="Token Recharge"
        description="Add tokens to student accounts"
      />
      
      <div className="space-y-6">
        {/* Token Recharge Form */}
        <Card>
          <CardHeader>
            <CardTitle>Recharge Student Tokens</CardTitle>
            <CardDescription>Select a student and add tokens to their account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-1/2">
                  <label className="text-sm font-medium mb-1 block">Select Student</label>
                  <Select
                    value={selectedStudentId}
                    onValueChange={setSelectedStudentId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a student" />
                    </SelectTrigger>
                    <SelectContent>
                      {students.map(student => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.name} (ID: {student.id})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-full sm:w-1/4">
                  <label className="text-sm font-medium mb-1 block">Token Amount</label>
                  <Input 
                    type="number"
                    placeholder="Enter amount"
                    value={tokenAmount}
                    onChange={(e) => setTokenAmount(e.target.value)}
                    min="1"
                  />
                </div>
                
                <div className="w-full sm:w-1/4 flex items-end">
                  <Button 
                    onClick={handleRechargeTokens} 
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600"
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    Recharge Tokens
                  </Button>
                </div>
              </div>
              
              {selectedStudent && (
                <div className="mt-4 p-3 bg-slate-50 rounded-md">
                  <h3 className="font-medium mb-1">Selected Student Details</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <p>Name: <span className="font-medium">{selectedStudent.name}</span></p>
                    <p>ID: <span className="font-medium">{selectedStudent.id}</span></p>
                    <p>Email: <span className="font-medium">{selectedStudent.email}</span></p>
                    <p>Current Balance: <span className="font-medium">100 tokens</span></p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Student List */}
        <Card>
          <CardHeader>
            <CardTitle>Student List</CardTitle>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Token Balance</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.length > 0 ? students.map(student => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>100 tokens</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => {
                          setSelectedStudentId(student.id);
                          setTokenAmount('10'); // Set default amount
                        }}
                      >
                        <PlusCircle className="h-4 w-4 mr-1" />
                        Add Tokens
                      </Button>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      No students found
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

export default TokenRecharge;
