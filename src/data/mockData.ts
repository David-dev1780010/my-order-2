import { User, Quiz, CurrentAffair, Exam, QuizResult } from '../types';

// Generate mock users with tokens
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatarUrl: 'https://api.dicebear.com/6.x/avataaars/svg?seed=admin',
    tokens: 999, // Admins have unlimited tokens
  },
  {
    id: '2',
    name: 'Student User',
    email: 'student@example.com',
    role: 'student',
    avatarUrl: 'https://api.dicebear.com/6.x/avataaars/svg?seed=student',
    tokens: 10, // Students start with 10 tokens
  },
  {
    id: '3',
    name: 'Demo Admin',
    email: 'demo.admin@example.com',
    role: 'admin',
    tokens: 999,
  },
  {
    id: '4',
    name: 'Demo Student',
    email: 'demo.student@example.com', 
    role: 'student',
    tokens: 5,
  },
];

// Mock Quizzes
export const mockQuizzes: Quiz[] = [
  {
    id: '1',
    title: 'Basic Geography Quiz',
    description: 'Test your knowledge of world geography with this quiz!',
    questions: [
      {
        id: 'q1',
        text: 'What is the capital of France?',
        options: ['London', 'Berlin', 'Paris', 'Madrid'],
        correctOptionIndex: 2,
        explanation: 'Paris is the capital city of France.',
      },
      {
        id: 'q2',
        text: 'Which is the largest ocean on Earth?',
        options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
        correctOptionIndex: 3,
        explanation: 'The Pacific Ocean is the largest and deepest ocean on Earth.',
      },
      {
        id: 'q3',
        text: 'Which country is known as the Land of the Rising Sun?',
        options: ['China', 'Japan', 'Thailand', 'South Korea'],
        correctOptionIndex: 1,
        explanation: 'Japan is known as the Land of the Rising Sun.',
      },
      {
        id: 'q4',
        text: 'Which river is the longest in the world?',
        options: ['Amazon', 'Nile', 'Mississippi', 'Yangtze'],
        correctOptionIndex: 1,
        explanation: 'The Nile River is the longest river in the world.',
      },
      {
        id: 'q5',
        text: 'Which continent is the largest by land area?',
        options: ['North America', 'Africa', 'Asia', 'Europe'],
        correctOptionIndex: 2,
        explanation: 'Asia is the largest continent by land area.',
      },
      {
        id: 'q6',
        text: 'Which desert is the largest in the world?',
        options: ['Gobi', 'Sahara', 'Arabian', 'Antarctic'],
        correctOptionIndex: 3,
        explanation: 'The Antarctic Desert is the largest desert in the world.',
      },
      {
        id: 'q7',
        text: 'Which mountain range is the longest in the world?',
        options: ['Himalayas', 'Rocky Mountains', 'Andes', 'Alps'],
        correctOptionIndex: 2,
        explanation: 'The Andes is the longest mountain range in the world.',
      },
      {
        id: 'q8',
        text: 'Which country has the most islands in the world?',
        options: ['Indonesia', 'Japan', 'Sweden', 'Philippines'],
        correctOptionIndex: 2,
        explanation: 'Sweden has the most islands in the world with over 267,570 islands.',
      },
      {
        id: 'q9',
        text: 'What is the smallest country in the world?',
        options: ['Monaco', 'Nauru', 'Vatican City', 'San Marino'],
        correctOptionIndex: 2,
        explanation: 'Vatican City is the smallest country in the world.',
      },
      {
        id: 'q10',
        text: 'Which sea is the saltiest in the world?',
        options: ['Dead Sea', 'Red Sea', 'Mediterranean Sea', 'Caribbean Sea'],
        correctOptionIndex: 0,
        explanation: 'The Dead Sea is the saltiest sea in the world.',
      }
    ],
    timeLimit: 10,
    createdAt: new Date('2023-01-15'),
    category: 'Geography',
    isPremium: false,
  },
  {
    id: '2',
    title: 'Current Affairs 2025',
    description: 'Stay updated with the latest global events!',
    questions: [
      {
        id: 'q1',
        text: 'Which technology company recently announced a major breakthrough in quantum computing?',
        options: ['Google', 'Microsoft', 'IBM', 'Apple'],
        correctOptionIndex: 2,
        explanation: 'IBM announced a significant advancement in quantum computing technology.',
      },
      {
        id: 'q2',
        text: 'Which country hosted the latest Climate Change Conference?',
        options: ['United States', 'Brazil', 'India', 'Germany'],
        correctOptionIndex: 3,
        explanation: 'Germany hosted the latest international Climate Change Conference.',
      },
      {
        id: 'q3',
        text: 'Which company launched the first commercial space tourism flight?',
        options: ['SpaceX', 'Blue Origin', 'Virgin Galactic', 'Boeing'],
        correctOptionIndex: 0,
        explanation: 'SpaceX launched the first commercial space tourism flight.',
      },
      {
        id: 'q4',
        text: 'Which country announced a complete ban on fossil fuel vehicles by 2025?',
        options: ['Norway', 'Netherlands', 'Denmark', 'Sweden'],
        correctOptionIndex: 1,
        explanation: 'The Netherlands announced a complete ban on fossil fuel vehicles.',
      },
      {
        id: 'q5',
        text: 'Which AI model achieved human-level performance in medical diagnosis?',
        options: ['GPT-4', 'MedAI', 'DeepMind', 'Watson'],
        correctOptionIndex: 2,
        explanation: 'DeepMind\'s AI achieved human-level performance in medical diagnosis.',
      },
      {
        id: 'q6',
        text: 'Which country became the first to implement a universal basic income?',
        options: ['Finland', 'Canada', 'New Zealand', 'Switzerland'],
        correctOptionIndex: 0,
        explanation: 'Finland became the first country to implement universal basic income.',
      },
      {
        id: 'q7',
        text: 'Which cryptocurrency became legal tender in most European countries?',
        options: ['Bitcoin', 'Ethereum', 'EURO', 'Cardano'],
        correctOptionIndex: 1,
        explanation: 'Ethereum became legal tender in most European countries.',
      },
      {
        id: 'q8',
        text: 'Which country achieved 100% renewable energy usage first?',
        options: ['Iceland', 'Costa Rica', 'Denmark', 'Scotland'],
        correctOptionIndex: 0,
        explanation: 'Iceland achieved 100% renewable energy usage first.',
      },
      {
        id: 'q9',
        text: 'Which company developed the first fully autonomous vehicle?',
        options: ['Tesla', 'Waymo', 'GM', 'Ford'],
        correctOptionIndex: 1,
        explanation: 'Waymo developed the first fully autonomous vehicle.',
      },
      {
        id: 'q10',
        text: 'Which country launched the largest ocean cleanup initiative?',
        options: ['Japan', 'Netherlands', 'Norway', 'Australia'],
        correctOptionIndex: 1,
        explanation: 'The Netherlands launched the largest ocean cleanup initiative.',
      }
    ],
    timeLimit: 15,
    createdAt: new Date('2025-03-01'),
    category: 'Current Affairs',
    isPremium: true,
  },
  {
    id: '3',
    title: 'Science & Technology',
    description: 'Test your knowledge of the latest in science and technology!',
    questions: [
      {
        id: 'q1',
        text: 'What is the main component of the Sun?',
        options: ['Oxygen', 'Carbon', 'Hydrogen', 'Nitrogen'],
        correctOptionIndex: 2,
        explanation: 'The Sun is primarily composed of hydrogen.',
      },
      {
        id: 'q2',
        text: 'Which of these is NOT a programming language?',
        options: ['Java', 'Python', 'Dolphin', 'Ruby'],
        correctOptionIndex: 2,
        explanation: 'Dolphin is not a programming language but an emulator.',
      },
      {
        id: 'q3',
        text: 'What does CPU stand for?',
        options: ['Central Processing Unit', 'Computer Processing Unit', 'Central Processor Unit', 'Core Processing Unit'],
        correctOptionIndex: 0,
        explanation: 'CPU stands for Central Processing Unit.',
      },
      {
        id: 'q4',
        text: 'Which particle has a positive charge?',
        options: ['Electron', 'Neutron', 'Proton', 'Photon'],
        correctOptionIndex: 2,
        explanation: 'The proton has a positive charge.',
      },
      {
        id: 'q5',
        text: 'What is the speed of light in vacuum?',
        options: ['299,792 km/s', '300,000 km/s', '299,792,458 m/s', '300,000,000 m/s'],
        correctOptionIndex: 2,
        explanation: 'The speed of light in vacuum is 299,792,458 meters per second.',
      },
      {
        id: 'q6',
        text: 'Which programming paradigm does React.js follow?',
        options: ['Procedural', 'Object-Oriented', 'Functional', 'Declarative'],
        correctOptionIndex: 3,
        explanation: 'React.js follows a declarative programming paradigm.',
      },
      {
        id: 'q7',
        text: 'What is the smallest unit of digital information?',
        options: ['Byte', 'Bit', 'Nibble', 'Word'],
        correctOptionIndex: 1,
        explanation: 'A bit is the smallest unit of digital information.',
      },
      {
        id: 'q8',
        text: 'Which planet has the most moons?',
        options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'],
        correctOptionIndex: 0,
        explanation: 'Jupiter has the most moons in our solar system.',
      },
      {
        id: 'q9',
        text: 'What is the main function of DNA?',
        options: ['Energy Storage', 'Genetic Information', 'Protein Synthesis', 'Cell Division'],
        correctOptionIndex: 1,
        explanation: 'DNA stores genetic information.',
      },
      {
        id: 'q10',
        text: 'Which type of radiation has the highest frequency?',
        options: ['Radio waves', 'Visible light', 'X-rays', 'Gamma rays'],
        correctOptionIndex: 3,
        explanation: 'Gamma rays have the highest frequency among all types of radiation.',
      }
    ],
    timeLimit: 20,
    createdAt: new Date('2025-02-10'),
    category: 'Science',
    isPremium: true,
  }
];

