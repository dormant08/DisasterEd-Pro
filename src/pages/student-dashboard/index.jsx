import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import EmergencyAlertBanner from '../../components/ui/EmergencyAlertBanner';
import LanguageSelector from '../../components/ui/LanguageSelector';
import ProgressCard from './components/ProgressCard';
import AchievementBadge from './components/AchievementBadge';
import QuickAccessTile from './components/QuickAccessTile';
import LeaderboardCard from './components/LeaderboardCard';
import ActivityFeed from './components/ActivityFeed';
import FeaturedModule from './components/FeaturedModule';

const StudentDashboard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeAlert, setActiveAlert] = useState(null);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);

  // Mock data for student dashboard
  const studentData = {
    name: "BugSlayer",
    grade: "CSE",
    school: "THDC-IHET",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    level: 5,
    totalPoints: 2450,
    rank: 12,
    streakDays: 7
  };

  const progressData = [
    {
      title: "Modules Completed",
      current: 8,
      total: 12,
      icon: "BookOpen",
      variant: "success",
      description: "Learning modules finished"
    },
    {
      title: "Badges Earned",
      current: 15,
      total: 25,
      icon: "Award",
      variant: "warning",
      description: "Achievement badges collected"
    },
    {
      title: "Quiz Score",
      current: 85,
      total: 100,
      icon: "Target",
      variant: "primary",
      description: "Average quiz performance"
    }
  ];

  const badges = [
    {
      id: 1,
      name: "Earthquake Expert",
      description: "Completed all earthquake modules",
      icon: "Mountain",
      level: "gold",
      earned: true,
      earnedDate: "2 days ago"
    },
    {
      id: 2,
      name: "Fire Safety Hero",
      description: "Mastered fire evacuation drills",
      icon: "Flame",
      level: "silver",
      earned: true,
      earnedDate: "1 week ago"
    },
    {
      id: 3,
      name: "Flood Defender",
      description: "Expert in flood preparedness",
      icon: "Waves",
      level: "bronze",
      earned: false
    },
    {
      id: 4,
      name: "Quick Responder",
      description: "Fast emergency response times",
      icon: "Zap",
      level: "gold",
      earned: true,
      earnedDate: "3 days ago"
    }
  ];

  const quickAccessItems = [
    {
      title: "Interactive Quizzes",
      description: "Test your disaster preparedness knowledge with engaging quizzes",
      icon: "HelpCircle",
      route: "/learning-modules",
      status: "available",
      progress: 75
    },
    {
      title: "Virtual Drill Simulator",
      description: "Practice emergency evacuation procedures in safe virtual environment",
      icon: "Play",
      route: "/virtual-drill-simulator",
      status: "in-progress",
      progress: 40
    },
    {
      title: "Emergency Protocols",
      description: "Quick access to emergency response procedures and contacts",
      icon: "Shield",
      route: "/emergency-alerts",
      status: "available"
    },
    {
      title: "Regional Risk Assessment",
      description: "Learn about specific disaster risks in your geographical area",
      icon: "MapPin",
      route: "/learning-modules",
      status: "completed",
      progress: 100
    }
  ];

  const featuredModule = {
    id: 1,
    title: "Monsoon Flood Preparedness",
    description: "Learn essential skills for staying safe during monsoon floods, including evacuation procedures, emergency kit preparation, and water safety measures specifically designed for Mumbai's monsoon season.",
    thumbnail: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=250&fit=crop",
    duration: 45,
    difficulty: "intermediate",
    riskLevel: "high",
    region: "Mumbai, Maharashtra",
    enrolledCount: 1247,
    progress: 25
  };

  const currentUser = {
    id: 1,
    name: studentData?.name,
    avatar: studentData?.avatar,
    points: studentData?.totalPoints,
    rank: studentData?.rank
  };

  const topUsers = [
    {
      id: 2,
      name: "Arjun Patel",
      school: "St. Xavier\'s School",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      points: 3200,
      rank: 1
    },
    {
      id: 3,
      name: "Sneha Reddy",
      school: "Kendriya Vidyalaya",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      points: 2980,
      rank: 2
    },
    {
      id: 4,
      name: "Rahul Kumar",
      school: "DAV Public School",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      points: 2750,
      rank: 3
    },
    {
      id: 5,
      name: "Ananya Singh",
      school: "Ryan International",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      points: 2600,
      rank: 4
    },
    {
      id: 6,
      name: "Vikram Joshi",
      school: "Modern School",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      points: 2500,
      rank: 5
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "module_completed",
      user: { name: "You", avatar: studentData?.avatar },
      details: { moduleName: "Earthquake Safety Basics", points: 150 },
      timestamp: new Date(Date.now() - 1800000) // 30 minutes ago
    },
    {
      id: 2,
      type: "badge_earned",
      user: { name: "Arjun Patel", avatar: topUsers?.[0]?.avatar },
      details: { badgeName: "Fire Safety Expert", points: 200 },
      timestamp: new Date(Date.now() - 3600000) // 1 hour ago
    },
    {
      id: 3,
      type: "quiz_completed",
      user: { name: "Sneha Reddy", avatar: topUsers?.[1]?.avatar },
      details: { quizName: "Flood Preparedness", score: 92, points: 100 },
      timestamp: new Date(Date.now() - 7200000) // 2 hours ago
    },
    {
      id: 4,
      type: "drill_participated",
      user: { name: "You", avatar: studentData?.avatar },
      details: { drillType: "Fire Evacuation", points: 75 },
      timestamp: new Date(Date.now() - 10800000) // 3 hours ago
    },
    {
      id: 5,
      type: "level_up",
      user: { name: "Rahul Kumar", avatar: topUsers?.[2]?.avatar },
      details: { newLevel: 6, points: 300 },
      timestamp: new Date(Date.now() - 14400000) // 4 hours ago
    }
  ];

  // Mock emergency alert
  const emergencyAlert = {
    id: 1,
    severity: "high",
    title: "Heavy Rainfall Alert",
    location: "Mumbai, Maharashtra",
    time: "2 hours ago",
    description: "Heavy to very heavy rainfall expected in Mumbai and surrounding areas. Waterlogging likely in low-lying areas. Avoid unnecessary travel.",
    actions: [
      "Stay indoors if possible",
      "Keep emergency kit ready",
      "Monitor local news updates",
      "Avoid waterlogged areas"
    ]
  };

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('disasteredpro-language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    // Show emergency alert if conditions met
    const shouldShowAlert = Math.random() > 0.7; // 30% chance for demo
    if (shouldShowAlert) {
      setActiveAlert(emergencyAlert);
    }

    // Hide welcome message after 5 seconds
    const timer = setTimeout(() => {
      setShowWelcomeMessage(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('disasteredpro-language', languageCode);
  };

  const handleDismissAlert = () => {
    setActiveAlert(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Emergency Alert Banner */}
      <EmergencyAlertBanner 
        alert={activeAlert} 
        onDismiss={handleDismissAlert} 
      />
      {/* Header */}
      <Header />
      {/* Main Content */}
      <main className={`transition-all duration-300 ${activeAlert ? 'pt-4' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-4 lg:mb-0">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={studentData?.avatar}
                      alt={studentData?.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center border-2 border-background">
                      <span className="text-xs font-bold text-success-foreground">
                        {studentData?.level}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground">
                      Welcome back, {studentData?.name}!
                    </h1>
                    <p className="text-muted-foreground">
                      {studentData?.grade} • {studentData?.school}
                    </p>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center space-x-1">
                        <Icon name="Flame" size={14} className="text-warning" />
                        <span className="text-sm text-muted-foreground">
                          {studentData?.streakDays} day streak
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={14} className="text-primary" />
                        <span className="text-sm text-muted-foreground">
                          Level {studentData?.level}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <LanguageSelector
                  currentLanguage={currentLanguage}
                  onLanguageChange={handleLanguageChange}
                />
                <Button variant="outline" iconName="Settings" iconPosition="left">
                  Settings
                </Button>
              </div>
            </div>

            {/* Welcome Message */}
            {showWelcomeMessage && (
              <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg animate-fade-in">
                <div className="flex items-start space-x-3">
                  <Icon name="Info" size={20} className="text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-foreground">
                      Great job on maintaining your {studentData?.streakDays}-day learning streak! 
                      Continue your disaster preparedness journey today.
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowWelcomeMessage(false)}
                    className="p-1 ml-auto"
                  >
                    <Icon name="X" size={16} />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {progressData?.map((progress, index) => (
              <ProgressCard
                key={index}
                title={progress?.title}
                current={progress?.current}
                total={progress?.total}
                icon={progress?.icon}
                variant={progress?.variant}
                description={progress?.description}
              />
            ))}
          </div>

          {/* Featured Module */}
          <div className="mb-8">
            <FeaturedModule module={featuredModule} />
          </div>

          {/* Quick Access & Achievements */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            {/* Quick Access */}
            <div className="xl:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-heading font-semibold text-foreground">
                  Quick Access
                </h2>
                <Link 
                  to="/learning-modules"
                  className="text-sm text-primary hover:text-primary/80 font-medium"
                >
                  View All
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quickAccessItems?.map((item, index) => (
                  <QuickAccessTile
                    key={index}
                    title={item?.title}
                    description={item?.description}
                    icon={item?.icon}
                    route={item?.route}
                    status={item?.status}
                    progress={item?.progress}
                  />
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-heading font-semibold text-foreground">
                  Achievements
                </h2>
                <Icon name="Award" size={20} className="text-warning" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {badges?.slice(0, 4)?.map((badge) => (
                  <AchievementBadge
                    key={badge?.id}
                    badge={badge}
                    isNew={badge?.earnedDate === "2 days ago"}
                    onClick={() => {}}
                  />
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Badges
              </Button>
            </div>
          </div>

          {/* Leaderboard & Activity Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <LeaderboardCard
              currentUser={currentUser}
              topUsers={topUsers}
            />
            <ActivityFeed activities={recentActivities} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;