import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import EmergencyAlertBanner from '../../components/ui/EmergencyAlertBanner';
import LanguageSelector from '../../components/ui/LanguageSelector';
import ModuleCard from './components/ModuleCard';
import ModuleContent from './components/ModuleContent';
import ModuleFilters from './components/ModuleFilters';
import ProgressSidebar from './components/ProgressSidebar';
import RegionalContent from './components/RegionalContent';

const LearningModules = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeView, setActiveView] = useState('modules'); // 'modules', 'content', 'regional'
  const [selectedModule, setSelectedModule] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [emergencyAlert, setEmergencyAlert] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    difficulty: 'all',
    duration: 'all',
    progress: 'all'
  });

  // Mock data for learning modules
  const learningModules = [
    {
      id: 1,
      title: "Earthquake Preparedness Fundamentals",
      description: "Learn essential earthquake safety measures, including drop-cover-hold techniques, emergency kit preparation, and post-earthquake response protocols.",
      type: "earthquake",
      difficulty: "beginner",
      duration: "45 min",
      lessons: 8,
      enrolled: "2,340",
      rating: 4.8,
      progress: 0,
      thumbnail: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop",
      isNew: true,
      totalLessons: 8
    },
    {
      id: 2,
      title: "Fire Safety and Evacuation Procedures",
      description: "Comprehensive fire safety training covering prevention, detection, evacuation routes, and proper use of fire extinguishers in educational settings.",
      type: "fire",
      difficulty: "intermediate",
      duration: "60 min",
      lessons: 10,
      enrolled: "1,890",
      rating: 4.9,
      progress: 65,
      thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      isNew: false,
      totalLessons: 10
    },
    {
      id: 3,
      title: "Flood Response and Water Safety",
      description: "Understanding flood risks, water safety protocols, evacuation procedures, and post-flood recovery measures for educational institutions.",
      type: "flood",
      difficulty: "beginner",
      duration: "35 min",
      lessons: 6,
      enrolled: "1,567",
      rating: 4.7,
      progress: 100,
      thumbnail: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop",
      isNew: false,
      totalLessons: 6
    },
    {
      id: 4,
      title: "Cyclone and Storm Preparedness",
      description: "Advanced preparation strategies for cyclones and severe storms, including early warning systems and structural safety measures.",
      type: "cyclone",
      difficulty: "advanced",
      duration: "75 min",
      lessons: 12,
      enrolled: "987",
      rating: 4.6,
      progress: 25,
      thumbnail: "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=400&h=300&fit=crop",
      isNew: false,
      totalLessons: 12
    },
    {
      id: 5,
      title: "Landslide Risk Assessment",
      description: "Identifying landslide-prone areas, understanding geological indicators, and implementing preventive measures in hilly regions.",
      type: "landslide",
      difficulty: "intermediate",
      duration: "50 min",
      lessons: 7,
      enrolled: "756",
      rating: 4.5,
      progress: 0,
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      isNew: true,
      totalLessons: 7
    },
    {
      id: 6,
      title: "First Aid and Medical Emergency Response",
      description: "Essential first aid skills, CPR techniques, and medical emergency response procedures for educational staff and students.",
      type: "medical",
      difficulty: "beginner",
      duration: "90 min",
      lessons: 15,
      enrolled: "3,245",
      rating: 4.9,
      progress: 40,
      thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      isNew: false,
      totalLessons: 15
    }
  ];

  // Mock lesson data
  const sampleLessons = [
    {
      id: 1,
      title: "Understanding Earthquake Basics",
      type: "video",
      content: `Earthquakes are sudden movements of the Earth's crust caused by the release of energy stored in rocks. Understanding the basic science behind earthquakes helps us prepare better for these natural disasters.\n\nKey concepts covered in this lesson:\n• Tectonic plate movements and fault lines\n• Magnitude vs intensity scales\n• Primary and secondary earthquake effects\n• Regional earthquake patterns in India\n\nThis foundational knowledge will help you understand why certain areas are more prone to earthquakes and how we can predict and prepare for seismic events.`,
      videoThumbnail: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=450&fit=crop",
      videoDuration: "12:45",
      interactiveElements: [
        {
          title: "Fault Line Identification",
          description: "Interactive map showing major fault lines in India"
        },
        {
          title: "Magnitude Calculator",
          description: "Learn to calculate earthquake magnitude and intensity"
        }
      ],
      resources: [
        { name: "Earthquake Safety Checklist", size: "245 KB" },
        { name: "Emergency Contact Template", size: "156 KB" }
      ],
      quiz: {
        question: "What is the primary cause of earthquakes?",
        options: [
          "Weather changes and atmospheric pressure",
          "Movement of tectonic plates along fault lines",
          "Ocean currents and tidal forces",
          "Human activities like mining and construction"
        ],
        correctAnswer: 1
      }
    }
  ];

  // Mock user progress data
  const userProgress = {
    completedModules: 3,
    totalModules: 15,
    totalStudyTime: "12h 35m",
    streak: 7,
    objectives: [
      { title: "Complete 5 earthquake safety modules", completed: true, progress: 100 },
      { title: "Pass all fire safety assessments", completed: false, progress: 75 },
      { title: "Download emergency contact templates", completed: false, progress: 0 },
      { title: "Practice virtual drill simulations", completed: false, progress: 50 }
    ]
  };

  // Mock recent activity
  const recentModules = [
    { title: "Fire Safety Basics", status: "completed", lastAccessed: "2 hours ago" },
    { title: "Earthquake Preparedness", status: "in-progress", lastAccessed: "Yesterday" },
    { title: "First Aid Essentials", status: "completed", lastAccessed: "3 days ago" }
  ];

  // Mock achievements
  const achievements = [
    { icon: "🏆", title: "First Module", date: "Dec 15" },
    { icon: "🔥", title: "7-Day Streak", date: "Dec 17" },
    { icon: "📚", title: "Quick Learner", date: "Dec 16" },
    { icon: "⭐", title: "Perfect Score", date: "Dec 14" }
  ];

  // Mock regional data
  const regionalRisks = [
    {
      type: "earthquake",
      severity: "high",
      lastIncident: "March 2023",
      factors: [
        "Located in seismic zone IV",
        "Proximity to Himalayan fault system",
        "Dense urban construction"
      ],
      preparations: [
        "Secure heavy furniture and equipment",
        "Identify safe spots in each room",
        "Maintain emergency supply kit"
      ]
    },
    {
      type: "flood",
      severity: "medium",
      lastIncident: "July 2023",
      factors: [
        "Monsoon season vulnerability",
        "River proximity",
        "Urban drainage issues"
      ],
      preparations: [
        "Monitor weather alerts",
        "Keep evacuation routes clear",
        "Store emergency supplies on higher floors"
      ]
    },
    {
      type: "fire",
      severity: "low",
      lastIncident: "January 2023",
      factors: [
        "Electrical infrastructure age",
        "Chemical storage areas",
        "High occupancy buildings"
      ],
      preparations: [
        "Regular fire drill practice",
        "Check fire extinguisher locations",
        "Maintain clear evacuation paths"
      ]
    }
  ];

  const localProtocols = [
    {
      title: "Emergency Services",
      contacts: [
        { name: "Fire Department", number: "101" },
        { name: "Police", number: "100" },
        { name: "Medical Emergency", number: "108" }
      ]
    },
    {
      title: "Local Disaster Management",
      contacts: [
        { name: "District Collector", number: "+91-11-2345-6789" },
        { name: "Emergency Control Room", number: "+91-11-2345-6790" }
      ],
      location: "District Administrative Complex, Sector 5"
    }
  ];

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('disasteredpro-language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    // Mock emergency alert
    const mockAlert = {
      id: 1,
      severity: 'medium',
      title: 'Heavy Rainfall Alert',
      location: 'Delhi NCR Region',
      time: '2 hours ago',
      description: 'Moderate to heavy rainfall expected in the next 6-8 hours. Waterlogging possible in low-lying areas.',
      actions: [
        'Avoid unnecessary travel',
        'Keep emergency contacts ready',
        'Monitor weather updates'
      ]
    };
    setEmergencyAlert(mockAlert);
  }, []);

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleStartModule = (module) => {
    setSelectedModule(module);
    setCurrentLesson(sampleLessons?.[0]);
    setActiveView('content');
  };

  const handleContinueModule = (module) => {
    setSelectedModule(module);
    setCurrentLesson(sampleLessons?.[0]);
    setActiveView('content');
  };

  const handleCloseModule = () => {
    setSelectedModule(null);
    setCurrentLesson(null);
    setActiveView('modules');
  };

  const handleLessonComplete = () => {
    // Mock lesson completion logic
    console.log('Lesson completed');
  };

  const handleNavigateLesson = (direction) => {
    // Mock lesson navigation logic
    console.log(`Navigate ${direction}`);
  };

  const handleViewCertificate = () => {
    console.log('View certificates');
  };

  const handleDismissAlert = () => {
    setEmergencyAlert(null);
  };

  const filteredModules = learningModules?.filter(module => {
    if (filters?.search && !module.title?.toLowerCase()?.includes(filters?.search?.toLowerCase()) && 
        !module.description?.toLowerCase()?.includes(filters?.search?.toLowerCase())) {
      return false;
    }
    if (filters?.type !== 'all' && module.type !== filters?.type) {
      return false;
    }
    if (filters?.difficulty !== 'all' && module.difficulty !== filters?.difficulty) {
      return false;
    }
    if (filters?.progress !== 'all') {
      if (filters?.progress === 'not-started' && module.progress > 0) return false;
      if (filters?.progress === 'in-progress' && (module.progress === 0 || module.progress === 100)) return false;
      if (filters?.progress === 'completed' && module.progress !== 100) return false;
    }
    return true;
  });

  if (activeView === 'content' && selectedModule && currentLesson) {
    return (
      <div className="min-h-screen bg-background">
        <EmergencyAlertBanner alert={emergencyAlert} onDismiss={handleDismissAlert} />
        <ModuleContent
          module={selectedModule}
          currentLesson={currentLesson}
          onLessonComplete={handleLessonComplete}
          onNavigateLesson={handleNavigateLesson}
          onCloseModule={handleCloseModule}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <EmergencyAlertBanner alert={emergencyAlert} onDismiss={handleDismissAlert} />
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
              Learning Modules
            </h1>
            <p className="text-muted-foreground">
              Interactive disaster preparedness education with multimedia content and progress tracking
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <LanguageSelector
              currentLanguage={currentLanguage}
              onLanguageChange={handleLanguageChange}
            />
            
            <div className="flex items-center space-x-2">
              <Button
                variant={activeView === 'modules' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveView('modules')}
                iconName="BookOpen"
              >
                Modules
              </Button>
              <Button
                variant={activeView === 'regional' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveView('regional')}
                iconName="MapPin"
              >
                Regional
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeView === 'modules' && (
              <>
                <ModuleFilters
                  onFilterChange={handleFilterChange}
                  activeFilters={filters}
                />

                {/* Results Summary */}
                <div className="flex items-center justify-between mb-6">
                  <p className="text-muted-foreground">
                    Showing {filteredModules?.length} of {learningModules?.length} modules
                  </p>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Sort by:</span>
                    <Button variant="ghost" size="sm" iconName="ChevronDown">
                      Recommended
                    </Button>
                  </div>
                </div>

                {/* Module Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredModules?.map((module) => (
                    <ModuleCard
                      key={module.id}
                      module={module}
                      onStartModule={handleStartModule}
                      onContinueModule={handleContinueModule}
                    />
                  ))}
                </div>

                {filteredModules?.length === 0 && (
                  <div className="text-center py-12">
                    <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                      No modules found
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your filters or search terms
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => handleFilterChange({
                        search: '',
                        type: 'all',
                        difficulty: 'all',
                        duration: 'all',
                        progress: 'all'
                      })}
                    >
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </>
            )}

            {activeView === 'regional' && (
              <RegionalContent
                userLocation="Delhi, India"
                regionalRisks={regionalRisks}
                localProtocols={localProtocols}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ProgressSidebar
              userProgress={userProgress}
              recentModules={recentModules}
              achievements={achievements}
              onViewCertificate={handleViewCertificate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningModules;