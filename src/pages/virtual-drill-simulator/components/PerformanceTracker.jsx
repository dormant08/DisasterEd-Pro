import React from 'react';
import Icon from '../../../components/AppIcon';
import { CircularProgress } from '../../../components/ui/ProgressIndicator';

const PerformanceTracker = ({ 
  currentPerformance, 
  overallStats, 
  recentDrills,
  showDetailedFeedback = false 
}) => {
  const getPerformanceColor = (score) => {
    if (score >= 90) return 'success';
    if (score >= 70) return 'warning';
    return 'error';
  };

  const getGradeFromScore = (score) => {
    if (score >= 95) return 'A+';
    if (score >= 90) return 'A';
    if (score >= 85) return 'B+';
    if (score >= 80) return 'B';
    if (score >= 75) return 'C+';
    if (score >= 70) return 'C';
    if (score >= 65) return 'D+';
    if (score >= 60) return 'D';
    return 'F';
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading font-semibold text-xl mb-1">
            Performance Tracker
          </h2>
          <p className="text-muted-foreground text-sm">
            Monitor your emergency response skills
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={20} className="text-success" />
          <span className="text-sm font-medium text-success">
            +12% this week
          </span>
        </div>
      </div>
      {/* Current Performance */}
      {currentPerformance && (
        <div className="mb-6 p-4 bg-muted/30 rounded-lg">
          <h3 className="font-heading font-medium mb-4">Current Drill Performance</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <CircularProgress
                progress={currentPerformance?.accuracy}
                total={100}
                size={60}
                variant={getPerformanceColor(currentPerformance?.accuracy)}
                showPercentage={true}
              />
              <p className="text-xs text-muted-foreground mt-2">Accuracy</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center h-15 mb-2">
                <span className={`text-2xl font-bold ${
                  currentPerformance?.responseTime <= 30 ? 'text-success' : 
                  currentPerformance?.responseTime <= 60 ? 'text-warning' : 'text-error'
                }`}>
                  {formatTime(currentPerformance?.responseTime)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Response Time</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center h-15 mb-2">
                <span className={`text-2xl font-bold text-${getPerformanceColor(currentPerformance?.safetyScore)}`}>
                  {getGradeFromScore(currentPerformance?.safetyScore)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Safety Grade</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center h-15 mb-2">
                <span className="text-2xl font-bold text-primary">
                  {currentPerformance?.decisionsCorrect}/{currentPerformance?.totalDecisions}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Decisions</p>
            </div>
          </div>
        </div>
      )}
      {/* Overall Statistics */}
      <div className="mb-6">
        <h3 className="font-heading font-medium mb-4">Overall Statistics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <Icon name="Target" size={20} className="text-primary" />
              <span className="text-2xl font-bold text-primary">
                {overallStats?.averageScore}%
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Average Score</p>
            <p className="text-xs text-primary mt-1">
              +5% from last month
            </p>
          </div>
          
          <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <Icon name="CheckCircle" size={20} className="text-success" />
              <span className="text-2xl font-bold text-success">
                {overallStats?.drillsCompleted}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Drills Completed</p>
            <p className="text-xs text-success mt-1">
              {overallStats?.completionRate}% completion rate
            </p>
          </div>
          
          <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <Icon name="Clock" size={20} className="text-warning" />
              <span className="text-2xl font-bold text-warning">
                {formatTime(overallStats?.averageTime)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Avg Response Time</p>
            <p className="text-xs text-warning mt-1">
              -15s improvement
            </p>
          </div>
        </div>
      </div>
      {/* Recent Drills */}
      <div>
        <h3 className="font-heading font-medium mb-4">Recent Drill History</h3>
        
        <div className="space-y-3">
          {recentDrills?.map((drill) => (
            <div key={drill?.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  drill?.type === 'earthquake' ? 'bg-warning/10 text-warning' :
                  drill?.type === 'fire'? 'bg-error/10 text-error' : 'bg-primary/10 text-primary'
                }`}>
                  <Icon 
                    name={drill?.type === 'earthquake' ? 'Zap' : 
                          drill?.type === 'fire' ? 'Flame' : 'Droplets'} 
                    size={16} 
                  />
                </div>
                
                <div>
                  <p className="font-medium text-sm">{drill?.scenario}</p>
                  <p className="text-xs text-muted-foreground">
                    {drill?.date} • {drill?.duration}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className={`text-sm font-medium text-${getPerformanceColor(drill?.score)}`}>
                    {drill?.score}%
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {getGradeFromScore(drill?.score)}
                  </p>
                </div>
                
                <Icon 
                  name="ChevronRight" 
                  size={16} 
                  className="text-muted-foreground" 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Detailed Feedback */}
      {showDetailedFeedback && currentPerformance && (
        <div className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="MessageSquare" size={16} className="text-accent mt-0.5" />
            <div>
              <h4 className="font-medium text-sm mb-2">Performance Feedback</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• {currentPerformance?.feedback?.strengths}</p>
                <p>• {currentPerformance?.feedback?.improvements}</p>
                <p>• {currentPerformance?.feedback?.nextSteps}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceTracker;