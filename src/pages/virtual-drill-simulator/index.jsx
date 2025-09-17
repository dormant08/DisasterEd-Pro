import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import EmergencyAlertBanner from '../../components/ui/EmergencyAlertBanner';
import SimulationArea from './components/SimulationArea';
import ScenarioPanel from './components/ScenarioPanel';
import PerformanceTracker from './components/PerformanceTracker';
import DrillControls from './components/DrillControls';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const VirtualDrillSimulator = () => {
  const [currentScenario, setCurrentScenario] = useState(null);
  const [isSimulationActive, setIsSimulationActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [currentPerformance, setCurrentPerformance] = useState(null);
  const [drillSettings, setDrillSettings] = useState({
    difficulty: 'intermediate',
    speed: 'normal',
    feedbackTiming: 'immediate',
    soundEffects: true,
    hints: true,
    autoAdvance: false
  });

  // Emergency alert state
  const [emergencyAlert, setEmergencyAlert] = useState({
    id: 'alert-001',
    severity: 'high',
    title: 'Earthquake Drill Scheduled',
    location: 'School Campus',
    time: 'Today at 2:30 PM',
    description: `A mandatory earthquake drill has been scheduled for all students and staff. This is part of our regular disaster preparedness training program.`,
    actions: [
      'Participate in the virtual drill simulation',
      'Review earthquake safety protocols',
      'Practice drop, cover, and hold techniques',
      'Familiarize yourself with evacuation routes'
    ]
  });

  // Mock scenarios data
  const scenarios = [
    {
      id: 'earthquake-basic',
      type: 'earthquake',
      title: 'Classroom Earthquake Response',
      description: `You are in your classroom when the ground begins to shake violently. Books are falling from shelves, and students are panicking. You need to take immediate action to ensure everyone's safety.`,
      difficulty: 'beginner',
      duration: 5,
      participants: 25,
      objectives: 4,
      completed: true,
      bestScore: 92,
      decisions: [
        {
          text: 'Drop to hands and knees, take cover under desk',reasoning: 'This follows the Drop, Cover, and Hold protocol',
          isCorrect: true
        },
        {
          text: 'Run immediately to the exit door',reasoning: 'Running during shaking increases injury risk',
          isCorrect: false
        },
        {
          text: 'Stand in the doorway for protection',reasoning: 'Modern doorways are not reinforced for protection',
          isCorrect: false
        },
        {
          text: 'Hide under the teacher\'s desk',
          reasoning: 'You should take cover at your current location',
          isCorrect: false
        }
      ]
    },
    {
      id: 'fire-intermediate',
      type: 'fire',
      title: 'Laboratory Fire Emergency',
      description: `A chemical reaction has gone wrong in the science lab, causing a small fire to break out. Smoke is beginning to fill the room and the fire alarm is sounding. Multiple students need to evacuate safely.`,
      difficulty: 'intermediate',
      duration: 8,
      participants: 20,
      objectives: 6,
      completed: false,
      bestScore: null,
      decisions: [
        {
          text: 'Alert everyone and evacuate immediately using nearest exit',
          reasoning: 'Quick evacuation prevents smoke inhalation and injury',
          isCorrect: true
        },
        {
          text: 'Try to put out the fire with water first',
          reasoning: 'Water on chemical fires can be dangerous and spread flames',
          isCorrect: false
        },
        {
          text: 'Open windows to let smoke out before evacuating',
          reasoning: 'This wastes precious time and can feed the fire with oxygen',
          isCorrect: false
        },
        {
          text: 'Gather personal belongings before leaving',
          reasoning: 'Personal items are not worth risking lives in a fire',
          isCorrect: false
        }
      ]
    },
    {
      id: 'flood-advanced',
      type: 'flood',
      title: 'Campus Flood Response',
      description: `Heavy monsoon rains have caused severe flooding around the school campus. Water levels are rising rapidly in the ground floor areas, and several students are trapped in different locations.`,
      difficulty: 'advanced',
      duration: 12,
      participants: 50,
      objectives: 8,
      completed: false,
      bestScore: null,
      decisions: [
        {
          text: 'Move to higher floors and call for emergency assistance',
          reasoning: 'Higher ground is safer, and professional help is needed',
          isCorrect: true
        },
        {
          text: 'Try to wade through the water to reach exits',
          reasoning: 'Fast-moving flood water is extremely dangerous',
          isCorrect: false
        },
        {
          text: 'Wait in current location for water to recede',
          reasoning: 'Water levels may continue rising, creating more danger',
          isCorrect: false
        },
        {
          text: 'Use electrical equipment to call for help',
          reasoning: 'Electricity and water create electrocution risk',
          isCorrect: false
        }
      ]
    }
  ];

  // Mock performance data
  const overallStats = {
    averageScore: 87,
    drillsCompleted: 24,
    completionRate: 96,
    averageTime: 45
  };

  const recentDrills = [
    {
      id: 1,
      scenario: 'Classroom Earthquake Response',
      type: 'earthquake',
      score: 92,
      date: 'Sep 15, 2024',
      duration: '4:32'
    },
    {
      id: 2,
      scenario: 'Fire Evacuation Drill',
      type: 'fire',
      score: 88,
      date: 'Sep 12, 2024',
      duration: '6:15'
    },
    {
      id: 3,
      scenario: 'Flood Safety Protocol',
      type: 'flood',
      score: 75,
      date: 'Sep 10, 2024',
      duration: '8:45'
    }
  ];

  // Timer effect
  useEffect(() => {
    let interval;
    if (isSimulationActive && !isPaused && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleSimulationEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSimulationActive, isPaused, timeRemaining]);

  const handleScenarioSelect = (scenario) => {
    if (!isSimulationActive) {
      setCurrentScenario(scenario);
      setProgress({ current: 0, total: scenario?.objectives });
    }
  };

  const handleStartSimulation = () => {
    if (currentScenario) {
      setIsSimulationActive(true);
      setIsPaused(false);
      setTimeRemaining(currentScenario?.duration * 60);
      setProgress({ current: 0, total: currentScenario?.objectives });
      setCurrentPerformance({
        accuracy: 0,
        responseTime: 0,
        safetyScore: 0,
        decisionsCorrect: 0,
        totalDecisions: currentScenario?.decisions?.length || 0,
        feedback: {
          strengths: 'Starting drill simulation...',
          improvements: 'Focus on making quick, safe decisions',
          nextSteps: 'Complete the current scenario to see detailed feedback'
        }
      });
    }
  };

  const handlePauseSimulation = () => {
    setIsPaused(!isPaused);
  };

  const handleResetSimulation = () => {
    setIsSimulationActive(false);
    setIsPaused(false);
    setTimeRemaining(0);
    setProgress({ current: 0, total: 0 });
    setCurrentPerformance(null);
    setShowFeedback(false);
  };

  const handleDecisionMade = (decision) => {
    if (!isSimulationActive || isPaused) return;

    const isCorrect = decision?.isCorrect;
    const newProgress = Math.min(progress?.current + 1, progress?.total);
    
    setProgress({ ...progress, current: newProgress });
    
    // Update performance
    if (currentPerformance) {
      const newCorrect = currentPerformance?.decisionsCorrect + (isCorrect ? 1 : 0);
      const newAccuracy = Math.round((newCorrect / (currentPerformance?.totalDecisions || 1)) * 100);
      const responseTime = (currentScenario?.duration * 60) - timeRemaining;
      
      setCurrentPerformance({
        ...currentPerformance,
        accuracy: newAccuracy,
        responseTime: responseTime,
        safetyScore: isCorrect ? Math.min(currentPerformance?.safetyScore + 25, 100) : currentPerformance?.safetyScore,
        decisionsCorrect: newCorrect,
        feedback: {
          strengths: isCorrect ? 'Excellent safety decision making!' : 'Good attempt at problem solving',
          improvements: isCorrect ? 'Continue following safety protocols' : 'Review emergency response procedures',
          nextSteps: newProgress === progress?.total ? 'Drill completed! Review your performance' : 'Continue to next scenario'
        }
      });
    }

    // Show feedback
    setFeedbackMessage(decision?.reasoning);
    setFeedbackType(isCorrect ? 'correct' : 'incorrect');
    setShowFeedback(true);

    // Check if drill is complete
    if (newProgress === progress?.total) {
      setTimeout(() => {
        handleSimulationEnd();
      }, 3000);
    }
  };

  const handleSimulationEnd = () => {
    setIsSimulationActive(false);
    setIsPaused(false);
    // Keep performance data visible for review
  };

  const handleSettingsChange = (newSettings) => {
    setDrillSettings(newSettings);
  };

  const handleDismissAlert = () => {
    setEmergencyAlert(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {emergencyAlert && (
        <EmergencyAlertBanner 
          alert={emergencyAlert} 
          onDismiss={handleDismissAlert}
        />
      )}
      <div className={`transition-all duration-300 ${emergencyAlert ? 'pt-4' : ''}`}>
        {/* Page Header */}
        <div className="bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
                  Virtual Drill Simulator
                </h1>
                <p className="text-muted-foreground text-lg">
                  Practice emergency response through interactive disaster scenarios
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="hidden md:flex items-center space-x-2 px-3 py-2 bg-muted/50 rounded-lg">
                  <Icon name="Users" size={16} className="text-muted-foreground" />
                  <span className="text-sm font-medium">1,247 students trained</span>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="BookOpen"
                  iconPosition="left"
                >
                  View Guide
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Simulation & Controls */}
            <div className="lg:col-span-2 space-y-8">
              {/* Simulation Area */}
              <SimulationArea
                currentScenario={currentScenario}
                onDecisionMade={handleDecisionMade}
                isPaused={isPaused}
                timeRemaining={timeRemaining}
                showFeedback={showFeedback}
                feedbackMessage={feedbackMessage}
                feedbackType={feedbackType}
              />

              {/* Drill Controls */}
              <DrillControls
                onStartDrill={handleStartSimulation}
                onPauseDrill={handlePauseSimulation}
                onResetDrill={handleResetSimulation}
                onSettingsChange={handleSettingsChange}
                isActive={isSimulationActive}
                isPaused={isPaused}
                settings={drillSettings}
              />
            </div>

            {/* Right Column - Scenario Panel & Performance */}
            <div className="space-y-8">
              {/* Scenario Panel */}
              <ScenarioPanel
                scenarios={scenarios}
                currentScenario={currentScenario}
                onScenarioSelect={handleScenarioSelect}
                progress={progress}
                isSimulationActive={isSimulationActive}
                onStartSimulation={handleStartSimulation}
                onPauseSimulation={handlePauseSimulation}
                onResetSimulation={handleResetSimulation}
                isPaused={isPaused}
              />

              {/* Performance Tracker */}
              <PerformanceTracker
                currentPerformance={currentPerformance}
                overallStats={overallStats}
                recentDrills={recentDrills}
                showDetailedFeedback={!isSimulationActive && currentPerformance}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-card border-t border-border mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-heading font-semibold text-lg mb-4">
                  Emergency Resources
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="#" className="hover:text-foreground transition-colors duration-200">
                      Emergency Contact Numbers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground transition-colors duration-200">
                      Evacuation Maps
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground transition-colors duration-200">
                      Safety Protocols
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground transition-colors duration-200">
                      First Aid Guidelines
                    </a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-heading font-semibold text-lg mb-4">
                  Training Resources
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="#" className="hover:text-foreground transition-colors duration-200">
                      Drill Best Practices
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground transition-colors duration-200">
                      Video Tutorials
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground transition-colors duration-200">
                      Assessment Guidelines
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground transition-colors duration-200">
                      Certification Programs
                    </a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-heading font-semibold text-lg mb-4">
                  Support
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="#" className="hover:text-foreground transition-colors duration-200">
                      Technical Help
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground transition-colors duration-200">
                      Training Support
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground transition-colors duration-200">
                      Report Issues
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground transition-colors duration-200">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-border pt-8 mt-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  © {new Date()?.getFullYear()} DisasterEd Pro. All rights reserved.
                </p>
                <div className="flex items-center space-x-4 mt-4 md:mt-0">
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                    Privacy Policy
                  </a>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                    Terms of Service
                  </a>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                    Accessibility
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default VirtualDrillSimulator;