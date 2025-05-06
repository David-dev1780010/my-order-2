
import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import MainLayout from '@/layouts/MainLayout';
import PageHeader from '@/components/common/PageHeader';
import ExamCard from '@/components/common/ExamCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const Exams: React.FC = () => {
  const { exams } = useApp();
  const [search, setSearch] = useState('');
  
  // Filter exams based on search term
  const filteredExams = exams.filter(exam => 
    exam.title.toLowerCase().includes(search.toLowerCase()) || 
    exam.description.toLowerCase().includes(search.toLowerCase())
  );
  
  // Get upcoming, active and past exams
  const now = new Date();
  
  const activeExams = filteredExams.filter(exam => 
    now >= exam.startDate && now <= exam.endDate
  );
  
  const upcomingExams = filteredExams.filter(exam => 
    now < exam.startDate
  );
  
  const pastExams = filteredExams.filter(exam => 
    now > exam.endDate
  );

  return (
    <MainLayout>
      <div className="mb-6">
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg p-6 shadow-lg">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Exams</h1>
          <p className="text-white/80 text-sm md:text-base">Prepare and excel in your upcoming assessments</p>
        </div>
      </div>

      <div className="relative mb-6 max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search exams"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-white border-indigo-100 focus-visible:ring-indigo-500 shadow-sm"
        />
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full grid grid-cols-4 mb-4 bg-slate-100">
            <TabsTrigger value="all" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
              All ({filteredExams.length})
            </TabsTrigger>
            <TabsTrigger value="active" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <Clock className="h-4 w-4 mr-1 inline" />
              Active ({activeExams.length})
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Calendar className="h-4 w-4 mr-1 inline" />
              Upcoming ({upcomingExams.length})
            </TabsTrigger>
            <TabsTrigger value="past" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white">
              <CheckCircle className="h-4 w-4 mr-1 inline" />
              Past ({pastExams.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="pt-2">
            {filteredExams.length === 0 ? (
              <div className="bg-slate-50 rounded-lg p-8 text-center">
                <AlertCircle className="h-12 w-12 mx-auto text-slate-400 mb-3" />
                <p className="text-slate-500 font-medium">No exams found.</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredExams.map((exam) => (
                  <ExamCard key={exam.id} exam={exam} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="active" className="pt-2">
            {activeExams.length === 0 ? (
              <div className="bg-slate-50 rounded-lg p-8 text-center">
                <Clock className="h-12 w-12 mx-auto text-slate-400 mb-3" />
                <p className="text-slate-500 font-medium">No active exams at the moment.</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {activeExams.map((exam) => (
                  <ExamCard key={exam.id} exam={exam} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="upcoming" className="pt-2">
            {upcomingExams.length === 0 ? (
              <div className="bg-slate-50 rounded-lg p-8 text-center">
                <Calendar className="h-12 w-12 mx-auto text-slate-400 mb-3" />
                <p className="text-slate-500 font-medium">No upcoming exams found.</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {upcomingExams.map((exam) => (
                  <ExamCard key={exam.id} exam={exam} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="pt-2">
            {pastExams.length === 0 ? (
              <div className="bg-slate-50 rounded-lg p-8 text-center">
                <CheckCircle className="h-12 w-12 mx-auto text-slate-400 mb-3" />
                <p className="text-slate-500 font-medium">No past exams found.</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {pastExams.map((exam) => (
                  <ExamCard key={exam.id} exam={exam} isUpcoming={false} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Exams;
