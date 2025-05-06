import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import MainLayout from '@/layouts/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import DashboardStats from '@/components/common/DashboardStats';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  BookOpen, Calendar, Activity, Users, BookOpenCheck, BookmarkPlus, GraduationCap,
  Wallet, CreditCard
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const AdminDashboard: React.FC = () => {
  const { currentUser, quizzes, exams, currentAffairs, results, mockUsers } = useApp();
  const isMobile = useIsMobile();

  // Calculate stats for dashboard
  const stats = useMemo(() => {
    // Count students
    const studentCount = mockUsers.filter(user => user.role === 'student').length;
    
    // Count upcoming exams (current date is before end date)
    const upcomingExams = exams.filter(exam => new Date() <= exam.endDate).length;
    
    // Count premium vs free content
    const premiumContent = quizzes.filter(quiz => quiz.isPremium).length + 
                          currentAffairs.filter(article => article.isPremium).length;
    const freeContent = quizzes.filter(quiz => !quiz.isPremium).length + 
                        currentAffairs.filter(article => !article.isPremium).length;
    
    // Calculate active users (this would normally come from real analytics)
    const activeUsers = Math.round(studentCount * 0.65);
    
    // Calculate completion rate
    const completionRate = results.length > 0 ? 
      Math.round((results.length / (quizzes.length * studentCount)) * 100) : 0;
    
    return {
      quizzes: quizzes.length,
      students: studentCount,
      currentAffairs: currentAffairs.length,
      upcomingExams,
      premiumContent,
      freeContent,
      activeUsers,
      completionRate,
    };
  }, [quizzes, exams, currentAffairs, mockUsers, results]);

  // Get recent activity (quiz results)
  const recentResults = [...results].sort((a, b) => 
    new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
  ).slice(0, 5);

  return (
    <MainLayout>
      <PageHeader
        title={`Admin Dashboard`}
        description={!isMobile ? "Manage your quizzes, exams, and monitor student performance." : ""}
      >
        <div className="flex gap-2">
          <Button asChild size={isMobile ? "sm" : "default"} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
            <Link to="/admin/quizzes/new">Create Quiz</Link>
          </Button>
          <Button asChild variant="outline" size={isMobile ? "sm" : "default"}>
            <Link to="/admin/exams/new">Schedule Exam</Link>
          </Button>
        </div>
      </PageHeader>
      
      <div className="space-y-6">
        {/* Stats */}
        <DashboardStats stats={stats} userType="admin" />
        
        {/* Main Admin Features */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <Card className="hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-indigo-600" />
                Classes
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 pb-3">
              <p className="text-xs text-muted-foreground mb-2">Manage class structure</p>
              <Button asChild size="sm" className="w-full bg-indigo-600 hover:bg-indigo-700">
                <Link to="/admin/classes">Manage Classes</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <BookOpenCheck className="h-4 w-4 text-indigo-600" />
                Subjects
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 pb-3">
              <p className="text-xs text-muted-foreground mb-2">Manage subjects by class</p>
              <Button asChild size="sm" className="w-full bg-indigo-600 hover:bg-indigo-700">
                <Link to="/admin/subjects">Manage Subjects</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <BookmarkPlus className="h-4 w-4 text-indigo-600" />
                Quizzes
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 pb-3">
              <p className="text-xs text-muted-foreground mb-2">Create and edit quizzes</p>
              <Button asChild size="sm" className="w-full bg-indigo-600 hover:bg-indigo-700">
                <Link to="/admin/quizzes">Manage Quizzes</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-indigo-600" />
                Current Affairs
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 pb-3">
              <p className="text-xs text-muted-foreground mb-2">Add news articles</p>
              <Button asChild size="sm" className="w-full bg-indigo-600 hover:bg-indigo-700">
                <Link to="/admin/current-affairs">Manage News</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-all bg-gradient-to-r from-emerald-50 to-green-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Wallet className="h-4 w-4 text-emerald-600" />
                Token Recharge
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 pb-3">
              <p className="text-xs text-muted-foreground mb-2">Add tokens to student accounts</p>
              <Button asChild size="sm" className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700">
                <Link to="/admin/tokens">Manage Tokens</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Users className="h-4 w-4 text-indigo-600" />
                Students
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 pb-3">
              <p className="text-xs text-muted-foreground mb-2">Manage student accounts</p>
              <Button asChild size="sm" className="w-full bg-indigo-600 hover:bg-indigo-700">
                <Link to="/admin/students">Manage Students</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Calendar className="h-4 w-4 text-indigo-600" />
                Upcoming Exams
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 pb-3">
              <p className="text-xs text-muted-foreground mb-2">Manage exam schedules</p>
              <Button asChild size="sm" className="w-full bg-indigo-600 hover:bg-indigo-700">
                <Link to="/admin/exams">View Exams</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Activity className="h-5 w-5 text-indigo-600" />
              Recent Quiz Submissions
            </CardTitle>
            {!isMobile && <CardDescription>Latest quiz results from students</CardDescription>}
          </CardHeader>
          <CardContent className="overflow-x-auto">
            {recentResults.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No recent submissions</p>
            ) : (
              <div className="w-full overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Quiz</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentResults.map((result) => {
                      const quiz = quizzes.find(q => q.id === result.quizId);
                      const student = mockUsers.find(u => u.id === result.userId);
                      
                      return (
                        <TableRow key={`${result.userId}-${result.quizId}`}>
                          <TableCell>{student?.name || 'Unknown'}</TableCell>
                          <TableCell>{quiz?.title || 'Unknown'}</TableCell>
                          <TableCell>
                            {result.score}/{result.totalQuestions}
                          </TableCell>
                          <TableCell>{result.completedAt.toLocaleDateString()}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
