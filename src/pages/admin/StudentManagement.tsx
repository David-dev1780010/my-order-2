
import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import MainLayout from '@/layouts/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Search, User, Coins, PlusCircle, CreditCard } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const StudentManagement: React.FC = () => {
  const { mockUsers, addTokens } = useApp();
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [tokenAmount, setTokenAmount] = useState(10);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [studentIdForRecharge, setStudentIdForRecharge] = useState('');
  const [rechargeAmount, setRechargeAmount] = useState(10);
  const [activeTab, setActiveTab] = useState('manage');
  
  const students = mockUsers.filter(user => 
    user.role === 'student' && 
    (user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
     user.id.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const handleAddTokens = (studentId: string) => {
    // In a real app, you'd pass both the student ID and the admin as the one adding tokens
    addTokens(tokenAmount);
    toast({
      title: "Tokens Added",
      description: `${tokenAmount} tokens have been added to student ${studentId}.`,
    });
  };

  const handleRechargeByStudentId = () => {
    if (!studentIdForRecharge) {
      toast({
        title: "Error",
        description: "Please enter a valid Student ID",
        variant: "destructive",
      });
      return;
    }

    // Check if student ID exists
    const student = mockUsers.find(user => 
      user.id === studentIdForRecharge && user.role === 'student'
    );

    if (!student) {
      toast({
        title: "Error",
        description: "Student ID not found",
        variant: "destructive",
      });
      return;
    }

    // Add tokens
    addTokens(rechargeAmount);
    toast({
      title: "Tokens Added",
      description: `${rechargeAmount} tokens have been added to ${student.name} (${studentIdForRecharge}).`,
    });

    // Reset form
    setStudentIdForRecharge('');
    setRechargeAmount(10);
  };

  return (
    <MainLayout>
      <PageHeader
        title="Student Management"
        description={!isMobile ? "Manage student accounts and tokens" : ""}
      >
        <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
          <DialogTrigger>
            <PlusCircle className="h-4 w-4 mr-2" /> Add Student
          </DialogTrigger>
        </Button>
      </PageHeader>
      
      <div className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manage">Manage Students</TabsTrigger>
            <TabsTrigger value="recharge">Token Recharge</TabsTrigger>
          </TabsList>
          
          <TabsContent value="manage">
            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                className="pl-10" 
                placeholder="Search by name, email, or student ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Students Table */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <User className="h-5 w-5 mr-2 text-indigo-600" />
                  Students ({students.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {students.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student ID</TableHead>
                          <TableHead>Name</TableHead>
                          {!isMobile && <TableHead>Email</TableHead>}
                          <TableHead>Tokens</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {students.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell className="font-medium">{student.id}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            {!isMobile && <TableCell>{student.email}</TableCell>}
                            <TableCell>{student.tokens}</TableCell>
                            <TableCell>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="flex items-center"
                                    onClick={() => setSelectedStudentId(student.id)}
                                  >
                                    <Coins className="h-4 w-4 mr-1" /> Add Tokens
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Add Tokens for {student.name}</DialogTitle>
                                  </DialogHeader>
                                  <div className="py-4">
                                    <p className="mb-2 text-sm">Current tokens: {student.tokens}</p>
                                    <div className="flex items-center gap-2">
                                      <Input 
                                        type="number" 
                                        value={tokenAmount} 
                                        onChange={(e) => setTokenAmount(parseInt(e.target.value) || 0)}
                                        min="1"
                                      />
                                      <span>tokens</span>
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <DialogClose asChild>
                                      <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <DialogClose asChild>
                                      <Button 
                                        className="bg-indigo-600 hover:bg-indigo-700"
                                        onClick={() => handleAddTokens(student.id)}
                                      >
                                        Add Tokens
                                      </Button>
                                    </DialogClose>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No students found matching your search.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="recharge">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-indigo-600" />
                  Token Recharge by Student ID
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="studentId" className="block text-sm font-medium mb-1">
                      Student ID
                    </label>
                    <Input
                      id="studentId"
                      placeholder="Enter student ID"
                      value={studentIdForRecharge}
                      onChange={(e) => setStudentIdForRecharge(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="tokenAmount" className="block text-sm font-medium mb-1">
                      Token Amount
                    </label>
                    <div className="flex items-center gap-2">
                      <Input 
                        id="tokenAmount"
                        type="number" 
                        value={rechargeAmount} 
                        onChange={(e) => setRechargeAmount(parseInt(e.target.value) || 0)}
                        min="1"
                      />
                      <span className="text-sm text-muted-foreground">tokens</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleRechargeByStudentId}
                    className="w-full bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Coins className="h-4 w-4 mr-2" />
                    Recharge Tokens
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Add Student Dialog */}
      <Dialog>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <Input id="name" placeholder="Enter student name" />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input id="email" type="email" placeholder="Enter student email" />
            </div>
            <div className="space-y-2">
              <label htmlFor="studentId" className="text-sm font-medium">Student ID</label>
              <Input id="studentId" placeholder="Enter student ID (or leave empty to auto-generate)" />
            </div>
            <div className="space-y-2">
              <label htmlFor="initial-tokens" className="text-sm font-medium">Initial Tokens</label>
              <Input id="initial-tokens" type="number" defaultValue="10" min="0" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button className="bg-indigo-600 hover:bg-indigo-700">Add Student</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default StudentManagement;
