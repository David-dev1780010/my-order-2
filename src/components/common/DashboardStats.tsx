
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartBar, 
  ChartPie, 
  Award,
  Users,
  BookOpen,
  Calendar,
  TrendingUp,
  Medal,
  Activity,
  CheckCircle,
  Target,
  BarChart3,
  Layers
} from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  description?: string;
  trend?: number;
  color?: string;
  iconColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  description, 
  trend, 
  color = "from-blue-500 to-indigo-600",
  iconColor = "text-white" 
}) => {
  const isMobile = useIsMobile();
  
  return (
    <Card className="h-full overflow-hidden shadow-md border-0 transition-all hover:shadow-lg">
      <CardHeader className={`flex flex-row items-center justify-between space-y-0 p-4 bg-gradient-to-r ${color}`}>
        <CardTitle className="text-xs sm:text-sm font-medium text-white">{title}</CardTitle>
        <div className="p-2 rounded-full bg-white/20">
          {icon}
        </div>
      </CardHeader>
      <CardContent className="p-4 bg-white">
        <div className="text-xl sm:text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        {trend !== undefined && (
          <div className={`flex items-center gap-1 mt-1 text-xs ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingUp className="h-3 w-3 transform rotate-180" />}
            <span>{Math.abs(trend)}% {trend >= 0 ? 'increase' : 'decrease'}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface DashboardStatsProps {
  stats: {
    quizzes?: number;
    completedQuizzes?: number;
    averageScore?: number;
    upcomingExams?: number;
    students?: number;
    currentAffairs?: number;
    premiumContent?: number;
    freeContent?: number;
    activeUsers?: number;
    completionRate?: number;
  };
  userType: 'admin' | 'student';
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats, userType }) => {
  const isMobile = useIsMobile();
  
  if (userType === 'admin') {
    return (
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Quizzes"
          value={stats.quizzes || 0}
          icon={<ChartBar className="h-4 w-4 text-white" />}
          description="All available quizzes"
          trend={5}
          color="from-indigo-500 to-indigo-600"
        />
        <StatCard
          title="Total Students"
          value={stats.students || 0}
          icon={<Users className="h-4 w-4 text-white" />}
          description="Registered users"
          trend={12}
          color="from-purple-500 to-purple-600"
        />
        <StatCard
          title="Current Affairs"
          value={stats.currentAffairs || 0}
          icon={<BookOpen className="h-4 w-4 text-white" />}
          description="Latest news articles"
          trend={8}
          color="from-green-500 to-green-600"
        />
        <StatCard
          title="Upcoming Exams"
          value={stats.upcomingExams || 0}
          icon={<Calendar className="h-4 w-4 text-white" />}
          description="Scheduled exams"
          trend={-3}
          color="from-orange-500 to-orange-600"
        />
        <StatCard
          title="Premium Content"
          value={stats.premiumContent || 0}
          icon={<Award className="h-4 w-4 text-white" />}
          description="Locked materials"
          color="from-amber-500 to-amber-600"
        />
        <StatCard
          title="Free Content"
          value={stats.freeContent || 0}
          icon={<BookOpen className="h-4 w-4 text-white" />}
          description="Open access materials"
          color="from-blue-500 to-blue-600"
        />
        <StatCard
          title="Active Users"
          value={stats.activeUsers || 0}
          icon={<Activity className="h-4 w-4 text-white" />}
          description="Last 7 days"
          trend={15}
          color="from-teal-500 to-teal-600"
        />
        <StatCard
          title="Completion Rate"
          value={`${stats.completionRate || 0}%`}
          icon={<Medal className="h-4 w-4 text-white" />}
          description="Quiz completions"
          trend={7}
          color="from-red-500 to-red-600"
        />
      </div>
    );
  }
  
  // Student dashboard stats with updated colorful design
  return (
    <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
      <StatCard
        title="Available Quizzes"
        value={stats.quizzes || 0}
        icon={<Layers className="h-4 w-4 text-white" />}
        color="from-indigo-500 to-violet-500"
      />
      <StatCard
        title="Completed Quizzes"
        value={stats.completedQuizzes || 0}
        icon={<CheckCircle className="h-4 w-4 text-white" />}
        color="from-green-500 to-emerald-500"
      />
      <StatCard
        title="Average Score"
        value={`${stats.averageScore || 0}%`}
        icon={<BarChart3 className="h-4 w-4 text-white" />}
        color="from-blue-500 to-cyan-500"
      />
      <StatCard
        title="Upcoming Exams"
        value={stats.upcomingExams || 0}
        icon={<Target className="h-4 w-4 text-white" />}
        color="from-orange-500 to-amber-500"
      />
    </div>
  );
};

export default DashboardStats;
