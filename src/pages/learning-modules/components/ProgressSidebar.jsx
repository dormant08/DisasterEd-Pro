import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ProgressIndicator, { CircularProgress } from '../../../components/ui/ProgressIndicator';

const ProgressSidebar = ({ userProgress, recentModules, achievements, onViewCertificate }) => {
  const overallProgress = Math.round((userProgress?.completedModules / userProgress?.totalModules) * 100);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Overall Progress */}
      <div className="text-center mb-6">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
          Your Learning Progress
        </h3>
        
        <div className="flex justify-center mb-4">
          <CircularProgress
            progress={userProgress?.completedModules}
            total={userProgress?.totalModules}
            size={80}
            variant="default"
            showPercentage={true}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Modules Completed</span>
            <span className="font-medium text-foreground">
              {userProgress?.completedModules}/{userProgress?.totalModules}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total Study Time</span>
            <span className="font-medium text-foreground">
              {userProgress?.totalStudyTime}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Current Streak</span>
            <div className="flex items-center space-x-1">
              <Icon name="Flame" size={14} className="text-warning" />
              <span className="font-medium text-foreground">
                {userProgress?.streak} days
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Learning Objectives */}
      <div className="mb-6">
        <h4 className="font-heading font-medium text-foreground mb-3 flex items-center space-x-2">
          <Icon name="Target" size={16} className="text-primary" />
          <span>Learning Objectives</span>
        </h4>
        
        <div className="space-y-3">
          {userProgress?.objectives?.map((objective, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                objective?.completed 
                  ? 'border-success bg-success' :'border-muted-foreground'
              }`}>
                {objective?.completed && (
                  <Icon name="Check" size={10} color="white" />
                )}
              </div>
              <div className="flex-1">
                <p className={`text-sm ${
                  objective?.completed 
                    ? 'text-muted-foreground line-through' 
                    : 'text-foreground'
                }`}>
                  {objective?.title}
                </p>
                {objective?.progress && (
                  <ProgressIndicator
                    progress={objective?.progress}
                    total={100}
                    showPercentage={false}
                    showStats={false}
                    size="sm"
                    className="mt-1"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Activity */}
      <div className="mb-6">
        <h4 className="font-heading font-medium text-foreground mb-3 flex items-center space-x-2">
          <Icon name="Clock" size={16} className="text-secondary" />
          <span>Recent Activity</span>
        </h4>
        
        <div className="space-y-3">
          {recentModules?.map((module, index) => (
            <div key={index} className="flex items-center space-x-3 p-2 bg-muted/50 rounded-lg">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                module.status === 'completed' 
                  ? 'bg-success text-success-foreground' :'bg-primary text-primary-foreground'
              }`}>
                <Icon 
                  name={module.status === 'completed' ? 'CheckCircle' : 'PlayCircle'} 
                  size={14} 
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {module.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {module.lastAccessed}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Achievements */}
      <div className="mb-6">
        <h4 className="font-heading font-medium text-foreground mb-3 flex items-center space-x-2">
          <Icon name="Trophy" size={16} className="text-warning" />
          <span>Recent Achievements</span>
        </h4>
        
        <div className="grid grid-cols-2 gap-2">
          {achievements?.map((achievement, index) => (
            <div key={index} className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl mb-1">{achievement?.icon}</div>
              <p className="text-xs font-medium text-foreground">
                {achievement?.title}
              </p>
              <p className="text-xs text-muted-foreground">
                {achievement?.date}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="space-y-2">
        <Button
          variant="default"
          fullWidth
          iconName="Award"
          iconPosition="left"
          onClick={onViewCertificate}
        >
          View Certificates
        </Button>
        
        <Button
          variant="outline"
          fullWidth
          iconName="BarChart3"
          iconPosition="left"
        >
          Detailed Analytics
        </Button>
        
        <Button
          variant="ghost"
          fullWidth
          iconName="Share"
          iconPosition="left"
        >
          Share Progress
        </Button>
      </div>
      {/* Study Reminder */}
      <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Bell" size={16} className="text-primary" />
          <h5 className="font-medium text-foreground">Daily Study Reminder</h5>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          Keep your streak alive! Spend 15 minutes learning today.
        </p>
        <Button variant="outline" size="sm" fullWidth>
          Set Reminder
        </Button>
      </div>
    </div>
  );
};

export default ProgressSidebar;