// Mock Current Affairs
export const mockCurrentAffairs: CurrentAffair[] = [
  {
    id: '1',
    title: 'Major Breakthrough in Renewable Energy',
    content: 'Scientists have developed a new type of solar panel that can generate electricity even during cloudy days and at night. This revolutionary technology uses a special coating that can capture different wavelengths of light and even some heat energy, making solar power more reliable and efficient than ever before. Industry experts predict this could accelerate the global transition to renewable energy sources.',
    category: 'Science & Technology',
    publishedDate: new Date('2025-03-15'),
    tags: ['Renewable Energy', 'Solar Power', 'Technology'],
    imageUrl: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    isPremium: true,
  },
  {
    id: '2',
    title: 'Global Economic Forum Announces New Financial Regulations',
    content: 'The Global Economic Forum has announced a new set of financial regulations aimed at creating more stability in international markets. These regulations will require increased transparency from major financial institutions and implement stricter controls on speculative trading. The changes are expected to take effect within the next six months, with major economies already signaling their support for the initiative.',
    category: 'Finance & Economics',
    publishedDate: new Date('2025-03-10'),
    tags: ['Economics', 'Global Finance', 'Regulations'],
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    isPremium: false,
  },
  {
    id: '3',
    title: 'Historic Climate Agreement Reached Among World Powers',
    content: 'In a landmark decision, the world\'s largest carbon-emitting countries have reached a binding agreement to reduce emissions by 50% by 2035. The agreement includes substantial investment in clean energy infrastructure and technology sharing among participating nations. Environmental activists have cautiously welcomed the news while emphasizing the need for robust implementation mechanisms.',
    category: 'Environment',
    publishedDate: new Date('2025-03-05'),
    tags: ['Climate Change', 'Global Cooperation', 'Environment'],
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    isPremium: false,
  },
];

