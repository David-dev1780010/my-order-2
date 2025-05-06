
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useApp } from '@/contexts/AppContext';
import { BookOpen, Target, Award, ChevronRight, ChevronLeft } from 'lucide-react';

const OnboardingStep1 = ({ onNext }: { onNext: () => void }) => (
  <div className="text-center flex flex-col items-center">
    <div className="w-48 h-48 mb-6">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <circle cx="100" cy="100" r="80" fill="#f0eaff" />
        <path d="M100 20C55.8 20 20 55.8 20 100s35.8 80 80 80 80-35.8 80-80S144.2 20 100 20zm0 140c-33.1 0-60-26.9-60-60s26.9-60 60-60 60 26.9 60 60-26.9 60-60 60z" fill="#9b87f5" />
        <path d="M130 90c0-16.6-13.4-30-30-30S70 73.4 70 90c0 13.5 8.9 24.9 21.1 28.7v11.3H110v-11.3c12.2-3.8 21.1-15.2 21.1-28.7h-1.1z" fill="#9b87f5" />
        <path d="M91.1 140v10h18.9v-10z" fill="#9b87f5" />
      </svg>
    </div>
    <h1 className="text-2xl font-bold mb-2">Welcome to QuizMaster</h1>
    <p className="text-gray-600 mb-8 max-w-md mx-auto">
      Your personalized learning journey starts here. Let's get you set up for success!
    </p>
    <Button onClick={onNext} className="px-8">
      Get Started <ChevronRight className="ml-2 h-4 w-4" />
    </Button>
  </div>
);

const OnboardingStep2 = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => (
  <div className="text-center">
    <div className="w-48 h-48 mb-6 mx-auto">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <rect x="40" y="40" width="120" height="120" rx="10" fill="#f0eaff" />
        <path d="M150 50H50c-5.5 0-10 4.5-10 10v80c0 5.5 4.5 10 10 10h100c5.5 0 10-4.5 10-10V60c0-5.5-4.5-10-10-10zm0 90H50V60h100v80z" fill="#9b87f5" />
        <rect x="60" y="75" width="80" height="10" rx="2" fill="#9b87f5" />
        <rect x="60" y="95" width="80" height="10" rx="2" fill="#9b87f5" />
        <rect x="60" y="115" width="40" height="10" rx="2" fill="#9b87f5" />
      </svg>
    </div>
    <h1 className="text-2xl font-bold mb-2">Explore Quizzes by Class</h1>
    <p className="text-gray-600 mb-8 max-w-md mx-auto">
      Find quizzes tailored to your curriculum. Select your class and subject to get started.
    </p>
    <div className="flex justify-center gap-3">
      <Button variant="outline" onClick={onBack}>
        <ChevronLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <Button onClick={onNext}>
        Continue <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  </div>
);

const OnboardingStep3 = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => (
  <div className="text-center">
    <div className="w-48 h-48 mb-6 mx-auto">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <path d="M100 30l70 40v60l-70 40-70-40V70l70-40z" fill="#f0eaff" />
        <path d="M100 50l50 30v40l-50 30-50-30V80l50-30z" fill="#9b87f5" />
        <circle cx="100" cy="100" r="20" fill="#f0eaff" />
        <path d="M110 95h-5v-5c0-2.8-2.2-5-5-5s-5 2.2-5 5v5h-5c-2.8 0-5 2.2-5 5s2.2 5 5 5h5v5c0 2.8 2.2 5 5 5s5-2.2 5-5v-5h5c2.8 0 5-2.2 5-5s-2.2-5-5-5z" fill="#9b87f5" />
      </svg>
    </div>
    <h1 className="text-2xl font-bold mb-2">Track Your Progress</h1>
    <p className="text-gray-600 mb-8 max-w-md mx-auto">
      Monitor your performance with detailed analytics. See your strengths and areas for improvement.
    </p>
    <div className="flex justify-center gap-3">
      <Button variant="outline" onClick={onBack}>
        <ChevronLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <Button onClick={onNext}>
        Continue <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  </div>
);

const OnboardingStep4 = ({ onComplete, onBack }: { onComplete: () => void; onBack: () => void }) => (
  <div className="text-center">
    <div className="w-48 h-48 mb-6 mx-auto">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <circle cx="100" cy="100" r="80" fill="#f0eaff" />
        <path d="M100 30c-38.7 0-70 31.3-70 70s31.3 70 70 70 70-31.3 70-70-31.3-70-70-70zm35.7 50.3l-40 40c-1 1-2.2 1.5-3.5 1.5s-2.6-.5-3.5-1.5l-20-20c-2-2-2-5.1 0-7.1 2-2 5.1-2 7.1 0l16.5 16.5 36.5-36.5c2-2 5.1-2 7.1 0 1.9 2 1.9 5.2-.2 7.1z" fill="#9b87f5" />
      </svg>
    </div>
    <h1 className="text-2xl font-bold mb-2">You're All Set!</h1>
    <p className="text-gray-600 mb-8 max-w-md mx-auto">
      Start your learning journey now and achieve your academic goals with QuizMaster.
    </p>
    <div className="flex justify-center gap-3">
      <Button variant="outline" onClick={onBack}>
        <ChevronLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <Button onClick={onComplete}>
        Get Started <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  </div>
);

const Onboarding: React.FC = () => {
  const { currentUser } = useApp();
  const [step, setStep] = useState(1);
  
  const handleComplete = () => {
    localStorage.setItem('onboardingCompleted', 'true');
    window.location.reload();
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 shadow-lg bg-white">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center">
            <BookOpen className="h-6 w-6 text-quiz-purple" />
            <span className="ml-2 text-xl font-bold text-quiz-purple">QuizMaster</span>
          </div>
          <div className="flex items-center">
            <div className={`h-2 w-6 rounded-full ${step >= 1 ? 'bg-quiz-purple' : 'bg-gray-200'} mx-1`}></div>
            <div className={`h-2 w-6 rounded-full ${step >= 2 ? 'bg-quiz-purple' : 'bg-gray-200'} mx-1`}></div>
            <div className={`h-2 w-6 rounded-full ${step >= 3 ? 'bg-quiz-purple' : 'bg-gray-200'} mx-1`}></div>
            <div className={`h-2 w-6 rounded-full ${step >= 4 ? 'bg-quiz-purple' : 'bg-gray-200'} mx-1`}></div>
          </div>
        </div>
        
        {step === 1 && <OnboardingStep1 onNext={() => setStep(2)} />}
        {step === 2 && <OnboardingStep2 onNext={() => setStep(3)} onBack={() => setStep(1)} />}
        {step === 3 && <OnboardingStep3 onNext={() => setStep(4)} onBack={() => setStep(2)} />}
        {step === 4 && <OnboardingStep4 onComplete={handleComplete} onBack={() => setStep(3)} />}
      </Card>
    </div>
  );
};

export default Onboarding;