// Mock Exams
export const mockExams: Exam[] = [
  {
    id: '1',
    title: 'Midterm Geography Assessment',
    description: 'A comprehensive assessment of geographical knowledge.',
    quizzes: ['1'],
    startDate: new Date('2025-04-10T09:00:00'),
    endDate: new Date('2025-04-15T18:00:00'),
    duration: 60,
  },
  {
    id: '2',
    title: 'Current Affairs Monthly Test',
    description: 'Stay updated with recent global events.',
    quizzes: ['2'],
    startDate: new Date('2025-03-25T10:00:00'),
    endDate: new Date('2025-03-26T23:59:00'),
    duration: 30,
  },
  {
    id: '3',
    title: 'Science & Technology Comprehensive Exam',
    description: 'Test your knowledge of various science and technology topics.',
    quizzes: ['3'],
    startDate: new Date('2025-04-05T14:00:00'),
    endDate: new Date('2025-04-07T23:59:00'),
    duration: 90,
  },
];

// Mock Quiz Results
export const mockQuizResults: QuizResult[] = [
  {
    quizId: '1',
    userId: '2',
    score: 2,
    totalQuestions: 3,
    completedAt: new Date('2025-02-20'),
    timeSpent: 480, // 8 minutes
    answers: [2, 3, 0],
  },
  {
    quizId: '2',
    userId: '2',
    score: 1,
    totalQuestions: 2,
    completedAt: new Date('2025-03-05'),
    timeSpent: 240, // 4 minutes
    answers: [2, 1],
  },
  {
    quizId: '1',
    userId: '3',
    score: 3,
    totalQuestions: 3,
    completedAt: new Date('2025-02-21'),
    timeSpent: 350, // 5.8 minutes
    answers: [2, 3, 1],
  },
];

// Current user (for authentication)
export const getCurrentUser = (): User => {
  return mockUsers[0]; // Default to admin
};

// Helper functions to get mock data
export const getQuizById = (id: string): Quiz | undefined => {
  return mockQuizzes.find(quiz => quiz.id === id);
};

export const getExamById = (id: string): Exam | undefined => {
  return mockExams.find(exam => exam.id === id);
};

export const getCurrentAffairById = (id: string): CurrentAffair | undefined => {
  return mockCurrentAffairs.find(article => article.id === id);
};

export const getUserResults = (userId: string): QuizResult[] => {
  return mockQuizResults.filter(result => result.userId === userId);
};
